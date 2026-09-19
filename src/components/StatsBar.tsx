import React from 'react';
import { TrendingUp, Users, Award, BookOpenCheck } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      id: 'stat-courses',
      value: '১ হাজার +',
      label: 'অনলাইন কোর্স',
      englishLabel: '1,000+ Online Courses',
      icon: TrendingUp,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50/80 border-amber-100',
      glow: 'group-hover:border-amber-300'
    },
    {
      id: 'stat-teachers',
      value: '১৫০ +',
      label: 'বিশেষজ্ঞ শিক্ষক',
      englishLabel: '150+ Expert Mentors',
      icon: Users,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50/80 border-blue-100',
      glow: 'group-hover:border-blue-300'
    },
    {
      id: 'stat-students',
      value: '২০ লক্ষ +',
      label: 'সন্তুষ্ট শিক্ষার্থী',
      englishLabel: '2M+ Happy Students',
      icon: BookOpenCheck,
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50/80 border-indigo-100',
      glow: 'group-hover:border-indigo-300'
    },
    {
      id: 'stat-quizzes',
      value: '৫০০ +',
      label: 'কুইজ ও এক্সাম',
      englishLabel: '500+ Model Exams',
      icon: Award,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50/80 border-rose-100',
      glow: 'group-hover:border-rose-300'
    }
  ];

  return (
    <div className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-white/60 shadow-[0_15px_35px_rgba(30,41,59,0.06)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className={`group flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-100/90 shadow-sm hover:shadow-md transition-all duration-300 ${item.glow}`}
              >
                <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.bgColor} transition-transform group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <h4 className="text-lg sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif] tracking-tight">
                    {item.value}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 font-['Hind_Siliguri',sans-serif]">
                    {item.label}
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
