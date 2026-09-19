import React from 'react';
import { X, Sparkles, Zap, ArrowRight, Star } from 'lucide-react';

export const SpotlightDetailModal = ({
  item = null,
  onClose,
  onExploreCourses
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image showcase */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          {/* Top Code Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-lg text-sm font-black bg-black/60 border border-cyan-400/40 text-cyan-300 backdrop-blur-md">
              CODE: {item.code}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/80 text-white uppercase tracking-wider">
              {item.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Outfit',sans-serif]">
              {item.name} Spotlight Edition
            </h2>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-4">
          <p className="text-base font-semibold text-slate-200">
            {item.title}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {item.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-xs font-bold text-slate-200">৪.৯৮ রেটিং</span>
              </div>
              <p className="text-[11px] text-slate-400">টপ ২০ মেরিট নিশ্চিতকরণ মেথডোলজি</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <div className="flex items-center gap-1 text-cyan-400 mb-1">
                <Zap className="w-4 h-4 fill-cyan-400" />
                <span className="text-xs font-bold text-slate-200">স্মার্ট নোটস</span>
              </div>
              <p className="text-[11px] text-slate-400">প্রিন্টেড হ্যান্ডবুক ও প্রশ্নব্যাংক</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Academic Hacks Spotlight 2026
          </span>
          <button
            onClick={() => {
              onClose();
              onExploreCourses();
            }}
            className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center gap-1.5"
          >
            <span>কোর্স ব্যাচে ভর্তি হন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
