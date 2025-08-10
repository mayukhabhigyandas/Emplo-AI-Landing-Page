
import os
from dotenv import load_dotenv

# Load .env in local development (ignored in production on Render)
load_dotenv()

# Database connection
MONGO_URI = os.getenv("MONGO_URI")

# JWT configuration
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")  # Default to HS256 if not set
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))  # Default 30 min
