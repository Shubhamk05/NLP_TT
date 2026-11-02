import React, { useState } from 'react';
import { 
  GitCompare, 
  Sparkles, 
  FileText, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Percent,
  Sliders,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import FileUploadDropzone from '../components/FileUploadDropzone';
import { compareTexts, compareFiles } from '../services/api';
import { SAMPLE_TEXTS } from '../utils/sampleTexts';

export default function CompareWriting({ 
  onComparisonComplete, 
  initialDocA, 
  initialDocB 
}) {
  const [docAName, setDocAName] = useState(initialDocA?.document_name || 'Document A');
  const [docAText, setDocAText] = useState(initialDocA ? '' : '');
  const [docAFile, setDocAFile] = useState(null);

  const [docBName, setDocBName] = useState(initialDocB?.document_name || 'Document B');
  const [docBText, setDocBText] = useState(initialDocB ? '' : '');
  const [docBFile, setDocBFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);

  const wordCountA = docAText.trim() ? docAText.trim().split(/\s+/).length : 0;
  const wordCountB = docBText.trim() ? docBText.trim().split(/\s+/).length : 0;

  const handleLoadSamplePair = (keyA, keyB) => {
    const sA = SAMPLE_TEXTS[keyA];
    const sB = SAMPLE_TEXTS[keyB];
    if (sA && sB) {
      setDocAName(sA.name);
      setDocAText(sA.text);
      setDocAFile(null);

      setDocBName(sB.name);
      setDocBText(sB.text);
      setDocBFile(null);
      setError(null);
    }
  };

  const handleCompare = async () => {
    setError(null);

    // Validation
    const hasA = docAFile || (docAText && docAText.trim().length > 0);
    const hasB = docBFile || (docBText && docBText.trim().length > 0);

    if (!hasA || !hasB) {
      setError('Both Document A and Document B are required for comparison.');
      return;
    }

    if (!docAFile && wordCountA < 5) {
      setError(`Document A is too short (${wordCountA} words). Minimum 5 words required.`);
      return;
    }

    if (!docBFile && wordCountB < 5) {
      setError(`Document B is too short (${wordCountB} words). Minimum 5 words required.`);
      return;
    }

    setIsLoading(true);

    try {
      let result;
      if (docAFile || docBFile) {
        result = await compareFiles({
          file_a: docAFile,
          text_a: docAText,
          name_a: docAName || 'Document A',
          file_b: docBFile,
          text_b: docBText,
          name_b: docBName || 'Document B',
        });
      } else {
        result = await compareTexts({
          text_a: docAText,
          name_a: docAName || 'Document A',
          text_b: docBText,
          name_b: docBName || 'Document B',
        });
      }

      setComparisonResult(result);
      if (onComparisonComplete) {
        onComparisonComplete(result);
      }
    } catch (err) {
      setError(err.message || 'Comparison calculation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setDocAName('Document A');
    setDocAText('');
    setDocAFile(null);

    setDocBName('Document B');
    setDocBText('');
    setDocBFile(null);

    setError(null);
    setComparisonResult(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Two-Column Comparison Workspace</h2>
          <p className="text-xs text-slate-500">
            Compare stylistic fingerprints, syntactic habits, and TF-IDF similarity between two documents
          </p>
        </div>

        {/* Preset Sample Pairs */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide hidden sm:inline">Try Pairs:</span>
          <button
            type="button"
            onClick={() => handleLoadSamplePair('victorian', 'scientific')}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
          >
            Fiction vs Science
          </button>
          <button
            type="button"
            onClick={() => handleLoadSamplePair('scientific', 'philosophical')}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
          >
            Science vs Essay
          </button>
        </div>
      </div>

      {/* Two Column Input Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document A Column */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                  A
                </span>
                <span className="font-bold text-sm text-slate-800">Target Document A</span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {docAFile ? `${(docAFile.size / 1024).toFixed(1)} KB` : `${wordCountA} words`}
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Document Name
              </label>
              <input
                type="text"
                value={docAName}
                onChange={(e) => setDocAName(e.target.value)}
                placeholder="Document A Name"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <FileUploadDropzone 
              file={docAFile} 
              setFile={setDocAFile} 
              onFileLoaded={(f) => {
                if (docAName === 'Document A') setDocAName(f.name.replace(/\.[^/.]+$/, ""));
              }}
            />

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Or Paste Text A
              </label>
              <textarea
                rows={5}
                value={docAText}
                onChange={(e) => {
                  setDocAText(e.target.value);
                  if (docAFile) setDocAFile(null);
                }}
                placeholder="Paste Document A text here..."
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 leading-relaxed resize-none"
              />
            </div>
          </div>
        </div>

        {/* Document B Column */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-lg bg-electric-100 text-electric-700 font-bold text-xs flex items-center justify-center">
                  B
                </span>
                <span className="font-bold text-sm text-slate-800">Target Document B</span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {docBFile ? `${(docBFile.size / 1024).toFixed(1)} KB` : `${wordCountB} words`}
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Document Name
              </label>
              <input
                type="text"
                value={docBName}
                onChange={(e) => setDocBName(e.target.value)}
                placeholder="Document B Name"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500"
              />
            </div>

            <FileUploadDropzone 
              file={docBFile} 
              setFile={setDocBFile} 
              onFileLoaded={(f) => {
                if (docBName === 'Document B') setDocBName(f.name.replace(/\.[^/.]+$/, ""));
              }}
            />

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Or Paste Text B
              </label>
              <textarea
                rows={5}
                value={docBText}
                onChange={(e) => {
                  setDocBText(e.target.value);
                  if (docBFile) setDocBFile(null);
                }}
                placeholder="Paste Document B text here..."
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 leading-relaxed resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Error notice */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2.5 font-medium">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Prominent Compare Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Documents</span>
        </button>

        <button
          type="button"
          onClick={handleCompare}
          disabled={isLoading}
          className={`
            w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm text-white
            shadow-elevated transition-all
            ${isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-brand-600 via-brand-500 to-electric-600 hover:scale-[1.01] active:scale-[0.99] shadow-brand-500/25'
            }
          `}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Vectorizing & Comparing Patterns...</span>
            </>
          ) : (
            <>
              <GitCompare className="w-4 h-4" />
              <span>Compare Writing Styles</span>
            </>
          )}
        </button>
      </div>

      {/* Comparison Results */}
      {comparisonResult && (
        <div className="space-y-8 pt-4">
          {/* Similarity Score Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="text-center md:text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Quantitative Resemblance Matrix
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  Stylometric Similarity Analysis
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Comparing <span className="font-semibold text-slate-800">"{comparisonResult.doc_a_name}"</span> with <span className="font-semibold text-slate-800">"{comparisonResult.doc_b_name}"</span>
                </p>
              </div>

              {/* Big Score Badge */}
              <div className="flex items-center space-x-4 bg-gradient-to-br from-brand-50 to-electric-50 p-4 rounded-2xl border border-brand-200/60">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Overall Resemblance</span>
                  <span className="text-xs font-semibold text-brand-700">
                    {comparisonResult.overall_similarity_score >= 75 ? 'Strong Stylistic Overlap' : 
                     comparisonResult.overall_similarity_score >= 55 ? 'Moderate Resemblance' : 'Distinct Stylistic Habits'}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-brand-700 font-mono tracking-tight">
                  {comparisonResult.overall_similarity_score.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Sub-Dimension Similarity Scores */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">TF-IDF Cosine</span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">
                  {comparisonResult.tfidf_similarity}%
                </span>
                <span className="text-[10px] text-slate-400">Lexical Vector</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Grammar (POS)</span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">
                  {comparisonResult.pos_similarity}%
                </span>
                <span className="text-[10px] text-slate-400">Syntactic Tags</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Punctuation</span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">
                  {comparisonResult.punctuation_similarity}%
                </span>
                <span className="text-[10px] text-slate-400">Density & Cadence</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Sentence Rhythm</span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">
                  {comparisonResult.sentence_similarity}%
                </span>
                <span className="text-[10px] text-slate-400">Length Ratio</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Lexical Richness</span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">
                  {comparisonResult.lexical_similarity}%
                </span>
                <span className="text-[10px] text-slate-400">TTR Comparison</span>
              </div>
            </div>

            {/* Comparative Insight Narrative */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-1">Comparative Stylistic Findings:</span>
              <p>{comparisonResult.comparative_summary}</p>
            </div>

            {/* Critical Stylometric Disclaimer */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Linguistic Disclaimer: </span>
                <span>{comparisonResult.disclaimer}</span>
              </div>
            </div>
          </div>

          {/* Visual Comparison: Radar & Bar Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Multi-axis Radar Chart */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle">
              <div className="mb-4">
                <h4 className="text-sm font-bold text-slate-900">Multi-Axis Stylometric Radar</h4>
                <p className="text-xs text-slate-500">Normalized stylistic profile comparison across key dimensions</p>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={comparisonResult.radar_data}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#475569' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar 
                      name={comparisonResult.doc_a_name} 
                      dataKey="doc_a" 
                      stroke="#6366f1" 
                      fill="#6366f1" 
                      fillOpacity={0.35} 
                    />
                    <Radar 
                      name={comparisonResult.doc_b_name} 
                      dataKey="doc_b" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.35} 
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Feature Differences Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle overflow-hidden">
              <div className="mb-4">
                <h4 className="text-sm font-bold text-slate-900">Feature Difference Matrix</h4>
                <p className="text-xs text-slate-500">Direct parameter-by-parameter variance analysis</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="pb-2.5">Feature</th>
                      <th className="pb-2.5">{comparisonResult.doc_a_name}</th>
                      <th className="pb-2.5">{comparisonResult.doc_b_name}</th>
                      <th className="pb-2.5 text-right">Difference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonResult.feature_differences.map((fd, i) => (
                      <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2.5 font-medium text-slate-800">{fd.feature}</td>
                        <td className="py-2.5 text-slate-600 font-mono">{fd.doc_a_val}{fd.unit}</td>
                        <td className="py-2.5 text-slate-600 font-mono">{fd.doc_b_val}{fd.unit}</td>
                        <td className="py-2.5 text-right font-mono font-semibold">
                          <span className={`px-2 py-0.5 rounded-full ${
                            Math.abs(fd.diff) === 0 ? 'bg-slate-100 text-slate-600' :
                            fd.diff > 0 ? 'bg-indigo-50 text-indigo-700' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {fd.diff > 0 ? `+${fd.diff}` : `${fd.diff}`}{fd.unit}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

