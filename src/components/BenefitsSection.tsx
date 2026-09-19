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

export const BenefitsSection: React.FC = () => {
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
            বন্দি পাঠশালার কোর্স কেন আলাদা?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            আধুনিক প্রযুক্তি, সেরা পাঠদান ও ২৪/৭ স্টুডেন্ট সাপোর্ট এক প্ল্যাটফর্মে এনেছি আমরা আপনাকে সেরা রেজাল্ট উপহার দিতে।
          </p>
        </div>

        {/* 2-Column Content Layout matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Checkpoints Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 fill-indigo-600 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800 font-['Hind_Siliguri',sans-serif]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 font-['Outfit',sans-serif]">
                  LIMITED OFFER
                </p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  আজই ভর্তি হয়ে লুফে নিন ফ্রি প্রিন্টেড বুক ও এক্সক্লুসিভ নোটস
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-600 text-white shadow-sm flex items-center gap-1">
                <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
                <span>২০% ছাড়</span>
              </span>
            </div>
          </div>

          {/* Right Visual: Student with orbital floating feature badges matching screenshot */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Background circular decorative ring */}
            <div className="relative w-full max-w-lg aspect-square rounded-full bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-100/80 flex items-center justify-center p-8 shadow-inner">
              
              {/* Concentric subtle rings */}
              <div className="absolute inset-8 rounded-full border border-dashed border-indigo-200/70 pointer-events-none" />
              <div className="absolute inset-20 rounded-full border border-indigo-100 pointer-events-none" />

              {/* Student Image Centerpiece */}
              <div className="relative z-10 w-64 sm:w-72 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80"
                  alt="Student studying with Academic Hacks"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                    🎓 দেশের যেকোনো প্রান্ত থেকে সেরা প্রস্তুতি
                  </span>
                </div>
              </div>

              {/* Floating Pill Badges around the student matching the screenshot illustration */}
              {floatingBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className={`absolute z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border border-white/40 cursor-default hover:scale-110 transition-transform ${badge.color} ${badge.position}`}
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
