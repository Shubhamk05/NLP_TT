import React from 'react';
import { 
  FileText, 
  GitCompare, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Compass, 
  CheckCircle2, 
  Clock, 
  Fingerprint,
  BarChart3,
  BookOpen
} from 'lucide-react';
import MetricCard from '../components/MetricCard';

export default function Overview({ 
  onNavigate, 
  stats, 
  recentAnalyses = [], 
  onSelectRecent 
}) {
  const steps = [
    {
      num: "01",
      title: "Upload Documents",
      desc: "Provide plain text or digital PDFs. The engine extracts clean text tokens while preserving punctuation cadence.",
      icon: FileText
    },
    {
      num: "02",
      title: "Extract Linguistic Features",
      desc: "spaCy parses part-of-speech distributions, clause structures, punctuation density, and sentence lengths.",
      icon: Cpu
    },
    {
      num: "03",
      title: "Analyze Writing Patterns",
      desc: "Synthesize Type-Token vocabulary diversity, Hapax Legomena indices, and word/character n-grams.",
      icon: Fingerprint
    },
    {
      num: "04",
      title: "Compare Results",
      desc: "Vectorize texts via TF-IDF cosine similarity and multi-axis stylometric difference matrices.",
      icon: GitCompare
    }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-elevated">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-200 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>Linguistic Stylometry & Quantitative Forensics</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight mb-4">
            Understand the Science Behind Every Writing Style.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
            Explore linguistic patterns, compare documents, and discover what makes every writing style different.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('analyze')}
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-electric-600 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.99] transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Analyze a Document</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 backdrop-blur-sm transition-all"
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare Two Documents</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Session Metrics</h2>
            <p className="text-xs text-slate-500">Live stylometric tracking from your current active session</p>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            {stats.documentsAnalyzed > 0 ? 'Live Session Data' : 'Initial Workspace State'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Documents Analyzed"
            value={stats.documentsAnalyzed}
            unit="docs"
            subtext={stats.documentsAnalyzed === 0 ? "Ready for initial document" : "Processed this session"}
            icon={FileText}
            color="brand"
          />
          <MetricCard
            title="Average Sentence Length"
            value={stats.avgSentenceLength ? stats.avgSentenceLength.toFixed(1) : "0.0"}
            unit="words/sent"
            subtext={stats.avgSentenceLength ? "Across analyzed texts" : "Calculated upon analysis"}
            icon={BarChart3}
            color="blue"
          />
          <MetricCard
            title="Vocabulary Diversity"
            value={stats.avgVocabDiversity ? stats.avgVocabDiversity.toFixed(2) : "0.00"}
            unit="TTR"
            subtext={stats.avgVocabDiversity ? "Type-Token Ratio average" : "Measured on uploaded texts"}
            icon={Fingerprint}
            color="purple"
          />
          <MetricCard
            title="Comparisons Completed"
            value={stats.comparisonsCompleted}
            unit="pairs"
            subtext={stats.comparisonsCompleted === 0 ? "Awaiting document pair" : "Cross-analyzed pairs"}
            icon={GitCompare}
            color="emerald"
          />
        </div>
      </div>

      {/* Recent Analysis Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-brand-50 text-brand-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Analysis</h3>
              <p className="text-xs text-slate-500">History of analyzed documents in this session</p>
            </div>
          </div>
          {recentAnalyses.length > 0 && (
            <button
              onClick={() => onNavigate('analyze')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              Analyze Another +
            </button>
          )}
        </div>

        {recentAnalyses.length === 0 ? (
          <div className="text-center py-8 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No documents analyzed yet</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Upload a document or choose one of our curated literary and scientific sample texts to inspect its writing fingerprint.
            </p>
            <button
              onClick={() => onNavigate('analyze')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Start First Analysis</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentAnalyses.map((doc, idx) => (
              <div 
                key={idx} 
                onClick={() => onSelectRecent && onSelectRecent(doc)}
                className="py-3 flex items-center justify-between hover:bg-slate-50 px-3 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs">
                    DOC
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{doc.document_name}</h4>
                    <p className="text-xs text-slate-500">
                      {doc.overview.total_words} words • {doc.overview.total_sentences} sentences • TTR {doc.overview.lexical_diversity.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                    View Profile →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">How It Works</h2>
          <p className="text-xs text-slate-500">The four-stage quantitative stylometric pipeline</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div 
                key={i} 
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                    {st.num}
                  </div>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{st.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

