import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle, 
  BarChart2, 
  AlignLeft, 
  Layers, 
  Hash, 
  Download, 
  ArrowRight,
  HelpCircle,
  Clock,
  Quote
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie, 
  Legend 
} from 'recharts';
import FileUploadDropzone from '../components/FileUploadDropzone';
import MetricCard from '../components/MetricCard';
import { analyzeText, analyzeFile } from '../services/api';
import { SAMPLE_TEXTS } from '../utils/sampleTexts';
import { downloadMarkdownReport, downloadJsonFile } from '../utils/formatters';

const POS_COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#64748b'];

export default function AnalyzeDocument({ 
  onAnalysisComplete, 
  currentAnalysis, 
  setCurrentAnalysis,
  onNavigateToCompare 
}) {
  const [documentName, setDocumentName] = useState('');
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const wordCount = textInput.trim() ? textInput.trim().split(/\s+/).length : 0;

  const handleLoadSample = (sampleKey) => {
    const sample = SAMPLE_TEXTS[sampleKey];
    if (sample) {
      setDocumentName(sample.name);
      setTextInput(sample.text);
      setFile(null);
      setError(null);
    }
  };

  const handleClear = () => {
    setDocumentName('');
    setTextInput('');
    setFile(null);
    setError(null);
    setCurrentAnalysis(null);
  };

  const handleAnalyze = async () => {
    setError(null);
    if (!file && (!textInput || !textInput.trim())) {
      setError('Please provide document text by typing, pasting, or uploading a TXT/PDF file.');
      return;
    }

    if (!file && wordCount < 5) {
      setError(`Text sample is too short (${wordCount} words). A minimum of 5 words is required for linguistic analysis.`);
      return;
    }

    setIsLoading(true);

    try {
      let result;
      if (file) {
        result = await analyzeFile(file, documentName || file.name);
      } else {
        result = await analyzeText({
          text: textInput,
          document_name: documentName || 'Analyzed Document'
        });
      }

      setCurrentAnalysis(result);
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } catch (err) {
      setError(err.message || 'Analysis failed. Please check the file or input format.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Input Workspace Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Document Input Workspace</h2>
            <p className="text-xs text-slate-500">Upload a text or PDF file, or paste text directly for stylometric analysis</p>
          </div>

          {/* Quick sample buttons */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide hidden md:inline">Quick Presets:</span>
            <button
              type="button"
              onClick={() => handleLoadSample('victorian')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              Victorian Fiction
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample('scientific')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              Scientific Abstract
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample('philosophical')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors hidden sm:inline"
            >
              Philosophical
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {/* Document Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Document Label / Title (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Chapter 1 Manuscript, Technical Article, Opinion Column"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Dual input: File or Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Method A: Upload File (.TXT or .PDF)
              </label>
              <FileUploadDropzone 
                file={file} 
                setFile={setFile} 
                onFileLoaded={(f) => {
                  if (!documentName) setDocumentName(f.name.replace(/\.[^/.]+$/, ""));
                }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Method B: Paste Document Text
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {wordCount} words • {textInput.length} chars
                </span>
              </div>
              <textarea
                rows={6}
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                  if (file) setFile(null); // prioritize text if typed
                }}
                placeholder="Paste the document text you wish to analyze here... (minimum 5 words)"
                className="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400 font-sans leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Error notice */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2.5 font-medium">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Workspace</span>
            </button>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading}
              className={`
                inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm text-white
                shadow-md transition-all
                ${isLoading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.01]'
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Parsing Linguistic Features...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Writing Fingerprint</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {currentAnalysis && (
        <div className="space-y-6">
          {/* Top Result Banner */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                    Analysis Completed
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    spaCy Pipeline Verified
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {currentAnalysis.document_name}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => downloadMarkdownReport(currentAnalysis)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report (.MD)</span>
                </button>
                <button
                  onClick={() => downloadJsonFile(currentAnalysis, `${currentAnalysis.document_name}_metrics.json`)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Hash className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
                {onNavigateToCompare && (
                  <button
                    onClick={() => onNavigateToCompare(currentAnalysis)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-semibold transition-colors"
                  >
                    <span>Compare with Another</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Reliability Warning if text is short */}
            {currentAnalysis.reliability_warning && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                <div>
                  <span className="font-semibold">Sample Size Notice: </span>
                  <span>{currentAnalysis.reliability_warning}</span>
                </div>
              </div>
            )}

            {/* F. Writing Style Summary (Rule-based) */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-brand-50/70 via-slate-50 to-electric-50/50 border border-brand-100">
              <div className="flex items-center space-x-2 text-brand-800 font-bold text-xs uppercase tracking-wider mb-2">
                <Quote className="w-4 h-4 text-brand-600" />
                <span>Stylometric Fingerprint Summary</span>
              </div>
              <p className="text-slate-800 text-sm leading-relaxed font-normal">
                "{currentAnalysis.summary}"
              </p>
              <div className="mt-3 pt-3 border-t border-brand-100/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Objective rule-based synthesis derived directly from parsed syntax and punctuation frequencies.</span>
              </div>
            </div>
          </div>

          {/* Section A: Document Overview Metrics */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              A. Core Quantitative Dimensions
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <MetricCard
                title="Total Words"
                value={currentAnalysis.overview.total_words}
                subtext="Alphanumeric tokens"
                color="brand"
              />
              <MetricCard
                title="Sentences"
                value={currentAnalysis.overview.total_sentences}
                subtext="Segmented clauses"
                color="blue"
              />
              <MetricCard
                title="Characters"
                value={currentAnalysis.overview.total_characters_raw}
                subtext={`${currentAnalysis.overview.total_characters_no_spaces} non-space`}
                color="purple"
              />
              <MetricCard
                title="Unique Words"
                value={currentAnalysis.overview.unique_words}
                subtext="Distinct lexemes"
                color="emerald"
              />
              <MetricCard
                title="Avg Sentence"
                value={currentAnalysis.overview.avg_sentence_length.toFixed(1)}
                unit="words"
                subtext="Syntactic pacing"
                color="brand"
              />
              <MetricCard
                title="Avg Word"
                value={currentAnalysis.overview.avg_word_length.toFixed(1)}
                unit="chars"
                subtext="Morphemic density"
                color="blue"
              />
            </div>
          </div>

          {/* Tabs for In-Depth Views: Vocabulary, Sentences, Punctuation, Linguistic */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle">
            <div className="flex border-b border-slate-200 overflow-x-auto gap-4 mb-6">
              {[
                { id: 'overview', label: 'B. Vocabulary Analysis' },
                { id: 'sentences', label: 'C. Sentence Analysis' },
                { id: 'punctuation', label: 'D. Punctuation Analysis' },
                { id: 'linguistic', label: 'E. Part-of-Speech Distribution' },
                { id: 'ngrams', label: 'F. Frequent N-Grams' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    pb-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2
                    ${activeTab === tab.id 
                      ? 'border-brand-600 text-brand-600' 
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab B: Vocabulary Analysis */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">Lexical Diversity (TTR)</span>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {currentAnalysis.vocabulary.vocabulary_diversity.toFixed(3)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Type-Token Ratio ({currentAnalysis.overview.unique_words} unique / {currentAnalysis.overview.total_words} words)
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">Hapax Legomena</span>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {currentAnalysis.overview.hapax_legomena_count}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Words appearing only once ({(currentAnalysis.overview.hapax_legomena_ratio * 100).toFixed(1)}% of vocabulary)
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">Stopword Ratio</span>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {(currentAnalysis.vocabulary.stopword_ratio * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {currentAnalysis.vocabulary.stopword_count} functional stopwords vs {currentAnalysis.vocabulary.content_word_count} content words
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                  <div>
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                      Most Frequent Lexemes (Top 12)
                    </h5>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={currentAnalysis.vocabulary.top_words}
                          layout="vertical"
                          margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                        >
                          <XAxis type="number" tick={{ fontSize: 11 }} />
                          <YAxis dataKey="item" type="category" tick={{ fontSize: 11 }} />
                          <Tooltip 
                            formatter={(val) => [`${val} occurrences`, 'Frequency']}
                            contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                          />
                          <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                      Word Length Distribution (Letters)
                    </h5>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={currentAnalysis.vocabulary.word_length_distribution}
                          margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                        >
                          <XAxis dataKey="length" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip 
                            formatter={(val) => [`${val} words`, 'Count']}
                            contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                          />
                          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab C: Sentence Analysis */}
            {activeTab === 'sentences' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Shortest Sentence</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-mono font-semibold">
                        {currentAnalysis.sentence.shortest_sentence.length} words
                      </span>
                    </div>
                    <p className="text-sm text-slate-800 italic bg-white p-3 rounded-xl border border-slate-200">
                      "{currentAnalysis.sentence.shortest_sentence.text}"
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Longest Sentence</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-mono font-semibold">
                        {currentAnalysis.sentence.longest_sentence.length} words
                      </span>
                    </div>
                    <p className="text-sm text-slate-800 italic bg-white p-3 rounded-xl border border-slate-200 max-h-28 overflow-y-auto">
                      "{currentAnalysis.sentence.longest_sentence.text}"
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Sentence Length Distribution (Clauses)
                  </h5>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={currentAnalysis.sentence.sentence_length_distribution}
                        margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
                      >
                        <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip 
                          formatter={(val, name, item) => [`${val} sentences (${item.payload.percentage}%)`, 'Count']}
                          contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                        />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Sentence length variance standard deviation: <strong>{currentAnalysis.sentence.sentence_length_std_dev}</strong> (reflects syntactic rhythm variability).
                  </p>
                </div>
              </div>
            )}

            {/* Tab D: Punctuation Analysis */}
            {activeTab === 'punctuation' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Punctuation Footprint</h5>
                    <p className="text-xs text-slate-500">Total punctuation marks: {currentAnalysis.punctuation.total_punctuations}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentAnalysis.punctuation.punctuation_distribution.map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <p className="text-xs font-semibold text-slate-600 truncate">{p.punctuation}</p>
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="text-xl font-bold text-slate-900">{p.count}</span>
                        <span className="text-[11px] text-slate-500 font-mono">({p.per_1000_words}/1k w)</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-64 pt-4">
                  <h6 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Punctuation Frequency per 1,000 Words
                  </h6>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={currentAnalysis.punctuation.punctuation_distribution}
                      margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                    >
                      <XAxis dataKey="punctuation" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip 
                        formatter={(val) => [`${val} per 1,000 words`, 'Density']}
                        contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                      />
                      <Bar dataKey="per_1000_words" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Tab E: Linguistic / POS Analysis */}
            {activeTab === 'linguistic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {[
                    { label: 'Nouns', pct: currentAnalysis.linguistic.noun_pct, count: currentAnalysis.linguistic.noun_count, color: 'bg-indigo-50 text-indigo-700' },
                    { label: 'Verbs', pct: currentAnalysis.linguistic.verb_pct, count: currentAnalysis.linguistic.verb_count, color: 'bg-blue-50 text-blue-700' },
                    { label: 'Adjectives', pct: currentAnalysis.linguistic.adjective_pct, count: currentAnalysis.linguistic.adjective_count, color: 'bg-emerald-50 text-emerald-700' },
                    { label: 'Adverbs', pct: currentAnalysis.linguistic.adverb_pct, count: currentAnalysis.linguistic.adverb_count, color: 'bg-amber-50 text-amber-700' },
                    { label: 'Pronouns', pct: currentAnalysis.linguistic.pronoun_pct, count: currentAnalysis.linguistic.pronoun_count, color: 'bg-pink-50 text-pink-700' },
                    { label: 'Prepositions', pct: currentAnalysis.linguistic.preposition_pct, count: currentAnalysis.linguistic.preposition_count, color: 'bg-purple-50 text-purple-700' },
                    { label: 'Conjunctions', pct: currentAnalysis.linguistic.conjunction_pct, count: currentAnalysis.linguistic.conjunction_count, color: 'bg-slate-100 text-slate-700' },
                  ].map((pos, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase">{pos.label}</span>
                      <p className="text-xl font-bold text-slate-900 mt-1">{pos.pct}%</p>
                      <span className="text-[10px] text-slate-400 font-mono">{pos.count} tokens</span>
                    </div>
                  ))}
                </div>

                <div className="h-64 pt-4">
                  <h6 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Part-of-Speech Proportions (% of Classified Tokens)
                  </h6>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={currentAnalysis.linguistic.pos_distribution}
                      margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                    >
                      <XAxis dataKey="pos" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip 
                        formatter={(val) => [`${val}%`, 'Proportion']}
                        contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                      />
                      <Bar dataKey="percentage" fill="#6366f1" radius={[4, 4, 0, 0]}>
                        {currentAnalysis.linguistic.pos_distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={POS_COLORS[index % POS_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Tab F: N-grams */}
            {activeTab === 'ngrams' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                      Top Word Bigrams (2-grams)
                    </h5>
                    <div className="space-y-2">
                      {currentAnalysis.ngrams.top_word_bigrams.map((bg, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                          <span className="font-medium text-slate-800">"{bg.item}"</span>
                          <span className="font-mono text-slate-500">{bg.count}x</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                      Top Word Trigrams (3-grams)
                    </h5>
                    <div className="space-y-2">
                      {currentAnalysis.ngrams.top_word_trigrams.map((tg, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                          <span className="font-medium text-slate-800">"{tg.item}"</span>
                          <span className="font-mono text-slate-500">{tg.count}x</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                      Top Character Trigrams
                    </h5>
                    <div className="space-y-2">
                      {currentAnalysis.ngrams.top_char_trigrams.map((cg, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                          <span className="text-slate-800">'{cg.item}'</span>
                          <span className="text-slate-500">{cg.count}x</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

