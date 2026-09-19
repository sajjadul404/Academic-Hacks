import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartDrawer = ({
  isOpen = false,
  onClose,
  cart = [],
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('bkash');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const rawTotal = cart.reduce((sum, item) => sum + item.course.price, 0);
  const discountAmount = Math.round((rawTotal * appliedDiscount) / 100);
  const grandTotal = Math.max(0, rawTotal - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.toUpperCase();
    if (code === 'HACKS20' || code === 'EDUPATH20' || code === 'DISCOUNT20') {
      setAppliedDiscount(20);
    } else if (code === 'FREE100') {
      setAppliedDiscount(100);
    } else {
      setCouponError('অবৈধ কুপন কোড! ট্রাই করুন: HACKS20');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const purchasedIds = cart.map(item => item.course.id);
      setTimeout(() => {
        onCheckoutSuccess(purchasedIds);
        setPaymentSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                  আপনার কার্ট ({cart.length})
                </h3>
                <p className="text-xs text-slate-400">নিশ্চিন্তে এনরোল সম্পন্ন করুন</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success screen state */}
          {paymentSuccess ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                অভিনন্দন! এনরোলমেন্ট সফল
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                কোর্সটি আপনার ড্যাশবোর্ডে যুক্ত হয়েছে। কিছুক্ষণের মধ্যে লাইভ ক্লাস শুরু করতে পারবেন।
              </p>
              <div className="mt-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
                ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                    <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-3">
                      <ShoppingCart className="w-8 h-8 opacity-40 text-slate-500" />
                    </div>
                    <p className="text-sm font-semibold text-slate-600">কার্ট সম্পূর্ণ খালি</p>
                    <p className="text-xs text-slate-400 mt-1">পছন্দের যেকোনো কোর্স কার্টে যোগ করুন</p>
                  </div>
                ) : (
                  cart.map(({ course }) => (
                    <div key={course.id} className="pt-4 first:pt-0 flex gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded-xl border border-slate-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate font-['Hind_Siliguri',sans-serif]">
                          {course.title}
                        </h4>
                        <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                          {course.category}
                        </span>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-black text-rose-600">
                            {course.price === 0 ? 'ফ্রি' : `৳${course.price.toLocaleString()}`}
                          </span>
                          <button
                            onClick={() => onRemoveItem(course.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4">
                  
                  {/* Coupon Code Section */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="কুপন কোড (যেমন: HACKS20)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      প্রয়োগ
                    </button>
                  </form>

                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-semibold">{couponError}</p>
                  )}
                  {appliedDiscount > 0 && (
                    <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{appliedDiscount}% ছাড় সফলভাবে সক্রিয় হয়েছে!</span>
                    </p>
                  )}

                  {/* Payment gateway selection */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      পেমেন্ট মাধ্যম বেছে নিন:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'bkash', name: 'bKash', color: 'border-pink-500 text-pink-600 bg-pink-50' },
                        { id: 'nagad', name: 'Nagad', color: 'border-orange-500 text-orange-600 bg-orange-50' },
                        { id: 'rocket', name: 'Rocket', color: 'border-purple-500 text-purple-600 bg-purple-50' },
                        { id: 'card', name: 'Card', color: 'border-blue-500 text-blue-600 bg-blue-50' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedPayment(item.id)}
                          className={`py-2 px-1 text-center rounded-xl border text-xs font-black transition-all ${
                            selectedPayment === item.id 
                              ? item.color + ' ring-2 ring-indigo-500/20 shadow-sm' 
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing lines */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/80 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>সাবটোটাল</span>
                      <span>৳{rawTotal.toLocaleString()}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>কুপন ছাড় ({appliedDiscount}%)</span>
                        <span>- ৳{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                      <span>সর্বমোট প্রদেয়</span>
                      <span className="text-base text-indigo-600 font-['Outfit',sans-serif]">
                        {grandTotal === 0 ? 'ফ্রি' : `৳${grandTotal.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>পেমেন্ট প্রসেসিং হচ্ছে...</span>
                    ) : (
                      <>
                        <span>{grandTotal === 0 ? 'ফ্রি এনরোল করুন' : 'পেমেন্ট সম্পন্ন করুন'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>১০০% সুরক্ষিত ও এনক্রিপ্টেড পেমেন্ট গেটওয়ে</span>
                  </p>

                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
