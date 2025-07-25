import React, { useState, useCallback } from 'react';
import { ResumeData, HistoricalResume } from './types';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import HistoryViewer from './components/HistoryViewer';

enum Tab {
  Analyzer,
  History,
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Analyzer);
  const [history, setHistory] = useState<HistoricalResume[]>([]);

  const handleAnalysisComplete = useCallback((analysis: ResumeData, fileName: string) => {
    const newEntry: HistoricalResume = {
      id: new Date().toISOString(),
      fileName: fileName,
      uploadedAt: new Date().toLocaleString(),
      analysis: analysis,
    };
    setHistory(prevHistory => [newEntry, ...prevHistory]);
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case Tab.Analyzer:
        return <ResumeAnalyzer onAnalysisComplete={handleAnalysisComplete} />;
      case Tab.History:
        return <HistoryViewer history={history} />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{
    tabId: Tab;
    label: string;
    icon: React.ReactNode;
  }> = ({ tabId, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
        activeTab === tabId
          ? 'bg-indigo-600 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Resume Analyzer
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Upload a PDF to get instant feedback and structured data.
          </p>
        </header>

        <nav className="flex justify-center mb-8 bg-gray-800/50 p-2 rounded-lg max-w-md mx-auto">
          <TabButton
            tabId={Tab.Analyzer}
            label="Analyze Resume"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
            }
          />
          <TabButton
            tabId={Tab.History}
            label="History"
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
            }
          />
        </nav>

        <main>{renderActiveTab()}</main>
      </div>
    </div>
  );
};

export default App;