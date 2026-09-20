import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Sparkles, 
  Layers, 
  Settings, 
  MessageSquareQuote, 
  HelpCircle, 
  Users, 
  Plus, 
  Pencil, 
  Trash2, 
  Save, 
  X, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  TrendingUp, 
  Award, 
  DollarSign, 
  Search,
  ExternalLink,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export const AdminPanel = ({
  isOpen = false,
  courses,
  setCourses,
  spotlights,
  setSpotlights,
  categories,
  setCategories,
  stats,
  setStats,
  testimonials,
  setTestimonials,
  faqs,
  setFaqs,
  siteSettings,
  setSiteSettings,
  orders,
  setOrders,
  onClose,
  showToast
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, courses, spotlights, stats, settings, testimonials, orders, backup

  // Course modal state
  const [editingCourse, setEditingCourse] = useState(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseSearch, setCourseSearch] = useState('');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState('All');

  // Spotlight modal state
  const [editingSpotlight, setEditingSpotlight] = useState(null);
  const [isSpotlightModalOpen, setIsSpotlightModalOpen] = useState(false);

  // Testimonial modal state
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  // FAQ modal state
  const [editingFaq, setEditingFaq] = useState(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  // Site settings form state
  const [localSettings, setLocalSettings] = useState({ ...siteSettings });

  // Stats edit form state
  const [localStats, setLocalStats] = useState([...stats]);

  // Sync when props change
  React.useEffect(() => {
    if (siteSettings) setLocalSettings({ ...siteSettings });
  }, [siteSettings]);

  React.useEffect(() => {
    if (stats) setLocalStats([...stats]);
  }, [stats]);

  // JSON Import state
  const [importJsonText, setImportJsonText] = useState('');

  // ----------------------------------------------------------------
  // COURSE HANDLERS
  // ----------------------------------------------------------------
  const handleOpenAddCourse = () => {
    setEditingCourse({
      id: `course-${Date.now()}`,
      title: '',
      subtitle: '',
      slug: '',
      category: 'Admission',
      batchYear: 'HSC-26',
      badge: 'নতুন ব্যাচ',
      examCount: 50,
      classCount: 80,
      price: 2500,
      originalPrice: 3500,
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      enrolledStudents: 120,
      mentors: [
        { name: 'মেন্টর নাম', title: 'বিভাগ, বিশ্ববিদ্যালয়', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' }
      ],
      description: 'কোর্সের বিস্তারিত বিবরণ এখানে লিখুন...',
      features: [
        '৮০+ লাইভ ইন্টারঅ্যাক্টিভ ক্লাস',
        '৫০+ কেন্দ্রীয় মেরিট লাইভ এক্সাম',
        'ক্লাস লেকচার শিট ও প্র্যাকটিস নোট'
      ],
      isPopular: true,
      isFeatured: false,
      isFree: false
    });
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course) => {
    setEditingCourse({ ...course });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (!editingCourse.title.trim()) {
      showToast('অনুগ্রহ করে কোর্সের শিরোনাম লিখুন');
      return;
    }

    const isExisting = courses.some(c => c.id === editingCourse.id);
    if (isExisting) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? editingCourse : c));
      showToast('কোর্স সফলভাবে আপডেট করা হয়েছে!');
    } else {
      setCourses(prev => [editingCourse, ...prev]);
      showToast('নতুন কোর্স সফলভাবে যুক্ত করা হয়েছে!');
    }
    setIsCourseModalOpen(false);
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId, title) => {
    if (window.confirm(`আপনি কি নিশ্চিত যে "${title}" কোর্সটি মুছে ফেলতে চান?`)) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
      showToast('কোর্সটি সফলভাবে মুছে ফেলা হয়েছে!');
    }
  };

  // ----------------------------------------------------------------
  // SPOTLIGHT HANDLERS
  // ----------------------------------------------------------------
  const handleOpenAddSpotlight = () => {
    setEditingSpotlight({
      id: `spot-${Date.now()}`,
      code: `0${spotlights.length + 1}`,
      name: 'Sentinel',
      title: 'নতুন এডমিশন ব্যাচ ২০২৬',
      subtitle: 'সম্পূর্ণ প্রস্তুতি ও সেরা গাইডলাইন',
      category: 'Admission Apex',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      accentColor: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      badgeText: 'TOP 10 MERIT',
      description: 'হায়ার লেভেল প্রবলেম সলভিং ও ডেডিকেটেড ডাউট সলভ।'
    });
    setIsSpotlightModalOpen(true);
  };

  const handleOpenEditSpotlight = (item) => {
    setEditingSpotlight({ ...item });
    setIsSpotlightModalOpen(true);
  };

  const handleSaveSpotlight = (e) => {
    e.preventDefault();
    if (!editingSpotlight.name.trim() || !editingSpotlight.title.trim()) {
      showToast('অনুগ্রহ করে নাম এবং শিরোনাম পূরণ করুন');
      return;
    }

    const isExisting = spotlights.some(s => s.id === editingSpotlight.id);
    if (isExisting) {
      setSpotlights(prev => prev.map(s => s.id === editingSpotlight.id ? editingSpotlight : s));
      showToast('স্পটলাইট স্লাইড সফলভাবে আপডেট হয়েছে!');
    } else {
      setSpotlights(prev => [...prev, editingSpotlight]);
      showToast('নতুন স্পটলাইট স্লাইড যুক্ত হয়েছে!');
    }
    setIsSpotlightModalOpen(false);
    setEditingSpotlight(null);
  };

  const handleDeleteSpotlight = (spotId, name) => {
    if (spotlights.length <= 1) {
      showToast('কমপক্ষে ১টি স্পটলাইট স্লাইড থাকতে হবে!');
      return;
    }
    if (window.confirm(`আপনি কি "${name}" স্লাইডটি মুছে ফেলতে চান?`)) {
      setSpotlights(prev => prev.filter(s => s.id !== spotId));
      showToast('স্পটলাইট স্লাইড মুছে ফেলা হয়েছে!');
    }
  };

  // ----------------------------------------------------------------
  // STATS & CATEGORIES HANDLERS
  // ----------------------------------------------------------------
  const handleSaveStats = () => {
    setStats(localStats);
    showToast('হোমপেজের স্ট্যাটস বার সফলভাবে সংরক্ষিত হয়েছে!');
  };

  const handleUpdateCategoryCount = (catId, newCount) => {
    const updated = categories.map(c => c.id === catId ? { ...c, count: Number(newCount) } : c);
    setCategories(updated);
    showToast('ক্যাটাগরি আপডেট করা হয়েছে!');
  };

  // ----------------------------------------------------------------
  // SITE SETTINGS HANDLER
  // ----------------------------------------------------------------
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSiteSettings(localSettings);
    showToast('সাইট সেটিংস ও নোটিশ সফলভাবে সংরক্ষিত হয়েছে!');
  };

  // ----------------------------------------------------------------
  // TESTIMONIALS HANDLER
  // ----------------------------------------------------------------
  const handleOpenAddTestimonial = () => {
    setEditingTestimonial({
      id: `t-${Date.now()}`,
      name: '',
      exam: 'HSC & Admission 2026',
      rank: 'Merit: Top 50',
      institution: 'বিশ্ববিদ্যালয়/কলেজ',
      comment: '',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
    });
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e) => {
    e.preventDefault();
    if (!editingTestimonial.name.trim() || !editingTestimonial.comment.trim()) {
      showToast('শিক্ষার্থীর নাম ও মন্তব্য আবশ্যক');
      return;
    }
    const isExisting = testimonials.some(t => t.id === editingTestimonial.id);
    if (isExisting) {
      setTestimonials(prev => prev.map(t => t.id === editingTestimonial.id ? editingTestimonial : t));
      showToast('রিভিউ সফলভাবে আপডেট হয়েছে!');
    } else {
      setTestimonials(prev => [editingTestimonial, ...prev]);
      showToast('নতুন রিভিউ যুক্ত হয়েছে!');
    }
    setIsTestimonialModalOpen(false);
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm('আপনি কি এই রিভিউটি মুছে ফেলতে চান?')) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      showToast('রিভিউ মুছে ফেলা হয়েছে!');
    }
  };

  // ----------------------------------------------------------------
  // FAQS HANDLER
  // ----------------------------------------------------------------
  const handleOpenAddFaq = () => {
    setEditingFaq({
      question: '',
      answer: ''
    });
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (!editingFaq.question.trim() || !editingFaq.answer.trim()) {
      showToast('প্রশ্ন ও উত্তর উভয়ই পূরণ করতে হবে');
      return;
    }
    if (editingFaq.index !== undefined) {
      setFaqs(prev => prev.map((f, i) => i === editingFaq.index ? { question: editingFaq.question, answer: editingFaq.answer } : f));
      showToast('প্রশ্নোত্তর সফলভাবে আপডেট হয়েছে!');
    } else {
      setFaqs(prev => [...prev, { question: editingFaq.question, answer: editingFaq.answer }]);
      showToast('নতুন প্রশ্নোত্তর যুক্ত হয়েছে!');
    }
    setIsFaqModalOpen(false);
  };

  const handleDeleteFaq = (index) => {
    if (window.confirm('আপনি কি এই প্রশ্নটি মুছে ফেলতে চান?')) {
      setFaqs(prev => prev.filter((_, i) => i !== index));
      showToast('প্রশ্নোত্তর মুছে ফেলা হয়েছে!');
    }
  };

  // ----------------------------------------------------------------
  // BACKUP & EXPORT/IMPORT
  // ----------------------------------------------------------------
  const handleExportData = () => {
    const fullData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      courses,
      spotlights,
      categories,
      stats,
      testimonials,
      faqs,
      siteSettings,
      orders
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `academic_hacks_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('সমস্ত ডেটা সফলভাবে JSON ফাইলে এক্সপোর্ট হয়েছে!');
  };

  const handleImportData = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed.courses) setCourses(parsed.courses);
      if (parsed.spotlights) setSpotlights(parsed.spotlights);
      if (parsed.categories) setCategories(parsed.categories);
      if (parsed.stats) setStats(parsed.stats);
      if (parsed.testimonials) setTestimonials(parsed.testimonials);
      if (parsed.faqs) setFaqs(parsed.faqs);
      if (parsed.siteSettings) {
        setSiteSettings(parsed.siteSettings);
        setLocalSettings(parsed.siteSettings);
      }
      if (parsed.orders) setOrders(parsed.orders);
      setImportJsonText('');
      showToast('অভিনন্দন! ডেটা সফলভাবে ইম্পোর্ট করা হয়েছে!');
    } catch {
      showToast('অবৈধ JSON ডেটা! দয়া করে সঠিক ফরম্যাটে পেস্ট করুন।');
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('সতর্কতা: আপনি কি সব পরিবর্তন মুছে ডিফল্ট ডেটায় ফিরে যেতে চান?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Filtered Courses
  const filteredCourses = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(courseSearch.toLowerCase()) || 
                        c.category.toLowerCase().includes(courseSearch.toLowerCase());
    const matchCat = courseCategoryFilter === 'All' || c.category === courseCategoryFilter;
    return matchSearch && matchCat;
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.amount || 0), 0);
  const totalStudentsEnrolled = courses.reduce((acc, c) => acc + (c.enrolledStudents || 0), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex flex-col overflow-hidden font-['Hind_Siliguri',sans-serif]">
      
      {/* Top Admin Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-md">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white font-['Outfit',sans-serif]">
                Academic Hacks Control Center
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                ADMIN LIVE
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full font-mono">
                sajjaduli724@gmail.com
              </span>
            </div>
            <p className="text-xs text-slate-400">
              এখান থেকে ওয়েবসাইটের প্রতিটি কোর্স, ব্যানার, ক্যাটাগরি, মূল্য ও সেটিংস সরাসরি আপডেট করুন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>ওয়েবসাইট ভিউ</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all cursor-pointer"
            title="প্যানেল বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden bg-[#F4F7FC]">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200/80 p-4 flex flex-col justify-between overflow-y-auto flex-shrink-0 hidden md:flex">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              মূল ব্যবস্থাপনা
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                activeTab === 'overview'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>ড্যাশবোর্ড ওভারভিউ</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                activeTab === 'courses'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>কোর্সসমূহ ({courses.length})</span>
              </div>
              <span className="px-1.5 py-0.5 text-[10px] bg-indigo-100 text-indigo-700 rounded-md font-mono">
                {courses.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('spotlights')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                activeTab === 'spotlights'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                <span>হিরো স্পটলাইট ({spotlights.length})</span>
              </div>
              <span className="px-1.5 py-0.5 text-[10px] bg-sky-100 text-sky-700 rounded-md font-mono">
                {spotlights.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                activeTab === 'stats'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>ক্যাটাগরি ও কাউন্টার</span>
            </button>

            <div className="pt-4 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              যোগাযোগ ও কন্টেন্ট
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                activeTab === 'settings'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>সাইট সেটিংস ও নোটিশ</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                activeTab === 'testimonials'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>রিভিউ ও এফএকিউ</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                activeTab === 'orders'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>এনরোলমেন্ট ও অর্ডার</span>
              </div>
              <span className="px-1.5 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded-md font-mono">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                activeTab === 'backup'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>ডেটা ব্যাকআপ ও রিসেট</span>
            </button>
          </div>

          {/* Quick System Info in sidebar */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>অটো-সেভ সক্রিয়</span>
            </div>
            যেকোনো পরিবর্তন সাথে সাথে লোকালস্টোরেজে সুরক্ষিত হয়।
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          
          {/* Mobile Tab Pills */}
          <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
            {[
              { id: 'overview', label: 'ওভারভিউ' },
              { id: 'courses', label: `কোর্স (${courses.length})` },
              { id: 'spotlights', label: `স্পটলাইট (${spotlights.length})` },
              { id: 'stats', label: 'কাউন্টার' },
              { id: 'settings', label: 'সেটিংস' },
              { id: 'testimonials', label: 'রিভিউ' },
              { id: 'orders', label: 'অর্ডার' },
              { id: 'backup', label: 'ব্যাকআপ' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ============================================================== */}
          {/* TAB 1: OVERVIEW */}
          {/* ============================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  এডমিন ড্যাশবোর্ড ওভারভিউ
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  একাডেমিক হ্যাকস-এর বর্তমান কোর্স, ব্যানার এবং এনরোলমেন্ট সারাংশ
                </p>
              </div>

              {/* 4 KPI Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold">মোট কোর্স</span>
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    {courses.length}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold">
                    {courses.filter(c => c.isPopular).length} টি পপুলার ব্যাচ
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold">হিরো স্লাইড</span>
                    <Sparkles className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    {spotlights.length}
                  </div>
                  <span className="text-[11px] text-sky-600 font-bold">
                    ক্যারোসেল স্লাইড সক্রিয়
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold">ভর্তি শিক্ষার্থী</span>
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    {totalStudentsEnrolled.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-purple-600 font-bold">
                    সকল কোর্সের মোট শিক্ষার্থী
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold">মোট অর্ডার হিসাব</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    ৳ {totalRevenue.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold">
                    {orders.length} টি সফল ট্রানজেকশন
                  </span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    দ্রুত কোনো কোর্স অথবা ব্যানার আপডেট করতে চান?
                  </h3>
                  <p className="text-xs text-indigo-200">
                    নতুন কোর্স তৈরি করুন অথবা হোমপেজের স্পটলাইট ব্যানার এখনই কাস্টমাইজ করুন।
                  </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={handleOpenAddCourse}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-indigo-900 hover:bg-indigo-50 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন কোর্স যোগ করুন</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('spotlights')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-700/60 hover:bg-indigo-700 text-white border border-indigo-400/30 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>হিরো ব্যানার সাজান</span>
                  </button>
                </div>
              </div>

              {/* Current Active Courses Table Preview */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      বর্তমান লাইভ কোর্সসমূহ
                    </h3>
                    <p className="text-xs text-slate-500">
                      ওয়েবসাইটে প্রদর্শিত সাম্প্রতিক কোর্স তালিকা
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                  >
                    সব দেখুন &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">কোর্স</th>
                        <th className="py-3 px-4">ক্যাটাগরি</th>
                        <th className="py-3 px-4">মূল্য</th>
                        <th className="py-3 px-4">ক্লাস / এক্সাম</th>
                        <th className="py-3 px-4">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {courses.slice(0, 5).map(course => (
                        <tr key={course.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                              />
                              <div>
                                <p className="font-bold text-slate-900 max-w-xs truncate">{course.title}</p>
                                <p className="text-[11px] text-slate-500">{course.batchYear || 'HSC'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {course.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {course.isFree ? (
                              <span className="text-emerald-600 font-black">১০০% ফ্রি</span>
                            ) : (
                              <span>৳ {course.price}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {course.classCount} ক্লাস • {course.examCount} এক্সাম
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                setActiveTab('courses');
                                handleOpenEditCourse(course);
                              }}
                              className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                              title="এডিট করুন"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: COURSES MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'courses' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    কোর্স ব্যবস্থাপনা ({courses.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    নতুন কোর্স তৈরি করুন, মূল্য পরিবর্তন করুন, বিবরণ ও শিক্ষক আপডেট করুন
                  </p>
                </div>
                <button
                  onClick={handleOpenAddCourse}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন কোর্স যোগ করুন</span>
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="কোর্সের নাম দিয়ে খুঁজুন..."
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                  {['All', 'Admission', 'HSC', 'School', 'Engineering', 'Medical', 'Free Course'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCourseCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                        courseCategoryFilter === cat
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat === 'All' ? 'সকল' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Courses Grid / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCourses.map(course => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Image header */}
                      <div className="relative h-40 bg-slate-100 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-indigo-700 shadow-sm">
                            {course.category}
                          </span>
                          {course.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900 shadow-sm">
                              {course.badge}
                            </span>
                          )}
                        </div>
                        {course.isPopular && (
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-sm">
                            POPULAR
                          </div>
                        )}
                      </div>

                      {/* Info Body */}
                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {course.subtitle || course.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                          <span>{course.classCount} ক্লাস • {course.examCount} এক্সাম</span>
                          <span className="font-semibold text-slate-700">★ {course.rating || '4.9'}</span>
                        </div>

                        <div className="flex items-baseline gap-2 pt-1">
                          {course.isFree ? (
                            <span className="text-base font-black text-emerald-600">১০০% ফ্রি</span>
                          ) : (
                            <>
                              <span className="text-base font-black text-slate-900 font-['Outfit',sans-serif]">
                                ৳ {course.price}
                              </span>
                              {course.originalPrice && (
                                <span className="text-xs line-through text-slate-400 font-['Outfit',sans-serif]">
                                  ৳ {course.originalPrice}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenEditCourse(course)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>এডিট করুন</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id, course.title)}
                        className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: HERO SPOTLIGHT MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'spotlights' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    হিরো স্পটলাইট স্লাইডার ({spotlights.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    হোমপেজের সেন্ট্রাল ইন্টারেক্টিভ ক্যারোসেল স্লাইড, ইমেজ, ট্যাগ এবং রং পরিবর্তন করুন
                  </p>
                </div>
                <button
                  onClick={handleOpenAddSpotlight}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md hover:from-sky-700 hover:to-indigo-700 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন স্লাইড যোগ করুন</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {spotlights.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Slide Thumbnail */}
                      <div className="relative h-44 bg-slate-900 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                        
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 text-white border border-white/20">
                            CODE: {item.code}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 font-['Outfit',sans-serif]">
                            {item.badgeText}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="font-extrabold text-base leading-tight font-['Outfit',sans-serif]">
                            {item.name}
                          </h4>
                          <p className="text-xs text-sky-300 font-medium truncate">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <p className="font-bold text-sm text-slate-900 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {item.subtitle}
                        </p>
                        
                        <div className="pt-2 flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 font-semibold">অ্যাকসেন্ট রং:</span>
                          <span 
                            className="w-5 h-5 rounded-full border border-slate-300 inline-block shadow-sm"
                            style={{ backgroundColor: item.accentColor }}
                            title={item.accentColor}
                          />
                          <span className="text-[11px] font-mono text-slate-600">{item.accentColor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenEditSpotlight(item)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-800 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>স্লাইড এডিট করুন</span>
                      </button>
                      <button
                        onClick={() => handleDeleteSpotlight(item.id, item.name)}
                        className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: CATEGORIES & STATS BAR */}
          {/* ============================================================== */}
          {activeTab === 'stats' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              
              {/* Stats Bar Form */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      হোমপেজ কি-মেট্রিক্স স্ট্যাটস বার
                    </h3>
                    <p className="text-xs text-slate-500">
                      হিরো সেকশনের ঠিক নিচে থাকা ৪টি প্রধান আকর্ষণীয় কাউন্টার পরিবর্তন করুন
                    </p>
                  </div>
                  <button
                    onClick={handleSaveStats}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all cursor-pointer shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>কাউন্টার সেভ করুন</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {localStats.map((st, idx) => (
                    <div key={st.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>কাউন্টার #{idx + 1} ({st.label})</span>
                        <span className="text-[10px] text-slate-400 font-mono">{st.id}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">মান / কাউন্ট (Value)</label>
                          <input
                            type="text"
                            value={st.value}
                            onChange={(e) => {
                              const val = e.target.value;
                              setLocalStats(prev => prev.map((s, i) => i === idx ? { ...s, value: val } : s));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg text-xs bg-white border border-slate-200 font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">বাংলা লেবেল</label>
                          <input
                            type="text"
                            value={st.label}
                            onChange={(e) => {
                              const lbl = e.target.value;
                              setLocalStats(prev => prev.map((s, i) => i === idx ? { ...s, label: lbl } : s));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg text-xs bg-white border border-slate-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">ইংরেজি সাবটাইটেল</label>
                        <input
                          type="text"
                          value={st.englishLabel}
                          onChange={(e) => {
                            const elbl = e.target.value;
                            setLocalStats(prev => prev.map((s, i) => i === idx ? { ...s, englishLabel: elbl } : s));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white border border-slate-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories Counts Management */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    কোর্স ক্যাটাগরি ও কোর্স সংখ্যা
                  </h3>
                  <p className="text-xs text-slate-500">
                    হোমপেজের ক্যাটাগরি গ্রিডে থাকা ব্যাজ কাউন্টগুলো সরাসরি আপডেট করুন
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map(cat => (
                    <div key={cat.id} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 bg-slate-50/50">
                      <div>
                        <p className="text-xs font-bold text-slate-800">{cat.bengaliName}</p>
                        <p className="text-[11px] text-slate-500">{cat.name}</p>
                      </div>
                      <div className="w-20">
                        <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">কোর্স সংখ্যা</label>
                        <input
                          type="number"
                          value={cat.count}
                          onChange={(e) => handleUpdateCategoryCount(cat.id, e.target.value)}
                          className="w-full px-2 py-1 text-xs font-bold bg-white border border-slate-200 rounded-md text-center"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: SITE SETTINGS & NOTICE */}
          {/* ============================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  সাইট সেটিংস, নোটিশ ও হেল্পলাইন
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  ওয়েবসাইটের ব্র্যান্ড নেম, টপ নোটিশ ব্যানার, সাপোর্ট হেল্পলাইন ও সোশ্যাল লিংক
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                
                {/* Branding */}
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">ব্র্যান্ডিং ও স্লোগান</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ওয়েবসাইট নাম</label>
                      <input
                        type="text"
                        value={localSettings.brandName}
                        onChange={(e) => setLocalSettings({ ...localSettings, brandName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ট্যাগলাইন / স্লোগান</label>
                      <input
                        type="text"
                        value={localSettings.brandTagline}
                        onChange={(e) => setLocalSettings({ ...localSettings, brandTagline: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Notice Banner */}
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">টপ নোটিশ / অফার ব্যানার</h3>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-indigo-600">
                      <input
                        type="checkbox"
                        checked={localSettings.isNoticeActive}
                        onChange={(e) => setLocalSettings({ ...localSettings, isNoticeActive: e.target.checked })}
                        className="rounded text-indigo-600"
                      />
                      <span>নোটিশ বার সক্রিয় রাখুন</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">নোটিশ টেক্সট</label>
                    <textarea
                      rows={2}
                      value={localSettings.noticeText}
                      onChange={(e) => setLocalSettings({ ...localSettings, noticeText: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Contact & Hotline */}
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">হেল্পলাইন ও কাস্টমার সাপোর্ট</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">হেল্পলাইন নম্বর</label>
                      <input
                        type="text"
                        value={localSettings.helpline}
                        onChange={(e) => setLocalSettings({ ...localSettings, helpline: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">হেল্পলাইন সময়সূচি</label>
                      <input
                        type="text"
                        value={localSettings.helplineTime}
                        onChange={(e) => setLocalSettings({ ...localSettings, helplineTime: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">হোয়াটসঅ্যাপ নম্বর</label>
                      <input
                        type="text"
                        value={localSettings.whatsappNumber}
                        onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">সাপোর্ট ইমেইল</label>
                      <input
                        type="email"
                        value={localSettings.supportEmail}
                        onChange={(e) => setLocalSettings({ ...localSettings, supportEmail: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">সোশ্যাল মিডিয়া লিংক</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ফেসবুক পেজ লিংক</label>
                      <input
                        type="text"
                        value={localSettings.facebookUrl}
                        onChange={(e) => setLocalSettings({ ...localSettings, facebookUrl: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ইউটিউব চ্যানেল</label>
                      <input
                        type="text"
                        value={localSettings.youtubeUrl}
                        onChange={(e) => setLocalSettings({ ...localSettings, youtubeUrl: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">টেলিগ্রাম গ্রুপ</label>
                      <input
                        type="text"
                        value={localSettings.telegramUrl}
                        onChange={(e) => setLocalSettings({ ...localSettings, telegramUrl: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>সেটিংস সেভ করুন</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: TESTIMONIALS & FAQS */}
          {/* ============================================================== */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              
              {/* Testimonials */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      সফল শিক্ষার্থীদের রিভিউ ({testimonials.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      বুয়েট, মেডিকেল ও ঢাবিতে চান্স পাওয়া শিক্ষার্থীদের টেস্টিমোনিয়াল
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddTestimonial}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>নতুন রিভিউ যোগ করুন</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {testimonials.map(t => (
                    <div key={t.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">{t.name}</p>
                            <p className="text-[11px] font-bold text-indigo-600">{t.rank}</p>
                            <p className="text-[10px] text-slate-500">{t.institution}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-3">"{t.comment}"</p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                        <button
                          onClick={() => {
                            setEditingTestimonial(t);
                            setIsTestimonialModalOpen(true);
                          }}
                          className="p-1 rounded text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ) ({faqs.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      ভর্তি, ক্লাস রেকর্ডিং ও ডাউট সলভ সংক্রান্ত সাধারণ প্রশ্নোত্তর
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddFaq}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>নতুন FAQ যোগ করুন</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {faqs.map((f, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <p className="text-xs font-bold text-slate-900">{f.question}</p>
                        <p className="text-xs text-slate-600">{f.answer}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingFaq({ ...f, index: i });
                            setIsFaqModalOpen(true);
                          }}
                          className="p-1 rounded text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(i)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 7: ORDERS & ENROLLMENT */}
          {/* ============================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    এনরোলমেন্ট ও অর্ডার তালিকা ({orders.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    শিক্ষার্থীদের পেমেন্ট, কোর্সে অন্তর্ভুক্তি ও লেনদেন হিসাব
                  </p>
                </div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl">
                  মোট সংগৃহীত: ৳ {totalRevenue.toLocaleString()}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">অর্ডার আইডি</th>
                        <th className="py-3 px-4">শিক্ষার্থী</th>
                        <th className="py-3 px-4">কোর্স</th>
                        <th className="py-3 px-4">মূল্য</th>
                        <th className="py-3 px-4">পেমেন্ট মেথড</th>
                        <th className="py-3 px-4">স্ট্যাটাস</th>
                        <th className="py-3 px-4">তারিখ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-indigo-700">
                            {order.id}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-bold text-slate-900">{order.studentName}</p>
                            <p className="text-[11px] text-slate-500">{order.studentPhone}</p>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-800">
                            {order.courseTitle}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            ৳ {order.amount}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-100">
                              {order.paymentMethod || 'bKash'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1 w-fit">
                              <CheckCircle className="w-2.5 h-2.5" />
                              <span>{order.status}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 8: BACKUP & DATA RESET */}
          {/* ============================================================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  ডেটা ব্যাকআপ, এক্সপোর্ট ও ফ্যাক্টরি রিসেট
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  সম্পূর্ণ ওয়েবসাইটের তথ্য সংরক্ষণ অথবা আদি ডিফল্ট অবস্থায় প্রত্যাবর্তন
                </p>
              </div>

              {/* Export Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">সম্পূর্ণ সাইট ডেটা এক্সপোর্ট (JSON)</h3>
                    <p className="text-xs text-slate-500">
                      সকল কোর্স, ব্যানার, সেটিংস ও রিভিউ একটি ফাইলে ডাউনলোড করে নিরাপদে সংরক্ষণ করুন
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleExportData}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>JSON ব্যাকআপ ফাইল ডাউনলোড করুন</span>
                  </button>
                </div>
              </div>

              {/* Import Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">ব্যাকআপ রিস্টোর / ডেটা ইম্পোর্ট</h3>
                    <p className="text-xs text-slate-500">
                      পূর্বে ডাউনলোড করা JSON কোড নিচে পেস্ট করে সাইট রিস্টোর করুন
                    </p>
                  </div>
                </div>
                <textarea
                  rows={4}
                  placeholder="এখানে JSON ডেটা পেস্ট করুন..."
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  className="w-full p-3 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleImportData}
                  disabled={!importJsonText.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>ইম্পোর্ট সম্পন্ন করুন</span>
                </button>
              </div>

              {/* Factory Reset */}
              <div className="p-5 sm:p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-rose-950">ডিফল্ট ফ্যাক্টরি রিসেট (Reset to Initial)</h3>
                    <p className="text-xs text-rose-700">
                      আপনার করা সকল পরিবর্তন মুছে দিয়ে অ্যাপ্লিকেশনের মূল ডেটা ফিরিয়ে আনবে
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleResetDefaults}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ডিফল্ট ডেটায় রিসেট করুন</span>
                </button>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* =================================================================== */}
      {/* COURSE CREATE / EDIT MODAL */}
      {/* =================================================================== */}
      {isCourseModalOpen && editingCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {courses.some(c => c.id === editingCourse.id) ? 'কোর্স এডিট করুন' : 'নতুন কোর্স তৈরি করুন'}
                </h3>
                <p className="text-xs text-slate-500">সকল তথ্য নির্ভুলভাবে পূরণ করে সংরক্ষণ করুন</p>
              </div>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveCourse} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">কোর্সের শিরোনাম (Title) *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: Target DU 6.0 (ভার্সিটি+GST)"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">উপশিরোনাম (Subtitle)</label>
                <input
                  type="text"
                  placeholder="যেমন: ঢাকা বিশ্ববিদ্যালয় ও গুচ্ছ ২২ বিশ্ববিদ্যালয়ের পূর্ণাঙ্গ প্রস্তুতি"
                  value={editingCourse.subtitle || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={editingCourse.category}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="Admission">Admission</option>
                    <option value="HSC">HSC</option>
                    <option value="School">School</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Arts & Commerce">Arts & Commerce</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Free Course">Free Course</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ব্যাচ / শিক্ষাবর্ষ</label>
                  <input
                    type="text"
                    placeholder="যেমন: HSC-26"
                    value={editingCourse.batchYear || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, batchYear: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ব্যাজ টেক্সট</label>
                  <input
                    type="text"
                    placeholder="যেমন: ALL VARSITY + GST"
                    value={editingCourse.badge || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, badge: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              {/* Pricing & Free toggle */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">কোর্সের মূল্য ও অফার</span>
                  <label className="flex items-center gap-2 text-xs font-bold text-emerald-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingCourse.isFree)}
                      onChange={(e) => setEditingCourse({ ...editingCourse, isFree: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    <span>১০০% ফ্রি কোর্স</span>
                  </label>
                </div>

                {!editingCourse.isFree && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">অফার মূল্য (৳) *</label>
                      <input
                        type="number"
                        value={editingCourse.price}
                        onChange={(e) => setEditingCourse({ ...editingCourse, price: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">আসল মূল্য / কাটা মূল্য (৳)</label>
                      <input
                        type="number"
                        value={editingCourse.originalPrice || 0}
                        onChange={(e) => setEditingCourse({ ...editingCourse, originalPrice: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Class, Exam, Enrolled stats */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মোট ক্লাস সংখ্যা</label>
                  <input
                    type="number"
                    value={editingCourse.classCount}
                    onChange={(e) => setEditingCourse({ ...editingCourse, classCount: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মোট এক্সাম সংখ্যা</label>
                  <input
                    type="number"
                    value={editingCourse.examCount}
                    onChange={(e) => setEditingCourse({ ...editingCourse, examCount: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ভর্তি শিক্ষার্থী কাউন্ট</label>
                  <input
                    type="number"
                    value={editingCourse.enrolledStudents || 0}
                    onChange={(e) => setEditingCourse({ ...editingCourse, enrolledStudents: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Thumbnail Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">থাম্বনেইল ইমেজ লিংক (URL)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingCourse.thumbnail}
                    onChange={(e) => setEditingCourse({ ...editingCourse, thumbnail: e.target.value })}
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                  <img
                    src={editingCourse.thumbnail}
                    alt="Preview"
                    className="w-10 h-8 rounded object-cover border border-slate-200 flex-shrink-0"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">কোর্স ডেসক্রিপশন</label>
                <textarea
                  rows={3}
                  value={editingCourse.description || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Popular Checkbox */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingCourse.isPopular)}
                    onChange={(e) => setEditingCourse({ ...editingCourse, isPopular: e.target.checked })}
                    className="rounded text-indigo-600"
                  />
                  <span>পপুলার কোর্সে দেখান (Popular Badge)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingCourse.isFeatured)}
                    onChange={(e) => setEditingCourse({ ...editingCourse, isFeatured: e.target.checked })}
                    className="rounded text-indigo-600"
                  />
                  <span>ফিচার্ড কোর্স</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SPOTLIGHT CREATE / EDIT MODAL */}
      {/* =================================================================== */}
      {isSpotlightModalOpen && editingSpotlight && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">
                {spotlights.some(s => s.id === editingSpotlight.id) ? 'হিরো স্পটলাইট এডিট করুন' : 'নতুন স্পটলাইট স্লাইড'}
              </h3>
              <button onClick={() => setIsSpotlightModalOpen(false)} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSpotlight} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ব্যাচ কোড (Code)</label>
                  <input
                    type="text"
                    value={editingSpotlight.code}
                    onChange={(e) => setEditingSpotlight({ ...editingSpotlight, code: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">নাম (Name)</label>
                  <input
                    type="text"
                    value={editingSpotlight.name}
                    onChange={(e) => setEditingSpotlight({ ...editingSpotlight, name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">কোর্স শিরোনাম (Title)</label>
                <input
                  type="text"
                  value={editingSpotlight.title}
                  onChange={(e) => setEditingSpotlight({ ...editingSpotlight, title: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">উপশিরোনাম (Subtitle)</label>
                <input
                  type="text"
                  value={editingSpotlight.subtitle}
                  onChange={(e) => setEditingSpotlight({ ...editingSpotlight, subtitle: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি ট্যাগ</label>
                  <input
                    type="text"
                    value={editingSpotlight.category}
                    onChange={(e) => setEditingSpotlight({ ...editingSpotlight, category: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">টপ ব্যাজ (Badge Text)</label>
                  <input
                    type="text"
                    value={editingSpotlight.badgeText}
                    onChange={(e) => setEditingSpotlight({ ...editingSpotlight, badgeText: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">অ্যাকসেন্ট কালার (HEX)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingSpotlight.accentColor || '#38bdf8'}
                      onChange={(e) => setEditingSpotlight({ ...editingSpotlight, accentColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer border border-slate-300"
                    />
                    <input
                      type="text"
                      value={editingSpotlight.accentColor}
                      onChange={(e) => setEditingSpotlight({ ...editingSpotlight, accentColor: e.target.value })}
                      className="flex-1 px-2.5 py-1.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ইমেজ লিংক (URL)</label>
                  <input
                    type="text"
                    value={editingSpotlight.image}
                    onChange={(e) => setEditingSpotlight({ ...editingSpotlight, image: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSpotlightModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TESTIMONIAL CREATE / EDIT MODAL */}
      {/* =================================================================== */}
      {isTestimonialModalOpen && editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">রিভিউ যুক্ত বা এডিট করুন</h3>
            <form onSubmit={handleSaveTestimonial} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">শিক্ষার্থীর নাম</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.name}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">পরীক্ষা / ব্যাচ</label>
                  <input
                    type="text"
                    value={editingTestimonial.exam}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, exam: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">মেরিট পজিশন / র‍্যাংক</label>
                  <input
                    type="text"
                    value={editingTestimonial.rank}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rank: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold text-indigo-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">কলেজ / বিশ্ববিদ্যালয়</label>
                <input
                  type="text"
                  value={editingTestimonial.institution}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, institution: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">মন্তব্য (Comment)</label>
                <textarea
                  rows={3}
                  required
                  value={editingTestimonial.comment}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, comment: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsTestimonialModalOpen(false)} className="px-3 py-1.5 text-xs font-bold text-slate-600">
                  বাতিল
                </button>
                <button type="submit" className="px-5 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-xl">
                  সংরক্ষণ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* FAQ CREATE / EDIT MODAL */}
      {/* =================================================================== */}
      {isFaqModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">FAQ প্রশ্ন ও উত্তর</h3>
            <form onSubmit={handleSaveFaq} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">প্রশ্ন (Question)</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">উত্তর (Answer)</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsFaqModalOpen(false)} className="px-3 py-1.5 text-xs font-bold text-slate-600">
                  বাতিল
                </button>
                <button type="submit" className="px-5 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-xl">
                  সংরক্ষণ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
