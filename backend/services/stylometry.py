import re
import math
from collections import Counter
from typing import List, Dict, Any, Tuple
from ..schemas.analysis_schema import (
    AnalysisResponse,
    OverviewMetrics,
    VocabularyAnalysis,
    SentenceAnalysis,
    PunctuationAnalysis,
    LinguisticAnalysis,
    NgramAnalysis,
    FrequencyItem
)
from .preprocessing import validate_input_text, process_spacy_doc

PUNCTUATION_CHARS = {
    "Commas (,)": ",",
    "Periods (.)": ".",
    "Semicolons (;)": ";",
    "Colons (:)": ":",
    "Question Marks (?)": "?",
    "Exclamation Marks (!)": "!",
    "Dashes/Hyphens (-)": "-",
    "Quotes (\", ')": "\"'`“”’‘"
}

def extract_ngrams(tokens: List[str], n: int) -> List[str]:
    """Extract word-level n-grams."""
    return [" ".join(tokens[i:i+n]) for i in range(len(tokens) - n + 1)]

def extract_char_ngrams(text: str, n: int) -> List[str]:
    """Extract character-level n-grams from lowercased text ignoring excess whitespace."""
    clean_text = " ".join(text.lower().split())
    return [clean_text[i:i+n] for i in range(len(clean_text) - n + 1) if not clean_text[i:i+n].isspace()]

def generate_style_summary(
    overview: OverviewMetrics, 
    vocabulary: VocabularyAnalysis, 
    sentence: SentenceAnalysis, 
    punctuation: PunctuationAnalysis, 
    linguistic: LinguisticAnalysis
) -> str:
    """
    Generate an objective, rule-based summary grounded strictly on the extracted features.
    Avoids unsupported claims regarding personality, intelligence, or authorship identity.
    """
    sentences = []
    
    # 1. Sentence length observation
    avg_s_len = overview.avg_sentence_length
    if avg_s_len < 12:
        s_desc = "predominantly concise, rapid sentence structures"
    elif avg_s_len <= 22:
        s_desc = "balanced, standard sentence lengths with steady pacing"
    elif avg_s_len <= 32:
        s_desc = "elaborate, moderately extended sentences"
    else:
        s_desc = "highly complex, lengthy sentence formations with multiple clauses"
    sentences.append(f"The text exhibits {s_desc} (averaging {avg_s_len:.1f} words per sentence).")
    
    # 2. Vocabulary diversity observation
    ttr = vocabulary.vocabulary_diversity
    if ttr < 0.35:
        v_desc = "a focused, repetitive vocabulary with frequent term reuse"
    elif ttr <= 0.60:
        v_desc = "a standard, well-rounded lexical range"
    else:
        v_desc = "a rich and varied vocabulary with high lexical diversity"
    sentences.append(f"Lexical analysis indicates {v_desc} (Type-Token Ratio: {ttr:.2f}).")
    
    # 3. Punctuation profile
    comma_count = punctuation.punctuation_counts.get("Commas (,)", 0)
    semicolon_count = punctuation.punctuation_counts.get("Semicolons (;)", 0)
    excl_count = punctuation.punctuation_counts.get("Exclamation Marks (!)", 0)
    ques_count = punctuation.punctuation_counts.get("Question Marks (?)", 0)
    
    punct_highlights = []
    if comma_count > (overview.total_sentences * 1.5):
        punct_highlights.append("frequent clause-separating comma usage")
    if semicolon_count > 0:
        punct_highlights.append("deliberate semicolon coordination")
    if excl_count > (overview.total_sentences * 0.2):
        punct_highlights.append("pronounced emphatic punctuation (!)")
    if ques_count > (overview.total_sentences * 0.2):
        punct_highlights.append("recurrent rhetorical or direct inquiry (?)")
        
    if punct_highlights:
        sentences.append(f"The punctuation profile reveals {', and '.join(punct_highlights)}.")
    else:
        sentences.append("Punctuation markers follow conventional declarative patterns with minimal decorative punctuation.")
        
    # 4. Grammatical / POS emphasis
    top_pos = max([
        ("nominal phrasing (high noun density)", linguistic.noun_pct),
        ("action-oriented phrasing (strong verb usage)", linguistic.verb_pct),
        ("descriptive detail (elevated adjective frequency)", linguistic.adjective_pct),
        ("conversational / personal perspective (prominent pronoun count)", linguistic.pronoun_pct)
    ], key=lambda x: x[1])
    
    sentences.append(f"Grammatical weighting reflects a preference for {top_pos[0]} ({top_pos[1]:.1f}% of classified tokens).")
    
    return " ".join(sentences)

