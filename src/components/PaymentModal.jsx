import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Lock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PaymentModal = ({
  isOpen = false,
  onClose,
  course,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState(null); // null | 'bkash' | 'nagad'
  const [senderInfo, setSenderInfo] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !course) return null;

  const payableAmount = course.price ?? 0;
  const officialBkashNumber = '01700-123456';
  const officialNagadNumber = '01800-654321';

  const currentNumber = selectedMethod === 'bkash' ? officialBkashNumber : officialNagadNumber;

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentNumber.replace('-', ''));
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleConfirmPayment = (e) => {
    e?.preventDefault();
    setErrorMessage('');

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      setTimeout(() => {
        onPaymentSuccess?.(
          course, 
          selectedMethod || 'bkash', 
          senderInfo || '017XXXXXXXX', 
          `TRX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        );
        setIsSuccess(false);
        setSelectedMethod(null);
        setSenderInfo('');
        onClose();
      }, 1800);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      
      {/* Compact Modal Box */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-sm w-full overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-150"
      >
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            {selectedMethod && (
              <button
                type="button"
                onClick={() => {
                  setSelectedMethod(null);
                  setErrorMessage('');
                }}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors mr-0.5 cursor-pointer"
                title="ফিরে যান"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Hind_Siliguri',sans-serif]">
                {selectedMethod === 'bkash' 
                  ? 'বিকাশ পেমেন্ট' 
                  : selectedMethod === 'nagad' 
                  ? 'নগদ পেমেন্ট' 
                  : 'পেমেন্ট মাধ্যম বেছে নিন'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                প্রদেয় ফি: <span className="font-bold text-rose-600 font-['Outfit',sans-serif]">৳{payableAmount}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-7 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
              পেমেন্ট সফল হয়েছে!
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-900">"{course.title}"</span> কোর্সে আপনার ভর্তি নিশ্চিত করা হয়েছে।
            </p>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] font-bold text-emerald-700 w-full">
              ড্যাশবোর্ডে যুক্ত করা হচ্ছে...
            </div>
          </div>
        ) : !selectedMethod ? (
          /* Initial Compact View: bKash & Nagad Icons */
          <div className="p-5 space-y-4 font-['Hind_Siliguri',sans-serif]">
            
            <p className="text-xs text-slate-600 text-center font-medium">
              নিচের যেকোনো একটি মাধ্যম নির্বাচন করে পেমেন্ট সম্পন্ন করুন:
            </p>

            <div className="grid grid-cols-2 gap-3.5 pt-1">
              
              {/* bKash Icon Option Card */}
              <button
                type="button"
                onClick={() => setSelectedMethod('bkash')}
                className="group p-4 rounded-2xl border-2 border-slate-200 hover:border-[#E2136E] bg-white hover:bg-pink-50/40 transition-all flex flex-col items-center text-center cursor-pointer shadow-xs hover:shadow-md active:scale-98"
              >
                {/* bKash Brand Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#E2136E] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform mb-2 relative overflow-hidden">
                  {/* Stylized origami bird icon */}
                  <svg className="w-9 h-9" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M15 70 L50 20 L85 70 L50 55 Z" opacity="0.9" />
                    <circle cx="50" cy="35" r="7" fill="white" />
                  </svg>
                  <span className="absolute bottom-1 text-[8px] font-black tracking-widest text-white/90 uppercase font-sans">
                    BKASH
                  </span>
                </div>

                <span className="text-sm font-bold text-slate-900 group-hover:text-[#E2136E] transition-colors block">
                  বিকাশ
                </span>
                <span className="text-[10px] text-pink-600 font-semibold block mt-0.5">
                  bKash Pay
                </span>
              </button>

              {/* Nagad Icon Option Card */}
              <button
                type="button"
                onClick={() => setSelectedMethod('nagad')}
                className="group p-4 rounded-2xl border-2 border-slate-200 hover:border-[#EA1D25] bg-white hover:bg-orange-50/40 transition-all flex flex-col items-center text-center cursor-pointer shadow-xs hover:shadow-md active:scale-98"
              >
                {/* Nagad Brand Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#EA1D25] via-[#F7941D] to-[#F15A24] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform mb-2 relative overflow-hidden">
                  {/* Stylized Nagad flame icon */}
                  <svg className="w-9 h-9" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 15 C35 35 25 50 25 65 C25 80 37 90 50 90 C63 90 75 80 75 65 C75 50 65 35 50 15 Z" opacity="0.95" />
                    <circle cx="50" cy="65" r="9" fill="white" />
                  </svg>
                  <span className="absolute bottom-1 text-[8px] font-black tracking-widest text-white/90 uppercase font-sans">
                    NAGAD
                  </span>
                </div>

                <span className="text-sm font-bold text-slate-900 group-hover:text-[#EA1D25] transition-colors block">
                  নগদ
                </span>
                <span className="text-[10px] text-orange-600 font-semibold block mt-0.5">
                  Nagad Pay
                </span>
              </button>

            </div>

            {/* Bottom Security Note */}
            <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1 font-medium">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>১০০% নিরাপদ ও সুরক্ষিত পেমেন্ট</span>
            </div>

          </div>
        ) : (
          /* Step 2: Compact Confirmation with Selected Gateway */
          <div className="p-5 space-y-4 font-['Hind_Siliguri',sans-serif]">
            
            {/* Account Number Box */}
            <div className={`p-3.5 rounded-2xl border ${
              selectedMethod === 'bkash' 
                ? 'bg-pink-50/50 border-pink-200' 
                : 'bg-orange-50/50 border-orange-200'
            }`}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-600 font-semibold text-[11px]">
                  {selectedMethod === 'bkash' ? 'বিকাশ নম্বর' : 'নগদ নম্বর'}:
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  Personal
                </span>
              </div>

              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200">
                <span className="font-mono text-sm font-black text-slate-900 tracking-wider">
                  {currentNumber}
                </span>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedNumber ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>কপি</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Form Input */}
            <form onSubmit={handleConfirmPayment} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  আপনার মোবাইল নম্বর / Transaction ID (ঐচ্ছিক):
                </label>
                <input
                  type="text"
                  value={senderInfo}
                  onChange={(e) => setSenderInfo(e.target.value)}
                  placeholder="017XXXXXXXX বা TrxID"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              {errorMessage && (
                <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-[11px] font-semibold text-center">
                  {errorMessage}
                </div>
              )}

              {/* Big Gateway Colored Action Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 active:scale-98 ${
                  selectedMethod === 'bkash'
                    ? 'bg-[#E2136E] hover:bg-[#C90E5F] shadow-pink-500/20'
                    : 'bg-[#EA1D25] hover:bg-[#D0151C] shadow-orange-500/20'
                }`}
              >
                {isProcessing ? (
                  <span>যাচাই হচ্ছে...</span>
                ) : (
                  <>
                    <span>পেমেন্ট নিশ্চিত করুন (৳{payableAmount})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setSelectedMethod(null);
                setErrorMessage('');
              }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer pt-1"
            >
              ← অন্য মাধ্যমে পেমেন্ট করুন
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
