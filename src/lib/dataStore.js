import { COURSES, SPOTLIGHT_ITEMS, CATEGORIES, TESTIMONIALS, FAQ_ITEMS } from '../data/mockData';

export const DEFAULT_STATS = [
  {
    id: 'stat-courses',
    value: '১ হাজার +',
    label: 'অনলাইন কোর্স',
    englishLabel: '1,000+ Online Courses',
    iconName: 'TrendingUp',
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50/80 border-amber-100',
    glow: 'group-hover:border-amber-300'
  },
  {
    id: 'stat-teachers',
    value: '১৫০ +',
    label: 'বিশেষজ্ঞ শিক্ষক',
    englishLabel: '150+ Expert Mentors',
    iconName: 'Users',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50/80 border-blue-100',
    glow: 'group-hover:border-blue-300'
  },
  {
    id: 'stat-students',
    value: '২০ লক্ষ +',
    label: 'সন্তুষ্ট শিক্ষার্থী',
    englishLabel: '2M+ Happy Students',
    iconName: 'BookOpenCheck',
    iconColor: 'text-indigo-500',
    bgColor: 'bg-indigo-50/80 border-indigo-100',
    glow: 'group-hover:border-indigo-300'
  },
  {
    id: 'stat-quizzes',
    value: '৫০০ +',
    label: 'কুইজ ও এক্সাম',
    englishLabel: '500+ Model Exams',
    iconName: 'Award',
    iconColor: 'text-rose-500',
    bgColor: 'bg-rose-50/80 border-rose-100',
    glow: 'group-hover:border-rose-300'
  }
];

export const DEFAULT_SITE_SETTINGS = {
  brandName: 'Academic Hacks',
  brandTagline: 'শিক্ষার সহজ পথ',
  noticeText: '🔥 এইচএসসি ২৬ ও এডমিশন নতুন ব্যাচে মেগা ডিসকাউন্ট চলছে! সীমিত আসন বাকি।',
  isNoticeActive: true,
  noticeBarBg: 'from-rose-600 via-pink-600 to-amber-600',
  helpline: '০৯৬৩৮-০০০০০',
  helplineTime: 'সকাল ১০টা - রাত ১০টা',
  supportEmail: 'support@academichacks.edu.bd',
  whatsappNumber: '01700000000',
  address: 'ফার্মগেট, ঢাকা, বাংলাদেশ',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  telegramUrl: 'https://telegram.org',

  // Payment Gateways Settings
  bkashNumber: '01700-123456',
  bkashType: 'Send Money (Personal)',
  isBkashActive: true,

  nagadNumber: '01800-654321',
  nagadType: 'Send Money (Personal)',
  isNagadActive: true,

  rocketNumber: '01900-112233',
  rocketType: 'Send Money (Personal)',
  isRocketActive: false,

  paymentInstructions: 'প্রথমে আপনার বিকাশ বা নগদ অ্যাপ থেকে উল্লেখিত নম্বরে নির্ধারিত ফি সেন্ড মানি করুন। এরপর যে মোবাইল নম্বর থেকে টাকা পাঠিয়েছেন এবং প্রাপ্ত ট্রানজেকশন আইডি (TrxID) নিচে লিখে সাবমিট করুন।',

  // SEO & Meta
  metaTitle: 'Academic Hacks - বাংলাদেশের শীর্ষ এডমিশন ও একাডেমিক প্ল্যাটফর্ম',
  metaDescription: 'এইচএসসি, বুয়েট, মেডিকেল ও ঢাবি সহ সকল বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষার জন্য সেরা মেন্টরদের লাইভ ক্লাস ও এক্সাম।'
};

export const DEFAULT_COUPONS = [
  {
    id: 'c-1',
    code: 'HACKS20',
    discount: 20,
    type: 'percent',
    minAmount: 500,
    isActive: true,
    description: '২০% ফ্ল্যাট ডিসকাউন্ট'
  },
  {
    id: 'c-2',
    code: 'PROMO500',
    discount: 500,
    type: 'flat',
    minAmount: 2000,
    isActive: true,
    description: '৫০০ টাকা ছাড়'
  },
  {
    id: 'c-3',
    code: 'HSC26',
    discount: 15,
    type: 'percent',
    minAmount: 1000,
    isActive: true,
    description: 'এইচএসসি-২৬ স্পেশাল ছাড়'
  }
];

const STORAGE_KEYS = {
  COURSES: 'academichacks_courses',
  SPOTLIGHTS: 'academichacks_spotlights',
  CATEGORIES: 'academichacks_categories',
  STATS: 'academichacks_stats',
  TESTIMONIALS: 'academichacks_testimonials',
  FAQS: 'academichacks_faqs',
  SETTINGS: 'academichacks_site_settings',
  ORDERS: 'academichacks_orders',
  COUPONS: 'academichacks_coupons'
};

