from fastapi import FastAPI
from routes import auth, ide, files, deploy, ai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AutoFixIDE API",
    description="Advanced AI-powered coding IDE backend",
    version="1.0.0"
)

# Enable CORS so the frontend can access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(ide.router, prefix="/api/ide", tags=["IDE"])
app.include_router(files.router, prefix="/api/files", tags=["Files"])
app.include_router(deploy.router, prefix="/api/deploy", tags=["Deployment"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
