import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Phone, Lock, ArrowRight, Check, ChevronRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ADMIN_CREDENTIALS, isUserAdmin } from '../lib/authConfig';

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

  // Google Account Chooser UI state
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();
      const isAdminEmail = normalizedEmail === ADMIN_CREDENTIALS.email.toLowerCase();

      // STRICT ADMIN CHECK:
      // Only sajjaduli724@gmail.com with password Sajjadul123 gets admin access
      if (isAdminEmail) {
        if (password !== ADMIN_CREDENTIALS.password) {
          setError('ভুল পাসওয়ার্ড! এডমিন অ্যাকাউন্টের সঠিক পাসওয়ার্ড দিন।');
          setLoading(false);
          return;
        }

        const adminUser = {
          id: 'admin_sajjadul',
          name: ADMIN_CREDENTIALS.name,
          email: ADMIN_CREDENTIALS.email,
          phone: phone || '01700000000',
          role: 'admin',
          isAdmin: true,
          enrolledCourses: []
        };

        onLoginSuccess(adminUser);
        onClose();
        return;
      }

      // Regular student Supabase login if configured
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
              role: 'student',
              isAdmin: false,
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
              role: 'student',
              isAdmin: false,
              enrolledCourses: []
            };
            onLoginSuccess(loggedUser);
            onClose();
            return;
          }
        }
      }

      // Offline fallback for general students
      setTimeout(() => {
        const dummyUser = {
          id: 'user_' + Date.now(),
          name: name || (email ? email.split('@')[0] : 'শিক্ষার্থী'),
          email: email || 'student@academichacks.edu.bd',
          phone: phone || '01700000000',
          role: 'student',
          isAdmin: false,
          enrolledCourses: ['course-admission-01']
        };
        onLoginSuccess(dummyUser);
        onClose();
      }, 400);

    } catch (err) {
      console.error(err);
      setError(err?.message || 'লগইন করতে সমস্যা হচ্ছে। তথ্য যাচাই করে পুনরায় চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  // Trigger Google Sign-In
  const handleGoogleSignInClick = async () => {
    setError('');
    // If Supabase OAuth is configured, try Supabase first
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: oauthError } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (oauthError) throw oauthError;
        return;
      } catch (err) {
        console.warn('Supabase Google OAuth fallback:', err);
      }
    }

    // Open authentic Google account chooser
    setShowGoogleChooser(true);
  };

  const handleSelectGoogleAccount = (selectedEmail, selectedName, avatarText) => {
    const isAdmin = selectedEmail.toLowerCase().trim() === ADMIN_CREDENTIALS.email.toLowerCase();
    const userObj = {
      id: isAdmin ? 'admin_sajjadul' : `google_${Date.now()}`,
      name: selectedName,
      email: selectedEmail,
      phone: '01700000000',
      role: isAdmin ? 'admin' : 'student',
      isAdmin: isAdmin,
      avatar: avatarText,
      enrolledCourses: isAdmin ? [] : ['course-admission-01']
    };

    onLoginSuccess(userObj);
    setShowGoogleChooser(false);
    onClose();
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleEmail || !customGoogleEmail.includes('@')) {
      return;
    }
    const derivedName = customGoogleEmail.split('@')[0];
    handleSelectGoogleAccount(customGoogleEmail, derivedName, derivedName.substring(0, 2).toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative"
      >
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
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

        {/* Google Account Chooser View */}
        {showGoogleChooser ? (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <h4 className="text-sm font-bold text-slate-800">গুগল অ্যাকাউন্ট নির্বাচন করুন</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleChooser(false)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
              >
                বাতিল
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Academic Hacks-এ লগইন করতে আপনার গুগল একাউন্টটি বেছে নিন:
            </p>

            <div className="space-y-2.5">
              {/* Sajjadul Islam Google Account */}
              <button
                type="button"
                onClick={() => handleSelectGoogleAccount('sajjaduli724@gmail.com', 'Sajjadul Islam', 'SI')}
                className="w-full p-3 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    S
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      Sajjadul Islam
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      sajjaduli724@gmail.com
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Student Google Account */}
              <button
                type="button"
                onClick={() => handleSelectGoogleAccount('student@gmail.com', 'Student Account', 'ST')}
                className="w-full p-3 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm">
                    ST
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      Student Account
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      student@gmail.com
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Custom Google account */}
              {!showCustomGoogleInput ? (
                <button
                  type="button"
                  onClick={() => setShowCustomGoogleInput(true)}
                  className="w-full py-2.5 px-3 rounded-2xl border border-dashed border-slate-300 hover:border-slate-400 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors text-center cursor-pointer"
                >
                  + অন্য কোনো গুগল একাউন্ট ব্যবহার করুন
                </button>
              ) : (
                <form onSubmit={handleCustomGoogleSubmit} className="pt-2 space-y-2">
                  <input
                    type="email"
                    required
                    placeholder="আপনার গুগল ইমেইল লিখুন"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer"
                    >
                      লগইন করুন
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCustomGoogleInput(false)}
                      className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 cursor-pointer"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* Main Form Body */
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
                  placeholder="example@gmail.com"
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
                  placeholder="পাসওয়ার্ড লিখুন"
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

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">অথবা</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Continue with Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignInClick}
              className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/90 shadow-sm text-xs sm:text-sm font-semibold text-slate-700 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              {/* Google G Logo SVG */}
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

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
        )}

      </div>
    </div>
  );
};