export const dataStore = {
  // Courses
  getCourses: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (!stored) return COURSES;
      const parsed = JSON.parse(stored);
      if (!parsed.some((c) => c.id === 'mega-exam-batch-26')) {
        const examCourse = COURSES.find((c) => c.id === 'mega-exam-batch-26');
        if (examCourse) {
          parsed.push(examCourse);
        }
      }
      if (!parsed.some((c) => c.id === 'ielts-masterclass-band-8')) {
        const ieltsCourse = COURSES.find((c) => c.id === 'ielts-masterclass-band-8');
        if (ieltsCourse) {
          parsed.push(ieltsCourse);
        }
      }
      return parsed;
    } catch {
      return COURSES;
    }
  },
  saveCourses: (courses) => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.error('Error saving courses:', e);
    }
  },

  // Spotlights
  getSpotlights: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SPOTLIGHTS);
      return stored ? JSON.parse(stored) : SPOTLIGHT_ITEMS;
    } catch {
      return SPOTLIGHT_ITEMS;
    }
  },
  saveSpotlights: (spotlights) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SPOTLIGHTS, JSON.stringify(spotlights));
    } catch (e) {
      console.error('Error saving spotlights:', e);
    }
  },

  // Categories
  getCategories: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!stored) return CATEGORIES;
      const parsed = JSON.parse(stored);
      return parsed.map((cat) => {
        if (cat.id === 'cat-arts' || cat.name === 'Arts & Commerce') {
          return {
            id: 'cat-exam',
            name: 'Exam',
            bengaliName: 'মডেল টেস্ট ও এক্সাম ব্যাচ',
            icon: 'ClipboardCheck',
            count: 150,
            gradient: 'from-emerald-500 to-teal-600',
            bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-900',
            textColor: 'text-emerald-600',
            badgeColor: 'bg-emerald-100 text-emerald-800'
          };
        }
        if (cat.id === 'cat-nursing' || cat.name === 'Nursing' || cat.icon === 'HeartPulse') {
          return {
            id: 'cat-ielts',
            name: 'IELTS',
            bengaliName: 'আইইএলটিএস ও স্পোকেন ইংলিশ',
            icon: 'IELTS',
            count: 45,
            gradient: 'from-rose-500 to-red-600',
            bgLight: 'bg-rose-50 border-rose-200 text-rose-900',
            textColor: 'text-rose-600',
            badgeColor: 'bg-rose-100 text-rose-800'
          };
        }
        return cat;
      });
    } catch {
      return CATEGORIES;
    }
  },
  saveCategories: (categories) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Error saving categories:', e);
    }
  },

  // Stats
  getStats: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STATS);
      return stored ? JSON.parse(stored) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  },
  saveStats: (stats) => {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (e) {
      console.error('Error saving stats:', e);
    }
  },

  // Testimonials
  getTestimonials: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return stored ? JSON.parse(stored) : TESTIMONIALS;
    } catch {
      return TESTIMONIALS;
    }
  },
  saveTestimonials: (testimonials) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch (e) {
      console.error('Error saving testimonials:', e);
    }
  },

  // FAQs
  getFaqs: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAQS);
      return stored ? JSON.parse(stored) : FAQ_ITEMS;
    } catch {
      return FAQ_ITEMS;
    }
  },
  saveFaqs: (faqs) => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    } catch (e) {
      console.error('Error saving FAQs:', e);
    }
  },

  // Site Settings
  getSettings: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  },
  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  },

  // Orders
  getOrders: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return stored ? JSON.parse(stored) : [
        {
          id: 'ORD-9821',
          studentName: 'রাকিবুল ইসলাম',
          studentPhone: '01712345678',
          studentEmail: 'rakib@gmail.com',
          courseTitle: 'Target DU 6.0 (ভার্সিটি+GST)',
          amount: 3300,
          paymentMethod: 'bKash',
          status: 'completed',
          date: '2026-09-18 14:20'
        },
        {
          id: 'ORD-9822',
          studentName: 'মাহিয়া রহমান',
          studentPhone: '01898765432',
          studentEmail: 'mahiya@yahoo.com',
          courseTitle: "ঢাবি 'খ'-বিভাগ পরিবর্তন ৩.০",
          amount: 3000,
          paymentMethod: 'Nagad',
          status: 'completed',
          date: '2026-09-19 11:05'
        },
        {
          id: 'ORD-9823',
          studentName: 'সামিউল হাসান',
          studentPhone: '01911223344',
          studentEmail: 'samiul@gmail.com',
          courseTitle: 'সৈকত ভাইয়ার ইঞ্জিনিয়ারিং কেমিস্ট্রি',
          amount: 1800,
          paymentMethod: 'bKash',
          status: 'completed',
          date: '2026-09-20 09:40'
        }
      ];
    } catch {
      return [];
    }
  },
  saveOrders: (orders) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  },

  // Coupons
  getCoupons: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return stored ? JSON.parse(stored) : DEFAULT_COUPONS;
    } catch {
      return DEFAULT_COUPONS;
    }
  },
  saveCoupons: (coupons) => {
    try {
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    } catch (e) {
      console.error('Error saving coupons:', e);
    }
  },

  // Reset all to defaults
  resetAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },

  // Export full site data as JSON
  exportAll: () => {
    return {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      courses: dataStore.getCourses(),
      spotlights: dataStore.getSpotlights(),
      categories: dataStore.getCategories(),
      stats: dataStore.getStats(),
      testimonials: dataStore.getTestimonials(),
      faqs: dataStore.getFaqs(),
      settings: dataStore.getSettings(),
      coupons: dataStore.getCoupons(),
      orders: dataStore.getOrders()
    };
  },

  // Import full site data
  importAll: (jsonData) => {
    if (jsonData.courses) dataStore.saveCourses(jsonData.courses);
    if (jsonData.spotlights) dataStore.saveSpotlights(jsonData.spotlights);
    if (jsonData.categories) dataStore.saveCategories(jsonData.categories);
    if (jsonData.stats) dataStore.saveStats(jsonData.stats);
    if (jsonData.testimonials) dataStore.saveTestimonials(jsonData.testimonials);
    if (jsonData.faqs) dataStore.saveFaqs(jsonData.faqs);
    if (jsonData.settings) dataStore.saveSettings(jsonData.settings);
    if (jsonData.coupons) dataStore.saveCoupons(jsonData.coupons);
    if (jsonData.orders) dataStore.saveOrders(jsonData.orders);
  }
};