def analyze_document_text(text: str, document_name: str = "Untitled Document") -> AnalysisResponse:
    """
    Performs full stylometric and linguistic feature extraction.
    """
    clean_text, reliability_warning = validate_input_text(text)
    doc = process_spacy_doc(clean_text)
    
    # Word tokens (alphanumeric words)
    words = [token for token in doc if not token.is_punct and not token.is_space and len(token.text.strip()) > 0]
    total_words = len(words)
    if total_words == 0:
        total_words = 1  # prevent div by zero
        
    # Sentence analysis
    sentences = [sent for sent in doc.sents if sent.text.strip()]
    total_sentences = len(sentences)
    if total_sentences == 0:
        total_sentences = 1
        
    sentence_word_counts = []
    shortest_sent = {"text": "", "length": 999999}
    longest_sent = {"text": "", "length": 0}
    
    for sent in sentences:
        sent_words = [token for token in sent if not token.is_punct and not token.is_space]
        count = len(sent_words)
        sentence_word_counts.append(count)
        
        if count < shortest_sent["length"] and count > 0:
            shortest_sent = {"text": sent.text.strip(), "length": count}
        if count > longest_sent["length"]:
            longest_sent = {"text": sent.text.strip(), "length": count}
            
    if shortest_sent["length"] == 999999:
        shortest_sent = {"text": clean_text[:80], "length": total_words}
        
    avg_sentence_len = total_words / total_sentences
    
    # Sentence length variance & standard deviation
    if len(sentence_word_counts) > 1:
        variance = sum((l - avg_sentence_len) ** 2 for l in sentence_word_counts) / len(sentence_word_counts)
        sentence_std_dev = math.sqrt(variance)
    else:
        sentence_std_dev = 0.0
        
    # Sentence length bins
    bins = {"Short (<10 words)": 0, "Medium (10–24)": 0, "Long (25–39)": 0, "Complex (40+)": 0}
    for count in sentence_word_counts:
        if count < 10:
            bins["Short (<10 words)"] += 1
        elif count <= 24:
            bins["Medium (10–24)"] += 1
        elif count <= 39:
            bins["Long (25–39)"] += 1
        else:
            bins["Complex (40+)"] += 1
            
    sentence_distribution = [
        {"category": k, "count": v, "percentage": round((v / total_sentences) * 100, 1)}
        for k, v in bins.items()
    ]
    
    # Characters
    total_chars_raw = len(clean_text)
    total_chars_no_spaces = len("".join(clean_text.split()))
    
    # Words & Vocabulary
    word_strings = [w.text.lower() for w in words]
    unique_words_count = len(set(word_strings))
    word_counter = Counter(word_strings)
    
    # Average word length
    total_word_chars = sum(len(w.text) for w in words)
    avg_word_length = total_word_chars / total_words
    
    # Lexical Diversity (TTR)
    ttr = round(unique_words_count / total_words, 4)
    
    # Hapax Legomena (words occurring only once)
    hapax_words = [w for w, cnt in word_counter.items() if cnt == 1]
    hapax_count = len(hapax_words)
    hapax_ratio = round(hapax_count / unique_words_count if unique_words_count > 0 else 0.0, 4)
    
    # Top words
    top_words_list = [
        FrequencyItem(item=w, count=c, percentage=round((c / total_words) * 100, 2))
        for w, c in word_counter.most_common(12)
    ]
    
    # Stopwords vs content words
    stopwords_count = sum(1 for w in words if w.is_stop)
    content_words_count = total_words - stopwords_count
    stopword_ratio = round(stopwords_count / total_words, 4)
    
    # Word length distribution (1 to 12+)
    word_len_counter = Counter([min(len(w.text), 12) for w in words])
    word_length_distribution = []
    for l in range(1, 13):
        label = f"{l} letters" if l < 12 else "12+ letters"
        c = word_len_counter.get(l, 0)
        word_length_distribution.append({
            "length": label,
            "count": c,
            "percentage": round((c / total_words) * 100, 1)
        })
        
    # Punctuation analysis
    punct_counts = {}
    punct_per_1000 = {}
    total_punct = 0
    
    for category, chars in PUNCTUATION_CHARS.items():
        if len(chars) == 1:
            cnt = clean_text.count(chars)
        else:
            cnt = sum(clean_text.count(ch) for ch in chars)
        punct_counts[category] = cnt
        total_punct += cnt
        punct_per_1000[category] = round((cnt / total_words) * 1000, 2)
        
    punct_distribution = [
        {
            "punctuation": k,
            "count": v,
            "per_1000_words": punct_per_1000[k],
            "percentage": round((v / total_punct) * 100, 1) if total_punct > 0 else 0.0
        }
        for k, v in punct_counts.items()
    ]
    
    # Linguistic / POS Distribution
    pos_counter = Counter()
    for token in doc:
        if token.is_space:
            continue
        tag = token.pos_
        if tag in ["NOUN", "PROPN"]:
            pos_counter["noun"] += 1
        elif tag in ["VERB", "AUX"]:
            pos_counter["verb"] += 1
        elif tag == "ADJ":
            pos_counter["adj"] += 1
        elif tag == "ADV":
            pos_counter["adv"] += 1
        elif tag == "PRON":
            pos_counter["pron"] += 1
        elif tag in ["ADP"]:
            pos_counter["prep"] += 1
        elif tag in ["CCONJ", "SCONJ"]:
            pos_counter["conj"] += 1
        elif not token.is_punct:
            pos_counter["other"] += 1
            
    total_pos_tokens = max(1, sum(pos_counter.values()))
    
    linguistic = LinguisticAnalysis(
        noun_count=pos_counter["noun"],
        noun_pct=round((pos_counter["noun"] / total_pos_tokens) * 100, 1),
        verb_count=pos_counter["verb"],
        verb_pct=round((pos_counter["verb"] / total_pos_tokens) * 100, 1),
        adjective_count=pos_counter["adj"],
        adjective_pct=round((pos_counter["adj"] / total_pos_tokens) * 100, 1),
        adverb_count=pos_counter["adv"],
        adverb_pct=round((pos_counter["adv"] / total_pos_tokens) * 100, 1),
        pronoun_count=pos_counter["pron"],
        pronoun_pct=round((pos_counter["pron"] / total_pos_tokens) * 100, 1),
        preposition_count=pos_counter["prep"],
        preposition_pct=round((pos_counter["prep"] / total_pos_tokens) * 100, 1),
        conjunction_count=pos_counter["conj"],
        conjunction_pct=round((pos_counter["conj"] / total_pos_tokens) * 100, 1),
        other_count=pos_counter["other"],
        other_pct=round((pos_counter["other"] / total_pos_tokens) * 100, 1),
        pos_distribution=[
            {"pos": "Nouns", "count": pos_counter["noun"], "percentage": round((pos_counter["noun"] / total_pos_tokens) * 100, 1)},
            {"pos": "Verbs", "count": pos_counter["verb"], "percentage": round((pos_counter["verb"] / total_pos_tokens) * 100, 1)},
            {"pos": "Adjectives", "count": pos_counter["adj"], "percentage": round((pos_counter["adj"] / total_pos_tokens) * 100, 1)},
            {"pos": "Adverbs", "count": pos_counter["adv"], "percentage": round((pos_counter["adv"] / total_pos_tokens) * 100, 1)},
            {"pos": "Pronouns", "count": pos_counter["pron"], "percentage": round((pos_counter["pron"] / total_pos_tokens) * 100, 1)},
            {"pos": "Prepositions", "count": pos_counter["prep"], "percentage": round((pos_counter["prep"] / total_pos_tokens) * 100, 1)},
            {"pos": "Conjunctions", "count": pos_counter["conj"], "percentage": round((pos_counter["conj"] / total_pos_tokens) * 100, 1)},
        ]
    )
    
    # N-grams
    bigrams = extract_ngrams(word_strings, 2)
    trigrams = extract_ngrams(word_strings, 3)
    char_trigrams = extract_char_ngrams(clean_text, 3)
    
    bigram_counter = Counter(bigrams)
    trigram_counter = Counter(trigrams)
    char_trigram_counter = Counter(char_trigrams)
    
    ngrams = NgramAnalysis(
        top_word_bigrams=[
            FrequencyItem(item=b, count=c, percentage=round((c / max(1, len(bigrams))) * 100, 2))
            for b, c in bigram_counter.most_common(8)
        ],
        top_word_trigrams=[
            FrequencyItem(item=t, count=c, percentage=round((c / max(1, len(trigrams))) * 100, 2))
            for t, c in trigram_counter.most_common(6)
        ],
        top_char_trigrams=[
            FrequencyItem(item=ct, count=c, percentage=round((c / max(1, len(char_trigrams))) * 100, 2))
            for ct, c in char_trigram_counter.most_common(8)
        ]
    )
    
    overview = OverviewMetrics(
        total_words=total_words,
        total_sentences=total_sentences,
        total_characters_raw=total_chars_raw,
        total_characters_no_spaces=total_chars_no_spaces,
        unique_words=unique_words_count,
        avg_sentence_length=round(avg_sentence_len, 2),
        avg_word_length=round(avg_word_length, 2),
        lexical_diversity=ttr,
        hapax_legomena_count=hapax_count,
        hapax_legomena_ratio=hapax_ratio
    )
    
    sentence_analysis = SentenceAnalysis(
        avg_sentence_length=round(avg_sentence_len, 2),
        shortest_sentence=shortest_sent,
        longest_sentence=longest_sent,
        sentence_length_distribution=sentence_distribution,
        sentence_length_std_dev=round(sentence_std_dev, 2)
    )
    
    vocab_analysis = VocabularyAnalysis(
        vocabulary_diversity=ttr,
        top_words=top_words_list,
        word_length_distribution=word_length_distribution,
        stopword_count=stopwords_count,
        content_word_count=content_words_count,
        stopword_ratio=stopword_ratio
    )
    
    punctuation_analysis = PunctuationAnalysis(
        total_punctuations=total_punct,
        punctuation_counts=punct_counts,
        punctuation_per_1000_words=punct_per_1000,
        punctuation_distribution=punct_distribution
    )
    
    summary = generate_style_summary(
        overview, vocab_analysis, sentence_analysis, punctuation_analysis, linguistic
    )
    
    return AnalysisResponse(
        document_name=document_name,
        reliability_warning=reliability_warning,
        overview=overview,
        vocabulary=vocab_analysis,
        sentence=sentence_analysis,
        punctuation=punctuation_analysis,
        linguistic=linguistic,
        ngrams=ngrams,
        summary=summary
    )

