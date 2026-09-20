import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Star, Quote, Award, Sparkles } from 'lucide-react';
import { TESTIMONIALS, FAQ_ITEMS } from '../data/mockData';

export const TestimonialsSection = ({ testimonials = TESTIMONIALS }) => {
  return (
    <section className="py-16 lg:py-24 bg-[#F4F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>সফলতার গল্প</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight">
            টপারদের মুখে আমাদের গল্প
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            গত বছরগুলোতে বুয়েট, ঢাকা মেডিকেল ও ঢাবি সহ শীর্ষ বিদ্যাপীঠে চান্স পাওয়া শিক্ষার্থীদের অভিজ্ঞতা।
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-indigo-200 mb-3" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-slate-100 flex-shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs font-bold text-indigo-600">{t.rank}</p>
                  <p className="text-[11px] text-slate-500">{t.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const FaqSection = ({ faqs = FAQ_ITEMS }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight">
            সাধারণ প্রশ্ন ও উত্তর
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            ভর্তি সংক্রান্ত সাধারণ দ্বিধা দূর করতে জেনে নিন বিস্তারিত
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors bg-white shadow-sm hover:border-indigo-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-['Hind_Siliguri',sans-serif]">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 bg-white border-t border-slate-100">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
