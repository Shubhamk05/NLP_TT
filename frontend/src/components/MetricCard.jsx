import React from 'react';

export default function MetricCard({ title, value, unit = '', subtext, icon: Icon, badge, color = 'brand' }) {
  const colorMap = {
    brand: {
      bg: 'bg-brand-50 text-brand-600',
      border: 'border-slate-200/80 hover:border-brand-200',
    },
    blue: {
      bg: 'bg-blue-50 text-blue-600',
      border: 'border-slate-200/80 hover:border-blue-200',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600',
      border: 'border-slate-200/80 hover:border-emerald-200',
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600',
      border: 'border-slate-200/80 hover:border-purple-200',
    },
  };

  const scheme = colorMap[color] || colorMap.brand;

  return (
    <div className={`
      bg-white p-5 rounded-2xl border ${scheme.border} shadow-subtle hover:shadow-card 
      transition-all duration-200 relative overflow-hidden group
    `}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline space-x-1.5 mt-2">
            <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </span>
            {unit && <span className="text-xs font-semibold text-slate-500">{unit}</span>}
          </div>
          {subtext && (
            <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
              <span>{subtext}</span>
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${scheme.bg} transition-transform duration-200 group-hover:scale-105`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {badge && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400">{badge.label}</span>
          <span className="font-medium text-slate-700">{badge.value}</span>
        </div>
      )}
    </div>
  );
}

