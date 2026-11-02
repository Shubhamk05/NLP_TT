from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class AnalyzeTextRequest(BaseModel):
    text: str = Field(..., description="Raw text to analyze", min_length=1)
    document_name: Optional[str] = Field("Untitled Document", description="Optional label for the document")

class FrequencyItem(BaseModel):
    item: str
    count: int
    percentage: float

class OverviewMetrics(BaseModel):
    total_words: int
    total_sentences: int
    total_characters_raw: int
    total_characters_no_spaces: int
    unique_words: int
    avg_sentence_length: float
    avg_word_length: float
    lexical_diversity: float # Type-Token Ratio (0.0 - 1.0)
    hapax_legomena_count: int
    hapax_legomena_ratio: float

class VocabularyAnalysis(BaseModel):
    vocabulary_diversity: float
    top_words: List[FrequencyItem]
    word_length_distribution: List[Dict[str, Any]]
    stopword_count: int
    content_word_count: int
    stopword_ratio: float

class SentenceAnalysis(BaseModel):
    avg_sentence_length: float
    shortest_sentence: Dict[str, Any]
    longest_sentence: Dict[str, Any]
    sentence_length_distribution: List[Dict[str, Any]]
    sentence_length_std_dev: float

class PunctuationAnalysis(BaseModel):
    total_punctuations: int
    punctuation_counts: Dict[str, int]
    punctuation_per_1000_words: Dict[str, float]
    punctuation_distribution: List[Dict[str, Any]]

class LinguisticAnalysis(BaseModel):
    noun_count: int
    noun_pct: float
    verb_count: int
    verb_pct: float
    adjective_count: int
    adjective_pct: float
    adverb_count: int
    adverb_pct: float
    pronoun_count: int
    pronoun_pct: float
    preposition_count: int
    preposition_pct: float
    conjunction_count: int
    conjunction_pct: float
    other_count: int
    other_pct: float
    pos_distribution: List[Dict[str, Any]]

class NgramAnalysis(BaseModel):
    top_word_bigrams: List[FrequencyItem]
    top_word_trigrams: List[FrequencyItem]
    top_char_trigrams: List[FrequencyItem]

class AnalysisResponse(BaseModel):
    document_name: str
    reliability_warning: Optional[str] = None
    overview: OverviewMetrics
    vocabulary: VocabularyAnalysis
    sentence: SentenceAnalysis
    punctuation: PunctuationAnalysis
    linguistic: LinguisticAnalysis
    ngrams: NgramAnalysis
    summary: str

