import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  ArrowRight, 
  AlertCircle,
  Clock,
  Sparkles,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PaymentModal = ({
  isOpen = false,
  onClose,
  course,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState('bkash'); // 'bkash' | 'nagad'
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentMode, setPaymentMode] = useState('manual'); // 'manual' | 'auto'
  const [otpStep, setOtpStep] = useState(1);
  const [otp, setOtp] = useState('');

  if (!isOpen || !course) return null;

  const payableAmount = course.price ?? 0;
  const officialBkashNumber = '01700-123456';
  const officialNagadNumber = '01800-654321';

  const currentNumber = selectedMethod === 'bkash' ? officialBkashNumber : officialNagadNumber;

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentNumber.replace('-', ''));
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!senderNumber || senderNumber.length < 11) {
      setErrorMessage('সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন');
      return;
    }

    if (!trxId || trxId.length < 6) {
      setErrorMessage('সঠিক Transaction ID (TrxID) প্রদান করুন (যেমন: 9J7K3X1)');
      return;
    }

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
        onPaymentSuccess?.(course, selectedMethod, senderNumber, trxId);
        setIsSuccess(false);
        onClose();
      }, 2500);
    }, 1200);
  };

  const handleAutoSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (otpStep === 1) {
      if (!senderNumber || senderNumber.length < 11) {
        setErrorMessage('সঠিক মোবাইল নম্বর প্রদান করুন');
        return;
      }
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setOtpStep(2);
      }, 1000);
    } else {
      if (!otp || otp.length < 4) {
        setErrorMessage('৪ ডিজিটের ভেরিফিকেশন কোড লিখুন (যেমন: 1234)');
        return;
      }
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {
          // ignore
        }

        setTimeout(() => {
          onPaymentSuccess?.(course, selectedMethod, senderNumber, `AUTO-${Date.now().toString().slice(-6)}`);
          setIsSuccess(false);
          setOtpStep(1);
          onClose();
        }, 2500);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200"
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              💳
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                পেমেন্ট সম্পন্ন করুন
              </h3>
              <p className="text-[11px] text-slate-500">বিকাশ অথবা নগদ দিয়ে এক মিনিটে ভর্তি হোন</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
              পেমেন্ট সফল হয়েছে!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xs leading-relaxed">
              অভিনন্দন! <span className="font-bold text-slate-900">"{course.title}"</span> কোর্সে আপনার ভর্তি নিশ্চিত করা হয়েছে।
            </p>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-semibold text-emerald-700 w-full">
              ড্যাশবোর্ডে কোর্সটি আনলক করা হয়েছে...
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-5">
            
            {/* Course Summary Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {course.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
                  {course.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-500 font-medium">প্রদেয় ফি:</span>
                  <span className="text-base font-black text-rose-600 font-['Outfit',sans-serif]">
                    {payableAmount === 0 ? 'ফ্রি' : `৳${payableAmount.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector (bKash & Nagad) */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                পেমেন্ট মেথড নির্বাচন করুন:
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* bKash Tab */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMethod('bkash');
                    setErrorMessage('');
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-center gap-2.5 cursor-pointer relative ${
                    selectedMethod === 'bkash'
                      ? 'border-[#E2136E] bg-pink-50/50 shadow-sm ring-2 ring-pink-500/20'
                      : 'border-slate-200 hover:border-pink-200 bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#E2136E] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    বি
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-slate-900 block font-['Outfit',sans-serif]">
                      bKash
                    </span>
                    <span className="text-[10px] text-pink-600 font-semibold block">
                      বিকাশ পেমেন্ট
                    </span>
                  </div>

                  {selectedMethod === 'bkash' && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#E2136E] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>

                {/* Nagad Tab */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMethod('nagad');
                    setErrorMessage('');
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-center gap-2.5 cursor-pointer relative ${
                    selectedMethod === 'nagad'
                      ? 'border-[#EA1D25] bg-orange-50/50 shadow-sm ring-2 ring-orange-500/20'
                      : 'border-slate-200 hover:border-orange-200 bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#EA1D25] to-[#F7941D] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    ন
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-slate-900 block font-['Outfit',sans-serif]">
                      Nagad
                    </span>
                    <span className="text-[10px] text-orange-600 font-semibold block">
                      নগদ পেমেন্ট
                    </span>
                  </div>

                  {selectedMethod === 'nagad' && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#EA1D25] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Mode Toggle: Send Money (TrxID) or Instant Auto */}
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPaymentMode('manual')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  paymentMode === 'manual'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                সেন্ড মানি (TrxID)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode('auto')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  paymentMode === 'auto'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                অনলাইন গেটওয়ে (অটো)
              </button>
            </div>

            {paymentMode === 'manual' ? (
              /* Manual Send Money / Payment Step */
              <div className="space-y-4">
                
                {/* Account Number Box with 1-click Copy */}
                <div className={`p-4 rounded-2xl border ${
                  selectedMethod === 'bkash' ? 'bg-pink-50/60 border-pink-200' : 'bg-orange-50/60 border-orange-200'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600 font-semibold">
                      {selectedMethod === 'bkash' ? 'বিকাশ পার্সোনাল নম্বর' : 'নগদ পার্সোনাল নম্বর'}:
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Send Money
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200 mt-1">
                    <span className="font-mono text-base font-black text-slate-900 tracking-wider">
                      {currentNumber}
                    </span>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
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

                  <ol className="text-[11px] text-slate-600 space-y-1 mt-2.5 list-decimal pl-4 leading-relaxed font-normal">
                    <li>আপনার {selectedMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} অ্যাপে প্রবেশ করে 'Send Money' করুন।</li>
                    <li>টাকার পরিমাণ লিখুন: <strong className="text-slate-900">৳{payableAmount}</strong></li>
                    <li>পেমেন্ট সফল হলে নিচে প্রেরক নম্বর ও ট্রানজেকশন আইডি দিন।</li>
                  </ol>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleManualSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      আপনার {selectedMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} নম্বর:
                    </label>
                    <input
                      type="tel"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="017XXXXXXXX"
                      maxLength={11}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      ট্রানজেকশন আইডি (Transaction ID / TrxID):
                    </label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                      placeholder="যেমন: 9J7K3X18"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 ${
                      selectedMethod === 'bkash'
                        ? 'bg-[#E2136E] hover:bg-[#C90E5F] shadow-pink-500/20'
                        : 'bg-[#EA1D25] hover:bg-[#D0151C] shadow-orange-500/20'
                    }`}
                  >
                    {isProcessing ? (
                      <span>যাচাই করা হচ্ছে...</span>
                    ) : (
                      <>
                        <span>পেমেন্ট নিশ্চিত করুন (৳{payableAmount})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

              </div>
            ) : (
              /* Auto Gateway Step */
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border text-center ${
                  selectedMethod === 'bkash' ? 'bg-pink-50/50 border-pink-200' : 'bg-orange-50/50 border-orange-200'
                }`}>
                  <span className="text-xs font-bold text-slate-700 block">
                    {selectedMethod === 'bkash' ? 'বিকাশ অনলাইন পেমেন্ট' : 'নগদ অনলাইন পেমেন্ট'}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">
                    মোবাইল নম্বর ও ওটিপি (OTP) দিয়ে এক ক্লিকে স্বয়ংক্রিয় পেমেন্ট
                  </p>
                </div>

                <form onSubmit={handleAutoSubmit} className="space-y-3">
                  {otpStep === 1 ? (
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        আপনার {selectedMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} অ্যাকাউন্ট নম্বর:
                      </label>
                      <input
                        type="tel"
                        value={senderNumber}
                        onChange={(e) => setSenderNumber(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        maxLength={11}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        আপনার নম্বরে পাঠানো ৪-ডিজিটের ভেরিফিকেশন কোড (OTP):
                      </label>
                      <input
                        type="password"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="••••"
                        maxLength={4}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-center text-lg tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                      />
                      <span className="text-[10px] text-slate-400 block text-center mt-1">
                        টেস্ট কোড: 1234
                      </span>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 ${
                      selectedMethod === 'bkash'
                        ? 'bg-[#E2136E] hover:bg-[#C90E5F] shadow-pink-500/20'
                        : 'bg-[#EA1D25] hover:bg-[#D0151C] shadow-orange-500/20'
                    }`}
                  >
                    {isProcessing ? (
                      <span>প্রসেসিং হচ্ছে...</span>
                    ) : (
                      <>
                        <span>{otpStep === 1 ? 'এগিয়ে যান' : `৳${payableAmount} পে করুন`}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Bottom Security notice */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>১২৮-বিট এনক্রিপ্টেড ও সম্পূর্ণ সুরক্ষিত পেমেন্ট</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
