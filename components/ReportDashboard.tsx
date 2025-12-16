import React from 'react';
import { BusinessReport } from '../types';
import { MetricCard } from './MetricCard';
import { BudgetBreakdownChart } from './BudgetBreakdownChart';
import { TRANSLATIONS } from '../translations';
import { 
  TrendingUp, 
  Wallet, 
  Target, 
  Lightbulb, 
  AlertTriangle, 
  ArrowRightCircle, 
  CheckCircle2
} from 'lucide-react';

interface Props {
  report: BusinessReport;
  languageCode: string;
}

export const ReportDashboard: React.FC<Props> = ({ report, languageCode }) => {
  // Get translation
  const t = TRANSLATIONS[languageCode] || TRANSLATIONS['en'];

  // Calculate a formatted budget range string
  const formattedBudget = `${report.currency}${report.budgetMin.toLocaleString()} - ${report.currency}${report.budgetMax.toLocaleString()}`;

  // Helper for success color
  const getSuccessColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-blue-600";
    if (rate >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getMarketComplexityText = (rate: number) => {
    return rate > 70 ? t.moderate : t.high;
  };

  const getRiskLevelText = (rate: number) => {
     return rate < 50 ? t.high : t.calculated;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">{report.ideaName}</h2>
        <p className="text-slate-500 mt-2">{t.reportSubtitle}</p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title={t.successPotential}
          value={`${report.successRate}%`}
          icon={TrendingUp}
          colorClass={getSuccessColor(report.successRate)}
          description={t.successDesc}
        />
        <MetricCard
          title={t.estBudget}
          value={formattedBudget}
          icon={Wallet}
          colorClass="text-indigo-600"
          description={t.estBudgetDesc}
        />
         <MetricCard
          title={t.marketComplexity}
          value={getMarketComplexityText(report.successRate)}
          icon={Target}
          colorClass="text-purple-600"
          description={t.complexityDesc}
        />
        <MetricCard
          title={t.riskLevel}
          value={getRiskLevelText(report.successRate)}
          icon={AlertTriangle}
          colorClass="text-orange-600"
          description={t.riskDesc}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Budget Breakdown Chart */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-indigo-500" />
            {t.budgetAlloc}
          </h3>
          <BudgetBreakdownChart data={report.budgetBreakdown} />
          <div className="mt-4 space-y-3">
            {report.budgetBreakdown.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-sm border-b border-slate-50 last:border-0 pb-2">
                <div>
                  <span className="font-medium text-slate-700">{item.category}</span>
                  <p className="text-slate-400 text-xs">{item.description}</p>
                </div>
                <span className="font-bold text-slate-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              {t.strategicAdvice}
            </h3>
            <ul className="space-y-4">
              {report.strategicAdvice.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-2 min-w-[6px] h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  </div>
                  <span className="text-slate-600 leading-relaxed py-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              {t.marketInsights}
            </h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {report.marketInsights}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Key Success Factors */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            {t.keyFactors}
          </h3>
          <ul className="space-y-3">
            {report.keySuccessFactors.map((factor, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 min-w-[20px] h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-700 text-xs font-bold">{idx + 1}</span>
                </div>
                <span className="text-slate-600">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ArrowRightCircle className="w-5 h-5 text-blue-500" />
            {t.nextSteps}
          </h3>
          <ul className="space-y-3">
            {report.nextSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 min-w-[20px] h-5 rounded-full bg-blue-100 flex items-center justify-center">
                   <ArrowRightCircle className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-slate-600">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
       {/* Risk Assessment */}
       <div className="mt-8 bg-orange-50 p-6 rounded-xl border border-orange-100">
          <h3 className="text-lg font-bold text-orange-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            {t.riskAssessment}
          </h3>
          <p className="text-orange-900/80 leading-relaxed">
            {report.riskAssessment}
          </p>
       </div>
    </div>
  );
};