import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import AnalyzeDocument from './pages/AnalyzeDocument';
import CompareWriting from './pages/CompareWriting';
import WritingProfile from './pages/WritingProfile';
import AuthorAnalysis from './pages/AuthorAnalysis';
import DatasetModel from './pages/DatasetModel';
import AboutProject from './pages/AboutProject';
import Settings from './pages/Settings';
import { checkHealth } from './services/api';
import { SAMPLE_TEXTS } from './utils/sampleTexts';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBackendHealthy, setIsBackendHealthy] = useState(false);

  // Application session data
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [comparisonsCompleted, setComparisonsCompleted] = useState(0);

  // Pre-filled comparison docs when navigating from analyze
  const [compareDocA, setCompareDocA] = useState(null);
  const [compareDocB, setCompareDocB] = useState(null);

  // Poll / check backend health initially
  useEffect(() => {
    let isMounted = true;
    async function verify() {
      try {
        const res = await checkHealth();
        if (isMounted) setIsBackendHealthy(res.status === 'healthy');
      } catch {
        if (isMounted) setIsBackendHealthy(false);
      }
    }
    verify();
    const interval = setInterval(verify, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Handler when a document is analyzed
  const handleAnalysisComplete = (newAnalysis) => {
    setCurrentAnalysis(newAnalysis);
    setRecentAnalyses((prev) => {
      const filtered = prev.filter((d) => d.document_name !== newAnalysis.document_name);
      return [newAnalysis, ...filtered].slice(0, 8);
    });
  };

  const handleComparisonComplete = () => {
    setComparisonsCompleted((prev) => prev + 1);
  };

  const handleNavigateToCompare = (doc) => {
    setCompareDocA(doc);
    setActiveTab('compare');
  };

  const handleSelectRecent = (doc) => {
    setCurrentAnalysis(doc);
    setActiveTab('profile');
  };

  const handleLoadSampleInProfile = (sampleKey) => {
    const s = SAMPLE_TEXTS[sampleKey];
    if (s) {
      setActiveTab('analyze');
    }
  };

  const handleClearHistory = () => {
    setRecentAnalyses([]);
    setCurrentAnalysis(null);
    setComparisonsCompleted(0);
  };

  // Compute live session stats
  const documentsAnalyzed = recentAnalyses.length;
  const avgSentenceLength = documentsAnalyzed > 0
    ? recentAnalyses.reduce((acc, d) => acc + d.overview.avg_sentence_length, 0) / documentsAnalyzed
    : 0;
  const avgVocabDiversity = documentsAnalyzed > 0
    ? recentAnalyses.reduce((acc, d) => acc + d.vocabulary.vocabulary_diversity, 0) / documentsAnalyzed
    : 0;

  const stats = {
    documentsAnalyzed,
    avgSentenceLength,
    avgVocabDiversity,
    comparisonsCompleted,
  };

  return (
    <div className="min-h-screen bg-[#fafbfe] flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        <Header 
          activeTab={activeTab} 
          setIsOpen={setIsSidebarOpen} 
          isBackendHealthy={isBackendHealthy} 
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <Overview 
              onNavigate={(tab) => setActiveTab(tab)} 
              stats={stats} 
              recentAnalyses={recentAnalyses}
              onSelectRecent={handleSelectRecent}
            />
          )}

          {activeTab === 'analyze' && (
            <AnalyzeDocument 
              onAnalysisComplete={handleAnalysisComplete}
              currentAnalysis={currentAnalysis}
              setCurrentAnalysis={setCurrentAnalysis}
              onNavigateToCompare={handleNavigateToCompare}
            />
          )}

          {activeTab === 'compare' && (
            <CompareWriting 
              onComparisonComplete={handleComparisonComplete}
              initialDocA={compareDocA}
              initialDocB={compareDocB}
            />
          )}

          {activeTab === 'profile' && (
            <WritingProfile 
              currentAnalysis={currentAnalysis}
              onNavigateToAnalyze={() => setActiveTab('analyze')}
              onLoadSample={handleLoadSampleInProfile}
            />
          )}

          {activeTab === 'author-analysis' && (
            <AuthorAnalysis />
          )}

          {activeTab === 'dataset-model' && (
            <DatasetModel />
          )}

          {activeTab === 'about' && (
            <AboutProject />
          )}

          {activeTab === 'settings' && (
            <Settings onClearHistory={handleClearHistory} />
          )}
        </main>
      </div>
    </div>
  );
}

