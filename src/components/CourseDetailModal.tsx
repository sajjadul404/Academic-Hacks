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
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onAddToCart: (course: Course) => void;
  inCart: boolean;
  onEnrollNow: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onAddToCart,
  inCart,
  onEnrollNow
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'mentors'>('overview');
  const [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);

  if (!course) return null;

  const toggleSyllabus = (id: string) => {
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
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 sm:left-6 right-4 flex items-end justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-md text-xs font-black uppercase bg-indigo-600 text-white tracking-wider">
                {course.badge || course.category}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-1.5 font-['Outfit',sans-serif]">
                {course.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/80">
          {[
            { id: 'overview', label: 'কোর্স ওভারভিউ' },
            { id: 'syllabus', label: 'সিলেবাস ও লেকচার প্ল্যান' },
            { id: 'mentors', label: 'মেন্টর পরিচিতি' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-indigo-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Highlight Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3">
                  <Video className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-xs text-slate-500">মোট ক্লাস</p>
                    <p className="text-sm font-bold text-slate-900">{course.classCount}+ টি লাইভ</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-slate-500">মডেল এক্সাম</p>
                    <p className="text-sm font-bold text-slate-900">{course.examCount}+ টি এক্সাম</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <div>
                    <p className="text-xs text-slate-500">কোর্স রেটিং</p>
                    <p className="text-sm font-bold text-slate-900">{course.rating} / 5.0</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-slate-500">এনরোল্ড শিক্ষার্থী</p>
                    <p className="text-sm font-bold text-slate-900">{course.enrolledStudents.toLocaleString()}+</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">কোর্সটির মূল উদ্দেশ্য ও বিবরণ</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                  {course.description}
                </p>
              </div>

              {/* Features Checklist */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">কোর্সে যা যা পাচ্ছেন:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-700">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Syllabus */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">সম্পূর্ণ সিলেবাস ও লেকচার ডিস্ট্রিবিউশন</h3>
              {course.syllabus && course.syllabus.length > 0 ? (
                <div className="space-y-3">
                  {course.syllabus.map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                    >
                      <button
                        onClick={() => toggleSyllabus(item.id)}
                        className="w-full p-4 text-left flex items-center justify-between bg-slate-50/60 hover:bg-slate-100/60 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                            <p className="text-xs text-slate-500">{item.lecturesCount} Lectures • {item.duration}</p>
                          </div>
                        </div>

                        {expandedSyllabus === item.id ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </button>

                      {expandedSyllabus === item.id && (
                        <div className="p-4 bg-white border-t border-slate-100 space-y-2">
                          <p className="text-xs font-semibold text-slate-500 mb-2">কভার করা হবে এমন বিষয়সমূহ:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.topics.map((t, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span>{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 py-6 text-center">
                  এই কোর্সের প্রতিটি চ্যাপ্টারের বিস্তারিত লেকচার শিডিউল ক্লাসে শেয়ার করা হবে।
                </p>
              )}
            </div>
          )}

          {/* Tab 3: Mentors */}
          {activeTab === 'mentors' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">আপনার অভিজ্ঞ শিক্ষকবৃন্দ</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.mentors.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center gap-4">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{m.name}</h4>
                      <p className="text-xs text-indigo-600 font-semibold">{m.title}</p>
                      <p className="text-[11px] text-slate-500 mt-1">৫+ বছরের অভিজ্ঞ ও মেন্টরশিপ রেকর্ড</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Checkout Actions */}
        <div className="p-5 border-t border-slate-200 bg-slate-50/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 font-medium">কোর্স ফি:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-rose-600 font-['Outfit',sans-serif]">
                {course.price === 0 ? 'সম্পূর্ণ ফ্রি' : `৳${course.price.toLocaleString()}`}
              </span>
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="text-sm text-slate-400 line-through">
                  ৳{course.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onAddToCart(course)}
              className={`flex-1 sm:flex-none px-5 py-3 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                inCart
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-indigo-600 hover:text-indigo-600'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{inCart ? 'কার্টে যুক্ত আছে' : 'কার্টে যোগ করুন'}</span>
            </button>

            <button
              onClick={() => {
                onEnrollNow(course);
                onClose();
              }}
              className="flex-1 sm:flex-none px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-md shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>এখনই ভর্তি হন</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
