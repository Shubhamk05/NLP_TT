import React from 'react';
import { 
  Fingerprint, 
  Download, 
  FileText, 
  Sparkles, 
  BookOpen, 
  Layers, 
  BarChart3, 
  AlignLeft,
  Quote,
  Clock,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import MetricCard from '../components/MetricCard';
import { downloadMarkdownReport, downloadJsonFile } from '../utils/formatters';

export default function WritingProfile({ 
  currentAnalysis, 
  onNavigateToAnalyze, 
  onLoadSample 
}) {
  if (!currentAnalysis) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-xl mx-auto shadow-subtle my-12">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 border border-brand-100">
          <Fingerprint className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">No Active Writing Profile</h2>
        <p className="text-xs text-slate-500 leading-relaxed mb-6">
          To view a complete stylometric fingerprint profile, analyze a document first or load one of our literary presets.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigateToAnalyze && onNavigateToAnalyze()}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Go to Analyze Workspace</span>
          </button>
          <button
            onClick={() => onLoadSample && onLoadSample('victorian')}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Load Victorian Fiction Sample</span>
          </button>
        </div>
      </div>
    );
  }

  const ov = currentAnalysis.overview;
  const ling = currentAnalysis.linguistic;
  const sent = currentAnalysis.sentence;
  const punc = currentAnalysis.punctuation;
  const voc = currentAnalysis.vocabulary;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Profile Identity Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-electric-600 text-white flex items-center justify-center shadow-md">
              <Fingerprint className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  Stylometric Profile ID
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {ov.total_words} words parsed
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
                {currentAnalysis.document_name}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => downloadMarkdownReport(currentAnalysis)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Markdown Report</span>
            </button>
            <button
              onClick={() => downloadJsonFile(currentAnalysis, `${currentAnalysis.document_name}_fingerprint.json`)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs border border-brand-200 transition-colors"
            >
              <span>Export Raw JSON</span>
            </button>
          </div>
        </div>

        {/* Narrative fingerprint */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-xs uppercase tracking-wider mb-2">
            <Quote className="w-4 h-4 text-brand-600" />
            <span>Empirical Fingerprint Narrative</span>
          </div>
          <p className="text-slate-800 text-sm leading-relaxed">
            "{currentAnalysis.summary}"
          </p>
        </div>
      </div>

      {/* Six Pillars of the Stylistic Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pillar 1: Syntactic Structure */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">1. Syntactic Structure</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Average Sentence Length</span>
              <span className="font-bold text-slate-800 font-mono">{ov.avg_sentence_length} words</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Sentence Length Std Dev</span>
              <span className="font-bold text-slate-800 font-mono">{sent.sentence_length_std_dev}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Total Sentences</span>
              <span className="font-bold text-slate-800 font-mono">{ov.total_sentences}</span>
            </div>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">Pacing Range:</span>
              <p className="text-slate-600 text-[11px]">
                Ranges from {sent.shortest_sentence.length} words (shortest) to {sent.longest_sentence.length} words (longest).
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 2: Lexical Richness */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">2. Lexical Richness</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Type-Token Ratio (TTR)</span>
              <span className="font-bold text-slate-800 font-mono">{ov.lexical_diversity.toFixed(3)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Hapax Ratio (Single Terms)</span>
              <span className="font-bold text-slate-800 font-mono">{(ov.hapax_legomena_ratio * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Stopword Proportion</span>
              <span className="font-bold text-slate-800 font-mono">{(voc.stopword_ratio * 100).toFixed(1)}%</span>
            </div>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">Vocabulary Breadth:</span>
              <p className="text-slate-600 text-[11px]">
                {ov.unique_words} distinct lexemes out of {ov.total_words} total parsed words.
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 3: Morphological Profile */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <AlignLeft className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">3. Morphological Profile</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Average Word Length</span>
              <span className="font-bold text-slate-800 font-mono">{ov.avg_word_length} chars</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Raw Characters</span>
              <span className="font-bold text-slate-800 font-mono">{ov.total_characters_raw}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Characters (No Spaces)</span>
              <span className="font-bold text-slate-800 font-mono">{ov.total_characters_no_spaces}</span>
            </div>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">Word Length Distribution:</span>
              <p className="text-slate-600 text-[11px]">
                Dominated by {voc.word_length_distribution[2]?.length || 'medium'} words.
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 4: Grammatical Posture (POS) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">4. Grammatical Distribution</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Nouns:</span>
              <span className="font-mono font-bold text-slate-900">{ling.noun_pct}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Verbs:</span>
              <span className="font-mono font-bold text-slate-900">{ling.verb_pct}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Adjectives:</span>
              <span className="font-mono font-bold text-slate-900">{ling.adjective_pct}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Pronouns:</span>
              <span className="font-mono font-bold text-slate-900">{ling.pronoun_pct}%</span>
            </div>
          </div>
        </div>

        {/* Pillar 5: Punctuation Footprint */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">5. Punctuation Footprint</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total Marks:</span>
              <span className="font-mono font-bold text-slate-900">{punc.total_punctuations}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Commas:</span>
              <span className="font-mono font-bold text-slate-900">{punc.punctuation_counts['Commas (,)'] || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Semicolons:</span>
              <span className="font-mono font-bold text-slate-900">{punc.punctuation_counts['Semicolons (;)'] || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Questions (?):</span>
              <span className="font-mono font-bold text-slate-900">{punc.punctuation_counts['Question Marks (?)'] || 0}</span>
            </div>
          </div>
        </div>

        {/* Pillar 6: Collocational N-grams */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <Fingerprint className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">6. Recurrent N-Grams</h3>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Frequent Collocations:</span>
            {currentAnalysis.ngrams.top_word_bigrams.slice(0, 3).map((bg, idx) => (
              <div key={idx} className="flex justify-between p-1.5 rounded-lg bg-slate-50">
                <span className="font-medium text-slate-700">"{bg.item}"</span>
                <span className="font-mono text-slate-500">{bg.count}x</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

