from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Body
from typing import Optional
from ..schemas.analysis_schema import AnalysisResponse, AnalyzeTextRequest
from ..services.stylometry import analyze_document_text
from ..services.text_extractor import process_uploaded_file

router = APIRouter(prefix="/api", tags=["Document Analysis"])

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_document_endpoint(payload: AnalyzeTextRequest):
    """
    Accepts raw text and document name in a JSON payload, returns comprehensive stylometric analysis.
    """
    try:
        return analyze_document_text(payload.text, payload.document_name or "Untitled Document")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/analyze-file", response_model=AnalysisResponse)
async def analyze_file_endpoint(
    file: UploadFile = File(...),
    document_name: Optional[str] = Form(None)
):
    """
    Extracts text from uploaded TXT or PDF file and performs stylometric analysis.
    """
    try:
        text = await process_uploaded_file(file)
        doc_name = document_name or file.filename or "Uploaded Document"
        return analyze_document_text(text, doc_name)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File analysis failed: {str(e)}")

