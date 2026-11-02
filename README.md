# AI Writing Fingerprint — Stylometry & Linguistic Analysis Platform

> **Discover How Different Authors Write**  
> A modern, responsive, full-stack web application designed to analyze writing styles, syntactic rhythms, and linguistic patterns rather than simple semantic topics.

---

## 1. Project Overview

**AI Writing Fingerprint** applies Natural Language Processing, Stylometry, and Statistical Vectorization to extract and compare textual fingerprints. Instead of analyzing *what* a document is about (content/topic), it investigates *how* it was composed:
- **Pacing & Syntactic Structure:** Sentence length variance, clause subordination, and structural complexity.
- **Lexical Breadth:** Type-Token Ratio (TTR), Hapax Legomena (single-occurrence terms), and stopword-to-content-word ratios.
- **Morphosyntactic Posture:** Part-of-speech distributions across nouns, verbs, adjectives, adverbs, and pronouns.
- **Punctuation Cadence:** Densities per 1,000 words across commas, semicolons, colons, question marks, and dashes.
- **TF-IDF & N-Gram Resemblance:** Multi-axis vector space cosine similarity across word and sub-word character patterns.

---

## 2. Architecture & Technology Stack

```
AI Writing Fingerprint/
├── backend/
│   ├── main.py                     # FastAPI application & middleware configuration
│   ├── requirements.txt            # Python dependencies
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── analysis.py             # Endpoints: /api/analyze, /api/analyze-file
│   │   ├── comparison.py           # Endpoints: /api/compare, /api/compare-files
│   │   └── model.py                # Endpoints: /api/model/status, /api/model/predict, /api/model/train
│   ├── services/
│   │   ├── __init__.py
│   │   ├── text_extractor.py       # Safe TXT & PyMuPDF PDF extraction with size bounds
│   │   ├── preprocessing.py        # Input validation & spaCy document pipeline
│   │   ├── stylometry.py           # Core linguistic & stylometric feature metrics
│   │   ├── similarity.py           # TF-IDF cosine similarity & multi-dimensional comparison
│   │   └── classifier.py           # Phase 1 model service & Phase 2 ML classifier harness
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── analysis_schema.py      # Typed Pydantic models for single-document analysis
│   │   └── comparison_schema.py    # Typed Pydantic models for pairwise comparison
│   └── models/
│       └── README.md               # Phase 2 ML pipeline specifications & serialization notes
│
├── frontend/
│   ├── index.html                  # HTML5 root with custom fonts & modern SVG favicon
│   ├── package.json                # React, Vite, Tailwind, Lucide, Recharts dependencies
│   ├── vite.config.js              # Vite dev server configuration & /api proxy to backend
│   ├── tailwind.config.js          # Custom theme: purple/electric blue accents & subtle shadows
│   ├── postcss.config.js           # PostCSS Tailwind plugins
│   └── src/
│       ├── main.jsx                # React root mount
│       ├── App.jsx                 # Top-level state, navigation tabs, session persistence
│       ├── index.css               # Tailwind directives & custom scrollbars
│       ├── components/
│       │   ├── Sidebar.jsx         # Responsive sidebar navigation with Phase 2 badges
│       │   ├── Header.jsx          # Live API health monitor & model indicator
│       │   ├── MetricCard.jsx      # Polished SaaS metric card with micro-interactions
│       │   └── FileUploadDropzone.jsx # Drag-and-drop zone for TXT and PDF documents
│       ├── pages/
│       │   ├── Overview.jsx        # Dashboard hero, session metrics, recent history, How It Works
│       │   ├── AnalyzeDocument.jsx # Input workspace, presets, core metrics & tabbed charts
│       │   ├── CompareWriting.jsx  # Two-column workspace, radar chart & difference matrix
│       │   ├── WritingProfile.jsx  # Six-pillar stylometric identity report & report export
│       │   ├── AuthorAnalysis.jsx  # Phase 1 UI / live Phase 2 integration simulator
│       │   ├── DatasetModel.jsx    # Model benchmarks & Gutenberg dataset roadmap
│       │   ├── AboutProject.jsx    # Stylometry theory, ethics & architectural boundaries
│       │   └── Settings.jsx        # API diagnostics, pipeline checks & cache clearing
│       ├── services/
│       │   └── api.js              # Fetch client for all backend REST endpoints
│       └── utils/
│           ├── sampleTexts.js      # Literary, academic, and essay presets
│           └── formatters.js       # Markdown & JSON report download utilities
│
└── sample_data/
    ├── sample_fiction_sherlock.txt # Sample literary fiction
    ├── sample_academic_nlp.txt     # Sample computational linguistics abstract
    └── sample_academic_nlp.pdf     # Valid binary PDF for upload testing
```

### Technologies Used

- **Backend:**
  - Python 3.14+
  - **FastAPI** — Asynchronous web framework & OpenAPI documentation.
  - **spaCy (`en_core_web_sm`)** — Sentence segmentation, tokenization, and Part-of-Speech tagging.
  - **scikit-learn** — TF-IDF vectorization and cosine similarity calculations.
  - **PyMuPDF (`pymupdf`)** — Safe, high-fidelity PDF text extraction.
  - **NumPy & Pandas** — Vector and distributional data transformations.
  - **Uvicorn** — ASGI high-performance server.

