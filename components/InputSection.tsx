import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { TRANSLATIONS } from '../translations';
import { Rocket, Loader2 } from 'lucide-react';

interface Props {
  onAnalyze: (idea: string, languageName: string, languageCode: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<Props> = ({ onAnalyze, isLoading }) => {
  const [idea, setIdea] = useState('');
  const [languageCode, setLanguageCode] = useState('en');

  // Get current translation based on selected language
  const t = TRANSLATIONS[languageCode] || TRANSLATIONS['en'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      // Find the language object to get the full name for the AI prompt
      const selectedLang = SUPPORTED_LANGUAGES.find(l => l.code === languageCode);
      const languageName = selectedLang ? selectedLang.name : 'English';
      
      onAnalyze(idea, languageName, languageCode);
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
        {t.mainTitle} <span className="text-blue-600">{t.mainTitleHighlight}</span>.
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
        {t.subtitle}
      </p>

      <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            className="w-full p-4 text-lg bg-transparent border-none focus:ring-0 resize-none min-h-[120px] text-slate-800 placeholder:text-slate-400"
            placeholder={t.placeholder}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={isLoading}
          />
          
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-slate-50 rounded-xl items-center">
            <div className="flex-1 w-full sm:w-auto text-left pl-2">
              <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                {t.outputLanguage}
              </label>
              <select
                value={languageCode}
                onChange={(e) => setLanguageCode(e.target.value)}
                className="w-full bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
                disabled={isLoading}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !idea.trim()}
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all ${
                isLoading || !idea.trim()
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.analyzingButton}
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  {t.generateButton}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};