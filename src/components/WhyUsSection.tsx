import React from 'react';
import { 
  Users, 
  Wallet, 
  MonitorPlay, 
  HeartHandshake, 
  School,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const cards = [
    {
      id: 'why-1',
      title: 'এক ক্লাসরুমে সারা দেশের শিক্ষার্থী',
      desc: 'দেশের ৬৪ জেলার শিক্ষার্থীরা একসাথে একই ভার্চুয়াল ক্লাসে শিখছে, যা তৈরি করে এক বৈষম্যহীন শিক্ষার পরিবেশ।',
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50/70 border-blue-100 text-blue-700'
    },
    {
      id: 'why-2',
      title: 'সকলের জন্য সহজলভ্য মানসম্মত শিক্ষা',
      desc: 'যাদের কাছে কোচিং ফি দেওয়া সম্ভব নয়, তারা একদম সাশ্রয়ী ফিতে মানসম্মত শিক্ষা পাচ্ছে বিনামূল্যে বা খুবই কম খরচে।',
      icon: Wallet,
      color: 'from-rose-500 to-pink-600',
      bg: 'bg-rose-50/70 border-rose-100 text-rose-700'
    },
    {
      id: 'why-3',
      title: 'আধুনিক প্রযুক্তিতে পড়াশোনার নতুন ধারা',
      desc: 'ডিজিটাল বোর্ড, রেকর্ড ক্লাস, ডাউট সলভ ও অ্যাসাইনমেন্ট একসাথে পেয়ে পড়াশোনা হবে যেকোনো সময়ের চেয়ে সহজ।',
      icon: MonitorPlay,
      color: 'from-purple-500 to-violet-600',
      bg: 'bg-purple-50/70 border-purple-100 text-purple-700'
    },
    {
      id: 'why-4',
      title: 'শুধু পাস নয়, গড়ে তোলে মানবিক মানুষ',
      desc: 'শুধু জিপিএ নয়, শেখানো হয় নীতি ও মূল্যবোধ, ক্যারিয়ার গাইডেন্স ও মেন্টরিং- এটাই আমাদের আসল প্রতিশ্রুতি।',
      icon: HeartHandshake,
      color: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-50/70 border-amber-100 text-amber-700'
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-[#F8FAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide mb-3">
            <span>কেন অনলাইন?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight">
            বন্দি পাঠশালার কেন ভিন্নধর্মী ?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            মানসম্মত শিক্ষার জন্য পাঠশালার একাডেমিক এক্সপেরিয়েন্স এখনই ও স্মার্ট নিকটবর্তী হিসেবে আপনাকে দেবে সেরা অভিজ্ঞতা।
          </p>
        </div>

        {/* Content Row: Left Illustration & Right 4 Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Illustration Box matching screenshot */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-blue-50/60 to-indigo-50/60 rounded-3xl p-8 border border-blue-100/80 shadow-md overflow-hidden text-center">
              
              {/* Sun & Clouds backdrop */}
              <div className="absolute top-4 right-8 w-14 h-14 rounded-full bg-amber-200/60 blur-sm pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-200/40 blur-xl pointer-events-none" />

              {/* Central Stylized Vector House Graphic */}
              <div className="relative z-10 mx-auto w-56 h-56 bg-white/90 rounded-2xl shadow-xl border border-white p-6 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg mb-3">
                  <School className="w-10 h-10" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  Academic Hacks পাঠশালা
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  ৬৪ জেলায় ডিজিটাল ক্লাসরুম
                </p>
                <div className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>স্মার্ট লার্নিং হাব</span>
                </div>
              </div>

              {/* Student badges */}
              <div className="relative z-10 flex items-center justify-center gap-2 mt-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-700 shadow-sm border border-slate-200">
                  👨‍🎓 ২০ লাখ+ শিক্ষার্থী
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm">
                  ⭐ ৪.৯ স্টার রেটিং
                </span>
              </div>
            </div>
          </div>

          {/* Right 4 Grid Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  id={card.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.bg} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-['Hind_Siliguri',sans-serif]">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-indigo-600 gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>১০০% কার্যকর মেথড</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
