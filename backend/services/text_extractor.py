import pymupdf
from fastapi import HTTPException, UploadFile
import io

MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

def extract_text_from_txt_bytes(content: bytes) -> str:
    """Decode raw bytes into a string, trying UTF-8 first, then Latin-1."""
    if not content:
        raise HTTPException(status_code=400, detail="The uploaded text file is empty.")
    try:
        return content.decode("utf-8")
    except UnicodeDecodeError:
        try:
            return content.decode("latin-1")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to decode text file encoding: {str(e)}")

def extract_text_from_pdf_bytes(content: bytes) -> str:
    """Extract text from PDF byte content safely using pymupdf."""
    if not content:
        raise HTTPException(status_code=400, detail="The uploaded PDF file is empty.")
    try:
        doc = pymupdf.open(stream=content, filetype="pdf")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid or corrupted PDF file: {str(e)}")
    
    if doc.is_encrypted:
        raise HTTPException(status_code=400, detail="The uploaded PDF is encrypted/password-protected.")

    extracted_pages = []
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text("text")
        if text.strip():
            extracted_pages.append(text)
    
    doc.close()
    
    full_text = "\n\n".join(extracted_pages).strip()
    if not full_text:
        raise HTTPException(
            status_code=400, 
            detail="No selectable text could be extracted from this PDF. It may contain scanned images without embedded text."
        )
    return full_text

async def process_uploaded_file(file: UploadFile) -> str:
    """Validate file type and size, then extract clean text."""
    filename = file.filename or "unknown"
    lower_name = filename.lower()
    
    if not (lower_name.endswith(".txt") or lower_name.endswith(".pdf")):
        raise HTTPException(
            status_code=400, 
            detail="Unsupported file format. Please upload a plain text (.txt) or PDF (.pdf) document."
        )
    
    content = await file.read()
    if len(content) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=400, 
            detail=f"File exceeds the maximum allowed size of {MAX_FILE_SIZE_BYTES // (1024 * 1024)}MB."
        )
    
    if lower_name.endswith(".txt"):
        return extract_text_from_txt_bytes(content)
    else:
        return extract_text_from_pdf_bytes(content)
