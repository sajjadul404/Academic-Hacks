import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSpotlight } from './components/HeroSpotlight';
import { StatsBar } from './components/StatsBar';
import { CategoryGrid } from './components/CategoryGrid';
import { CourseShowcase } from './components/CourseShowcase';
import { WhyUsSection } from './components/WhyUsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CourseDetailModal } from './components/CourseDetailModal';
import { SpotlightDetailModal } from './components/SpotlightDetailModal';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { DotnetArchitectureModal } from './components/DotnetArchitectureModal';
import { TestimonialsSection, FaqSection } from './components/ExtraSections';

import { COURSES } from './data/mockData';
import { localStore, supabase, isSupabaseConfigured } from './lib/supabase';

export default function App() {
  const [courses, setCourses] = useState(COURSES);
  const [cart, setCart] = useState(() => localStore.getCart());
  const [user, setUser] = useState(() => localStore.getUser());

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDotnetGuideOpen, setIsDotnetGuideOpen] = useState(false);
  
  // Selected detailed views
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSpotlight, setSelectedSpotlight] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to localStore
  useEffect(() => {
    localStore.saveCart(cart);
  }, [cart]);

  // Sync user to localStore
  useEffect(() => {
    localStore.saveUser(user);
  }, [user]);

  // Optional: check Supabase user session on startup if credentials exist
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            phone: session.user.user_metadata?.phone,
            enrolledCourses: []
          });
        }
      });
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (course) => {
    if (cart.some(item => item.course.id === course.id)) {
      showToast('কোর্সটি ইতোমধ্যে আপনার কার্টে যুক্ত আছে!');
      setIsCartOpen(true);
      return;
    }

    const newItem = {
      course,
      addedAt: new Date().toISOString()
    };
    setCart(prev => [...prev, newItem]);
    showToast(`"${course.title}" কার্টে যোগ করা হয়েছে!`);
  };

  const handleRemoveFromCart = (courseId) => {
    setCart(prev => prev.filter(item => item.course.id !== courseId));
    showToast('আইটেমটি কার্ট থেকে সরানো হয়েছে।');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckoutSuccess = (purchasedCourseIds) => {
    if (user) {
      setUser(prev => prev ? {
        ...prev,
        enrolledCourses: Array.from(new Set([...(prev.enrolledCourses || []), ...purchasedCourseIds]))
      } : null);
    }
    showToast('অভিনন্দন! আপনার এনরোলমেন্ট সফল হয়েছে।');
  };

  const handleEnrollNowDirect = (course) => {
    if (!cart.some(item => item.course.id === course.id)) {
      setCart(prev => [...prev, { course, addedAt: new Date().toISOString() }]);
    }
    setIsCartOpen(true);
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    showToast('আপনি সফলভাবে লগ আউট হয়েছেন।');
  };

  const handleNavigateSection = (sectionId) => {
    if (sectionId === 'free-courses') {
      const freeCourse = courses.find(c => c.isFree);
      if (freeCourse) {
        setSelectedCourse(freeCourse);
      } else {
        const el = document.getElementById('admission');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryId, name) => {
    setSelectedCategory(name);
    const admissionSection = document.getElementById('admission');
    if (admissionSection) {
      admissionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCourseIds = cart.map(item => item.course.id);

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 flex flex-col font-['Hind_Siliguri',sans-serif]">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in slide-in-from-top-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        cart={cart}
        user={user}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDotnetGuide={() => setIsDotnetGuideOpen(true)}
        onLogout={handleLogout}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Body Flow matching screenshot */}
      <main className="flex-grow">
        
        {/* 1. Hero Spotlight Carousel Section */}
        <HeroSpotlight
          onExploreCourses={() => handleNavigateSection('admission')}
          onSelectSpotlight={(item) => setSelectedSpotlight(item)}
        />

        {/* 2. Glassmorphic Key Metrics Stats Bar */}
        <StatsBar />

        {/* 3. Browse Courses by Class Category Grid */}
        <CategoryGrid
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />

        {/* 4. Popular Courses Showcase (Admission HSC-26) */}
        <CourseShowcase
          courses={courses}
          onSelectCourse={(course) => setSelectedCourse(course)}
          onAddToCart={handleAddToCart}
          cartCourseIds={cartCourseIds}
        />

        {/* 5. Why Choose Us / Online Learning Benefits Section */}
        <WhyUsSection />

        {/* 6. Academic Hacks Unique Features & Student Benefits Section */}
        <BenefitsSection />

        {/* 7. Student Success Testimonials */}
        <TestimonialsSection />

        {/* 8. Frequently Asked Questions (FAQ) */}
        <FaqSection />

        {/* 9. Newsletter Email Subscription Bar */}
        <Newsletter />

      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Floating WhatsApp Support Button */}
      <FloatingWhatsApp />

      {/* Interactive Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onAddToCart={handleAddToCart}
        inCart={selectedCourse ? cartCourseIds.includes(selectedCourse.id) : false}
        onEnrollNow={handleEnrollNowDirect}
      />

      <SpotlightDetailModal
        item={selectedSpotlight}
        onClose={() => setSelectedSpotlight(null)}
        onExploreCourses={() => {
          setSelectedSpotlight(null);
          handleNavigateSection('admission');
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          showToast(`স্বাগতম, ${loggedUser.name}!`);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        courses={courses}
        onSelectCourse={(course) => setSelectedCourse(course)}
      />

      <DotnetArchitectureModal
        isOpen={isDotnetGuideOpen}
        onClose={() => setIsDotnetGuideOpen(false)}
      />

    </div>
  );
}
