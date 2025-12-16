export interface BudgetBreakdownItem {
  category: string;
  percentage: number;
  description: string;
}

export interface BusinessReport {
  ideaName: string;
  successRate: number; // 0 to 100
  budgetMin: number;
  budgetMax: number;
  currency: string;
  budgetBreakdown: BudgetBreakdownItem[];
  keySuccessFactors: string[];
  strategicAdvice: string[];
  marketInsights: string;
  nextSteps: string[];
  riskAssessment: string;
  language: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}