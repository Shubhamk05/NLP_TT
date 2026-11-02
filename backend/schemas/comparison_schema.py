from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from .analysis_schema import AnalysisResponse

class CompareTextRequest(BaseModel):
    text_a: str = Field(..., description="Document A raw text", min_length=1)
    name_a: Optional[str] = Field("Document A", description="Document A name")
    text_b: str = Field(..., description="Document B raw text", min_length=1)
    name_b: Optional[str] = Field("Document B", description="Document B name")

class ComparisonFeatureDiff(BaseModel):
    feature: str
    doc_a_val: float
    doc_b_val: float
    diff: float
    unit: str

class RadarMetric(BaseModel):
    metric: str
    doc_a: float
    doc_b: float
    fullMark: float

class ComparisonResponse(BaseModel):
    doc_a_name: str
    doc_b_name: str
    overall_similarity_score: float # 0 - 100
    tfidf_similarity: float # 0 - 100
    pos_similarity: float # 0 - 100
    punctuation_similarity: float # 0 - 100
    sentence_similarity: float # 0 - 100
    lexical_similarity: float # 0 - 100
    feature_differences: List[ComparisonFeatureDiff]
    radar_data: List[RadarMetric]
    doc_a_summary: AnalysisResponse
    doc_b_summary: AnalysisResponse
    comparative_summary: str
    disclaimer: str

