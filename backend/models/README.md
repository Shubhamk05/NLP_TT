# Machine Learning Models Directory

This directory is designated for saved scikit-learn models, vectorizers, and serialization artifacts for the **AI Writing Fingerprint** platform.

## Phase 1 Status
In Phase 1, machine learning model training has not been executed yet. The application relies strictly on deterministic Natural Language Processing, Stylometry, and TF-IDF statistical vectorization with cosine similarity.

## Phase 2 Machine Learning Integration Plan
When transitioning to Phase 2, the following pipeline will be connected:
1. **Dataset**: Gutenberg Authorship Dataset or Federalist Papers corpus partitioned strictly by source document/book to avoid data leakage.
2. **Feature Pipeline**:
   - Stylometric feature union (Sentence length statistics, POS n-grams, punctuation frequencies).
   - Word & character n-gram TF-IDF vectorizers (`ngram_range=(2, 4)`).
3. **Classifiers**:
   - Linear Support Vector Machine (`LinearSVC`) or Multinomial Logistic Regression with L2 regularization.
4. **Serialization**:
   - Models will be serialized via `joblib.dump()` and loaded via `services/classifier.py`.

