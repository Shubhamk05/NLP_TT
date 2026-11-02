import spacy
from fastapi import HTTPException
from typing import Tuple, Optional

# Load the spaCy model once globally
try:
    nlp = spacy.load("en_core_web_sm")
except Exception:
    # Fallback to blank model if not available
    nlp = spacy.blank("en")
    nlp.add_pipe("sentencizer")

MIN_WORD_COUNT = 5
RELIABILITY_THRESHOLD_WORDS = 60

def validate_input_text(text: str) -> Tuple[str, Optional[str]]:
    """
    Validates text input length.
    Returns:
        (sanitized_text, reliability_warning)
    """
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="The submitted document text is empty.")
    
    cleaned_text = text.strip()
    words = cleaned_text.split()
    
    if len(words) < MIN_WORD_COUNT:
        raise HTTPException(
            status_code=400, 
            detail=f"Text is too short for linguistic analysis (found {len(words)} words, minimum required is {MIN_WORD_COUNT})."
        )
    
    reliability_warning = None
    if len(words) < RELIABILITY_THRESHOLD_WORDS:
        reliability_warning = (
            f"Sample size notice: Document contains only {len(words)} words. "
            "Stylometric patterns and frequency distributions are substantially more reliable on samples of 100+ words."
        )
        
    return cleaned_text, reliability_warning

def process_spacy_doc(text: str):
    """
    Parses document through spaCy pipeline.
    Preserves tokens, sentence structures, and POS tags.
    """
    # Increase max length if user uploads large chapters
    nlp.max_length = max(nlp.max_length, len(text) + 100000)
    return nlp(text)

