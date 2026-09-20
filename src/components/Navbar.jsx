import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  GraduationCap, 
  User as UserIcon, 
  LogOut, 
  BookOpen, 
  Sparkles,
  Code2,
  ShieldCheck
} from 'lucide-react';

export const Navbar = ({
  cart = [],
  user = null,
  siteSettings = null,
  onOpenCart,
  onOpenAuth,
  onOpenSearch,
  onOpenDotnetGuide,
  onOpenAdmin,
  onLogout,
  onNavigateSection,
  isAdmin = false
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const brandTitle = siteSettings?.brandName || 'Academic Hacks';
  const brandTagline = siteSettings?.brandTagline || 'শিক্ষার সহজ পথ';

  const navLinks = [
    { name: 'Home', bengaliName: 'হোম', id: 'hero' },
    { name: 'Courses', bengaliName: 'কোর্সসমূহ', id: 'courses' },
    { name: 'Admission', bengaliName: 'অ্যাডমিশন', id: 'admission' },
    { name: 'Free Course', bengaliName: 'ফ্রি কোর্স', id: 'free-courses' },
    { name: 'About Us', bengaliName: 'আমাদের সম্পর্কে', id: 'about' },
    { name: 'Contact', bengaliName: 'যোগাযোগ', id: 'contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 border-b border-indigo-50/60 shadow-[0_4px_25px_rgba(79,70,229,0.04)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <div 
              id="brand-logo"
              onClick={() => onNavigateSection('hero')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 transform -rotate-6" />
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 bg-clip-text text-transparent font-['Outfit',sans-serif]">
                    {brandTitle}
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-md">
                    LIVE
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium tracking-wide font-['Hind_Siliguri',sans-serif]">
                  {brandTagline}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => onNavigateSection(link.id)}
                  className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 transition-all cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Right Action Icons & Auth */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Admin Panel Button - Visible ONLY to logged-in Admin */}
              {isAdmin && onOpenAdmin && (
                <button
                  id="btn-open-admin"
                  onClick={onOpenAdmin}
                  title="এডমিন প্যানেল খুলুন"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span className="hidden sm:inline">এডমিন প্যানেল</span>
                </button>
              )}

              {/* Search Icon */}
              <button
                id="btn-open-search"
                onClick={onOpenSearch}
                aria-label="Search courses"
                className="p-2.5 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80 transition-all cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Icon with badge */}
              <button
                id="btn-open-cart"
                onClick={onOpenCart}
                aria-label="Open cart"
                className="relative p-2.5 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span 
                    id="cart-badge-count"
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full border-2 border-white shadow-sm animate-pulse"
                  >
                    {cart.length}
                  </span>
                )}
              </button>

            {/* Login / Profile Button */}
            {user ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigateSection('courses');
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      আমার কোর্সসমূহ ({user.enrolledCourses?.length || 0})
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      লগ আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="btn-login-register"
                onClick={onOpenAuth}
                className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:from-indigo-700 hover:to-purple-800 rounded-full shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Login / Register
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigateSection(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-xl"
                >
                  <span className="font-medium mr-2">{link.name}</span>
                  <span className="text-xs text-slate-400">({link.bengaliName})</span>
                </button>
              ))}

              {isAdmin && onOpenAdmin && (
                <button
                  onClick={() => {
                    onOpenAdmin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>এডমিন কন্ট্রোল প্যানেল</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  );
};
