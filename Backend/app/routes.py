# routes.py
from fastapi import APIRouter
from app.db import profiles_collection
from models.profile import Profile as Profile
from models.profile import PyObjectId as PyObjectId
# from models.employer_profile import EmployerProfile as EmployerProfile
# from models.employer_profile import PyObjectId as EmployerPyObjectId
from fastapi import HTTPException
from typing import List
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

# Get a user profile
@router.get("/profile/{profile_id}", response_model=Profile)
async def get_profile(profile_id: str):
    if (profile := profiles_collection.find_one({"_id": PyObjectId(profile_id)})) is not None:
        return profile
    raise HTTPException(status_code=404, detail="Profile not found")

# Update an existing profile
@router.put("/profile/{profile_id}", response_model=Profile)
async def update_profile(profile_id: str, profile_update: Profile):
    profile_update.updated_at = datetime.utcnow()
    update_data = {k: v for k, v in profile_update.model_dump(by_alias=True).items() 
                 if v is not None and k not in ["_id", "created_at"]}
    
    result = profiles_collection.update_one(
        {"_id": PyObjectId(profile_id)},
        {"$set": update_data}
    )
    
    if result.modified_count == 1:
        updated_profile = profiles_collection.find_one({"_id": PyObjectId(profile_id)})
        return updated_profile
    
    raise HTTPException(status_code=404, detail="Profile not found")

# Get all profiles
@router.get("/profiles", response_model=List[Profile])
async def get_all_profiles():
    profiles_cursor = await profiles_collection.find().to_list(length=None)
    for profile in profiles_cursor:
        profile['seekerId'] = str(profile['_id'])  # Use MongoDB's ObjectId as seekerId
        del profile['_id']  # Optionally remove _id if not needed
    return profiles_cursor