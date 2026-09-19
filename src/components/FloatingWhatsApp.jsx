import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const quickQuestions = [
    'ভর্তি সম্পর্কিত তথ্য জানতে চাই',
    'কোর্সের ফি কীভাবে পরিশোধ করবো?',
    'লাইভ ক্লাসের রুটিন জানতে চাই'
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || message;
    if (!text.trim()) return;
    const encoded = encodeURIComponent(`Academic Hacks Support: ${text}`);
    window.open(`https://wa.me/8801700000000?text=${encoded}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                💬
              </div>
              <div>
                <h4 className="font-bold text-sm">Academic Hacks WhatsApp হেল্পলাইন</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>অনলাইনে সক্রিয় আছেন</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat snippet */}
          <div className="p-4 bg-slate-50 space-y-2.5 text-xs text-slate-700">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 max-w-[90%]">
              <p>আসসালামু আলাইকুম! Academic Hacks-এ আপনাকে স্বাগতম। কীভাবে সাহায্য করতে পারি?</p>
              <span className="text-[10px] text-slate-400 mt-1 block text-right">এখন</span>
            </div>

            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">দ্রুত প্রশ্ন করুন:</p>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-700 transition-colors text-[11px]"
                >
                  👉 {q}
                </button>
              ))}
            </div>
          </div>

          {/* Send Input */}
          <div className="p-3 border-t border-slate-100 bg-white flex gap-2">
            <input
              type="text"
              placeholder="আপনার বার্তা লিখুন..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Chat"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-green-500 text-white shadow-[0_8px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_10px_30px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 border-2 border-white text-[9px] font-black text-white items-center justify-center">1</span>
        </span>
      </button>
    </div>
  );
};
