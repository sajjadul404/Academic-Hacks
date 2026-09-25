import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Calendar, 
  Users, 
  CheckSquare, 
  Tag, 
  ShoppingCart,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CourseLandingPage = ({
  course,
  onBack,
  onAddToCart,
  inCart = false,
  onEnrollNow
}) => {
  // Default open subjects: Biology and ICT (matching screenshot)
  const [openSubjects, setOpenSubjects] = useState({
    Biology: true,
    ICT: true,
    Bangla: false,
    Chemistry: false,
    English: false,
    Math: false,
    Physics: false
  });

  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPromoApplied(false);
    setPromoDiscount(0);
    setPromoCode('');
    setPromoError('');
  }, [course?.id]);

  if (!course) return null;

  const toggleSubject = (subject) => {
    setOpenSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject]
    }));
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'HACKS26' || code === 'FREE26' || code === 'TARGET100' || code === 'SPECIAL') {
      setPromoApplied(true);
      setPromoDiscount(0.15); // 15% discount
      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    } else {
      setPromoError('কুপন কোডটি সঠিক নয়! HACKS26 ট্রাই করুন।');
    }
  };

  const basePrice = course.price ?? 0;
  const originalPrice = course.originalPrice || (basePrice === 0 ? 2000 : basePrice + 1200);
  const finalPrice = promoApplied 
    ? Math.max(0, Math.round(basePrice * (1 - promoDiscount))) 
    : basePrice;

  const discountPercent = originalPrice > finalPrice
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    : 0;

  // Instructors directory by subject (matching screenshot layout)
  const subjectInstructors = {
    Bangla: [
      {
        name: 'তানভীর হোসাইন',
        title: 'Senior Bangla Specialist, DU',
        experience: '5 years',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'নূর মোহাম্মদ',
        title: 'Senior Bangla Faculty',
        experience: '4 years',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      }
    ],
    Biology: [
      {
        name: 'Mahedi Islam Hridoy',
        title: 'Senior Biology Instructor',
        experience: '5 years',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'Abrar Hamim',
        title: 'Senior Biology Instructor',
        experience: '5 years',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
      }
    ],
    Chemistry: [
      {
        name: 'সৈকত আব্দুল্লাহ',
        title: 'Senior Chemistry Mentor, BUET',
        experience: '6 years',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'রাকিব হাসান',
        title: 'Chemistry Specialist, DU (A+)',
        experience: '5 years',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      }
    ],
    English: [
      {
        name: 'ফারহান আহমেদ',
        title: 'Senior English Instructor, DU (IBA)',
        experience: '5 years',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'জাকির হোসেন',
        title: 'English Faculty & Grammar Specialist',
        experience: '4 years',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
      }
    ],
    ICT: [
      {
        name: 'Md. Nahidul Hasan',
        title: 'Senior ICT & Math Instructor',
        experience: '4 years',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
      }
    ],
    Math: [
      {
        name: 'সাজ্জাদুল ইসলাম',
        title: 'Senior Higher Math Mentor, BUET',
        experience: '5 years',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'তাহমিদ হক',
        title: 'Calculus & Algebra Lead',
        experience: '4 years',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80'
      }
    ],
    Physics: [
      {
        name: 'আসিফ মাহতাব',
        title: 'Senior Physics Mentor, BUET',
        experience: '6 years',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'রাহিদ রেজওয়ান',
        title: 'Physics Specialist & Problem Solver',
        experience: '4 years',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      }
    ]
  };

  const subjectKeys = ['Bangla', 'Biology', 'Chemistry', 'English', 'ICT', 'Math', 'Physics'];

  // Features checklist (matching the 3-item list in screenshot)
  const featuresList = [
    `${course.classCount || 25} টি ফ্রি লাইভ ক্লাস`,
    `${course.classCount || 25} টি ফ্রি ক্লাস নোট`,
    'কম্প্যাক্ট সাজেশন pdf'
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-['Hind_Siliguri',sans-serif] py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb (matching Home > Target A+ Free Course HSC-2026) */}
        <div className="mb-4 text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5">
          <button 
            onClick={onBack}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold truncate">
            {course.title}
          </span>
        </div>

        {/* Main Grid: Left Details & Right Enrollment Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Title, Subtitle, Instructors Accordion */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header: Title & Subtitle */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight font-['Outfit',sans-serif]">
                {course.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-2.5">
                {course.subtitle || course.description || 'শুধু অধ্যবসায় নয়, চাই সঠিক প্রস্তুতি। যা নিশ্চিত করছে আমাদের সেরা কোর্স। প্রতিটি সাবজেক্টের পূর্ণাঙ্গ প্রস্তুতি হবে আমাদের অভিজ্ঞ মেন্টরদের মাধ্যমে...'}
              </p>
            </div>

            {/* Section Header: কোর্সের শিক্ষকবৃন্দ */}
            <div className="pt-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 mb-3 font-['Hind_Siliguri',sans-serif]">
                কোর্সের শিক্ষকবৃন্দ
              </h2>

              {/* Accordion List for Subjects */}
              <div className="space-y-2.5">
                {subjectKeys.map((subject) => {
                  const isOpen = !!openSubjects[subject];
                  const teachers = subjectInstructors[subject] || [];

                  return (
                    <div
                      key={subject}
                      className="border border-[#F0D5D2] rounded-xl overflow-hidden bg-white shadow-xs transition-colors"
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() => toggleSubject(subject)}
                        className={`w-full px-5 py-3.5 text-left flex items-center justify-between transition-colors cursor-pointer ${
                          isOpen ? 'bg-[#FFF7F6]' : 'bg-white hover:bg-slate-50/80'
                        }`}
                      >
                        <span className="text-sm font-semibold text-slate-800 font-['Outfit',sans-serif]">
                          {subject}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-600" />
                        )}
                      </button>

                      {/* Accordion Content (Instructor Cards) */}
                      {isOpen && (
                        <div className="p-4 sm:p-5 bg-[#FFF7F6] border-t border-[#F7E5E3]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {teachers.map((teacher, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3"
                              >
                                <img
                                  src={teacher.avatar}
                                  alt={teacher.name}
                                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-slate-200 shadow-xs flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                    {teacher.name}
                                  </h4>
                                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                                    {teacher.title}, {teacher.experience}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Clean Floating Enrollment Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-4">
              
              {/* Top Banner Image with 16:9 ratio */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 shadow-xs">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {course.batchYear && (
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white shadow-xs">
                      {course.batchYear}
                    </span>
                  </div>
                )}
              </div>

              {/* Promo button & Price Row (matching screenshot) */}
              <div className="flex items-center justify-between gap-2 pt-1">
                {/* Apply Promo Tag Button */}
                <button
                  type="button"
                  onClick={() => setIsPromoOpen(!isPromoOpen)}
                  className="px-3 py-1.5 rounded-lg border border-dashed border-[#F05353] text-[#F05353] hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  <span>{promoApplied ? 'Promo Applied' : 'Apply Promo'}</span>
                </button>

                {/* Price Display */}
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-[#E53950] font-['Outfit',sans-serif]">
                    ৳{finalPrice}
                  </span>
                  {originalPrice > finalPrice && (
                    <span className="text-xs text-slate-400 line-through font-['Outfit',sans-serif]">
                      ৳{originalPrice}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-[#00BA63] text-white">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Promo input field (expandable) */}
              {isPromoOpen && (
                <form onSubmit={handleApplyPromo} className="space-y-1.5 pt-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="কুপন কোড (যেমন: HACKS26)"
                      disabled={promoApplied}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                    <button
                      type="submit"
                      disabled={promoApplied || !promoCode.trim()}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                    >
                      {promoApplied ? 'প্রযোজ্য' : 'প্রয়োগ'}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> ১৫% ছাড় প্রযোজ্য হয়েছে!
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-500 font-medium">
                      {promoError}
                    </p>
                  )}
                </form>
              )}

              {/* Big Red Coral CTA Button: কোর্সটি কিনুন */}
              <button
                type="button"
                onClick={() => onEnrollNow(course)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#EB3349] to-[#F45C43] hover:from-[#DF293F] hover:to-[#E84E34] shadow-md hover:shadow-lg transition-all cursor-pointer text-center block"
              >
                কোর্সটি কিনুন
              </button>

              {/* Add to Cart secondary button */}
              <button
                type="button"
                onClick={() => onAddToCart(course)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  inCart
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {inCart ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>কার্টে যুক্ত করা হয়েছে</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5 text-slate-500" />
                    <span>কার্টে যোগ করুন</span>
                  </>
                )}
              </button>

              {/* Two Stats Boxes (ভর্তি সংখ্যা & ক্লাস শুরু) */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {/* Box 1: ভর্তি সংখ্যা */}
                <div className="p-2.5 sm:p-3 rounded-xl border border-slate-200/90 bg-white flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 text-base">
                    👤
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      ভর্তি সংখ্যা
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block font-['Outfit',sans-serif]">
                      {(course.enrolledStudents || 59673).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Box 2: ক্লাস শুরু */}
                <div className="p-2.5 sm:p-3 rounded-xl border border-slate-200/90 bg-white flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      ক্লাস শুরু
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block font-['Outfit',sans-serif]">
                      Jun 30, 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature Checklist (with green checkbox icons) */}
              <div className="pt-2 space-y-2 border-t border-slate-100">
                {featuresList.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-700 font-medium">
                    <div className="w-4 h-4 rounded bg-[#00BA63] text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
