export interface Mentor {
  name: string;
  title: string;
  avatar: string;
  institution?: string;
  experience?: string;
}

export interface SyllabusItem {
  id: string;
  title: string;
  lecturesCount: number;
  duration: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: 'School' | 'HSC' | 'Admission' | 'Nursing' | 'Arts & Commerce' | 'Free Course' | 'Engineering' | 'Medical';
  batchYear?: string;
  badge?: string;
  examCount: number;
  classCount: number;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  rating: number;
  enrolledStudents: number;
  mentors: Mentor[];
  description: string;
  features: string[];
  syllabus?: SyllabusItem[];
  videoPreviewUrl?: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  isFree?: boolean;
}

export interface SpotlightItem {
  id: string;
  code: string;
  name: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  accentColor: string;
  glowColor: string;
  badgeText: string;
  description: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  bengaliName: string;
  icon: string;
  count: number;
  gradient: string;
  bgLight: string;
  textColor: string;
  badgeColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  enrolledCourses: string[];
}

export interface CartItem {
  course: Course;
  addedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  exam: string;
  rank: string;
  institution: string;
  comment: string;
  avatar: string;
}
