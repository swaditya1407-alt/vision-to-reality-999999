import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  colorClass?: string;
  description?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subValue, 
  icon: Icon, 
  colorClass = "text-blue-600",
  description 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-start space-x-4 transition-all hover:shadow-md">
      <div className={`p-3 rounded-lg bg-opacity-10 ${colorClass.replace('text-', 'bg-')}`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      <div>
        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">{title}</h3>
        <div className="mt-1 flex items-baseline">
          <span className="text-2xl font-bold text-slate-900">{value}</span>
          {subValue && <span className="ml-2 text-sm text-slate-500">{subValue}</span>}
        </div>
        {description && <p className="mt-2 text-sm text-slate-400">{description}</p>}
      </div>
    </div>
  );
};
