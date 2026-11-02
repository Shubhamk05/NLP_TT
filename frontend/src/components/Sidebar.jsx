import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  GitCompare, 
  Fingerprint, 
  Users, 
  Database, 
  HelpCircle, 
  Settings as SettingsIcon,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analyze', label: 'Analyze Document', icon: FileText },
    { id: 'compare', label: 'Compare Writing', icon: GitCompare },
    { id: 'profile', label: 'Writing Profile', icon: Fingerprint },
    { id: 'author-analysis', label: 'Author Analysis', icon: Users, badge: 'Active' },
    { id: 'dataset-model', label: 'Accuracy & Model', icon: Database, badge: 'Report' },
    { id: 'about', label: 'About Project', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/80 
        flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-electric-500 flex items-center justify-center shadow-md shadow-brand-500/20 text-white">
              <Fingerprint className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-slate-900 tracking-tight text-base">Writing Fingerprint</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">Stylometric NLP Engine</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Workspace
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 group
                  ${isActive 
                    ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-200/60 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${
                    isActive 
                      ? 'bg-brand-100/80 text-brand-700 border-brand-300' 
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                ) : (
                  isActive && <ChevronRight className="w-4 h-4 text-brand-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Phase 1 Badge Callout */}
        <div className="p-4 mx-4 mb-4 rounded-xl bg-gradient-to-br from-brand-50 to-slate-50 border border-brand-100/80 text-xs">
          <div className="flex items-center space-x-2 text-brand-800 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Phase 1 Active</span>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Rule-based stylometry, POS distribution, and TF-IDF similarity running live.
          </p>
        </div>

        {/* User / Environment footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
              AG
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-800">Stylometry Lab</p>
              <p className="text-[11px] text-emerald-600 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                <span>FastAPI + spaCy</span>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

