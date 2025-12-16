import React, { useState } from 'react';
import { InputSection } from './components/InputSection';
import { ReportDashboard } from './components/ReportDashboard';
import { analyzeBusinessIdea } from './services/geminiService';
import { BusinessReport } from './types';
import { BarChart3, Github } from 'lucide-react';

const App: React.FC = () => {
  const [report, setReport] = useState<BusinessReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguageCode, setCurrentLanguageCode] = useState<string>('en');

  const handleAnalyze = async (idea: string, languageName: string, languageCode: string) => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    setCurrentLanguageCode(languageCode);
    
    try {
      const data = await analyzeBusinessIdea(idea, languageName);
      setReport(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to analyze idea. Please ensure your API key is configured correctly or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setReport(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={reset}
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Vision To Reality</span>
          </div>
          <div className="flex items-center gap-4">
             <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
               <Github className="w-5 h-5" />
             </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start pt-12 md:pt-20 pb-20">
        
        {error && (
          <div className="w-full max-w-2xl px-4 mb-8">
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
              {error}
            </div>
          </div>
        )}

        {!report ? (
          <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
        ) : (
          <ReportDashboard report={report} languageCode={currentLanguageCode} />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Vision To Reality. Powered by Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;