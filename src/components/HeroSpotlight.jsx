import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { SPOTLIGHT_ITEMS } from '../data/mockData';

export const HeroSpotlight = ({
  onExploreCourses,
  onSelectSpotlight
}) => {
  const items = SPOTLIGHT_ITEMS;
  const count = items.length;

  // Active index (default to index 2: Velocity)
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const dragStartX = useRef(0);
  const containerRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [count]);

  // Subtle auto-advance when not interacting
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, isDragging, count]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  }, [count]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
  }, [count]);

  // Mouse & Touch Drag Handlers
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    setDragOffset(0);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -60) {
      handleNext();
    } else if (dragOffset > 60) {
      handlePrev();
    }
    setDragOffset(0);
  };

  // Helper function to calculate 3D card transforms
  const getCardStyle = (index) => {
    let diff = index - activeIndex;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    const isActive = diff === 0;
    const isPrev = diff === -1;
    const isNext = diff === 1;
    const isVisible = Math.abs(diff) <= 2;

    let translateX = diff * 280;
    let scale = 1 - Math.abs(diff) * 0.14;
    let zIndex = 20 - Math.abs(diff) * 5;
    let opacity = 1 - Math.abs(diff) * 0.35;
    let rotateY = diff * -12;

    if (!isVisible) {
      opacity = 0;
      scale = 0.6;
    }

    if (isDragging && isActive) {
      translateX += dragOffset;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      transition: isDragging ? 'none' : 'all 0.55s cubic-bezier(0.25, 1, 0.5, 1)'
    };
  };

  const currentItem = items[activeIndex];

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-[#F4F7FC] pt-8 pb-16 lg:pt-12 lg:pb-24 select-none"
    >
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10 opacity-60">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-indigo-300/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] font-['Outfit',sans-serif]">
            স্বপ্ন জয়ের শুরু <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              সেরা মেন্টরদের সাথে
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            এইচএসসি ও অ্যাডমিশন পরীক্ষার সেরা প্রস্তুতি নাও এক প্ল্যাটফর্মে। কনসেপচুয়াল লাইভ ক্লাস, স্মার্ট নোট ও দেশসেরা পরীক্ষা পদ্ধতি।
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              id="hero-explore-btn"
              onClick={onExploreCourses}
              className="px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>সকল কোর্স দেখুন</span>
            </button>
          </div>
        </div>

        {/* Spotlight 3D Carousel Stage */}
        <div 
          className="relative max-w-5xl mx-auto h-[380px] sm:h-[440px] md:h-[490px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleDragEnd();
          }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          ref={containerRef}
        >
          {/* Left Arrow Navigation */}
          <button
            id="spotlight-prev-btn"
            onClick={handlePrev}
            aria-label="Previous spotlight"
            className="absolute left-2 sm:left-4 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-xl border border-slate-200/80 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>

          {/* Right Arrow Navigation */}
          <button
            id="spotlight-next-btn"
            onClick={handleNext}
            aria-label="Next spotlight"
            className="absolute right-2 sm:right-4 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-xl border border-slate-200/80 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>

          {/* Cards Stack */}
          <div className="relative w-full h-full flex items-center justify-center">
            {items.map((item, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  id={`spotlight-card-${item.code}`}
                  style={style}
                  onClick={() => {
                    if (isActive) {
                      onSelectSpotlight(item);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  className={`absolute w-[240px] sm:w-[280px] md:w-[320px] aspect-[9/14] sm:aspect-[9/13.5] rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-shadow ${
                    isActive ? 'ring-4 ring-indigo-500/30' : ''
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
                  />

                  {/* High Contrast Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />

                  {/* Top Badge (Code & Category) */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span 
                      className="px-2.5 py-1 rounded-lg text-xs font-black tracking-wider bg-black/60 border border-white/20 text-white backdrop-blur-md font-['Outfit',sans-serif]"
                      style={{ color: item.accentColor }}
                    >
                      CODE: {item.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-md">
                      {item.badgeText}
                    </span>
                  </div>

                  {/* Card Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-left">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider text-white" style={{ backgroundColor: item.accentColor }}>
                      {item.category}
                    </span>

                    <h3 className="text-2xl font-black text-white mt-1.5 font-['Outfit',sans-serif] tracking-tight">
                      {item.name}
                    </h3>

                    <p className="text-xs font-medium text-slate-200 line-clamp-2 mt-1 leading-snug">
                      {item.title}
                    </p>

                    <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1 group-hover:text-white transition-colors">
                        <span>কোর্স বিস্তারিত</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[10px] text-slate-400">২০২৬ ব্যাচ</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Carousel Pagination Dots & Active Details Banner */}
        <div className="mt-6 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex 
                    ? 'w-8 bg-indigo-600' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs sm:text-sm font-bold text-slate-800">
              বর্তমান সিলেক্টেড: <span className="text-indigo-600">{currentItem.name}</span> — {currentItem.title}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
