import React from 'react';
import { TrendingUp, Users, Award, BookOpenCheck } from 'lucide-react';
import { DEFAULT_STATS } from '../lib/dataStore';

const iconMap = {
  TrendingUp,
  Users,
  BookOpenCheck,
  Award
};

export const StatsBar = ({ stats = DEFAULT_STATS }) => {
  return (
    <div className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-white/60 shadow-[0_15px_35px_rgba(30,41,59,0.06)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((item) => {
            const Icon = (item.iconName && iconMap[item.iconName]) || item.icon || TrendingUp;
            return (
              <div
                key={item.id}
                id={item.id}
                className={`group flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-100/90 shadow-sm hover:shadow-md transition-all duration-300 ${item.glow || ''}`}
              >
                <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.bgColor || 'bg-indigo-50 border-indigo-100'} transition-transform group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.iconColor || 'text-indigo-600'}`} />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif] group-hover:text-indigo-600 transition-colors">
                    {item.value}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    {item.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium hidden sm:block">
                    {item.englishLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
