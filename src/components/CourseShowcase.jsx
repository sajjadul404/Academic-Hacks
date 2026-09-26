import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Video, 
  Star, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const CourseShowcase = ({
  courses = [],
  onSelectCourse,
  onAddToCart,
  cartCourseIds = [],
  selectedCategory = 'All'
}) => {
  const [filterCategory, setFilterCategory] = useState(selectedCategory || 'All');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (selectedCategory) {
      setFilterCategory(selectedCategory);
      setCurrentPage(0);
    }
  }, [selectedCategory]);

  const categories = [
    { id: 'All', label: 'সকল কোর্স' },
    { id: 'Admission', label: 'Admission (HSC-26)' },
    { id: 'Exam', label: 'মডেল টেস্ট ও এক্সাম' },
    { id: 'Engineering', label: 'ইঞ্জিনিয়ারিং' },
    { id: 'Medical', label: 'মেডিকেল (DMC)' },
    { id: 'HSC', label: 'HSC একাডেমিক' },
    { id: 'Free Course', label: 'ফ্রি কোর্স' }
  ];

  const filteredCourses = courses.filter((c) => {
    if (filterCategory === 'All') return true;
    return c.category === filterCategory;
  });

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <section id="admission" className="py-16 lg:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>জনপ্রিয় লাইভ কোর্সসমূহ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight">
              আমাদের স্পেশাল লাইভ ব্যাচ
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              সেরা শিক্ষকদের সাথে লাইভ ক্লাসে অংশ নিয়ে প্রস্তুতিকে এগিয়ে রাখো
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilterCategory(cat.id);
                setCurrentPage(0);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            const inCart = cartCourseIds.includes(course.id);
            return (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Card Thumbnail Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/95 text-indigo-700 shadow-sm backdrop-blur-sm">
                      {course.category}
                    </span>
                  </div>

                  {/* Badge */}
                  {course.badge && (
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-600 text-white shadow-sm">
                        {course.badge}
                      </span>
                    </div>
                  )}

                  {/* Batch Year Top Right */}
                  {course.batchYear && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-indigo-300 border border-indigo-400/30 backdrop-blur-sm">
                        {course.batchYear}
                      </span>
                    </div>
                  )}

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCourse(course);
                      }}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 text-slate-900 shadow-lg hover:bg-white flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Course Title */}
                    <h3 
                      onClick={() => onSelectCourse(course)}
                      className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 cursor-pointer font-['Hind_Siliguri',sans-serif]"
                      title={course.title}
                    >
                      {course.title}
                    </h3>

                    {/* Subtitle / Description snippet */}
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                      {course.subtitle || course.description}
                    </p>

                    {/* Meta info: Exams + Classes */}
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Exam {course.examCount}+</span>
                      </div>
                      <span className="text-slate-300">|</span>
                      <div className="flex items-center gap-1">
                        <Video className="w-3.5 h-3.5 text-blue-500" />
                        <span>Class {course.classCount}+</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-rose-600 font-['Outfit',sans-serif]">
                          {course.price === 0 ? 'ফ্রি' : `৳${course.price.toLocaleString()}`}
                        </span>
                        {course.originalPrice && course.originalPrice > course.price && (
                          <span className="text-xs text-slate-400 line-through">
                            ৳{course.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all cursor-pointer flex items-center gap-1 active:scale-[0.98]"
                      >
                        <span>এনরোল</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
