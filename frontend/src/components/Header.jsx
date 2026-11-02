import React from 'react';
import { Menu, Activity, ShieldCheck, Cpu } from 'lucide-react';

export default function Header({ activeTab, setIsOpen, isBackendHealthy }) {
  const titles = {
    'overview': { title: 'Overview Dashboard', subtitle: 'Explore linguistic patterns and author stylometric metrics' },
    'analyze': { title: 'Analyze Document', subtitle: 'Extract syntactic, lexical, and stylistic fingerprints from text' },
    'compare': { title: 'Compare Writing', subtitle: 'Multi-dimensional similarity and stylistic difference matrix' },
    'profile': { title: 'Writing Profile', subtitle: 'Comprehensive stylistic fingerprint card and report export' },
    'author-analysis': { title: 'Author Attribution & Analysis', subtitle: 'Predictive authorship classification and candidate style match' },
    'dataset-model': { title: 'Precision, Accuracy & Model Report', subtitle: 'Comprehensive classification metrics, precision, recall, and confusion matrix' },
    'about': { title: 'About the Project', subtitle: 'Stylometry science, methodology, ethical boundaries & NLP architecture' },
    'settings': { title: 'Settings & Diagnostics', subtitle: 'API connectivity, analysis parameters, and local data' },
  };

  const current = titles[activeTab] || { title: 'Dashboard', subtitle: '' };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{current.title}</h1>
          <p className="text-xs text-slate-500 hidden sm:block">{current.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Backend connectivity indicator */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
          <span className={`w-2 h-2 rounded-full ${isBackendHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className="font-medium hidden sm:inline">
            {isBackendHealthy ? 'API Connected' : 'Connecting to API...'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden md:inline">v1.0.0</span>
        </div>

        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5 text-purple-600" />
          <span>spaCy en_core_web_sm</span>
        </div>
      </div>
    </header>
  );
}

