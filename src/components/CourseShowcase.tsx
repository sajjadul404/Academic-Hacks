import React, { useState } from 'react';
import { 
  FileText, 
  Video, 
  Star, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  Check, 
  Eye, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Course } from '../types';

interface CourseShowcaseProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onAddToCart: (course: Course) => void;
  cartCourseIds: string[];
}

export const CourseShowcase: React.FC<CourseShowcaseProps> = ({
  courses,
  onSelectCourse,
  onAddToCart,
  cartCourseIds
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(0);

  const categories = [
    { id: 'All', label: 'সকল কোর্স' },
    { id: 'Admission', label: 'Admission (HSC-26)' },
    { id: 'Engineering', label: 'ইঞ্জিনিয়ারিং' },
    { id: 'Medical', label: 'মেডিকেল (DMC)' },
    { id: 'Arts & Commerce', label: 'মানবিক ও বিভাগ পরিবর্তন' },
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
        
        {/* Section Top Header matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-100 tracking-wide">
              জনপ্রিয় কোর্স সমূহ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Admission Course (HSC-26)
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setFilterCategory('All')}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
            >
              View All
            </button>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                aria-label="Previous courses"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={(currentPage + 1) * 4 >= filteredCourses.length}
                aria-label="Next courses"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilterCategory(cat.id);
                setCurrentPage(0);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses 4-Column Grid matching the 4 admission cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredCourses.map((course) => {
            const inCart = cartCourseIds.includes(course.id);
            return (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 relative"
              >
                {/* Thumbnail Header */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => onSelectCourse(course)}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badge Top Left */}
                  {course.badge && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600/90 text-white backdrop-blur-sm shadow">
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

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onAddToCart(course)}
                        title={inCart ? 'Already in cart' : 'Add to cart'}
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          inCart
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200'
                        }`}
                      >
                        {inCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => onSelectCourse(course)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>এনরোল</span>
                        <ArrowUpRight className="w-3 h-3" />
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
