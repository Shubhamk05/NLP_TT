import React from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  ShieldAlert, 
  Cpu, 
  Fingerprint, 
  Layers, 
  FileCode, 
  CheckCircle2,
  Scale
} from 'lucide-react';

export default function AboutProject() {
  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Hero */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-subtle">
        <div className="flex items-center space-x-3 text-brand-600 mb-3">
          <Fingerprint className="w-8 h-8" />
          <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Methodology & Architecture</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          The Science of Stylometry
        </h2>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          <strong>AI Writing Fingerprint</strong> is built on the empirical science of computational stylometry—the quantitative study 
          of linguistic style. While conventional natural language processing tasks emphasize <em>semantic understanding</em> 
          (what an author is talking about), stylometry investigates <em>idiolectal habits</em> (how an author constructs sentences, 
          selects grammatical categories, and modulates punctuation).
        </p>
      </div>

      {/* Core Methodology Pillars */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-subtle space-y-6">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Six Analytical Dimensions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-800 text-sm">1. Syntactic Pacing & Variation</h4>
            <p className="text-slate-600 leading-relaxed">
              Measures mean sentence length, standard deviation, and clause distributions. Pacing reveals whether an author prefers punchy, succinct declarations or multi-tiered subordinate clauses.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-800 text-sm">2. Lexical Breadth & Type-Token Ratio</h4>
            <p className="text-slate-600 leading-relaxed">
              Calculates vocabulary richness via Type-Token Ratio (TTR) and Hapax Legomena (words appearing once). Quantifies the balance between functional stopwords and specialized content lexemes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-800 text-sm">3. Punctuation Cadence</h4>
            <p className="text-slate-600 leading-relaxed">
              Analyzes punctuation densities normalized per 1,000 words. Punctuation habits (such as comma-separated clauses, colon introductions, or semicolon coordination) remain largely subconscious across writers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-800 text-sm">4. Part-of-Speech (POS) Distributions</h4>
            <p className="text-slate-600 leading-relaxed">
              Leverages spaCy's probabilistic tagger to categorize nouns, verbs, adjectives, adverbs, and pronouns. This distinguishes nominal, descriptive, action-oriented, and conversational perspectives.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-800 text-sm">5. TF-IDF Vector Space Modeling</h4>
            <p className="text-slate-600 leading-relaxed">
              Transforms documents into high-dimensional term frequency-inverse document frequency vectors to evaluate statistical cosine similarity across shared n-grams and vocabulary.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-800 text-sm">6. Sub-word Character N-Grams</h4>
            <p className="text-slate-600 leading-relaxed">
              Captures sub-morphemic sequences and orthographic patterns that persist independent of topic or domain vocabulary shifts.
            </p>
          </div>
        </div>
      </div>

      {/* Ethical Boundaries & Scientific Integrity */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-8 space-y-4">
        <div className="flex items-center space-x-2.5 text-amber-900 font-bold text-sm">
          <Scale className="w-5 h-5 text-amber-700" />
          <span>Ethical Boundaries & Scientific Integrity</span>
        </div>
        <p className="text-xs text-amber-950 leading-relaxed">
          Linguistic similarity is a measure of mathematical resemblance across quantified style vectors. 
          It does <strong>not</strong> constitute biometric proof of individual human authorship, legal identity attribution, or psychological profile assessment. 
          Stylometric measures can be influenced by topic shifts, editorial revisions, translation layers, and genre conventions.
        </p>
      </div>

      {/* Technology Stack Details */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-subtle space-y-4">
        <h3 className="text-base font-bold text-slate-900">Technology Architecture</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">FastAPI</span>
            <span className="text-slate-500">Asynchronous REST backend</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">spaCy 3.8</span>
            <span className="text-slate-500">Tokenization & POS tagging</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">scikit-learn</span>
            <span className="text-slate-500">TF-IDF vectorizer & cosine similarity</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">PyMuPDF</span>
            <span className="text-slate-500">Safe PDF text extraction</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">React 18 + Vite</span>
            <span className="text-slate-500">Fast modern frontend</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">Recharts & Tailwind</span>
            <span className="text-slate-500">Data visual design system</span>
          </div>
        </div>
      </div>
    </div>
  );
}

