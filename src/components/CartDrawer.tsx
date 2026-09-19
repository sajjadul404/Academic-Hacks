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
import { CartItem } from '../types';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (courseId: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess: (purchasedCourseIds: string[]) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'bkash' | 'nagad' | 'rocket' | 'card'>('bkash');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const rawTotal = cart.reduce((sum, item) => sum + item.course.price, 0);
  const discountAmount = Math.round((rawTotal * appliedDiscount) / 100);
  const grandTotal = Math.max(0, rawTotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.toUpperCase() === 'EDUPATH20' || couponCode.toUpperCase() === 'DISCOUNT20') {
      setAppliedDiscount(20);
    } else if (couponCode.toUpperCase() === 'FREE100') {
      setAppliedDiscount(100);
    } else {
      setCouponError('অবৈধ কুপন কোড! ট্রাই করুন: EDUPATH20');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        const purchasedIds = cart.map(i => i.course.id);
        onCheckoutSuccess(purchasedIds);
        onClearCart();
        setPaymentSuccess(false);
        onClose();
      }, 2200);
    }, 1200);
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
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">আপনার কার্ট ({cart.length})</h3>
                <p className="text-xs text-slate-500">Academic Hacks অনলাইন লার্নিং</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {paymentSuccess ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">অভিনন্দন!</h4>
                <p className="text-sm text-slate-600 max-w-xs">
                  আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। কোর্সটি আপনার ড্যাশবোর্ডে যুক্ত হয়েছে।
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center">
                <ShoppingCart className="w-16 h-16 stroke-1 mb-3 text-slate-300" />
                <p className="text-base font-semibold text-slate-700">কার্ট সম্পূর্ণ খালি</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  পছন্দের কোর্সের পাশে কার্ট বাটনে ক্লিক করে যুক্ত করুন।
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2 rounded-full text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                >
                  কোর্স ব্রাউজ করুন
                </button>
              </div>
            ) : (
              <>
                {/* Course List */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.course.id}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all"
                    >
                      <img
                        src={item.course.thumbnail}
                        alt={item.course.title}
                        className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.course.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {item.course.category} {item.course.batchYear ? `• ${item.course.batchYear}` : ''}
                        </p>
                        <p className="text-xs font-extrabold text-rose-600 mt-1">
                          {item.course.price === 0 ? 'ফ্রি' : `৳${item.course.price.toLocaleString()}`}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.course.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="কুপন কোড (EDUPATH20)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 uppercase focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-indigo-600 transition-colors"
                    >
                      প্রয়োগ
                    </button>
                  </form>
                  {appliedDiscount > 0 && (
                    <p className="text-xs font-bold text-emerald-600 mt-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {appliedDiscount}% ছাড় সফলভাবে সক্রিয় হয়েছে!
                    </p>
                  )}
                  {couponError && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{couponError}</p>
                  )}
                </div>

                {/* Payment Gateway Options */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-700 mb-2">পেমেন্ট মেথড নির্বাচন করুন:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'bkash', label: 'bKash', color: 'border-pink-500 bg-pink-50 text-pink-700' },
                      { id: 'nagad', label: 'Nagad', color: 'border-orange-500 bg-orange-50 text-orange-700' },
                      { id: 'rocket', label: 'Rocket', color: 'border-purple-500 bg-purple-50 text-purple-700' },
                      { id: 'card', label: 'Card/Bank', color: 'border-blue-500 bg-blue-50 text-blue-700' }
                    ].map((gateway) => (
                      <button
                        key={gateway.id}
                        type="button"
                        onClick={() => setSelectedPayment(gateway.id as any)}
                        className={`p-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                          selectedPayment === gateway.id
                            ? `${gateway.color} ring-2 ring-indigo-400`
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {gateway.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer / Checkout */}
          {cart.length > 0 && !paymentSuccess && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/80 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span>৳{rawTotal.toLocaleString()}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>কুপন ছাড় ({appliedDiscount}%)</span>
                    <span>- ৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>সর্বমোট প্রদেয়</span>
                  <span className="text-base text-rose-600">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <span>পেমেন্ট প্রসেস হচ্ছে...</span>
                ) : (
                  <>
                    <span>পেমেন্ট করুন (৳{grandTotal.toLocaleString()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSL সুরক্ষিত পেমেন্ট গেটওয়ে ও অটোমেটিক এনরোলমেন্ট</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
