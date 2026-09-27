import React, { useState } from 'react';
import { Tag, Plus, Pencil, Trash2, CheckCircle2, XCircle, Percent, DollarSign, X } from 'lucide-react';

export const CouponsTab = ({
  coupons = [],
  setCoupons,
  showToast
}) => {
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingCoupon({
      id: `c-${Date.now()}`,
      code: '',
      discount: 20,
      type: 'percent',
      minAmount: 1000,
      isActive: true,
      description: 'স্পেশাল ডিসকাউন্ট কুপন'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (coupon) => {
    setEditingCoupon({ ...coupon });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingCoupon.code.trim()) {
      showToast('অনুগ্রহ করে কুপন কোড লিখুন');
      return;
    }

    const cleanCode = editingCoupon.code.trim().toUpperCase();
    const isExisting = coupons.some(c => c.id === editingCoupon.id);

    if (isExisting) {
      setCoupons(prev => prev.map(c => c.id === editingCoupon.id ? { ...editingCoupon, code: cleanCode } : c));
      showToast('কুপন সফলভাবে আপডেট হয়েছে!');
    } else {
      setCoupons(prev => [{ ...editingCoupon, code: cleanCode }, ...prev]);
      showToast('নতুন কুপন কোড যুক্ত করা হয়েছে!');
    }

    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  const handleToggleActive = (id) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
    showToast('কুপনের স্ট্যাটাস পরিবর্তিত হয়েছে');
  };

  const handleDelete = (id, code) => {
    if (window.confirm(`আপনি কি "${code}" কুপনটি মুছে ফেলতে চান?`)) {
      setCoupons(prev => prev.filter(c => c.id !== id));
      showToast('কুপন মুছে ফেলা হয়েছে');
    }
  };

  const activeCount = coupons.filter(c => c.isActive).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-['Hind_Siliguri',sans-serif]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            কুপন ও ডিসকাউন্ট ভাউচার ({coupons.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            শিক্ষার্থীদের জন্য প্রোমোকোড তৈরি করুন এবং পার্সেন্টেজ (%) বা ফ্ল্যাট (৳) ছাড় প্রদান করুন
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কুপন তৈরি করুন</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500">মোট কুপন</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif] mt-0.5">
            {coupons.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-600">সক্রিয় কুপন</p>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 font-['Outfit',sans-serif] mt-0.5">
            {activeCount}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500">নিষ্ক্রিয় কুপন</p>
          <p className="text-xl sm:text-2xl font-black text-slate-400 font-['Outfit',sans-serif] mt-0.5">
            {coupons.length - activeCount}
          </p>
        </div>
      </div>

      {/* Coupons List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map(coupon => (
          <div 
            key={coupon.id} 
            className={`p-5 rounded-2xl border bg-white shadow-xs transition-all flex flex-col justify-between space-y-4 ${
              coupon.isActive ? 'border-slate-200' : 'border-slate-200 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono font-black text-sm tracking-wider">
                    {coupon.code}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    coupon.type === 'percent' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {coupon.type === 'percent' ? `${coupon.discount}% ছাড়` : `৳${coupon.discount} ফ্ল্যাট ছাড়`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleActive(coupon.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    coupon.isActive 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {coupon.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span>{coupon.isActive ? 'সক্রিয়' : 'বন্ধ'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 font-medium">{coupon.description || 'কুপনের বিবরণ দেওয়া হয়নি'}</p>
              {coupon.minAmount > 0 && (
                <p className="text-[11px] text-slate-400 mt-1">
                  সর্বনিম্ন কার্ট অর্ডার: <span className="font-bold text-slate-700">৳{coupon.minAmount}</span>
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(coupon)}
                className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>এডিট</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(coupon.id, coupon.code)}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ডিলিট</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Coupon Modal */}
      {isModalOpen && editingCoupon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {coupons.some(c => c.id === editingCoupon.id) ? 'কুপন সম্পাদনা করুন' : 'নতুন কুপন তৈরি করুন'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  কুপন কোড (যেমন: HACKS20) *
                </label>
                <input
                  type="text"
                  required
                  value={editingCoupon.code}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="EX: HACKS25"
                  className="w-full px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ছাড়ের ধরণ</label>
                  <select
                    value={editingCoupon.type}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, type: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <option value="percent">শতাংশ (%)</option>
                    <option value="flat">নির্দিষ্ট টাকা (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ছাড়ের পরিমাণ ({editingCoupon.type === 'percent' ? '%' : '৳'}) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingCoupon.discount}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, discount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  সর্বনিম্ন কোর্স মূল্য (Min Order ৳)
                </label>
                <input
                  type="number"
                  min={0}
                  value={editingCoupon.minAmount || 0}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, minAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">বিবরণ / নোট</label>
                <input
                  type="text"
                  value={editingCoupon.description || ''}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, description: e.target.value })}
                  placeholder="যেমন: এইচএসসি ২৫ ও ২৬ ব্যাচ স্পেশাল"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
