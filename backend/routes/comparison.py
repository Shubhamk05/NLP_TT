from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from ..schemas.comparison_schema import ComparisonResponse, CompareTextRequest
from ..services.similarity import compare_documents
from ..services.text_extractor import process_uploaded_file

router = APIRouter(prefix="/api", tags=["Document Comparison"])

@router.post("/compare", response_model=ComparisonResponse)
async def compare_documents_endpoint(payload: CompareTextRequest):
    """
    Accepts two texts in a JSON payload and returns their stylometric similarity & difference analysis.
    """
    try:
        return compare_documents(
            text_a=payload.text_a,
            name_a=payload.name_a or "Document A",
            text_b=payload.text_b,
            name_b=payload.name_b or "Document B"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Comparison failed: {str(e)}")

@router.post("/compare-files", response_model=ComparisonResponse)
async def compare_files_endpoint(
    file_a: Optional[UploadFile] = File(None),
    text_a: Optional[str] = Form(None),
    name_a: Optional[str] = Form(None),
    file_b: Optional[UploadFile] = File(None),
    text_b: Optional[str] = Form(None),
    name_b: Optional[str] = Form(None),
):
    """
    Accepts files and/or text inputs for Document A and Document B and compares their stylometric profiles.
    """
    # Resolve Document A
    if file_a is not None and file_a.filename:
        resolved_text_a = await process_uploaded_file(file_a)
        resolved_name_a = name_a or file_a.filename
    elif text_a and text_a.strip():
        resolved_text_a = text_a.strip()
        resolved_name_a = name_a or "Document A"
    else:
        raise HTTPException(status_code=400, detail="Document A content is missing (provide a file or text).")

    # Resolve Document B
    if file_b is not None and file_b.filename:
        resolved_text_b = await process_uploaded_file(file_b)
        resolved_name_b = name_b or file_b.filename
    elif text_b and text_b.strip():
        resolved_text_b = text_b.strip()
        resolved_name_b = name_b or "Document B"
    else:
        raise HTTPException(status_code=400, detail="Document B content is missing (provide a file or text).")

    try:
        return compare_documents(
            text_a=resolved_text_a,
            name_a=resolved_name_a,
            text_b=resolved_text_b,
            name_b=resolved_name_b
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Comparison failed: {str(e)}")

