import React, { useState, useEffect } from 'react';
import { ArrowLeft, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ADMIN_CREDENTIALS } from '../lib/authConfig';

export const LoginPage = ({
  onBack,
  onLoginSuccess
}) => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(45);

  // Timer countdown for OTP
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');

    if (!cleanPhone.startsWith('01')) {
      setError('মোবাইল নাম্বারটি অবশ্যই 01 দিয়ে শুরু হতে হবে');
      return;
    }

    if (cleanPhone.length !== 11) {
      setError('সঠিক ১১ ডিজিটের মোবাইল নাম্বার প্রদান করুন');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setTimer(45);
      // Pre-fill test OTP for frictionless experience
      setOtp(['1', '2', '3', '4']);
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError('');

    const fullOtp = otp.join('');
    if (fullOtp.length !== 4) {
      setError('৪ ডিজিটের ভেরিফিকেশন কোড লিখুন');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
      const isRegisteredAdmin = cleanPhone === '01712345678' || cleanPhone === '01700000000';

      const loggedUser = {
        id: `user_${cleanPhone}`,
        name: isRegisteredAdmin ? 'সাজ্জাদুল ইসলাম' : `শিক্ষার্থী (${cleanPhone.slice(-4)})`,
        email: isRegisteredAdmin ? ADMIN_CREDENTIALS.email : `${cleanPhone}@academichacks.edu.bd`,
        phone: cleanPhone,
        role: isRegisteredAdmin ? 'admin' : 'student',
        isAdmin: isRegisteredAdmin,
        enrolledCourses: []
      };

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      onLoginSuccess(loggedUser);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 font-['Hind_Siliguri',sans-serif]">
      
      {/* Top Bar with Back Button */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমপেজে ফিরে যান</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          Academic Hacks Authentication
        </span>
      </div>

      {/* Main Centered Card with Colorful Gradient Glow Border */}
      <div className="flex-1 flex items-center justify-center py-6">
        
        {/* Outer Gradient Border Wrapper (matching the reference image's glow) */}
        <div className="relative p-[2px] rounded-[30px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-[0_10px_45px_rgba(236,72,153,0.15)] max-w-md w-full">
          
          {/* Inner Card */}
          <div className="bg-white rounded-[28px] p-6 sm:p-9 space-y-6">
            
            {step === 'phone' && (
              <>
                {/* Header: মোবাইল নাম্বার দিয়ে এগিয়ে যান */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    মোবাইল নাম্বার দিয়ে এগিয়ে যান
                  </h2>
                </div>

                {/* Form */}
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  
                  {/* Phone Input Box with Red Border (matching screenshot) */}
                  <div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      maxLength={11}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl border-2 border-[#EB3349] text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 tracking-wider"
                      autoFocus
                    />
                  </div>

                  {/* Warning Notice Box (matching screenshot) */}
                  <div className="text-center space-y-1.5 pt-1">
                    <div className="text-2xl flex items-center justify-center">
                      <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-sm font-black">
                        ⚠️
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#E53950]">
                      Notice
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      একই নম্বর দিয়ে একসঙ্গে দুইটি ডিভাইসে লগইন করতে পারবে।
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      তৃতীয় ডিভাইসে চেষ্টা করলে Log in হবে না।
                    </p>
                  </div>

                  {error && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold text-center">
                      {error}
                    </div>
                  )}

                  {/* Red Submit Button (matching screenshot) */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#EB3349] hover:bg-[#D9253B] active:scale-[0.99] shadow-md hover:shadow-lg transition-all cursor-pointer text-center block disabled:opacity-60"
                  >
                    {isLoading ? 'যাচাই করা হচ্ছে...' : 'সাবমিট করুন'}
                  </button>
                </form>
              </>
            )}

            {/* Step 2: 4-digit OTP Verification */}
            {step === 'otp' && (
              <div className="space-y-5">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#EB3349] flex items-center justify-center mx-auto text-xl font-bold">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    ভেরিফিকেশন কোড লিখুন
                  </h3>
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-800">+88 {phone}</span> নম্বরে ৪-সংখ্যার OTP কোড পাঠানো হয়েছে
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-xs font-bold text-indigo-600 hover:underline inline-block pt-1 cursor-pointer"
                  >
                    নম্বর পরিবর্তন করুন
                  </button>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-5">
                  <div className="flex justify-center gap-2.5 sm:gap-3">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black rounded-xl border-2 border-slate-200 focus:border-[#EB3349] focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-mono text-slate-900"
                      />
                    ))}
                  </div>

                  <p className="text-center text-xs text-slate-400">
                    টেস্ট কোড: <span className="font-bold text-slate-700">1234</span>
                  </p>

                  {error && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold text-center">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#EB3349] hover:bg-[#D9253B] shadow-md hover:shadow-lg transition-all cursor-pointer text-center block disabled:opacity-60"
                  >
                    {isLoading ? 'লগইন হচ্ছে...' : 'লগইন সম্পন্ন করুন'}
                  </button>

                  <div className="text-center text-xs text-slate-500 font-medium">
                    {timer > 0 ? (
                      <span>পুনরায় কোড পাঠান ({`০০:${timer < 10 ? '0' : ''}${timer}`})</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setTimer(45)}
                        className="text-indigo-600 font-bold hover:underline cursor-pointer"
                      >
                        পুনরায় কোড পাঠান
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Footer copyright note */}
      <div className="text-center text-xs text-slate-400 font-medium">
        © 2026 Academic Hacks. All rights reserved.
      </div>

    </div>
  );
};
