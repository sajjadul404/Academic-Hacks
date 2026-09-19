import { Course, SpotlightItem, CategoryItem, Testimonial } from '../types';

export const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: 'spot-04',
    code: '04',
    name: 'Sentinel',
    title: 'BUET & Engineering Apex Physics 2026',
    subtitle: 'Advanced mechanics, electromagnetism & problem-solving blueprints.',
    category: 'Engineering Apex',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    badgeText: 'TOP 10 MERIT',
    description: 'Master higher-level physics with visual interactive simulations, past 20 years question bank solve, and 1-on-1 doubt mentoring.'
  },
  {
    id: 'spot-03',
    code: '03',
    name: 'Vanta',
    title: 'Target DMC 6.0 Medical Biology Mastery',
    subtitle: 'High-yield NCERT/Abul Hasan Biology, Botanics, Zoology line-by-line.',
    category: 'Medical Elite',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    accentColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    badgeText: 'DMC ELITE',
    description: 'Specialized medical question solving tricks, flashcards, 50,000+ question bank and rigorous daily negative-marking model tests.'
  },
  {
    id: 'spot-02',
    code: '02',
    name: 'Velocity',
    title: 'DU ‘Ka’ Unit & GST Turbo Masterclass',
    subtitle: 'Lightning-fast shortcuts, conceptual clarity and daily live tests.',
    category: 'Admission Apex',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    accentColor: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.4)',
    badgeText: 'TURBO APEX',
    description: 'Target top merit positions in Dhaka University & 22 General, Science and Technology universities with dedicated problem solving.'
  },
  {
    id: 'spot-01',
    code: '01',
    name: 'Azure',
    title: 'রসায়ন ১ম ও ২য় পত্র - মাস্টার সিরিজ',
    subtitle: 'Organic reaction mechanisms, stoichiometry & laboratory guides.',
    category: 'Medical Turbo',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    badgeText: 'CHEMISTRY GOLD',
    description: 'Specialized chemistry shortcuts, organic reactions, model tests and live doubt solving.'
  },
  {
    id: 'spot-07',
    code: '07',
    name: 'Rael',
    title: 'IBA & BUP Exclusive Analytical Prep',
    subtitle: 'Math Aptitude, Verbal Ability & Essay Frameworks for Top Business Schools.',
    category: 'Business Elite',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    badgeText: 'IBA & FBS 1ST',
    description: 'Top business school admission prep with previous year questions, verbal analytical tricks and mock vivas.'
  },
  {
    id: 'spot-06',
    code: '06',
    name: 'Zane',
    title: 'ঢাবি ‘খ’ ইউনিট ও মানবিক/বিভাগ পরিবর্তন ৩.০',
    subtitle: 'Bangla, English & General Knowledge for Varsity Admission.',
    category: 'Faculty of Arts',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    badgeText: 'DU B UNIT TOP',
    description: 'Basic Grammar to Advanced Vocabulary, Critical Reading, and Current Affairs mastery for arts & unit shift students.'
  }
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-school',
    name: 'School',
    bengaliName: 'স্কুল একাডেমিক (Class 6-10)',
    icon: 'School',
    count: 240,
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 border-amber-200 text-amber-900',
    textColor: 'text-amber-600',
    badgeColor: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'cat-hsc',
    name: 'HSC',
    bengaliName: 'এইচএসসি একাডেমিক (HSC 25/26)',
    icon: 'GraduationCap',
    count: 310,
    gradient: 'from-blue-600 to-indigo-600',
    bgLight: 'bg-blue-50 border-blue-200 text-blue-900',
    textColor: 'text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'cat-admission',
    name: 'Admission',
    bengaliName: 'বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি (Varsity/Med/Eng)',
    icon: 'BookOpen',
    count: 185,
    gradient: 'from-purple-600 to-violet-600',
    bgLight: 'bg-purple-50 border-purple-200 text-purple-900',
    textColor: 'text-purple-600',
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'cat-nursing',
    name: 'Nursing',
    bengaliName: 'নার্সিং ভর্তি ও ডিপ্লোমা কোর্স',
    icon: 'HeartPulse',
    count: 65,
    gradient: 'from-rose-500 to-red-500',
    bgLight: 'bg-rose-50 border-rose-200 text-rose-900',
    textColor: 'text-rose-600',
    badgeColor: 'bg-rose-100 text-rose-800'
  },
  {
    id: 'cat-arts',
    name: 'Arts & Commerce',
    bengaliName: 'মানবিক ও ব্যবসায় শিক্ষা বিভাগ',
    icon: 'Palette',
    count: 95,
    gradient: 'from-teal-500 to-emerald-600',
    bgLight: 'bg-teal-50 border-teal-200 text-teal-900',
    textColor: 'text-teal-600',
    badgeColor: 'bg-teal-100 text-teal-800'
  },
  {
    id: 'cat-free',
    name: 'Free Course',
    bengaliName: '১০০% ফ্রি ক্লাস ও ট্রায়াল কোর্স',
    icon: 'Sparkles',
    count: 120,
    gradient: 'from-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    textColor: 'text-emerald-600',
    badgeColor: 'bg-emerald-100 text-emerald-800'
  }
];

