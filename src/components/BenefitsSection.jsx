import React from 'react';
import { 
  CheckCircle2, 
  BookOpen, 
  FileCheck, 
  Radio, 
  MessageSquare, 
  HelpCircle, 
  Sparkles,
  Zap
} from 'lucide-react';

export const BenefitsSection = () => {
  const benefits = [
    'লাইভ ক্লাস ও মানসম্মত লেসন',
    'প্রতিটা টপিক কুইজ ও মূল্যায়ন',
    'বছর জুড়ে এক্সক্লুসিভ সাপোর্ট',
    'স্মার্ট নোট ও প্র্যাকটিস শিট',
    'রেকর্ড ক্লাস রিভিশন সুবিধা',
    'ডাউট সলভ ও মেন্টর সাপোর্ট',
    'সম্পূর্ণ সিলেবাস কভারেজ',
    'ফ্রি ক্লাস ও ট্রায়াল সুবিধা',
    'আমাদের নিজস্ব লাইভ এক্সাম',
    'যেকোনো সময়ে কনটেন্ট অ্যাক্সেস'
  ];

  const floatingBadges = [
    { text: 'PREMIUM Book!', color: 'bg-indigo-600 text-white', icon: BookOpen, position: 'top-2 left-1/4' },
    { text: 'PREMIUM HandNote!', color: 'bg-purple-600 text-white', icon: FileCheck, position: 'top-6 right-8' },
    { text: 'LIVE Exam!', color: 'bg-rose-600 text-white animate-pulse', icon: Radio, position: 'top-1/3 right-2' },
    { text: 'QnA! 24/7 Support', color: 'bg-blue-600 text-white', icon: MessageSquare, position: 'bottom-1/3 right-4' },
    { text: 'DOUBT Solve!', color: 'bg-violet-700 text-white', icon: HelpCircle, position: 'bottom-10 right-10' },
    { text: 'FREE to Test!', color: 'bg-emerald-600 text-white', icon: Sparkles, position: 'top-1/3 left-4' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold tracking-wide mb-3">
            <span>আমাদের সুবিধাসমূহ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight">
            Academic Hacks-এর কোর্স কেন আলাদা?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            আধুনিক প্রযুক্তি, সেরা পাঠদান ও ২৪/৭ স্টুডেন্ট সাপোর্ট এক প্ল্যাটফর্মে এনেছি আমরা আপনাকে সেরা রেজাল্ট উপহার দিতে।
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Checkpoints Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-indigo-200 hover:bg-indigo-50/40 transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 font-['Hind_Siliguri',sans-serif]">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                <Zap className="w-5 h-5 text-amber-300" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-snug font-medium">
                অনলাইন লাইভ ক্লাসের পাশাপাশি প্রতিটি ক্লাসের ফুল HD রেকর্ডিং ও লেকচার শিট আনলিমিটেড সময় রিভিশনের সুযোগ।
              </p>
            </div>
          </div>

          {/* Right Visual Interactive Classroom Illustration */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md aspect-[4/3] rounded-3xl bg-gradient-to-tr from-indigo-100 via-purple-50 to-blue-50 p-6 border border-indigo-100 shadow-xl overflow-hidden flex items-center justify-center">
              
              {/* Background circular radar ripples */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full border border-indigo-200/60 animate-ping opacity-25" />
                <div className="w-96 h-96 rounded-full border border-purple-200/40" />
              </div>

              {/* Center Teacher / Student Core Card */}
              <div className="relative z-10 bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-w-xs text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-1 shadow-lg shadow-indigo-500/30 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Teacher"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h4 className="text-base font-bold text-slate-900">লাইভ ইন্টারঅ্যাক্টিভ ক্লাস</h4>
                <p className="text-xs text-slate-500 mt-1">শিক্ষক ও শিক্ষার্থীর সরাসরি প্রশ্ন-উত্তর</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>লাইভ চলছে</span>
                </div>
              </div>

              {/* Floating feature pills */}
              {floatingBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={i}
                    className={`absolute ${badge.position} z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${badge.color} text-xs font-extrabold shadow-lg hover:scale-105 transition-transform cursor-pointer backdrop-blur-md`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
