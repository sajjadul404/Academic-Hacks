import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Star, 
  Users, 
  Video, 
  FileText, 
  Clock, 
  Calendar, 
  CheckCircle, 
  ShoppingCart, 
  Sparkles, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Download, 
  HelpCircle, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle, 
  Tag, 
  Flame,
  BookOpen,
  Laptop,
  Smartphone,
  Layers,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CourseLandingPage = ({
  course,
  onBack,
  onSelectCourse,
  allCourses = [],
  onAddToCart,
  inCart = false,
  onEnrollNow
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSyllabus, setExpandedSyllabus] = useState('s1');
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Scroll to top when course changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCouponApplied(false);
    setCouponDiscount(0);
    setCouponCode('');
    setCouponError('');
  }, [course?.id]);

  if (!course) return null;

  // Calculate pricing with coupon
  const basePrice = course.price || 0;
  const finalPrice = couponApplied 
    ? Math.max(0, Math.round(basePrice * (1 - couponDiscount))) 
    : basePrice;

  const discountPercentage = course.originalPrice && course.originalPrice > course.price
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'HACKS26' || code === 'ACADEMIC10' || code === 'SPECIAL') {
      setCouponApplied(true);
      setCouponDiscount(0.10); // 10% extra discount
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {
        // ignore
      }
    } else {
      setCouponError('কুপন কোডটি সঠিক নয়! HACKS26 ট্রাই করুন।');
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const toggleSyllabus = (id) => {
    setExpandedSyllabus(prev => prev === id ? null : id);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(prev => prev === index ? null : index);
  };

  // Related courses (excluding current course)
  const relatedCourses = allCourses
    .filter(c => c.id !== course.id && (c.category === course.category || c.isPopular))
    .slice(0, 3);

  // Default course FAQs
  const courseFaqs = [
    {
      q: 'কোনো কারণে লাইভ ক্লাস মিস হলে কী পরবর্তীতে দেখার সুযোগ থাকবে?',
      a: 'হ্যাঁ, অবশ্যই! প্রতিটি লাইভ ক্লাস শেষ হওয়ার সর্বোচ্চ ১ ঘণ্টার মধ্যে সম্পূর্ণ HD কোয়ালিটির রেকর্ডেড ক্লাস এবং শিক্ষকের স্লাইড নোট লেকচার ড্যাশবোর্ডে যুক্ত হয়ে যাবে। আপনি যেকোনো সময় যতবার ইচ্ছা দেখতে পারবেন।'
    },
    {
      q: 'মডেল টেস্টগুলো কীভাবে নেওয়া হয় এবং রেজাল্ট কখন পাওয়া যায়?',
      a: 'আমাদের আধুনিক অনলাইন এক্সাম সিস্টেমে নেগেটিভ মার্কিং সহ রিয়েল-টাইম টাইমার ভিত্তিক পরীক্ষা অনুষ্ঠিত হয়। পরীক্ষা সাবমিট করার সাথে সাথেই তাৎক্ষণিক স্কোর, সঠিক উত্তর ব্যাখ্যা এবং সারাদেশের শিক্ষার্থীদের সাথে সেন্ট্রাল মেধা তালিকা (Merit List) দেখতে পাবেন।'
    },
    {
      q: 'পড়াশোনায় কোনো বিষয়ে সমস্যা বা ডাউট হলে কীভাবে সমাধান পাব?',
      a: 'ভর্তি হওয়া শিক্ষার্থীদের জন্য আমাদের ডেডিকেটেড ২৪/৭ ডাউট সলভ গ্রুপ রয়েছে। সেখানে সার্বক্ষণিক বুয়েট, মেডিকেল ও ঢাবির শীর্ষ মেন্টর দল সরাসরি আপনার যেকোনো প্রশ্নের তাৎক্ষণিক উত্তর প্রদান করবেন।'
    },
    {
      q: 'কোর্সটিতে কীভাবে পেমেন্ট করে ভর্তি হব?',
      a: 'আপনি বিকাশ (bKash), নগদ (Nagad), রকেট কিংবা যেকোনো ডেবিট/ক্রেডিট কার্ডের মাধ্যমে মাত্র এক মিনিটে স্বয়ংক্রিয়ভাবে পেমেন্ট সম্পন্ন করতে পারবেন। পেমেন্ট কনফার্ম হলেই আপনার ড্যাশবোর্ডে কোর্স আনলক হয়ে যাবে।'
    },
    {
      q: 'কোর্সটির ভ্যালিডিটি কতদিন থাকবে?',
      a: 'আপনার সংশ্লিষ্ট ব্যাচের চূড়ান্ত ভর্তি পরীক্ষা বা বোর্ড পরীক্ষার শেষ দিন পর্যন্ত এই কোর্সের সকল ক্লাস, মডেল টেস্ট এবং লেকচার শিটে আনলিমিটেড অ্যাক্সেস থাকবে।'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-['Hind_Siliguri',sans-serif]">
      
      {/* Top Breadcrumb & Quick Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-hidden">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2.5 py-1 rounded-xl transition-all cursor-pointer flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>সকল কোর্স</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-600 truncate hidden sm:inline">
              {course.category}
            </span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <span className="font-medium text-slate-800 truncate">
              {course.title}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-indigo-300 transition-all cursor-pointer"
              title="কোর্সের লিংক কপি করুন"
            >
              <Share2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>{copiedLink ? 'লিংক কপি হয়েছে!' : 'শেয়ার'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Details */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500 text-white shadow-sm">
                  {course.category}
                </span>

                {course.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/90 text-white backdrop-blur-xs flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{course.badge}</span>
                  </span>
                )}

                {course.batchYear && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/10 text-indigo-200 border border-white/10">
                    ব্যাচ: {course.batchYear}
                  </span>
                )}

                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ভর্তি চলছে
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-['Outfit',sans-serif]">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
                {course.subtitle || course.description}
              </p>

              {/* Social Proof and Highlights Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-black">{course.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">রেটিং (১২০০+ রিভিউ)</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-1.5 text-indigo-300">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-black">{course.enrolledStudents.toLocaleString()}+</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">শিক্ষার্থী যুক্ত আছে</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-1.5 text-blue-300">
                    <Video className="w-4 h-4" />
                    <span className="text-sm font-black">{course.classCount}+</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">লাইভ ক্লাস ও রেকর্ডিং</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-black">{course.examCount}+</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">মডেল টেস্ট ও ওএমআর</span>
                </div>
              </div>

              {/* Mentors Preview in Hero */}
              {course.mentors && course.mentors.length > 0 && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex -space-x-3">
                    {course.mentors.map((m, idx) => (
                      <img
                        key={idx}
                        src={m.avatar}
                        alt={m.name}
                        className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                        title={m.name}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white block">কোর্স ইন্সট্রাক্টর:</span>
                    <span>{course.mentors.map(m => m.name).join(', ')}</span>
                  </div>
                </div>
              )}

            </div>

            {/* Right Mini Hero Card (On lg screens, desktop quick visual) */}
            <div className="lg:col-span-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="w-16 h-16 rounded-full bg-white/90 text-indigo-700 flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-white transition-all cursor-pointer group/btn"
                  >
                    <Play className="w-7 h-7 fill-indigo-600 translate-x-0.5" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                    <Play className="w-3 h-3 text-rose-400 fill-rose-400" />
                    কোর্স ট্রেইলার দেখুন
                  </span>
                  <span className="font-semibold bg-indigo-600/80 px-2.5 py-1 rounded-lg">
                    ফুল এইচডি
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Dual-Column Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Full In-depth Sections */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* In-page Sticky Navigation Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex items-center gap-1 overflow-x-auto shadow-xs no-scrollbar">
              {[
                { id: 'overview', label: 'কোর্স ওভারভিউ' },
                { id: 'features', label: 'কী কী থাকছে' },
                { id: 'syllabus', label: 'পূর্ণাঙ্গ সিলেবাস' },
                { id: 'mentors', label: 'শিক্ষক দল' },
                { id: 'routine', label: 'ক্লাস রুটিন' },
                { id: 'faq', label: 'প্রশ্ন-উত্তর' },
                { id: 'reviews', label: 'শিক্ষার্থীদের রিভিউ' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    const el = document.getElementById(`section-${tab.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 1. Overview Section */}
            <section id="section-overview" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    কোর্সটি কেন তোমার জন্য সেরা?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    একটি নিখুঁত ও নির্ভরযোগ্য প্রস্তুতির সমন্বিত প্যাকেজ
                  </p>
                </div>
              </div>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  {course.description}
                </p>
                <p>
                  আমাদের এই কোর্সে প্রতিটি অধ্যায়ের মৌলিক থিওরি থেকে শুরু করে ভর্তি পরীক্ষার কঠিন প্যাটার্নের গাণিতিক সমস্যা ও বিগত ২০ বছরের প্রশ্ন সমাধান করানো হবে। নিয়মিত লাইভ ইন্টারেক্টিভ ক্লাস এবং নেগেটিভ মার্কিং সহ সেন্ট্রাল মডেল টেস্ট তোমার দুর্বলতা চিহ্নিত করে পরীক্ষার আগে সর্বোচ্চ আত্মবিশ্বাস গড়ে তুলবে।
                </p>
              </div>

              {/* 4 Feature highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-sm">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{course.classCount}+ লাইভ ইন্টারঅ্যাক্টিভ ক্লাস</h4>
                    <p className="text-xs text-slate-600 mt-0.5">টু-ওয়ে অডিও ও ভিডিও ইন্টারঅ্যাকশন সহ লাইভ ক্লাস ও আনলিমিটেড রেকর্ডিং।</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{course.examCount}+ ওএমআর মডেল টেস্ট</h4>
                    <p className="text-xs text-slate-600 mt-0.5">নেগেটিভ মার্কিং, টাইম লিমিট ও সেন্ট্রাল মেধা তালিকা সহ রিয়েল এক্সাম এক্সপেরিয়েন্স।</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">অধ্যায়ভিত্তিক পিডিএফ ও শর্টকাট শিট</h4>
                    <p className="text-xs text-slate-600 mt-0.5">ক্লাসের সাথে সাথেই সম্পূর্ণ গুছানো ডিজিটাল লেকচার নোট ও সিক্রেট হ্যাক্স বুক।</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">২৪/৭ স্পেশাল ডাউট সলভ গ্রুপ</h4>
                    <p className="text-xs text-slate-600 mt-0.5">পড়ার সময় আটকে গেলে টেলিগ্রাম গ্রুপে মেন্টরদের সাথে সরাসরি আলোচনার সুযোগ।</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. What's Included / Features Section */}
            <section id="section-features" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    এই কোর্সে আপনি যা যা পাচ্ছেন
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    ভর্তি হলে নিচের সকল সুযোগ-সুবিধা তাৎক্ষণিকভাবে কার্যকর হবে
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-indigo-200 transition-all flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {feature}
                    </span>
                  </div>
                ))}
                
                {/* Additional Standard Academic Hacks perks */}
                <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-indigo-200 transition-all flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    মোবাইল, ল্যাপটপ বা কম্পিউটার—যেকোনো ডিভাইসে দেখার সুবিধা
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-indigo-200 transition-all flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    পরীক্ষার আগের রাত পর্যন্ত আনলিমিটেড ভিডিও ভিউ ও প্র্যাকটিস
                  </span>
                </div>
              </div>
            </section>

            {/* 3. Comprehensive Syllabus Section */}
            <section id="section-syllabus" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      পূর্ণাঙ্গ সিলেবাস ও লেকচার প্ল্যান
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      অধ্যায়ভিত্তিক পাঠ্যসূচী এবং লেকচার কন্টেন্ট
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert('সিলেবাস পিডিএফ ডাউনলোড লিংক প্রস্তুত হচ্ছে!');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>সিলেবাস PDF</span>
                </button>
              </div>

              {course.syllabus && course.syllabus.length > 0 ? (
                <div className="space-y-3">
                  {course.syllabus.map((item, idx) => {
                    const isExpanded = expandedSyllabus === item.id;
                    return (
                      <div
                        key={item.id}
                        className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white hover:border-slate-300"
                      >
                        <button
                          onClick={() => toggleSyllabus(item.id)}
                          className={`w-full p-4 text-left flex items-center justify-between transition-colors ${
                            isExpanded ? 'bg-indigo-50/60' : 'bg-slate-50/60 hover:bg-slate-100/60'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                              {idx + 1}
                            </span>
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-0.5">
                                <span>{item.lecturesCount} টি লাইভ লেকচার</span>
                                <span>•</span>
                                <span>{item.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-slate-400">
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="p-5 bg-white border-t border-slate-100 space-y-3">
                            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                              এই মডিউলের প্রধান টপিকসমূহ:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {item.topics.map((topic, tidx) => (
                                <div key={tidx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                  <span>{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl text-slate-500 text-sm">
                  সিলেবাস লেকচার শিট শীগ্রই প্রকাশ করা হবে।
                </div>
              )}
            </section>

            {/* 4. Mentors Section */}
            <section id="section-mentors" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    কোর্স ইন্সট্রাক্টর ও মেন্টর দল
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    দেশের স্বনামধন্য বিশ্ববিদ্যালয়ের সেরা শিক্ষকদের সাথে সরাসরি ক্লাস
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.mentors.map((mentor, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-indigo-200 transition-all flex items-start gap-4 group"
                  >
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-slate-200 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {mentor.name}
                      </h4>
                      <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                        {mentor.title}
                      </p>
                      {mentor.institution && (
                        <p className="text-xs text-slate-500 mt-1 font-medium">
                          {mentor.institution}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 w-fit">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>অভিজ্ঞ ভর্তি পরামর্শক</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Routine & Schedule Section */}
            <section id="section-routine" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    ক্লাসের রুটিন ও সময়সূচী
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    সুপরিকল্পিত সাপ্তাহিক শিডিউল যাতে তোমার অন্যান্য পড়া ব্যাহত না হয়
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3.5">কার্যক্রম</th>
                      <th className="p-3.5">দিনসমূহ</th>
                      <th className="p-3.5">সময়সূচী</th>
                      <th className="p-3.5">মাধ্যম</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-600" />
                        লাইভ ক্লাস
                      </td>
                      <td className="p-3.5">শনি, সোম, বুধ, বৃহস্পতি</td>
                      <td className="p-3.5">রাত ৮:০০ - ৯:৩০ টা</td>
                      <td className="p-3.5 font-semibold text-indigo-600">Zoom Live & Web Portal</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        সাপ্তাহিক মডেল টেস্ট
                      </td>
                      <td className="p-3.5">প্রতি শুক্রবার ও মঙ্গলবার</td>
                      <td className="p-3.5">সন্ধ্যা ৭:০০ - রাত ১১:৫৯</td>
                      <td className="p-3.5 font-semibold text-rose-600">Online OMR Portal</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        স্পেশাল ডাউট সলভ
                      </td>
                      <td className="p-3.5">প্রতি রবিবার</td>
                      <td className="p-3.5">বিকাল ৫:০০ - ৬:৩০ টা</td>
                      <td className="p-3.5 font-semibold text-emerald-600">Telegram VIP Group</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 6. FAQ Section */}
            <section id="section-faq" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    কোর্স সম্পর্কিত যেকোনো সাধারণ প্রশ্নের সহজ উত্তর
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {courseFaqs.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-600 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 7. Student Reviews Section */}
            <section id="section-reviews" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Star className="w-5 h-5 fill-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      শিক্ষার্থীদের মতামত ও সাফল্য
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      কোর্সটি সম্পন্ন করা কৃতী শিক্ষার্থীদের অভিজ্ঞতা
                    </p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <div className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    {course.rating} / ৫.০
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 justify-end">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: 'আবরার তাহমিদ',
                    institution: 'ঢাকা বিশ্ববিদ্যালয় (মেরিট: ১২তম)',
                    comment: 'একাডেমিক হ্যাকসের এই কোর্সটি ছিল আমার ভর্তি প্রস্তুতির টার্নিং পয়েন্ট। বিশেষ করে নিয়মিত মডেল টেস্ট এবং নেগেটিভ মার্কিং আমাকে ভুল কমাতে সবচেয়ে বেশি সাহায্য করেছে।'
                  },
                  {
                    name: 'মেহজাবিন আলম',
                    institution: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
                    comment: 'ইন্সট্রাক্টরদের পড়ানোর ধরন অসাধারণ! যেকোনো জটিল টপিক খুব সহজে শর্টকাটে বুঝিয়ে দেওয়া হতো। লেকচার শিটগুলো এক কথায় সেরা ছিল।'
                  }
                ].map((review, rIdx) => (
                  <div key={rIdx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 italic">
                      "{review.comment}"
                    </p>
                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-xs font-bold text-slate-900 block">{review.name}</span>
                      <span className="text-[11px] text-indigo-600 font-semibold">{review.institution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Enrollment & Checkout Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 space-y-6">
                
                {/* Price Display */}
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-black text-rose-600 font-['Outfit',sans-serif]">
                      {finalPrice === 0 ? 'সম্পূর্ণ ফ্রি' : `৳${finalPrice.toLocaleString()}`}
                    </span>
                    {course.originalPrice && course.originalPrice > finalPrice && (
                      <span className="text-base text-slate-400 line-through font-['Outfit',sans-serif]">
                        ৳{course.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {discountPercentage > 0 && (
                      <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-rose-100 text-rose-700">
                        {discountPercentage}% ছাড়
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    এককালীন পেমেন্ট • কোনো মাসিক চার্জ নেই
                  </p>
                </div>

                {/* Primary Enrollment Call To Action Buttons */}
                <div className="space-y-2.5">
                  <button
                    onClick={() => onEnrollNow(course)}
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>এখনই ভর্তি হোন</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onAddToCart(course)}
                    className={`w-full py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      inCart
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-300'
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>কার্টে যুক্ত আছে</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 text-indigo-600" />
                        <span>কার্টে যোগ করুন</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Coupon Code Input */}
                <div className="pt-2 border-t border-slate-100">
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-indigo-600" />
                      <span>প্রমো কুপন কোড:</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="HACKS26"
                        disabled={couponApplied}
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-slate-100"
                      />
                      <button
                        type="submit"
                        disabled={couponApplied || !couponCode.trim()}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        {couponApplied ? 'প্রযোজ্য' : 'প্রয়োগ'}
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        অভিনন্দন! ১০% অতিরিক্ত ছাড় প্রয়োগ করা হয়েছে।
                      </p>
                    )}
                    {couponError && (
                      <p className="text-[11px] font-medium text-rose-500">
                        {couponError}
                      </p>
                    )}
                  </form>
                </div>

                {/* Inclusions checklist */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    কোর্সে অন্তর্ভুক্ত বিষয়সমূহ:
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2.5">
                      <Video className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span>{course.classCount}+ লাইভ ক্লাস ও রেকর্ডিং</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>{course.examCount}+ চ্যাপ্টারওয়াইজ ও মেগা মডেল টেস্ট</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Download className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>অধ্যায়ভিত্তিক প্রিন্ট ও ডিজিটাল লেকচার নোট</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>২৪/৭ ডেডিকেটেড ডাউট সলভ টেলিগ্রাম সাপোর্ট</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Laptop className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>মোবাইল ও পিসি যেকোনো ডিভাইসে সহজ অ্যাক্সেস</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>ভর্তি পরীক্ষার শেষ দিন পর্যন্ত ভ্যালিডিটি</span>
                    </li>
                  </ul>
                </div>

                {/* Guarantee & Helpline */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>১০০% নিরাপদ পেমেন্ট ও মানিব্যাক নিশ্চয়তা</span>
                  </div>

                  <a
                    href="https://wa.me/8801700000000"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>ভর্তি নিয়ে কোনো প্রশ্ন? হোয়াটসঅ্যাপ করুন</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Related Courses Section */}
        {relatedCourses.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  সম্পর্কিত অন্যান্য কোর্সসমূহ
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  তোমার পছন্দের ক্যাটাগরির অন্যান্য জনপ্রিয় লাইভ ব্যাচ
                </p>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>সকল কোর্স দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectCourse(rel)}
                  className="bg-white rounded-3xl border border-slate-200 p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-indigo-700 shadow-xs">
                      {rel.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                      {rel.subtitle || rel.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-black text-rose-600 font-['Outfit',sans-serif]">
                      {rel.price === 0 ? 'ফ্রি' : `৳${rel.price.toLocaleString()}`}
                    </span>
                    <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      বিস্তারিত <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Floating Bottom Action Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">কোর্স ফি</span>
          <span className="text-lg font-black text-rose-600 font-['Outfit',sans-serif]">
            {finalPrice === 0 ? 'ফ্রি' : `৳${finalPrice.toLocaleString()}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddToCart(course)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              inCart
                ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            {inCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onEnrollNow(course)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            এখনই ভর্তি হোন
          </button>
        </div>
      </div>

      {/* Video Preview Modal */}
      {isVideoModalOpen && (
        <div 
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-3xl overflow-hidden max-w-3xl w-full border border-slate-800 shadow-2xl"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between text-white">
              <span className="text-sm font-bold truncate">{course.title} — প্রিভিউ</span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              {course.videoPreviewUrl ? (
                <iframe
                  src={course.videoPreviewUrl}
                  title="Course Preview"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-8 text-slate-400">
                  <Play className="w-12 h-12 mx-auto text-indigo-400 mb-2" />
                  <p className="text-sm font-bold text-white">ডেমো ক্লাস ও ইন্ট্রোডাকশন ভিডিও</p>
                  <p className="text-xs text-slate-500 mt-1">কোর্সের প্রথম লাইভ ক্লাস সকল নিবন্ধিত শিক্ষার্থীদের জন্য উন্মুক্ত থাকবে।</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
