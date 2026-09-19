import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Video, 
  Star, 
  Users, 
  CheckCircle, 
  ShoppingCart, 
  Play, 
  Award, 
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const CourseDetailModal = ({
  course = null,
  onClose,
  onAddToCart,
  inCart = false,
  onEnrollNow
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSyllabus, setExpandedSyllabus] = useState(null);

  if (!course) return null;

  const toggleSyllabus = (id) => {
    setExpandedSyllabus(prev => (prev === id ? null : id));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-4xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header Hero Banner */}
        <div className="relative aspect-[21/9] sm:aspect-[24/8] bg-slate-950 overflow-hidden flex-shrink-0">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="text-white">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/80 text-white">
                {course.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1 font-['Outfit',sans-serif]">
                {course.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-1 mt-0.5">
                {course.subtitle || course.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="text-2xl font-black text-rose-400 font-['Outfit',sans-serif]">
                  {course.price === 0 ? 'ফ্রি' : `৳${course.price.toLocaleString()}`}
                </span>
                {course.originalPrice && (
                  <p className="text-xs text-slate-400 line-through">
                    ৳{course.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/70">
          {[
            { id: 'overview', label: 'কোর্স ওভারভিউ' },
            { id: 'syllabus', label: 'সিলেবাস ও লেকচার' },
            { id: 'mentors', label: 'শিক্ষক পরিচিতি' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* 1. Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">কোর্স সম্পর্কে বিস্তারিত:</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {course.description}
                </p>
              </div>

              {/* Course Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3">
                  <Video className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{course.classCount}+ লাইভ ক্লাস</span>
                    <span className="text-[10px] text-slate-500">HD রেকর্ডিং সহ</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{course.examCount}+ মডেল টেস্ট</span>
                    <span className="text-[10px] text-slate-500">নেগেটিভ মার্কিং সহ</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{course.rating} রেটিং</span>
                    <span className="text-[10px] text-slate-500">স্টুডেন্ট রিভিউ</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{course.enrolledStudents.toLocaleString()}+</span>
                    <span className="text-[10px] text-slate-500">শিক্ষার্থী যুক্ত</span>
                  </div>
                </div>
              </div>

              {/* What You'll Learn features */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">এই কোর্সে আপনি যা যা পাচ্ছেন:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Syllabus Tab */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">অধ্যায়ভিত্তিক সিলেবাস মডিউল</h4>
                <span className="text-xs text-indigo-600 font-semibold">
                  {course.syllabus ? course.syllabus.length : 0} টি মডিউল
                </span>
              </div>

              {course.syllabus && course.syllabus.length > 0 ? (
                <div className="space-y-2.5">
                  {course.syllabus.map((s) => {
                    const isExpanded = expandedSyllabus === s.id;
                    return (
                      <div 
                        key={s.id} 
                        className="border border-slate-200 rounded-2xl overflow-hidden transition-colors bg-white"
                      >
                        <button
                          onClick={() => toggleSyllabus(s.id)}
                          className="w-full p-4 text-left flex items-center justify-between bg-slate-50/60 hover:bg-slate-100/60 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                              {s.id.slice(-2)}
                            </div>
                            <div>
                              <span className="text-xs sm:text-sm font-bold text-slate-900 block">{s.title}</span>
                              <span className="text-[11px] text-slate-500">{s.lecturesCount} লেকচার • {s.duration}</span>
                            </div>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </button>

                        {isExpanded && (
                          <div className="p-4 bg-white border-t border-slate-100 space-y-2">
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">টপিকসমূহ:</p>
                            <ul className="space-y-1.5 text-xs text-slate-600">
                              {s.topics.map((t, tidx) => (
                                <li key={tidx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400">
                  সিলেবাস বিস্তারিত শীগ্রই প্রকাশ করা হবে।
                </div>
              )}
            </div>
          )}

          {/* 3. Mentors Tab */}
          {activeTab === 'mentors' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 mb-2">কোর্স ইন্সট্রাক্টর ও মেন্টর দল</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.mentors.map((mentor, mIdx) => (
                  <div 
                    key={mIdx}
                    className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center gap-3.5 hover:border-indigo-200 transition-colors"
                  >
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-slate-200"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">{mentor.name}</h5>
                      <p className="text-xs font-semibold text-indigo-600">{mentor.title}</p>
                      {mentor.institution && (
                        <p className="text-[11px] text-slate-500">{mentor.institution}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">কোর্স ফি</span>
            <span className="text-xl font-black text-rose-600 font-['Outfit',sans-serif]">
              {course.price === 0 ? 'সম্পূর্ণ ফ্রি' : `৳${course.price.toLocaleString()}`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onAddToCart(course)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                inCart
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{inCart ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}</span>
            </button>

            <button
              onClick={() => onEnrollNow(course)}
              className="px-6 py-2.5 rounded-2xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
            >
              এখনই ভর্তি হোন
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
