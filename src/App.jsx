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
import { CourseLandingPage } from './components/CourseLandingPage';
import { SpotlightDetailModal } from './components/SpotlightDetailModal';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { DotnetArchitectureModal } from './components/DotnetArchitectureModal';
import { TestimonialsSection, FaqSection } from './components/ExtraSections';
import { AdminPanel } from './components/AdminPanel';

import { dataStore } from './lib/dataStore';
import { localStore, supabase, isSupabaseConfigured } from './lib/supabase';
import { isUserAdmin, ADMIN_CREDENTIALS } from './lib/authConfig';

export default function App() {
  // Global customizable content states from persistent dataStore
  const [courses, setCourses] = useState(() => dataStore.getCourses());
  const [spotlights, setSpotlights] = useState(() => dataStore.getSpotlights());
  const [categories, setCategories] = useState(() => dataStore.getCategories());
  const [stats, setStats] = useState(() => dataStore.getStats());
  const [testimonials, setTestimonials] = useState(() => dataStore.getTestimonials());
  const [faqs, setFaqs] = useState(() => dataStore.getFaqs());
  const [siteSettings, setSiteSettings] = useState(() => dataStore.getSettings());
  const [orders, setOrders] = useState(() => dataStore.getOrders());

  // Cart and user auth states
  const [cart, setCart] = useState(() => localStore.getCart());
  const [user, setUser] = useState(() => localStore.getUser());

  // Strict Admin Privilege Flag:
  // Admin panel access is ONLY permitted if logged in as sajjaduli724@gmail.com
  const isAdmin = isUserAdmin(user);

  // Modals & Drawers
  const [isAdminOpen, setIsAdminOpen] = useState(false);
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

  // Sync route / hash for Course Landing Page
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#course/')) {
        const courseId = hash.replace('#course/', '');
        const found = courses.find(c => c.id === courseId || c.slug === courseId);
        if (found) {
          setSelectedCourse(found);
        }
      } else if (!hash || hash === '#' || hash === '#home' || hash === '#hero') {
        setSelectedCourse(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [courses]);

  // Sync data store changes to localStorage
  useEffect(() => {
    dataStore.saveCourses(courses);
  }, [courses]);

  useEffect(() => {
    dataStore.saveSpotlights(spotlights);
  }, [spotlights]);

  useEffect(() => {
    dataStore.saveCategories(categories);
  }, [categories]);

  useEffect(() => {
    dataStore.saveStats(stats);
  }, [stats]);

  useEffect(() => {
    dataStore.saveTestimonials(testimonials);
  }, [testimonials]);

  useEffect(() => {
    dataStore.saveFaqs(faqs);
  }, [faqs]);

  useEffect(() => {
    dataStore.saveSettings(siteSettings);
  }, [siteSettings]);

  useEffect(() => {
    dataStore.saveOrders(orders);
  }, [orders]);

  // Sync cart to localStore
  useEffect(() => {
    localStore.saveCart(cart);
  }, [cart]);

  // Sync user to localStore
  useEffect(() => {
    localStore.saveUser(user);
  }, [user]);

  // If user is not admin, close the admin panel immediately
  useEffect(() => {
    if (!isAdmin && isAdminOpen) {
      setIsAdminOpen(false);
    }
  }, [isAdmin, isAdminOpen]);

  // Keyboard shortcut: Ctrl+Shift+A opens Admin Panel ONLY for logged-in Admin
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdmin) {
          setIsAdminOpen(prev => !prev);
        } else {
          showToast(`এডমিন প্যানেলে প্রবেশ করতে ${ADMIN_CREDENTIALS.email} দিয়ে লগইন করুন।`);
          setIsAuthOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  // Check Supabase user session on startup if credentials exist
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
    }, 3500);
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
    // Record order in admin history
    const totalAmount = cart.reduce((sum, item) => sum + (item.course?.price || 0), 0);
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: user?.name || 'অনলাইন শিক্ষার্থী',
      studentPhone: user?.phone || '০১৭XXXXXXX',
      studentEmail: user?.email || 'student@academichacks.edu.bd',
      courseNames: cart.map(item => item.course?.title).filter(Boolean).join(', ') || 'কোর্স এনরোলমেন্ট',
      amount: totalAmount || 2500,
      paymentMethod: 'bKash / Card',
      status: 'completed',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders(prev => [newOrder, ...prev]);

    if (user) {
      setUser(prev => prev ? {
        ...prev,
        enrolledCourses: Array.from(new Set([...(prev.enrolledCourses || []), ...purchasedCourseIds]))
      } : null);
    }
    showToast('অভিনন্দন! আপনার এনরোলমেন্ট সফল হয়েছে।');
  };

  const handleDirectPaymentSuccess = (course, method, senderPhone, trxId) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: user?.name || 'অনলাইন শিক্ষার্থী',
      studentPhone: senderPhone || user?.phone || '০১৭XXXXXXX',
      studentEmail: user?.email || 'student@academichacks.edu.bd',
      courseNames: course?.title || 'কোর্স এনরোলমেন্ট',
      amount: course?.price || 0,
      paymentMethod: method === 'bkash' ? 'bKash' : 'Nagad',
      trxId: trxId || 'N/A',
      status: 'completed',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders(prev => [newOrder, ...prev]);

    if (user) {
      setUser(prev => prev ? {
        ...prev,
        enrolledCourses: Array.from(new Set([...(prev.enrolledCourses || []), course.id]))
      } : null);
    }
    showToast(`"${course.title}" কোর্সে আপনার ভর্তি নিশ্চিত হয়েছে!`);
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
    setIsAdminOpen(false);
    showToast('আপনি সফলভাবে লগ আউট হয়েছেন।');
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    if (course) {
      window.location.hash = `course/${course.id}`;
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId) => {
    if (selectedCourse) {
      setSelectedCourse(null);
      window.location.hash = '';
    }

    if (sectionId === 'free-courses') {
      const freeCourse = courses.find(c => c.isFree);
      if (freeCourse) {
        handleSelectCourse(freeCourse);
      } else {
        const el = document.getElementById('admission');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, selectedCourse ? 100 : 0);
  };

  const handleSelectCategory = (categoryId, name) => {
    if (selectedCourse) {
      setSelectedCourse(null);
      window.location.hash = '';
    }
    setSelectedCategory(name);
    setTimeout(() => {
      const admissionSection = document.getElementById('admission');
      if (admissionSection) {
        admissionSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, selectedCourse ? 100 : 0);
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
        siteSettings={siteSettings}
        isAdmin={isAdmin}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDotnetGuide={() => setIsDotnetGuideOpen(true)}
        onOpenAdmin={isAdmin ? () => setIsAdminOpen(true) : null}
        onLogout={handleLogout}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Body Flow */}
      <main className="flex-grow">
        {selectedCourse ? (
          <CourseLandingPage
            course={selectedCourse}
            onBack={() => handleSelectCourse(null)}
            onSelectCourse={handleSelectCourse}
            allCourses={courses}
            onAddToCart={handleAddToCart}
            inCart={selectedCourse ? cartCourseIds.includes(selectedCourse.id) : false}
            onEnrollNow={handleEnrollNowDirect}
            onDirectPaymentSuccess={handleDirectPaymentSuccess}
          />
        ) : (
          <>
            {/* 1. Hero Spotlight Carousel Section */}
            <HeroSpotlight
              items={spotlights}
              onExploreCourses={() => handleNavigateSection('admission')}
              onSelectSpotlight={(item) => setSelectedSpotlight(item)}
            />

            {/* 2. Glassmorphic Key Metrics Stats Bar */}
            <StatsBar stats={stats} />

            {/* 3. Browse Courses by Class Category Grid */}
            <CategoryGrid
              categories={categories}
              onSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
            />

            {/* 4. Popular Courses Showcase (Admission HSC-26) */}
            <CourseShowcase
              courses={courses}
              onSelectCourse={handleSelectCourse}
              onAddToCart={handleAddToCart}
              cartCourseIds={cartCourseIds}
              selectedCategory={selectedCategory}
            />

            {/* 5. Why Choose Us / Online Learning Benefits Section */}
            <WhyUsSection />

            {/* 6. Academic Hacks Unique Features & Student Benefits Section */}
            <BenefitsSection />

            {/* 7. Student Success Testimonials */}
            <TestimonialsSection testimonials={testimonials} />

            {/* 8. Frequently Asked Questions (FAQ) */}
            <FaqSection faqs={faqs} />

            {/* 9. Newsletter Email Subscription Bar */}
            <Newsletter />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigateSection={handleNavigateSection} 
        onOpenAdmin={isAdmin ? () => setIsAdminOpen(true) : null}
        siteSettings={siteSettings}
        isAdmin={isAdmin}
      />

      {/* Floating WhatsApp Support Button */}
      <FloatingWhatsApp />

      {/* Full Admin Control Panel - ONLY accessible if logged in as Admin */}
      {isAdmin && (
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          courses={courses}
          setCourses={setCourses}
          spotlights={spotlights}
          setSpotlights={setSpotlights}
          categories={categories}
          setCategories={setCategories}
          stats={stats}
          setStats={setStats}
          testimonials={testimonials}
          setTestimonials={setTestimonials}
          faqs={faqs}
          setFaqs={setFaqs}
          siteSettings={siteSettings}
          setSiteSettings={setSiteSettings}
          orders={orders}
          setOrders={setOrders}
          showToast={showToast}
        />
      )}

      {/* Interactive Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckoutSuccess={handleCheckoutSuccess}
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
          if (isUserAdmin(loggedUser)) {
            showToast('স্বাগতম সাজ্জাদুল! এডমিন প্যানেল সক্রিয় হয়েছে।');
            setIsAdminOpen(true);
          } else {
            showToast(`স্বাগতম, ${loggedUser.name}!`);
          }
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        courses={courses}
        onSelectCourse={handleSelectCourse}
      />

      <DotnetArchitectureModal
        isOpen={isDotnetGuideOpen}
        onClose={() => setIsDotnetGuideOpen(false)}
      />

    </div>
  );
}
