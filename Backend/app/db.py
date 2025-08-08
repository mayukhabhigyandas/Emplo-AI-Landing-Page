# db.py
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
from config import MONGO_URI


# Connect to MongoDB
client = AsyncIOMotorClient(MONGO_URI)
db = client.get_database("landing_page_db")

# Get a reference to the profiles collection
profiles_collection = db.profiles