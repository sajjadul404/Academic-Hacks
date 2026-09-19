import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Phone, Lock, ArrowRight, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { User } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
            const newUser: User = {
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
            const loggedUser: User = {
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

      // Fast fallback simulation for instant smooth preview
      setTimeout(() => {
        const dummyUser: User = {
          id: 'user_' + Date.now(),
          name: mode === 'register' ? (name || 'শিক্ষার্থী') : (email.split('@')[0] || 'তানভীর হাসান'),
          email: email || 'student@edupath.bd',
          phone: phone || '01700000000',
          enrolledCourses: []
        };
        setLoading(false);
        onLoginSuccess(dummyUser);
        onClose();
      }, 700);

    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'অথেন্টিকেশনে সমস্যা হয়েছে, পুনরায় চেষ্টা করুন।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <UserIcon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            {mode === 'login' ? 'EduPath-এ লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'login' ? 'আপনার অ্যাকাউন্টে লগইন করে ক্লাসে যুক্ত হন' : 'আজই রেজিস্ট্রেশন করে ফ্রি ক্লাস ও স্পেশাল অফার উপভোগ করুন'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            লগইন (Login)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            রেজিস্ট্রেশন (Register)
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: তানভীর হাসান"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>যাচাই করা হচ্ছে...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'লগইন করুন' : 'রেজিস্ট্রেশন সম্পন্ন করুন'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-indigo-500" />
            <span>Supabase Auth ও এনক্রিপ্টেড ডাটা সুরক্ষা</span>
          </p>
        </div>

      </div>
    </div>
  );
};
