import React, { useState } from 'react';
import { Save, Check, Copy, AlertCircle, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';
import { BkashIcon, NagadIcon } from '../PaymentLogos';

export const PaymentSettingsTab = ({
  siteSettings,
  setSiteSettings,
  showToast
}) => {
  const [formData, setFormData] = useState({
    bkashNumber: siteSettings.bkashNumber || '01700-123456',
    bkashType: siteSettings.bkashType || 'Send Money (Personal)',
    isBkashActive: siteSettings.isBkashActive !== undefined ? siteSettings.isBkashActive : true,

    nagadNumber: siteSettings.nagadNumber || '01800-654321',
    nagadType: siteSettings.nagadType || 'Send Money (Personal)',
    isNagadActive: siteSettings.isNagadActive !== undefined ? siteSettings.isNagadActive : true,

    rocketNumber: siteSettings.rocketNumber || '01900-112233',
    rocketType: siteSettings.rocketType || 'Send Money (Personal)',
    isRocketActive: siteSettings.isRocketActive || false,

    paymentInstructions: siteSettings.paymentInstructions || 'প্রথমে আপনার বিকাশ বা নগদ অ্যাপ থেকে উল্লেখিত নম্বরে নির্ধারিত ফি সেন্ড মানি করুন। এরপর যে মোবাইল নম্বর থেকে টাকা পাঠিয়েছেন এবং প্রাপ্ত ট্রানজেকশন আইডি (TrxID) নিচে লিখে সাবমিট করুন।'
  });

  const [previewMethod, setPreviewMethod] = useState('bkash');
  const [previewCopied, setPreviewCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...siteSettings,
      ...formData
    };
    setSiteSettings(updated);
    showToast('পেমেন্ট গেটওয়ে সেটিংস সফলভাবে আপডেট ও সংরক্ষিত হয়েছে!');
  };

  const currentPreviewNumber = previewMethod === 'bkash' ? formData.bkashNumber : formData.nagadNumber;
  const currentPreviewType = previewMethod === 'bkash' ? formData.bkashType : formData.nagadType;

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-['Hind_Siliguri',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            বিকাশ ও নগদ পেমেন্ট সেটিংস
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            শিক্ষার্থীদের কোর্স ক্রয়ের জন্য বিকাশ ও নগদ নম্বর, অ্যাকাউন্ট টাইপ এবং নির্দেশনা নিয়ন্ত্রণ করুন
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            লাইভ গেটওয়ে সক্রিয়
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: The Settings Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
          
          {/* bKash Settings Card */}
          <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-pink-50 pb-3">
              <div className="flex items-center gap-3">
                <BkashIcon className="w-10 h-10 rounded-xl shadow-xs" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">বিকাশ (bKash) সেটিংস</h3>
                  <p className="text-[11px] text-pink-600 font-medium">অফিসিয়াল বিকাশ পেমেন্ট চ্যানেল</p>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBkashActive}
                  onChange={(e) => setFormData({ ...formData, isBkashActive: e.target.checked })}
                  className="rounded text-pink-600 focus:ring-pink-500 w-4 h-4"
                />
                <span>সক্রিয় রাখুন</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  বিকাশ নম্বর *
                </label>
                <input
                  type="text"
                  required
                  value={formData.bkashNumber}
                  onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                  placeholder="017XXXXXXXX"
                  className="w-full px-3.5 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  অ্যাকাউন্ট টাইপ
                </label>
                <select
                  value={formData.bkashType}
                  onChange={(e) => setFormData({ ...formData, bkashType: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                >
                  <option value="Send Money (Personal)">Send Money (Personal)</option>
                  <option value="Merchant (Payment)">Merchant (Payment)</option>
                  <option value="Agent (Cash In)">Agent (Cash In)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Nagad Settings Card */}
          <div className="bg-white rounded-2xl border-2 border-orange-100 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-orange-50 pb-3">
              <div className="flex items-center gap-3">
                <NagadIcon className="w-10 h-10 rounded-xl shadow-xs" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">নগদ (Nagad) সেটিংস</h3>
                  <p className="text-[11px] text-orange-600 font-medium">অফিসিয়াল নগদ পেমেন্ট চ্যানেল</p>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNagadActive}
                  onChange={(e) => setFormData({ ...formData, isNagadActive: e.target.checked })}
                  className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                />
                <span>সক্রিয় রাখুন</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  নগদ নম্বর *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nagadNumber}
                  onChange={(e) => setFormData({ ...formData, nagadNumber: e.target.value })}
                  placeholder="018XXXXXXXX"
                  className="w-full px-3.5 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  অ্যাকাউন্ট টাইপ
                </label>
                <select
                  value={formData.nagadType}
                  onChange={(e) => setFormData({ ...formData, nagadType: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                >
                  <option value="Send Money (Personal)">Send Money (Personal)</option>
                  <option value="Merchant (Payment)">Merchant (Payment)</option>
                  <option value="Agent (Cash In)">Agent (Cash In)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-800">
              শিক্ষার্থীদের জন্য পেমেন্ট নির্দেশিকা (Instructions)
            </h3>
            <textarea
              rows={3}
              value={formData.paymentInstructions}
              onChange={(e) => setFormData({ ...formData, paymentInstructions: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              placeholder="পেমেন্ট করার নিয়মাবলী এখানে লিখুন..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>পেমেন্ট সেটিংস সংরক্ষণ করুন (Save Gateway Settings)</span>
          </button>
        </form>

        {/* Right 5 Cols: Live Student Modal Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-2.5 text-indigo-900 text-xs">
            <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <div>
              <p className="font-bold">লাইভ প্রিভিউ (Live Preview)</p>
              <p className="text-[11px] text-indigo-700">শিক্ষার্থীরা মোডালে ঠিক যেভাবে বিকাশ ও নগদ দেখবে</p>
            </div>
          </div>

          {/* Modal Mockup Container */}
          <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-200 space-y-4">
            
            {/* Header Mockup */}
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {previewMethod === 'bkash' ? (
                  <BkashIcon className="w-7 h-7 rounded-lg shadow-xs" />
                ) : (
                  <NagadIcon className="w-7 h-7 rounded-lg shadow-xs" />
                )}
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {previewMethod === 'bkash' ? 'বিকাশ পেমেন্ট' : 'নগদ পেমেন্ট'}
                  </h4>
                  <p className="text-[10px] text-rose-600 font-bold">প্রদেয় ফি: ৳৩,৩০০</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                ডেমো ভিউ
              </span>
            </div>

            {/* Method switch buttons in mockup */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPreviewMethod('bkash')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                  previewMethod === 'bkash'
                    ? 'border-pink-500 bg-pink-50/50'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <BkashIcon className="w-6 h-6 rounded-md" />
                <span className="text-xs font-bold text-slate-900">বিকাশ</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewMethod('nagad')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                  previewMethod === 'nagad'
                    ? 'border-orange-500 bg-orange-50/50'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <NagadIcon className="w-6 h-6 rounded-md" />
                <span className="text-xs font-bold text-slate-900">নগদ</span>
              </button>
            </div>

            {/* Account Box Mockup */}
            <div className={`p-3.5 rounded-xl border ${
              previewMethod === 'bkash' ? 'bg-pink-50/40 border-pink-200' : 'bg-orange-50/40 border-orange-200'
            }`}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-600 font-semibold text-[11px]">
                  {previewMethod === 'bkash' ? 'বিকাশ নম্বর:' : 'নগদ নম্বর:'}
                </span>
                <span className="text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {currentPreviewType}
                </span>
              </div>

              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200">
                <span className="font-mono text-sm font-black text-slate-900">
                  {currentPreviewNumber}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewCopied(true);
                    setTimeout(() => setPreviewCopied(false), 1500);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  {previewCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{previewCopied ? 'কপি হয়েছে' : 'কপি'}</span>
                </button>
              </div>
            </div>

            {/* Instructions box in mockup */}
            <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-600 leading-relaxed border border-slate-200/80">
              <span className="font-bold text-slate-800 block mb-0.5">নিয়মাবলী:</span>
              {formData.paymentInstructions}
            </div>

            {/* Safety note */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-medium text-emerald-700 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>১০০% নিরাপদ ও সুরক্ষিত ডিজিটাল পেমেন্ট</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
