import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Trash2, 
  Plus, 
  Download, 
  X,
  CreditCard
} from 'lucide-react';
import { BkashIcon, NagadIcon } from '../PaymentLogos';

export const OrdersTab = ({
  orders = [],
  setOrders,
  courses = [],
  showToast
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');

  // Manual Order Modal
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualOrder, setManualOrder] = useState({
    studentName: '',
    studentPhone: '',
    studentEmail: '',
    courseTitle: courses[0]?.title || 'Target DU 6.0',
    amount: courses[0]?.price || 3000,
    paymentMethod: 'bKash',
    status: 'completed',
    trxId: `MAN-${Date.now().toString().slice(-6)}`
  });

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const q = search.toLowerCase();
    const matchSearch = 
      !q || 
      (order.studentName && order.studentName.toLowerCase().includes(q)) ||
      (order.studentPhone && order.studentPhone.toLowerCase().includes(q)) ||
      (order.studentEmail && order.studentEmail.toLowerCase().includes(q)) ||
      (order.courseTitle && order.courseTitle.toLowerCase().includes(q)) ||
      (order.id && order.id.toLowerCase().includes(q)) ||
      (order.trxId && order.trxId.toLowerCase().includes(q));

    const matchStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchMethod = methodFilter === 'All' || 
      (order.paymentMethod && order.paymentMethod.toLowerCase() === methodFilter.toLowerCase());

    return matchSearch && matchStatus && matchMethod;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'approved');
  const pendingOrders = orders.filter(o => o.status === 'pending');

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`অর্ডার স্ট্যাটাস পরিবর্তিত হয়েছে: ${newStatus}`);
  };

  const handleDeleteOrder = (orderId, studentName) => {
    if (window.confirm(`আপনি কি ${studentName}-এর অর্ডারটি মুছে ফেলতে চান?`)) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
      showToast('অর্ডার মুছে ফেলা হয়েছে');
    }
  };

  const handleSaveManualOrder = (e) => {
    e.preventDefault();
    if (!manualOrder.studentName.trim() || !manualOrder.studentPhone.trim()) {
      showToast('শিক্ষার্থীর নাম ও ফোন নম্বর লিখুন');
      return;
    }

    const newOrderObj = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: manualOrder.studentName.trim(),
      studentPhone: manualOrder.studentPhone.trim(),
      studentEmail: manualOrder.studentEmail.trim() || 'student@gmail.com',
      courseTitle: manualOrder.courseTitle,
      amount: Number(manualOrder.amount) || 0,
      paymentMethod: manualOrder.paymentMethod,
      status: manualOrder.status,
      trxId: manualOrder.trxId,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setOrders(prev => [newOrderObj, ...prev]);
    showToast('ম্যানুয়াল এনরোলমেন্ট সফলভাবে সম্পন্ন হয়েছে!');
    setIsManualModalOpen(false);
  };

  const handleExportCSV = () => {
    if (orders.length === 0) {
      showToast('এক্সপোর্ট করার মতো কোনো অর্ডার নেই');
      return;
    }
    const headers = ['Order ID', 'Student Name', 'Phone', 'Email', 'Course', 'Amount', 'Method', 'TrxID', 'Status', 'Date'];
    const rows = orders.map(o => [
      `"${o.id}"`,
      `"${o.studentName}"`,
      `"${o.studentPhone}"`,
      `"${o.studentEmail || ''}"`,
      `"${o.courseTitle}"`,
      o.amount,
      `"${o.paymentMethod || 'bKash'}"`,
      `"${o.trxId || ''}"`,
      `"${o.status}"`,
      `"${o.date}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `academic_hacks_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('অর্ডার লিস্ট CSV ফাইলে ডাউনলোড হয়েছে!');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-['Hind_Siliguri',sans-serif]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            এনরোলমেন্ট ও অর্ডার তালিকা ({orders.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            শিক্ষার্থীদের পেমেন্ট যাচাই, কোর্স অ্যাক্সেস অনুমোদন ও আর্থিক হিসাব
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>CSV এক্সপোর্ট</span>
          </button>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ম্যানুয়াল এনরোল করুন</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500">মোট সংগৃহীত ফি</p>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 font-['Outfit',sans-serif] mt-0.5">
            ৳ {totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500">মোট এনরোলমেন্ট</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif] mt-0.5">
            {orders.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-indigo-600">অনুমোদিত (Approved)</p>
          <p className="text-xl sm:text-2xl font-black text-indigo-600 font-['Outfit',sans-serif] mt-0.5">
            {completedOrders.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[11px] font-bold text-amber-600">পেন্ডিং যাচাই</p>
          <p className="text-xl sm:text-2xl font-black text-amber-600 font-['Outfit',sans-serif] mt-0.5">
            {pendingOrders.length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="শিক্ষার্থীর নাম, ফোন, TrxID বা কোর্স খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700"
          >
            <option value="All">সকল স্ট্যাটাস</option>
            <option value="completed">অনুমোদিত (Completed)</option>
            <option value="pending">পেন্ডিং (Pending)</option>
            <option value="cancelled">বাতিল (Cancelled)</option>
          </select>

          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700"
          >
            <option value="All">সকল পেমেন্ট মেথড</option>
            <option value="bkash">বিকাশ (bKash)</option>
            <option value="nagad">নগদ (Nagad)</option>
            <option value="rocket">রকেট (Rocket)</option>
            <option value="cash">ম্যানুয়াল / ক্যাশ</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">অর্ডার আইডি</th>
                <th className="py-3.5 px-4">শিক্ষার্থী</th>
                <th className="py-3.5 px-4">কোর্স নাম</th>
                <th className="py-3.5 px-4">ফি</th>
                <th className="py-3.5 px-4">মাধ্যম</th>
                <th className="py-3.5 px-4">TrxID</th>
                <th className="py-3.5 px-4">স্ট্যাটাস</th>
                <th className="py-3.5 px-4">তারিখ</th>
                <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-400 font-medium">
                    কোনো অর্ডার পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => {
                  const isBkash = (order.paymentMethod || '').toLowerCase().includes('bkash');
                  const isNagad = (order.paymentMethod || '').toLowerCase().includes('nagad');

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-700">
                        {order.id}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{order.studentName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{order.studentPhone}</p>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800 max-w-[200px] truncate">
                        {order.courseTitle}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 font-['Outfit',sans-serif]">
                        ৳ {order.amount}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {isBkash ? (
                            <BkashIcon className="w-5 h-5 rounded-md flex-shrink-0" />
                          ) : isNagad ? (
                            <NagadIcon className="w-5 h-5 rounded-md flex-shrink-0" />
                          ) : (
                            <CreditCard className="w-4 h-4 text-slate-400" />
                          )}
                          <span className="font-bold text-[11px] text-slate-700">
                            {order.paymentMethod || 'bKash'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-600 text-[11px]">
                        {order.trxId || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                          order.status === 'completed' || order.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : order.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {order.status === 'completed' || order.status === 'approved' ? (
                            <CheckCircle className="w-2.5 h-2.5" />
                          ) : order.status === 'pending' ? (
                            <Clock className="w-2.5 h-2.5" />
                          ) : (
                            <XCircle className="w-2.5 h-2.5" />
                          )}
                          <span>
                            {order.status === 'completed' || order.status === 'approved' 
                              ? 'অনুমোদিত' 
                              : order.status === 'pending'
                              ? 'পেন্ডিং'
                              : 'বাতিল'}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[10px]">
                        {order.date}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {order.status !== 'completed' && order.status !== 'approved' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'completed')}
                              title="অনুমোদন করুন"
                              className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                            >
                              অনুমোদন
                            </button>
                          )}
                          {order.status !== 'cancelled' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              title="বাতিল করুন"
                              className="px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer"
                            >
                              বাতিল
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteOrder(order.id, order.studentName)}
                            title="মুছে ফেলুন"
                            className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Order Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">ম্যানুয়াল এনরোলমেন্ট যোগ করুন</h3>
                <p className="text-[11px] text-slate-500">অফলাইন বা সরাসরি ফি পরিশোধ করা শিক্ষার্থীকে যুক্ত করুন</p>
              </div>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveManualOrder} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">শিক্ষার্থীর নাম *</label>
                  <input
                    type="text"
                    required
                    value={manualOrder.studentName}
                    onChange={(e) => setManualOrder({ ...manualOrder, studentName: e.target.value })}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={manualOrder.studentPhone}
                    onChange={(e) => setManualOrder({ ...manualOrder, studentPhone: e.target.value })}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">কোর্স নির্বাচন করুন *</label>
                <select
                  value={manualOrder.courseTitle}
                  onChange={(e) => {
                    const c = courses.find(item => item.title === e.target.value);
                    setManualOrder({
                      ...manualOrder,
                      courseTitle: e.target.value,
                      amount: c ? c.price : manualOrder.amount
                    });
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>
                      {c.title} (৳{c.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">পরিশোধিত ফি (৳)</label>
                  <input
                    type="number"
                    value={manualOrder.amount}
                    onChange={(e) => setManualOrder({ ...manualOrder, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={manualOrder.paymentMethod}
                    onChange={(e) => setManualOrder({ ...manualOrder, paymentMethod: e.target.value })}
                    className="w-full px-2.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Cash">Cash / Offline</option>
                    <option value="Bank">Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">স্ট্যাটাস</label>
                  <select
                    value={manualOrder.status}
                    onChange={(e) => setManualOrder({ ...manualOrder, status: e.target.value })}
                    className="w-full px-2.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-bold text-emerald-700"
                  >
                    <option value="completed">অনুমোদিত (Completed)</option>
                    <option value="pending">পেন্ডিং (Pending)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer"
                >
                  এনরোলমেন্ট সম্পন্ন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
