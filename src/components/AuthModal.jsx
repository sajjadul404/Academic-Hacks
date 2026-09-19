import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Phone, Lock, ArrowRight, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const AuthModal = ({
  isOpen = false,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        if (mode === 'register') {
          const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { name, phone }
            }
          });
          if (signUpError) throw signUpError;
          if (data.user) {
            const newUser = {
              id: data.user.id,
              name: name || email.split('@')[0],
              email: data.user.email || email,
              phone,
              enrolledCourses: []
            };
            onLoginSuccess(newUser);
            onClose();
            return;
          }
        } else {
          const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (signInError) throw signInError;
          if (data.user) {
            const loggedUser = {
              id: data.user.id,
              name: data.user.user_metadata?.name || email.split('@')[0],
              email: data.user.email || email,
              phone: data.user.user_metadata?.phone,
              enrolledCourses: []
            };
            onLoginSuccess(loggedUser);
            onClose();
            return;
          }
        }
      }

      // Offline fallback: simulate instantaneous login/registration
      setTimeout(() => {
        const dummyUser = {
          id: 'user_' + Date.now(),
          name: name || (email ? email.split('@')[0] : 'শিক্ষার্থী'),
          email: email || 'student@academichacks.edu.bd',
          phone: phone || '01700000000',
          enrolledCourses: ['course-admission-01']
        };
        onLoginSuccess(dummyUser);
        onClose();
      }, 500);

    } catch (err) {
      console.error(err);
      setError(err?.message || 'লগইন করতে সমস্যা হচ্ছে। তথ্য যাচাই করে পুনরায় চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudentLogin = () => {
    const demoUser = {
      id: 'demo_student_01',
      name: 'সাদিয়া তাসনিম',
      email: 'sadia.buet26@gmail.com',
      phone: '01812345678',
      enrolledCourses: ['course-admission-01', 'course-eng-01']
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
              {mode === 'login' ? 'সাইন ইন' : 'নতুন একাউন্ট'}
            </span>
            <span className="text-xs text-indigo-200">• Academic Hacks</span>
          </div>

          <h3 className="text-2xl font-black font-['Outfit',sans-serif]">
            {mode === 'login' ? 'স্বাগতম ফিরে আসার জন্য!' : 'আপনার যাত্রা শুরু করুন'}
          </h3>
          <p className="text-xs text-indigo-100 mt-1">
            {mode === 'login' 
              ? 'আপনার ইমেইল ও পাসওয়ার্ড দিয়ে অ্যাকাউন্টে লগইন করুন' 
              : 'একটি ফ্রি একাউন্ট খুলে ১০০০+ কোর্সের অ্যাক্সেস নিন'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-semibold">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">আপনার পূর্ণ নাম</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: তানভীর আহমেদ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">ইমেইল ঠিকানা</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">মোবাইল নম্বর (ঐচ্ছিক)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="017XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'অনুগ্রহ করে অপেক্ষা করুন...' : (mode === 'login' ? 'লগইন করুন' : 'রেজিস্ট্রেশন করুন')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo One-Click Login */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDemoStudentLogin}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ডেমো শিক্ষার্থী হিসেবে ১-ক্লিকে প্রবেশ করুন</span>
            </button>
          </div>

          {/* Switch Mode */}
          <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
            {mode === 'login' ? (
              <p>
                নতুন শিক্ষার্থী?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  বিনামূল্যে একাউন্ট খুলুন
                </button>
              </p>
            ) : (
              <p>
                ইতিমধ্যে একাউন্ট আছে?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  লগইন করুন
                </button>
              </p>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
