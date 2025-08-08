from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from models.profile import Profile

class ProfileWithToken(BaseModel):
    id: str
    user: str
    email: EmailStr
    access_token: str
    token_type: str = "bearer"
    
class ProfileUpdate(BaseModel):
    name: Optional[str]=None
    email: Optional[EmailStr]=None
    password: Optional[str]=None
    
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