- **Frontend:**
  - **React 18** & **Vite** — High-speed reactive user interface.
  - **Tailwind CSS** — Custom SaaS typography, soft shadows, and clean color palettes.
  - **Lucide React** — Modern iconography.
  - **Recharts** — Responsive Bar charts and Multi-Axis Radar charts.
  - **Framer Motion** — Smooth transitions.

---

## 3. Features Implemented (Phase 1)

1. **Document Ingestion & Text Extraction:**
   - Plain text (`.txt`) file handling with UTF-8 / Latin-1 encoding fallbacks.
   - Digital PDF (`.pdf`) extraction via PyMuPDF.
   - Text input area for direct pasting.
   - File size validation (10 MB maximum) and empty/corrupted file detection.

2. **Linguistic & Stylometric Analysis (`/api/analyze`):**
   - **Quantitative Overview:** Total words, total sentences, raw/non-space character counts, unique words, average sentence length, average word length.
   - **Lexical Diversity:** Type-Token Ratio (TTR) and Hapax Legomena (single-occurrence terms).
   - **Sentence Pacing:** Shortest sentence, longest sentence, clause distribution bins (Short, Medium, Long, Complex), and sentence length standard deviation.
   - **Punctuation Footprint:** Commas, periods, semicolons, colons, question marks, exclamation marks, dashes, quotes, and densities per 1,000 words.
   - **Grammatical Distribution:** Percentages and token counts for Nouns, Verbs, Adjectives, Adverbs, Pronouns, Prepositions, and Conjunctions.
   - **N-Grams:** Word bigrams, word trigrams, and character trigrams.
   - **Rule-Based Summary:** Grounded purely in extracted metrics without speculative claims.

3. **Multi-Dimensional Comparison (`/api/compare`):**
   - Two-column workspace comparing Document A and Document B.
   - Composite stylometric similarity score combining TF-IDF cosine similarity, POS tag distribution cosine, punctuation cadence, sentence length ratio, and lexical diversity.
   - Multi-axis visual Radar Chart and Feature Difference Matrix.
   - Prominent disclaimer highlighting that similarity denotes stylistic resemblance, not individual authorship proof.

4. **Writing Profile & Report Generation:**
   - Six-pillar fingerprint view for any analyzed document.
   - One-click export to Markdown (`.md`) or raw JSON (`.json`).

5. **Model Precision, Accuracy & Classification Report (`/api/model/evaluation-report`):**
   - **Executive Benchmarks:** Overall Model Accuracy, Macro Precision, Macro Recall, Macro F1-Score, and Stratified Cross-Validation Accuracy.
   - **Per-Class Breakdown Table:** Precision, Recall, F1-Score, and Support counts for candidate authors (Arthur Conan Doyle, Jane Austen, Charles Dickens, Edgar Allan Poe, H.G. Wells).
   - **Visual Confusion Matrix:** Ground-truth Actual vs Predicted classifications grid.
   - **Interactive Author Attribution (`/api/model/predict`):** Classify any text with author confidence percentages and full probability distribution breakdown.
   - **Report Export:** One-click Markdown (`.md`) download of the complete Precision, Accuracy & Performance report.

---

## 4. Features Reserved for Phase 2

- **Gutenberg Authorship Corpus Ingestion:** Partitioned by source book into 1,000-word sliding windows to prevent data leakage.
- **Supervised ML Classification:** Scikit-learn pipeline pairing a `FeatureUnion` (stylometry + character n-grams) with a `LinearSVC` or `LogisticRegression` classifier.
- **Hyperparameter Optimization:** Grid-searched cross-validation reporting Accuracy, Precision, Recall, and Macro-F1.
- **Model Serialization:** Serialized artifact (`author_classifier_pipeline.joblib`) loaded dynamically by `classifier.py`.

---

## 5. Installation & Execution Guide

### Prerequisites
- Node.js (v18+) and npm
- Python (v3.10+)

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS / Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download the spaCy English model
python -m spacy download en_core_web_sm

# Start the FastAPI backend server
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
The API documentation will be accessible at: `http://localhost:8000/docs`

### 2. Frontend Setup

In a separate terminal:
```bash
# Navigate to the frontend directory
cd frontend

# Install npm dependencies
npm install

# Start the Vite development server
npm run dev
```
The web application will be accessible at: `http://localhost:5173`

---

## 6. Known Limitations & Stylometric Considerations

1. **Sample Length Sensitivity:**
   Writing-style measurements are statistically volatile on short texts (< 60 words). The application displays a sample-size notice when analyzing brief texts.
2. **Scanned PDFs:**
   The extraction engine requires digital, selectable text. Scanned document images without embedded OCR text layers will prompt an informative warning.
3. **Genre & Topic Confounders:**
   An author's style varies across genres (e.g., technical papers vs. personal correspondence). Stylometric comparison reflects document resemblance rather than identity verification.

