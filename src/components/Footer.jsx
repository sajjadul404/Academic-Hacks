import React from 'react';
import { 
  GraduationCap, 
  Heart, 
  Facebook, 
  Youtube, 
  Instagram, 
  Linkedin,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export const Footer = ({ onNavigateSection }) => {
  return (
    <footer id="contact" className="bg-[#EBF0FA] border-t border-slate-200/80 pt-16 pb-12 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-300/60">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 cursor-pointer select-none mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white shadow-md">
                <GraduationCap className="w-5 h-5 transform -rotate-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-800 bg-clip-text text-transparent font-['Outfit',sans-serif]">
                  Academic Hacks
                </span>
                <span className="text-[11px] text-slate-500 font-medium font-['Hind_Siliguri',sans-serif]">
                  শিক্ষার সহজ পথ
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
              শিক্ষার সহজ পথ, সাফল্যের নতুন দিগন্ত। মানসম্মত অনলাইন শিক্ষা সবার জন্য সহজ ও accessible করাই Academic Hacks-এর মূল লক্ষ্য।
            </p>

            <div className="space-y-2 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-600" />
                <span>হেল্পলাইন: ০৯৬৩৮-০০০০০ (সকাল ১০টা - রাত ১০টা)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>support@academichacks.edu.bd</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>ঢাকা, বাংলাদেশ</span>
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-['Outfit',sans-serif]">
              কোর্স ক্যাটাগরি
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li>
                <button onClick={() => onNavigateSection('courses')} className="hover:text-indigo-600 transition-colors">
                  স্কুল প্রোগ্রাম (৬ষ্ঠ-১০ম)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('courses')} className="hover:text-indigo-600 transition-colors">
                  HSC একাডেমিক কোর্স
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('admission')} className="hover:text-indigo-600 transition-colors">
                  বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('admission')} className="hover:text-indigo-600 transition-colors">
                  মেডিকেল ও ডেন্টাল
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('admission')} className="hover:text-indigo-600 transition-colors">
                  ইঞ্জিনিয়ারিং ও প্রযুক্তি
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('courses')} className="hover:text-indigo-600 transition-colors">
                  ফ্রি ক্লাস ও এক্সাম
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-['Outfit',sans-serif]">
              কোম্পানি
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li>
                <button onClick={() => onNavigateSection('about')} className="hover:text-indigo-600 transition-colors">
                  আমাদের সম্পর্কে
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('contact')} className="hover:text-indigo-600 transition-colors">
                  যোগাযোগ ও সাপোর্ট
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('faq')} className="hover:text-indigo-600 transition-colors">
                  প্রশ্ন ও উত্তর (FAQ)
                </button>
              </li>
              <li>
                <a href="#privacy" className="hover:text-indigo-600 transition-colors">
                  গোপনীয়তা নীতি
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-indigo-600 transition-colors">
                  ব্যবহারের শর্তাবলী
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Social & Payments (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-['Outfit',sans-serif]">
              যুক্ত থাকুন
            </h4>
            <p className="text-xs text-slate-600 mb-4">
              আমাদের অফিসিয়াল সোশ্যাল মিডিয়া হ্যান্ডেলগুলোতে ফলো করুন নিয়মিত লাইভ সেশনের নোটিফিকেশন পেতে।
            </p>

            <div className="flex items-center gap-2.5 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-300/80 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-300/80 flex items-center justify-center text-slate-600 hover:text-rose-600 hover:border-rose-300 transition-colors shadow-sm"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-300/80 flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-300 transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-300/80 flex items-center justify-center text-slate-600 hover:text-blue-700 hover:border-blue-400 transition-colors shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Verified Payment Badges */}
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">নিরাপদ পেমেন্ট পার্টনার:</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-pink-100 text-pink-700 font-black text-xs border border-pink-200">bKash</span>
                <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-700 font-black text-xs border border-orange-200">Nagad</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-700 font-black text-xs border border-purple-200">Rocket</span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-black text-xs border border-blue-200">VISA / Master</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Academic Hacks. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for students across Bangladesh</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
