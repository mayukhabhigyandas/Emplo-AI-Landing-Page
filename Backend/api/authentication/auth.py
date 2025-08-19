from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, status
import bcrypt
import jwt
from jwt import PyJWTError
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from models.profile import Profile as Profile
# from models.employer_profile import EmployerProfile as EmployerProfile
from app.db import profiles_collection
from api.authentication.models import ProfileWithToken, ProfileUpdate, LoginRequest
from config import JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
import logging
from bson import ObjectId
from pymongo import ASCENDING

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

logger = logging.getLogger(__name__)

async def init_indexes():
    await profiles_collection.create_index(
        [("email", ASCENDING)],
        unique=True,
        name="email_index"
    )

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_email: str = payload.get("sub")
        user_id: str = payload.get("id")
        if user_email is None:
            raise credentials_exception

        user = {"email": user_email, "_id": user_id}
    except PyJWTError:
        raise credentials_exception
    return user

# Get a user profile by ID
@router.get("/profile/{user_id}", response_model=Profile)
async def get_user_by_id(user_id: str) -> Profile | None:
    user_data = await profiles_collection.find_one({"_id": ObjectId(user_id)})
    if user_data:
        return Profile(**user_data)
    return None

# Create a new profile
@router.post("/profile", response_model=ProfileWithToken)
async def create_profile(profile: Profile):
    if profile.password is None:
        raise HTTPException(status_code=400, detail="Password cannot be None")

    existing_profile = await profiles_collection.find_one({"email": profile.email})
    if existing_profile:
        raise HTTPException(status_code=400, detail="A profile with this email already exists.")
    
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(profile.password.encode('utf-8'), salt).decode('utf-8')

    profile_dict = profile.model_dump(by_alias=True)
    profile_dict["password"] = hashed_password

    result = await profiles_collection.insert_one(profile_dict)

    # Create JWT token right after signup
    access_token = create_access_token(data={"sub": profile.email})

    return ProfileWithToken(
        id=str(result.inserted_id),  # convert ObjectId to string for JSON
        user=profile.name or profile.email,
        email=profile.email,
        access_token=access_token,
        token_type="bearer"
    )
    
# Login endpoint
@router.post("/login", response_model=ProfileWithToken)
async def login(request: LoginRequest):
    user = await profiles_collection.find_one({"email": request.email})

    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    # Check password
    if not bcrypt.checkpw(request.password.encode('utf-8'), user['password'].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    access_token = create_access_token(
        data={"sub": user['email'],
        "id": str(user['_id'])})

    return ProfileWithToken(id=str(user['_id']), user=user['name'], email=user['email'], access_token=access_token)

# Get the current user's profile
@router.get("/me", response_model=Profile)
async def read_users_me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

    user = await profiles_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Convert ObjectId to str and filter fields
    user_data = {
        "id": str(user["_id"]),
        "user_id": user.get("user_id"),
        "name": user.get("name"),
        "email": user.get("email"),
        "created_at": user.get("created_at"),
        "updated_at": user.get("updated_at"),
    }
    return user_data

    
