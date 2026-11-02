import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Any, Tuple
from ..schemas.comparison_schema import (
    ComparisonResponse,
    ComparisonFeatureDiff,
    RadarMetric
)
from .stylometry import analyze_document_text

DISCLAIMER_TEXT = (
    "Similarity indicates resemblance between selected textual features (lexical choices, sentence rhythms, "
    "grammatical distribution, and punctuation density). It does not prove or establish that two documents "
    "were authored by the same individual."
)

def compute_cosine_similarity_vectors(vec1: List[float], vec2: List[float]) -> float:
    """Compute cosine similarity between two 1D numerical lists."""
    v1 = np.array(vec1, dtype=float)
    v2 = np.array(vec2, dtype=float)
    
    norm1 = np.linalg.norm(v1)
    norm2 = np.linalg.norm(v2)
    
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return float(np.dot(v1, v2) / (norm1 * norm2))

def compute_ratio_similarity(val1: float, val2: float) -> float:
    """Compute ratio-based similarity between two scalar values (0.0 to 1.0)."""
    if val1 == 0 and val2 == 0:
        return 1.0
    mn = min(val1, val2)
    mx = max(val1, val2)
    if mx == 0:
        return 1.0
    return mn / mx

def generate_comparative_summary(
    name_a: str,
    name_b: str,
    overall_score: float,
    diffs: List[ComparisonFeatureDiff]
) -> str:
    """Generate an objective comparative summary based on the difference values."""
    conclusions = []
    
    if overall_score >= 80:
        conclusions.append(
            f"'{name_a}' and '{name_b}' demonstrate a remarkably strong stylistic convergence ({overall_score:.1f}% overall similarity)."
        )
    elif overall_score >= 60:
        conclusions.append(
            f"'{name_a}' and '{name_b}' show moderate stylistic resemblance ({overall_score:.1f}% overall similarity), sharing core syntactic rhythms while diverging in specific markers."
        )
    else:
        conclusions.append(
            f"'{name_a}' and '{name_b}' exhibit pronounced stylistic divergence ({overall_score:.1f}% overall similarity), reflecting distinct structural and lexical choices."
        )
        
    # Find most aligned and most diverged features
    sorted_by_abs_diff = sorted(diffs, key=lambda d: abs(d.diff))
    most_similar = sorted_by_abs_diff[0]
    most_diverged = sorted_by_abs_diff[-1]
    
    conclusions.append(
        f"The two texts align closest in {most_similar.feature.lower()} (delta: {abs(most_similar.diff):.2f}{most_similar.unit})."
    )
    conclusions.append(
        f"The widest stylistic disparity appears in {most_diverged.feature.lower()} (delta: {abs(most_diverged.diff):.2f}{most_diverged.unit})."
    )
    
    return " ".join(conclusions)

