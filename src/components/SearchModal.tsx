import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, ArrowRight, Video, FileText, Sparkles } from 'lucide-react';
import { Course } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  courses,
  onSelectCourse
}) => {
  const [query, setQuery] = useState('');

  const filteredCourses = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return courses.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(q)) ||
      (c.badge && c.badge.toLowerCase().includes(q)) ||
      c.mentors.some(m => m.name.toLowerCase().includes(q))
    );
  }, [query, courses]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-start justify-center p-4 sm:pt-20">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-200"
      >
        {/* Search input header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="কোর্স, শিক্ষক, বা বিষয় লিখে খুঁজুন (যেমন: Target DU, সৈকত, Chemistry, HSC)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggested Keywords */}
        {!query && (
          <div className="p-5 space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">জনপ্রিয় সার্চসমূহ</p>
            <div className="flex flex-wrap gap-2">
              {['Target DU 6.0', 'DMMC 6.0 Medical', 'ইঞ্জিনিয়ারিং কেমিস্ট্রি', 'HSC 2026', 'বিভাগ পরিবর্তন', 'ফ্রি কোর্স'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search results */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {filteredCourses.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold">"{query}" সম্পর্কিত কোনো কোর্স পাওয়া যায়নি</p>
                <p className="text-xs text-slate-400 mt-1">অন্য কোনো কি-ওয়ার্ড দিয়ে সার্চ করুন</p>
              </div>
            ) : (
              filteredCourses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCourse(c);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 cursor-pointer transition-all"
                >
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-14 h-14 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700">
                        {c.category}
                      </span>
                      <span className="text-xs font-black text-rose-600">
                        {c.price === 0 ? 'ফ্রি' : `৳${c.price.toLocaleString()}`}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 truncate mt-1">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {c.subtitle || c.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
