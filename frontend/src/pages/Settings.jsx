import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Activity, 
  Server, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { checkHealth } from '../services/api';

export default function Settings({ onClearHistory }) {
  const [health, setHealth] = useState(null);
  const [checking, setChecking] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const checkApi = async () => {
    setChecking(true);
    setStatusMsg('');
    try {
      const res = await checkHealth();
      setHealth(res);
      setStatusMsg('API operational and healthy.');
    } catch (err) {
      setHealth({ status: 'unreachable', error: err.message });
      setStatusMsg('API unreachable. Please ensure the backend is running.');
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkApi();
  }, []);

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Settings & Diagnostics</h2>
        <p className="text-xs text-slate-500 mt-1">Verify backend connectivity, NLP pipelines, and session caches</p>

        {/* Backend health section */}
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Backend API Connectivity</h3>
                <p className="text-xs text-slate-500">FastAPI backend at http://127.0.0.1:8000 (proxied via /api)</p>
              </div>
            </div>

            <button
              onClick={checkApi}
              disabled={checking}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
              <span>Ping Health</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            {health?.status === 'healthy' ? (
              <div className="flex items-center space-x-2 text-emerald-700 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Backend Healthy: {health.service} (v{health.version})</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-amber-700 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>Status: {health?.status || 'Testing connection...'}</span>
              </div>
            )}
            {health?.features && (
              <div className="mt-2 text-[11px] text-slate-500">
                Active capabilities: {health.features.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Local session reset */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Reset Session History</h3>
            <p className="text-xs text-slate-500">Clears analyzed documents and comparison records from memory</p>
          </div>

          <button
            onClick={() => {
              if (onClearHistory) onClearHistory();
              setStatusMsg('Session history reset.');
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>

        {statusMsg && (
          <div className="mt-4 p-3 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium">
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
}

