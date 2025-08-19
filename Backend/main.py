from fastapi import FastAPI
from app.routes import router as app_router  # Import the FastAPI router from routes.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api.authentication.auth import router as auth_router
from api.authentication.auth import init_indexes

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await init_indexes()

# # Serve static files
# app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth_router)


# Register the routes (FastAPI routes from the router in routes.py)
app.include_router(app_router)
    
@app.get("/")
def read_root():
    return {"message": "Connected to Backend"}
