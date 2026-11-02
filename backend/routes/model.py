from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from ..services.classifier import classifier_service

router = APIRouter(prefix="/api/model", tags=["Model & Dataset"])

class PredictAuthorRequest(BaseModel):
    text: str
    document_name: Optional[str] = "Query Document"

@router.get("/status")
def get_model_status():
    """
    Returns the real status of the machine learning classifier, accuracy, and dataset.
    """
    return classifier_service.get_status()

@router.get("/evaluation-report")
def get_evaluation_report():
    """
    Returns the comprehensive Precision, Accuracy, Recall, F1, and Confusion Matrix report.
    """
    return classifier_service.get_evaluation_report()

@router.post("/predict")
def predict_author_endpoint(payload: PredictAuthorRequest):
    """
    Predicts author for the submitted text using the trained stylometric pipeline.
    """
    return classifier_service.predict_author(payload.text)

@router.post("/train")
def train_model_endpoint():
    """
    Triggers model training and returns updated precision and accuracy report.
    """
    return classifier_service.train_and_evaluate()
