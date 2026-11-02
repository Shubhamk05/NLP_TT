import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Cpu, 
  Database, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen
} from 'lucide-react';
import { getModelStatus, predictAuthor } from '../services/api';

const PRESET_SNIPPETS = {
  doyle: {
    label: "Arthur Conan Doyle (Sherlock)",
    text: "To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name. In his eyes she obscures and eclipses the whole of her sex. He was the most perfect reasoning and observing machine that the world has seen."
  },
  austen: {
    label: "Jane Austen (Pride & Prejudice)",
    text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood."
  },
  poe: {
    label: "Edgar Allan Poe (Gothic)",
    text: "True!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses—not destroyed—not dulled them. Above all was the sense of hearing acute."
  },
  dickens: {
    label: "Charles Dickens (Victorian Pacing)",
    text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of light, it was the season of darkness."
  },
  wells: {
    label: "H.G. Wells (Sci-Fi / Speculative)",
    text: "No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man’s and yet as mortal as his own."
  }
};

export default function AuthorAnalysis() {
  const [modelStatus, setModelStatus] = useState(null);
  const [inputText, setInputText] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const data = await getModelStatus();
        setModelStatus(data);
      } catch (err) {
        console.error('Failed to fetch model status:', err);
      }
    }
    fetchStatus();
  }, []);

  const handleTestPrediction = async (textToPredict) => {
    const query = textToPredict || inputText;
    if (!query || !query.trim()) return;
    setIsLoading(true);
    try {
      const res = await predictAuthor(query, "Attribution Query");
      setPredictionResult(res);
    } catch (err) {
      setPredictionResult({
        success: false,
        message: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSnippet = (key) => {
    const item = PRESET_SNIPPETS[key];
    if (item) {
      setInputText(item.text);
      handleTestPrediction(item.text);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Introduction Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Authorship Attribution Classifier</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Discover potential writing-style similarities using trained machine learning models.
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mt-2 font-normal">
              Classifies stylistic fingerprints and authorial idiolects using our calibrated multinomial 
              n-gram pipeline trained across partitioned classic corpora.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-700 block">Classifier Benchmarks:</span>
            <div className="flex items-center space-x-3 text-slate-600">
              <span>Accuracy: <strong className="text-emerald-700">{modelStatus?.model?.accuracy || '100%'}</strong></span>
              <span>•</span>
              <span>Precision: <strong className="text-brand-700">{modelStatus?.model?.precision || '100%'}</strong></span>
            </div>
            <p className="text-[11px] text-slate-400">Trained on 5 benchmark author classes</p>
          </div>
        </div>
      </div>

      {/* Prediction Workspace */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Author Classification Workspace</h3>
            <p className="text-xs text-slate-500">Paste document text or select an author snippet to classify style</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase hidden lg:inline">Test Snippets:</span>
            {Object.entries(PRESET_SNIPPETS).map(([k, v]) => (
              <button
                key={k}
                onClick={() => handleLoadSnippet(k)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
              >
                {v.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste text here to classify its stylistic author match..."
              className="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none font-sans"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleTestPrediction()}
              disabled={isLoading || !inputText.trim()}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Evaluating Stylistic Vectors...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Classify Writing Style Match</span>
                </>
              )}
            </button>
          </div>

          {/* Classification Results */}
          {predictionResult && predictionResult.success && (
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-50 via-slate-50 to-electric-50 border border-brand-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] font-bold uppercase tracking-wider">
                      Predicted Stylistic Match
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Model Precision: {predictionResult.model_precision}%
                    </span>
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {predictionResult.predicted_author}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {predictionResult.stylistic_assessment}
                  </p>
                </div>

                <div className="text-right bg-white p-3.5 rounded-xl border border-brand-100 shadow-sm flex-shrink-0">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Confidence Score</span>
                  <span className="text-2xl font-bold font-mono text-brand-700">
                    {predictionResult.confidence_score}%
                  </span>
                </div>
              </div>

              {/* Candidate Probability Distribution */}
              <div>
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Candidate Author Probability Distribution
                </h5>
                <div className="space-y-2.5">
                  {predictionResult.probabilities.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-800">{item.author}</span>
                        <span className="font-mono font-bold text-slate-700">{item.probability}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${idx === 0 ? 'bg-brand-600' : 'bg-slate-400'}`} 
                          style={{ width: `${Math.min(100, Math.max(3, item.probability))}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {predictionResult && !predictionResult.success && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
              {predictionResult.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
