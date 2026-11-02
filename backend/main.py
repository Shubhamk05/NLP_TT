from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os

from backend.routes.analysis import router as analysis_router
from backend.routes.comparison import router as comparison_router
from backend.routes.model import router as model_router

app = FastAPI(
    title="AI Writing Fingerprint API",
    description="Linguistic, stylometric, and writing pattern analysis service.",
    version="1.0.0"
)

# CORS setup for web clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits localhost Vite server and external test clients
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API route modules
app.include_router(analysis_router)
app.include_router(comparison_router)
app.include_router(model_router)

@app.get("/api/health", tags=["Health"])
def health_check():
    """Health check endpoint to verify backend operational status."""
    return {
        "status": "healthy",
        "service": "AI Writing Fingerprint API",
        "version": "1.0.0",
        "phase": 1,
        "features": [
            "Linguistic & Stylometric Analysis",
            "Multi-dimensional Document Comparison",
            "TF-IDF & Cosine Similarity",
            "PDF and TXT Extraction",
            "Rule-based Stylometric Synthesizer"
        ]
    }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Clean global exception handler that avoids leaking sensitive trace information."""
    return JSONResponse(
        status_code=500,
        content={"detail": f"An unexpected internal error occurred: {str(exc)}"}
    )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)

