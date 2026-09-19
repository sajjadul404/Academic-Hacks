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

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenFaqModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
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
                  EduPath
                </span>
                <span className="text-[11px] text-slate-500 font-medium font-['Hind_Siliguri',sans-serif]">
                  শিক্ষার সহজ পথ
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
              শিক্ষার সহজ পথ, সাফল্যের নতুন দিগন্ত। মানসম্মত অনলাইন শিক্ষা সবার জন্য সহজ ও accessible করাই EduPath-এর মূল লক্ষ্য।
            </p>

            <div className="space-y-2 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-600" />
                <span>হেল্পলাইন: ০৯৬৩৮-০০০০০ (সকাল ১০টা - রাত ১০টা)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>support@edupath.edu.bd</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>ঢাকা, বাংলাদেশ</span>
              </p>
            </div>
          </div>

          {/* Col 2: ফাস্ট লিংক (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-slate-900 mb-4 font-['Hind_Siliguri',sans-serif]">
              ফাস্ট লিংক
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li>
                <button onClick={() => onNavigateSection('hero')} className="hover:text-indigo-600 transition-colors">
                  হোম
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('courses')} className="hover:text-indigo-600 transition-colors">
                  কোর্স সমূহ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('admission')} className="hover:text-indigo-600 transition-colors">
                  অ্যাডমিশন
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('free-courses')} className="hover:text-indigo-600 transition-colors">
                  ফ্রি কোর্স
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('about')} className="hover:text-indigo-600 transition-colors">
                  আমাদের সম্পর্কে
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('contact')} className="hover:text-indigo-600 transition-colors">
                  যোগাযোগ করুন
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: জনপ্রিয় কোর্সসমূহ (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-slate-900 mb-4 font-['Hind_Siliguri',sans-serif]">
              জনপ্রিয় কোর্সসমূহ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li><button onClick={() => onNavigateSection('courses')} className="hover:text-indigo-600">School (Class 6-10)</button></li>
              <li><button onClick={() => onNavigateSection('courses')} className="hover:text-indigo-600">HSC Academic (2025/2026)</button></li>
              <li><button onClick={() => onNavigateSection('admission')} className="hover:text-indigo-600">University Admission (DU/BUET)</button></li>
              <li><button onClick={() => onNavigateSection('admission')} className="hover:text-indigo-600">Medical Admission (DMC)</button></li>
              <li><button onClick={() => onNavigateSection('courses')} className="hover:text-indigo-600">Nursing & Allied Health</button></li>
              <li><button onClick={() => onNavigateSection('courses')} className="hover:text-indigo-600">Arts & Commerce (Unit Shift)</button></li>
            </ul>
          </div>

          {/* Col 4: সাপোর্ট ও সহায়তা (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-slate-900 mb-4 font-['Hind_Siliguri',sans-serif]">
              সাপোর্ট ও সহায়তা
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li><a href="#help" className="hover:text-indigo-600">হেল্প সেন্টার</a></li>
              <li><a href="#support" className="hover:text-indigo-600">সাপোর্টের সাথে যোগাযোগ</a></li>
              <li><a href="#faq" className="hover:text-indigo-600">সচরাচর জিজ্ঞাসা (FAQ)</a></li>
              <li><a href="#terms" className="hover:text-indigo-600">শর্তাবলী (Terms of Service)</a></li>
              <li><a href="#privacy" className="hover:text-indigo-600">গোপনীয়তা নীতি (Privacy Policy)</a></li>
              <li><a href="#refund" className="hover:text-indigo-600">রিফান্ড পলিসি</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          
          <p>© 2026 <span className="font-bold text-indigo-700">EduPath</span>. All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-700">আমাদের সাথে যুক্ত থাকুন |</span>
            
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white shadow-sm transition-all" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white shadow-sm transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white shadow-sm transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