export const COURSES: Course[] = [
  {
    id: 'du-target-6',
    title: 'Target DU 6.0 (ভার্সিটি+GST)',
    subtitle: 'ঢাকা বিশ্ববিদ্যালয় ‘ক’ ইউনিট ও গুচ্ছভুক্ত ২২ বিশ্ববিদ্যালয়ের সমন্বিত পূর্ণাঙ্গ প্রস্তুতি',
    slug: 'target-du-6-varsity-gst',
    category: 'Admission',
    batchYear: 'HSC-26',
    badge: 'ALL VARSITY + GST',
    examCount: 100,
    classCount: 160,
    price: 3300,
    originalPrice: 4500,
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    enrolledStudents: 14250,
    mentors: [
      { name: 'আসিফ মাহতাব', title: 'Senior Physics Mentor, BUET', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' },
      { name: 'রাকিব হাসান', title: 'Chemistry Expert, DU (A+)', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80' }
    ],
    description: 'ঢাকা বিশ্ববিদ্যালয় সহ সকল স্বায়ত্তশাসিত ও গুচ্ছ বিশ্ববিদ্যালয়ের প্রশ্ন প্যাটার্ন অনুযায়ী কনসেপ্ট ক্লিয়ারিং, ম্যাথ শর্টকাট টেকনিক ও ১০০+ লাইভ এক্সাম।',
    features: [
      '১৬০+ লাইভ ইন্টারঅ্যাক্টিভ ক্লাস',
      '১০০+ কেন্দ্রীয় মেরিট লাইভ এক্সাম',
      'অধ্যায়ভিত্তিক প্রিন্টেড সিক্রেট ফাইলস নোট বুক',
      '২৪/৭ ডেডিকেটেড ডাউট সলভিং টেলিগ্রাম গ্রুপ',
      'বিগত ২০ বছরের প্রশ্নব্যাংক সলিউশন'
    ],
    syllabus: [
      { id: 's1', title: 'পদার্থবিজ্ঞান ১ম ও ২য় পত্র (ভেক্টর, গতিবিদ্যা, কাজ-শক্তি ও আধুনিক পদার্থবিজ্ঞান)', lecturesCount: 45, duration: '68 Hours', topics: ['ভেক্টর এনালাইসিস', 'গতির সমীকরণ ও প্রক্ষেপক', 'মহাকর্ষ ও অভিকর্ষ', 'আলোকবিজ্ঞান'] },
      { id: 's2', title: 'রসায়ন ১ম ও ২য় পত্র (গুণগত রসায়ন, মৌলের পর্যায়বৃত্ত ধর্ম ও জৈব রসায়ন)', lecturesCount: 45, duration: '70 Hours', topics: ['কোয়ান্টাম সংখ্যা', 'সংকরায়ন ও রাসায়নিক বন্ধন', 'জৈব যৌগের নামকরণ ও বিক্রিয়া', 'পরিমাণগত রসায়ন'] },
      { id: 's3', title: 'উচ্চতর গণিত ও শর্টকাট ট্রিকস (ক্যালকুলাস, ম্যাট্রিক্স, সরলরেখা ও বৃত্ত)', lecturesCount: 40, duration: '60 Hours', topics: ['ডিফারেনসিয়েশন', 'ইন্টিগ্রেশন', 'সরলরেখা ও স্থানাঙ্ক', 'ত্রিকোণমিতি'] },
      { id: 's4', title: 'জীববিজ্ঞান দাগানো বই ও ট্রিকস', lecturesCount: 30, duration: '40 Hours', topics: ['কোষ ও এর গঠন', 'জীবপ্রযুক্তি', 'মানব শারীরতত্ত্ব', 'জিনতত্ত্ব ও বিবর্তন'] }
    ],
    videoPreviewUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'du-kha-change-3',
    title: "ঢাবি 'খ'-বিভাগ পরিবর্তন ৩.০",
    subtitle: 'মানবিক বিভাগ ও বিজ্ঞান/ব্যবসায় থেকে বিভাগ পরিবর্তন শিক্ষার্থীদের সেরা কোর্স',
    slug: 'du-kha-unit-bivag-poriborton-3',
    category: 'Arts & Commerce',
    batchYear: 'HSC-26',
    badge: 'মানবিক + বিভাগ পরিবর্তন',
    examCount: 100,
    classCount: 100,
    price: 3000,
    originalPrice: 4000,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    enrolledStudents: 9800,
    mentors: [
      { name: 'ফারহান আহমেদ', title: 'English Mentor, DU (IBA)', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80' },
      { name: 'তানভীর হোসাইন', title: 'GK & Bangla Specialist, DU', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' }
    ],
    description: 'ঢাবি খ ইউনিট এবং বিভাগ পরিবর্তন শিক্ষার্থীদের জন্য মৌলিক ইংরেজি গ্রামার, সাহিত্য, সাধারণ জ্ঞান ও সাম্প্রতিক ঘটনার ওপর পূর্ণাঙ্গ প্রোগ্রাম।',
    features: [
      '১০০+ লাইভ লেকচার ক্লাস',
      '১০০+ বিষয়ভিত্তিক ও মডেল টেস্ট এক্সাম',
      'হ্যান্ডনোট ও ভোকাবুলারি পাওয়ার বুক',
      'লিখিত অংশের (Written Paper) স্পেশাল রিভিউ ও খাতা মূল্যায়ন'
    ],
    syllabus: [
      { id: 'kb1', title: 'বাংলা ১ম ও ২য় পত্র (ব্যাকরণ, সাহিত্য ও বিরচন)', lecturesCount: 35, duration: '50 Hours', topics: ['বাংলা ধ্বনিতত্ত্ব ও ণ-ত্ব ষ-ত্ব', 'কারক ও সমাস', 'পাঠ্যবইয়ের গদ্য-পদ্য বিশ্লেষণ'] },
      { id: 'ke1', title: 'English Masterclass (Grammar, Vocabulary & Comprehension)', lecturesCount: 40, duration: '60 Hours', topics: ['Parts of Speech', 'Right Form of Verbs', 'Prepositions & Idioms', 'Written Paragraph Formulation'] },
      { id: 'kgk1', title: 'সাধারণ জ্ঞান (বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলী + সাম্প্রতিক)', lecturesCount: 25, duration: '35 Hours', topics: ['বাংলাদেশের ইতিহাস ও মুক্তিযুদ্ধ', 'সংবিধান ও ভূগোল', 'আন্তর্জাতিক সংস্থা ও সাম্প্রতিক যুদ্ধ/সন্ধি'] }
    ],
    isPopular: true
  },
  {
    id: 'saikat-chem-eng',
    title: 'সৈকত ভাইয়ার ইঞ্জিনিয়ারিং কেমিস্ট্রি',
    subtitle: 'বুয়েট, কুয়েট, রুয়েট, চুয়েট ও আইইউটি স্পেশাল অ্যাডভান্সড রসায়ন ব্যাচ',
    slug: 'saikat-vaiya-engineering-chemistry',
    category: 'Engineering',
    batchYear: 'HSC 2026',
    badge: 'সেকেন্ড টাইমার + রেগুলার',
    examCount: 20,
    classCount: 40,
    price: 1800,
    originalPrice: 2500,
    thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    enrolledStudents: 6200,
    mentors: [
      { name: 'সৈকত ইসলাম', title: 'BUET ChE’18 | Lead Chemistry Mentor', avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80' }
    ],
    description: 'ইঞ্জিনিয়ারিং ভর্তি পরীক্ষার কনসেপচুয়াল ও গাণিতিক রসায়নে সর্বোচ্চ দক্ষতা অর্জনের জন্য সৈকত ভাইয়ার স্পেশাল ব্যাচ।',
    features: [
      '৪০+ ডেডিকেটেড ইঞ্জিনিয়ারিং লেকচার',
      '২০+ বুয়েট স্ট্যান্ডার্ড রিটেন এক্সাম',
      'প্রতিটি চ্যাপ্টারের অ্যাডভান্সড ম্যাথমেটিকাল শিট',
      'লাইভ ওয়ান-টু-ওয়ান ডাউট সলভ'
    ],
    syllabus: [
      { id: 'ch1', title: 'গুণগত রসায়ন ও সংকরায়নের ডেপথ সমাধান', lecturesCount: 10, duration: '18 Hours', topics: ['মডেল গাণিতিক সমস্যা', 'দ্রাব্যতা গুণফল ও আয়নিক গুণফল', 'জটিল যৌগ'] },
      { id: 'ch2', title: 'রাসায়নিক পরিবর্তন ও তাপগতিবিদ্যা', lecturesCount: 12, duration: '22 Hours', topics: ['Kp ও Kc গণনা', 'বাফার দ্রবণের pH', 'ল সাতেলিয়ারের নীতি'] },
      { id: 'ch3', title: 'জৈব রসায়নের রূপান্তর ও কনভার্সন ট্রিকস', lecturesCount: 18, duration: '35 Hours', topics: ['মেকানিজম ও ইলেক্ট্রোফাইল', 'নামকরণ ও পলিমার', 'শনাক্তকরণ পরীক্ষা'] }
    ],
    isPopular: true
  },
  {
    id: 'dmmc-6',
    title: 'DMMC 6.0 (Target DMC 6.0)',
    subtitle: 'ঢাকা মেডিকেল কলেজসহ দেশের সরকারি মেডিকেল কলেজে ১০০% চান্স নিশ্চিতকরণ কোর্স',
    slug: 'target-dmc-6-medical-admission',
    category: 'Medical',
    batchYear: 'HSC-26',
    badge: 'TARGET DMC 6.0',
    examCount: 60,
    classCount: 150,
    price: 4500,
    originalPrice: 6000,
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    rating: 4.96,
    enrolledStudents: 18400,
    mentors: [
      { name: 'ডা. সানজিদ আহমেদ', title: 'DMC K-76 | MBBS, Gold Medalist', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80' },
      { name: 'ডা. নাফিসা তাবাসসুম', title: 'SSMC | Medical Specialist Mentor', avatar: 'https://images.unsplash.com/photo-1594824813598-94119f39d8eb?auto=format&fit=crop&w=200&q=80' }
    ],
    description: 'মেডিকেল ভর্তি পরীক্ষার জন্য জীববিজ্ঞানের লাইন-বাই-লাইন দাগানো বই, পদার্থবিজ্ঞান ও রসায়নের ক্যালকুলেটর ছাড়া দ্রুত ম্যাথ করার সুপার টেকনিক।',
    features: [
      '১৫০+ মেডিকেল স্ট্যান্ডার্ড লাইভ ক্লাস',
      '৬০+ পূর্ণাঙ্গ নেগেটিভ মার্কিং সহ সেন্ট্রাল এক্সাম',
      'মেডিকেল প্রশ্নব্যাংক ও ডেইলি কুইজ প্র্যাকটিস',
      '৪ সেট দাগানো মূল পাঠ্যবই ও মেডি-ম্যাজিক হ্যান্ডবুক'
    ],
    syllabus: [
      { id: 'mb1', title: 'উদ্ভিদবিজ্ঞান ও প্রাণিবিজ্ঞান দাগানো বই বিশ্লেষণ', lecturesCount: 60, duration: '90 Hours', topics: ['কোষ বিভাজন ও প্রজনন', 'রক্ত সংবহন ও শ্বাসক্রিয়া', 'চলন ও অঙ্গচালনা'] },
      { id: 'mc1', title: 'মেডিকেল কেমিস্ট্রি ও শর্টকাট ম্যাজিক', lecturesCount: 45, duration: '65 Hours', topics: ['পর্যায়বৃত্ত ধর্ম ও ব্লক উপাদান', 'পরিবেশ রসায়ন', 'কর্মমুখী রসায়ন'] },
      { id: 'mp1', title: 'নন-ক্যালকুলেটর মেডিকেল পদার্থবিজ্ঞান', lecturesCount: 30, duration: '40 Hours', topics: ['গতি ও বলবিদ্যা', 'তরঙ্গ ও শব্দ', 'স্থির তড়িৎ ও পরমাণুর মডেল'] },
      { id: 'mg1', title: 'মেডিকেল ইংরেজি ও সাধারণ জ্ঞান স্পেশাল', lecturesCount: 15, duration: '20 Hours', topics: ['Synonym/Antonym', 'Correction', 'মুক্তিযুদ্ধ ও বঙ্গবন্ধু'] }
    ],
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'hsc-physics-mastery',
    title: 'HSC 2026 একাডেমিক ফিজিক্স কমপ্লিট কোর্স',
    subtitle: 'বোর্ড পরীক্ষা ও অ্যাডমিশন ফাউন্ডেশন ১০০% কভার',
    slug: 'hsc-2026-academic-physics-complete',
    category: 'HSC',
    batchYear: 'HSC 2026',
    badge: 'HSC 2026 ACADEMIC',
    examCount: 45,
    classCount: 85,
    price: 2200,
    originalPrice: 3000,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    rating: 4.88,
    enrolledStudents: 11200,
    mentors: [
      { name: 'আসিফ মাহতাব', title: 'Senior Physics Mentor, BUET', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' }
    ],
    description: 'এইচএসসি ফিজিক্স ১ম ও ২য় পত্রের প্রতিটি অধ্যায়ের বেসিক কনসেপ্ট, গাণিতিক সমস্যা এবং বোর্ড সৃজনশীল ও এমসিকিউ সমাধান।',
    features: [
      '৮৫টি বিশদ লেকচার ক্লাস',
      '৪৫টি বোর্ড স্ট্যান্ডার্ড অধ্যায়ভিত্তিক এক্সাম',
      'প্রিন্টেড লেকচার শিট ও CQ সল্যুশন বুক'
    ],
    isPopular: false
  },
  {
    id: 'free-starter-pack',
    title: 'এইচএসসি ও ভর্তি প্রস্তুতি ফ্রি মেগা ক্র্যাশ কোর্স',
    subtitle: 'টপিকভিত্তিক ফ্রি লাইভ ক্লাস ও কুইজ এক্সপেরিয়েন্স',
    slug: 'free-mega-crash-course-hsc-admission',
    category: 'Free Course',
    batchYear: 'All Batches',
    badge: '100% FREE',
    examCount: 15,
    classCount: 25,
    price: 0,
    originalPrice: 1200,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    rating: 4.92,
    enrolledStudents: 45000,
    mentors: [
      { name: 'Academic Hacks মেন্টর টিম', title: 'Top Educators of Bangladesh', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    description: 'আমাদের প্ল্যাটফর্মের ক্লাস কোয়ালিটি এবং টিচারদের পড়ানোর ধরণ যাচাই করার জন্য এই সম্পূর্ণ ফ্রি কোর্সটিতে এখনই যুক্ত হন।',
    features: [
      '২৫টি সম্পূর্ণ ফ্রি এইচডি ভিডিও ক্লাস',
      '১৫টি অটোমেটেড এমসিকিউ টেস্ট উইথ সলিউশন',
      'ফ্রি পিডিএফ নোট ডাউনলোড সুবিধা'
    ],
    isPopular: true,
    isFree: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'তানজিদ রহমান',
    exam: 'BUET Admission 2025',
    rank: 'Merit Position: 14th',
    institution: 'BUET CSE Dept.',
    comment: 'Academic Hacks-এর লাইভ ডাউট সলভ এবং ফিজিক্সের অ্যানিমেশন ক্লাসগুলো আমার ধারণাকে ক্রিস্টাল ক্লিয়ার করেছিল। প্রশ্নব্যাংকের প্রতিটি ম্যাথ হাতে কলমে করানোয় বুয়েট এক্সামে আত্মবিশ্বাস ছিল অনন্য!',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't2',
    name: 'ফারিয়া জান্নাত',
    exam: 'Medical Admission 2025',
    rank: 'Merit Position: 23rd (DMC)',
    institution: 'Dhaka Medical College',
    comment: 'DMC 6.0 কোর্সের দাগানো বই ও ট্রিকসগুলো মেডিকেলের কঠিন তথ্যগুলো খুব সহজে মনে রাখতে সাহায্য করেছে। সেন্ট্রাল মেরিট টেস্টের নেগেটিভ মার্কিং আমাকে ভুল কমানোর অসাধারণ প্র্যাকটিস দিয়েছিল।',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't3',
    name: 'মেহরাব হোসেন নিবিড়',
    exam: 'DU ‘Ka’ Unit 2025',
    rank: 'Merit Position: 5th',
    institution: 'University of Dhaka',
    comment: 'গ্রাম থেকে ঢাকায় না এসেও ঘরে বসেই সেরা মেন্টরদের ক্লাস এবং হ্যান্ডনোট পেয়েছি। প্রতিটি পরীক্ষার পর তাৎক্ষণিক র‍্যাঙ্কিং ও সমাধান পাওয়াটাই সেরা দিক।',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'কোর্সে কীভাবে ভর্তি হবো এবং পেমেন্ট করবো?',
    answer: 'আপনার পছন্দের কোর্সের "এখনই ভর্তি হন" বাটনে ক্লিক করে কার্ট থেকে bKash, Nagad, Rocket অথবা কার্ডের মাধ্যমে খুব সহজেই স্বয়ংক্রিয় পেমেন্ট সম্পন্ন করতে পারবেন। পেমেন্ট সফল হওয়ার সাথে সাথে ড্যাশবোর্ডে কোর্স আনলক হয়ে যাবে।'
  },
  {
    question: 'লাইভ ক্লাস মিস হলে কি রেকর্ড ক্লাস দেখতে পারবো?',
    answer: 'হ্যাঁ, প্রতিটি লাইভ ক্লাস শেষ হওয়ার মাত্র ১ ঘণ্টার মধ্যেই হাই-ডেফিনিশন (HD) রেকর্ডেড ক্লাস আপনার স্টুডেন্ট প্যানেলে সংরক্ষিত হবে এবং অ্যাডমিশন শেষ না হওয়া পর্যন্ত আনলিমিটেড বার দেখতে পারবেন।'
  },
  {
    question: 'ক্লাসের লেকচার শিট ও প্র্যাকটিস ম্যাটেরিয়াল কীভাবে পাবো?',
    answer: 'প্রতিটি ক্লাসের সাথেই টিচারদের স্বহস্তে লেখা ডিজিটাইজড ক্লাস নোট (PDF) এবং প্রিন্টেবল প্র্যাকটিস শিট ডাউনলোড করার অপশন থাকবে। প্রিমিয়াম ব্যাচগুলোতে বাসায় প্রিন্টেড বুক কুরিয়ারে পাঠিয়ে দেওয়া হয়।'
  },
  {
    question: 'কোনো বিষয়ে পড়া না বুঝলে ডাউট কীভাবে সলভ করা হয়?',
    answer: 'আমাদের প্ল্যাটফর্মে রয়েছে ডেডিকেটেড ডাউট সলভ সেকশন ও টেলিগ্রাম সাপোর্ট গ্রুপ, যেখানে প্রশ্ন বা ছবির মাধ্যমে ডাউট সাবমিট করলে আমাদের টপ-ইউনিভার্সিটি মেন্টররা কয়েক মিনিটের মধ্যে বিস্তারিত সমাধান বুঝিয়ে দেন।'
  }
];