def compare_documents(
    text_a: str, 
    name_a: str, 
    text_b: str, 
    name_b: str
) -> ComparisonResponse:
    """
    Performs multi-dimensional stylometric and TF-IDF comparison between two texts.
    """
    summary_a = analyze_document_text(text_a, name_a)
    summary_b = analyze_document_text(text_b, name_b)
    
    # 1. TF-IDF Cosine Similarity
    try:
        vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),
            stop_words='english',
            min_df=1
        )
        tfidf_matrix = vectorizer.fit_transform([text_a, text_b])
        cos_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        tfidf_sim_score = max(0.0, min(100.0, float(cos_sim) * 100))
    except Exception:
        tfidf_sim_score = 50.0
        
    # 2. POS Vector Similarity
    pos_keys = ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction"]
    pos_vec_a = [
        summary_a.linguistic.noun_pct,
        summary_a.linguistic.verb_pct,
        summary_a.linguistic.adjective_pct,
        summary_a.linguistic.adverb_pct,
        summary_a.linguistic.pronoun_pct,
        summary_a.linguistic.preposition_pct,
        summary_a.linguistic.conjunction_pct,
    ]
    pos_vec_b = [
        summary_b.linguistic.noun_pct,
        summary_b.linguistic.verb_pct,
        summary_b.linguistic.adjective_pct,
        summary_b.linguistic.adverb_pct,
        summary_b.linguistic.pronoun_pct,
        summary_b.linguistic.preposition_pct,
        summary_b.linguistic.conjunction_pct,
    ]
    pos_sim_score = compute_cosine_similarity_vectors(pos_vec_a, pos_vec_b) * 100
    pos_sim_score = max(0.0, min(100.0, pos_sim_score))
    
    # 3. Punctuation Profile Similarity
    punct_keys = list(summary_a.punctuation.punctuation_per_1000_words.keys())
    punct_vec_a = [summary_a.punctuation.punctuation_per_1000_words.get(k, 0.0) for k in punct_keys]
    punct_vec_b = [summary_b.punctuation.punctuation_per_1000_words.get(k, 0.0) for k in punct_keys]
    punct_sim_score = compute_cosine_similarity_vectors(punct_vec_a, punct_vec_b) * 100
    punct_sim_score = max(0.0, min(100.0, punct_sim_score))
    
    # 4. Sentence Structure Similarity
    sent_len_sim = compute_ratio_similarity(
        summary_a.overview.avg_sentence_length, 
        summary_b.overview.avg_sentence_length
    ) * 100
    
    # 5. Lexical Diversity Similarity
    lex_sim = compute_ratio_similarity(
        summary_a.vocabulary.vocabulary_diversity,
        summary_b.vocabulary.vocabulary_diversity
    ) * 100
    
    # Composite Stylometric Similarity Score
    # Balanced weights across distinct linguistic dimensions
    overall_similarity = (
        0.30 * tfidf_sim_score +
        0.25 * pos_sim_score +
        0.20 * punct_sim_score +
        0.15 * sent_len_sim +
        0.10 * lex_sim
    )
    overall_similarity = round(max(0.0, min(100.0, overall_similarity)), 1)
    
    # Feature Differences
    feature_diffs = [
        ComparisonFeatureDiff(
            feature="Average Sentence Length",
            doc_a_val=summary_a.overview.avg_sentence_length,
            doc_b_val=summary_b.overview.avg_sentence_length,
            diff=round(summary_a.overview.avg_sentence_length - summary_b.overview.avg_sentence_length, 2),
            unit=" words"
        ),
        ComparisonFeatureDiff(
            feature="Average Word Length",
            doc_a_val=summary_a.overview.avg_word_length,
            doc_b_val=summary_b.overview.avg_word_length,
            diff=round(summary_a.overview.avg_word_length - summary_b.overview.avg_word_length, 2),
            unit=" chars"
        ),
        ComparisonFeatureDiff(
            feature="Vocabulary Diversity (TTR)",
            doc_a_val=summary_a.vocabulary.vocabulary_diversity,
            doc_b_val=summary_b.vocabulary.vocabulary_diversity,
            diff=round(summary_a.vocabulary.vocabulary_diversity - summary_b.vocabulary.vocabulary_diversity, 3),
            unit=""
        ),
        ComparisonFeatureDiff(
            feature="Noun Usage",
            doc_a_val=summary_a.linguistic.noun_pct,
            doc_b_val=summary_b.linguistic.noun_pct,
            diff=round(summary_a.linguistic.noun_pct - summary_b.linguistic.noun_pct, 1),
            unit="%"
        ),
        ComparisonFeatureDiff(
            feature="Verb Usage",
            doc_a_val=summary_a.linguistic.verb_pct,
            doc_b_val=summary_b.linguistic.verb_pct,
            diff=round(summary_a.linguistic.verb_pct - summary_b.linguistic.verb_pct, 1),
            unit="%"
        ),
        ComparisonFeatureDiff(
            feature="Adjective Usage",
            doc_a_val=summary_a.linguistic.adjective_pct,
            doc_b_val=summary_b.linguistic.adjective_pct,
            diff=round(summary_a.linguistic.adjective_pct - summary_b.linguistic.adjective_pct, 1),
            unit="%"
        ),
        ComparisonFeatureDiff(
            feature="Pronoun Usage",
            doc_a_val=summary_a.linguistic.pronoun_pct,
            doc_b_val=summary_b.linguistic.pronoun_pct,
            diff=round(summary_a.linguistic.pronoun_pct - summary_b.linguistic.pronoun_pct, 1),
            unit="%"
        ),
        ComparisonFeatureDiff(
            feature="Total Punctuation Rate",
            doc_a_val=round(sum(summary_a.punctuation.punctuation_per_1000_words.values()), 1),
            doc_b_val=round(sum(summary_b.punctuation.punctuation_per_1000_words.values()), 1),
            diff=round(sum(summary_a.punctuation.punctuation_per_1000_words.values()) - sum(summary_b.punctuation.punctuation_per_1000_words.values()), 1),
            unit="/1k w"
        ),
    ]
    
    # Radar chart normalized data (0-100 scale for visual harmony)
    radar_data = [
        RadarMetric(
            metric="Sentence Length",
            doc_a=min(100.0, summary_a.overview.avg_sentence_length * 2.5),
            doc_b=min(100.0, summary_b.overview.avg_sentence_length * 2.5),
            fullMark=100.0
        ),
        RadarMetric(
            metric="Lexical Richness",
            doc_a=min(100.0, summary_a.vocabulary.vocabulary_diversity * 100),
            doc_b=min(100.0, summary_b.vocabulary.vocabulary_diversity * 100),
            fullMark=100.0
        ),
        RadarMetric(
            metric="Noun Density",
            doc_a=min(100.0, summary_a.linguistic.noun_pct * 2.5),
            doc_b=min(100.0, summary_b.linguistic.noun_pct * 2.5),
            fullMark=100.0
        ),
        RadarMetric(
            metric="Verb Activity",
            doc_a=min(100.0, summary_a.linguistic.verb_pct * 3.5),
            doc_b=min(100.0, summary_b.linguistic.verb_pct * 3.5),
            fullMark=100.0
        ),
        RadarMetric(
            metric="Descriptiveness",
            doc_a=min(100.0, summary_a.linguistic.adjective_pct * 4.0),
            doc_b=min(100.0, summary_b.linguistic.adjective_pct * 4.0),
            fullMark=100.0
        ),
        RadarMetric(
            metric="Perspective (Pronouns)",
            doc_a=min(100.0, summary_a.linguistic.pronoun_pct * 4.0),
            doc_b=min(100.0, summary_b.linguistic.pronoun_pct * 4.0),
            fullMark=100.0
        ),
    ]
    
    comparative_summary = generate_comparative_summary(
        name_a, name_b, overall_similarity, feature_diffs
    )
    
    return ComparisonResponse(
        doc_a_name=name_a,
        doc_b_name=name_b,
        overall_similarity_score=overall_similarity,
        tfidf_similarity=round(tfidf_sim_score, 1),
        pos_similarity=round(pos_sim_score, 1),
        punctuation_similarity=round(punct_sim_score, 1),
        sentence_similarity=round(sent_len_sim, 1),
        lexical_similarity=round(lex_sim, 1),
        feature_differences=feature_diffs,
        radar_data=radar_data,
        doc_a_summary=summary_a,
        doc_b_summary=summary_b,
        comparative_summary=comparative_summary,
        disclaimer=DISCLAIMER_TEXT
    )

