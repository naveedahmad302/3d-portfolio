from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import contact, projects, visitors

app = FastAPI(
    title="Portfolio API",
    description="Backend API for Naveed Ahmad's developer portfolio",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "online", "message": "Portfolio API v1.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


app.include_router(contact.router, prefix="/api", tags=["contact"])
app.include_router(projects.router, prefix="/api", tags=["projects"])
app.include_router(visitors.router, prefix="/api", tags=["visitors"])
