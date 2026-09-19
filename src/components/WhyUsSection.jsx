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

export const WhyUsSection = () => {
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
            Academic Hacks কেন ভিন্নধর্মী ?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            অনলাইন শিক্ষা কেবল বিকল্প নয়, বরং সময়ের সেরা প্রস্তুতি। জেনে নিন কেন লক্ষ শিক্ষার্থী ভরসা রাখে আমাদের ওপর।
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                id={card.id}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Badge */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${card.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-['Hind_Siliguri',sans-serif] leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 mt-2.5 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>প্রমাণিত কার্যকারিতা</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white flex-shrink-0 backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="text-lg font-bold">অনলাইনে পড়ার জন্য কি আলাদা প্রস্তুতি লাগে?</h4>
              <p className="text-xs sm:text-sm text-indigo-200 mt-0.5">না, শুধু একটি স্মার্টফোন অথবা কম্পিউটার ও ইন্টারনেট কানেকশনই যথেষ্ট।</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              ২৪/৭ সাপোর্ট ওপেন
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
