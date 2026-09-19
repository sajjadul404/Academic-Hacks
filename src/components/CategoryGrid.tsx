import React from 'react';
import { 
  School, 
  GraduationCap, 
  BookOpen, 
  HeartPulse, 
  Palette, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { CategoryItem } from '../types';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string, name: string) => void;
  selectedCategory: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  selectedCategory
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'School':
        return <School className="w-7 h-7" />;
      case 'GraduationCap':
        return <GraduationCap className="w-7 h-7" />;
      case 'BookOpen':
        return <BookOpen className="w-7 h-7" />;
      case 'HeartPulse':
        return <HeartPulse className="w-7 h-7" />;
      case 'Palette':
        return <Palette className="w-7 h-7" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7" />;
      default:
        return <BookOpen className="w-7 h-7" />;
    }
  };

  return (
    <section id="courses" className="py-16 lg:py-24 bg-[#F4F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide mb-3">
            <span>আমাদের কোর্স সমূহ</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight">
            ক্লাস অনুযায়ী কোর্স দেখুন
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            বৃত্তি, পারদর্শিতা, চাকরির প্রস্তুতি, স্কুল-কলেজ একাডেমিক পড়াশোনা, HSC, SSC, JSC, Job Exam, Spoken English, ইত্যাদি সহ ১০০০+ কোর্সের উপর ক্লাস করুন।
          </p>
        </div>

        {/* Categories Grid (2 rows of 3 columns matching screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.id, cat.name)}
                className={`group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-white border cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-lg -translate-y-1' 
                    : 'border-slate-200/80 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Category Icon Badge */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-tr ${cat.gradient} text-white shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform`}>
                    {getIcon(cat.icon)}
                  </div>

                  {/* Title & Count */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif] group-hover:text-indigo-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {cat.bengaliName}
                    </p>
                    <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${cat.badgeColor}`}>
                      {cat.count}+ টি লাইভ কোর্স
                    </span>
                  </div>
                </div>

                {/* Arrow CTA */}
                <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-indigo-600 flex items-center justify-center text-slate-400 group-hover:text-white transition-all shadow-sm flex-shrink-0">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
