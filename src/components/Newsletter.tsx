import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.85 }
      });
    }, 600);
  };

  return (
    <section className="py-12 bg-[#F4F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Banner Container matching screenshot */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-purple-50/90 border border-indigo-100/80 p-6 sm:p-8 lg:p-10 shadow-sm">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">
            
            {/* Left Header */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/20">
                <Send className="w-6 h-6 transform -rotate-12 translate-x-0.5 -translate-y-0.5" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  নিয়মিত আপডেট পেতে সাবস্ক্রাইব করুন
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  নতুন কোর্স, অফার ও গুরুত্বপূর্ণ আপডেট জানতে আপনার ইমেইল দিন।
                </p>
              </div>
            </div>

            {/* Right Input Form */}
            <div className="w-full lg:max-w-md">
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold text-sm animate-in fade-in duration-300">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="আপনার ইমেইল লিখুন"
                      className="w-full pl-11 pr-4 py-3.5 rounded-full sm:rounded-l-full sm:rounded-r-none bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3.5 rounded-full sm:rounded-l-none sm:rounded-r-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-md shadow-indigo-500/20 whitespace-nowrap transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{loading ? 'প্রক্রিয়াকরণ...' : 'সাবস্ক্রাইব করুন'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
