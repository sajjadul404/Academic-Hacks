import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SPOTLIGHT_ITEMS } from '../data/mockData';
import { SpotlightItem } from '../types';

interface HeroSpotlightProps {
  onExploreCourses: () => void;
  onSelectSpotlight: (item: SpotlightItem) => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  onExploreCourses,
  onSelectSpotlight
}) => {
  const items = SPOTLIGHT_ITEMS;
  const count = items.length;

  // Active index (default to index 2: Velocity, matching screenshot)
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
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

  const activeItem = items[activeIndex] || items[0];

  return (
    <section 
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F6F8FC] to-[#F1F4F9] pt-8 sm:pt-12 pb-14 select-none border-b border-slate-200/60"
    >
      {/* Background Watermark Infinite Emblem matching screenshot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.035] -z-0 select-none">
        <svg width="850" height="480" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M150 150 C150 75 225 35 300 150 C375 265 450 225 450 150 C450 75 375 35 300 150 C225 265 150 225 150 150 Z" 
            stroke="currentColor" 
            strokeWidth="8" 
            className="text-slate-900"
          />
          <path 
            d="M100 150 C100 50 200 10 300 150 C400 290 500 250 500 150 C500 50 400 10 300 150 C200 290 100 250 100 150 Z" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeDasharray="12 12"
            className="text-slate-900"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* Top Header with Bengali Tagline */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          
          {/* Subtle volume tag with horizontal lines */}
          <div className="flex items-center justify-center gap-3 mb-4 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-slate-400 uppercase font-mono">
            <span className="w-8 h-[1px] bg-slate-300/80" />
            <span>এডুপ্যাথ স্পটলাইট • প্রিমিয়াম এডমিশন ২০২৬</span>
            <span className="w-8 h-[1px] bg-slate-300/80" />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] font-bold text-slate-900 tracking-normal leading-[1.35] font-['Hind_Siliguri',sans-serif]">
            গ্রাম কিংবা শহর, <br className="hidden sm:inline" />
            সবার জন্য শিক্ষা হোক <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">সহজ থেকে সহজতর...</span>
          </h1>
        </div>

        {/* ============================================================ */}
        {/* 3D Panoramic Concave Arc Ribbon (Exact Screenshot Match) */}
        {/* ============================================================ */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-6xl mx-auto h-[320px] sm:h-[350px] md:h-[380px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
          style={{
            perspective: '1300px',
            perspectiveOrigin: '50% 50%'
          }}
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
        >
          {/* 3D Arc Anchor */}
          <div 
            className="w-full h-full relative flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {items.map((item, index) => {
              // Calculate shortest circular offset from active index
              let offset = index - activeIndex;
              if (offset > count / 2) offset -= count;
              if (offset < -count / 2) offset += count;

              // Continuous dragging fractional shift
              const dragFraction = isDragging ? dragOffset / 260 : 0;
              const effectiveOffset = offset + dragFraction;

              // 3D Concave Arc Math matching the screenshot:
              // Cards spread horizontally, curve backwards in Z, and rotate inward on Y
              const cardSpacing = 185; // horizontal spacing in px
              const translateX = effectiveOffset * cardSpacing;
              const translateZ = -Math.pow(Math.abs(effectiveOffset), 1.35) * 55;
              const rotateY = effectiveOffset * -15; // Inward concave rotation
              const scale = Math.max(0.82, 1 - Math.abs(effectiveOffset) * 0.045);
              const zIndex = Math.round(50 - Math.abs(effectiveOffset) * 8);
              const opacity = Math.max(0.45, 1 - Math.abs(effectiveOffset) * 0.18);
              const isCenter = Math.abs(effectiveOffset) < 0.45;

              return (
                <div
                  key={item.id}
                  id={`spotlight-card-${item.code}`}
                  onClick={(e) => {
                    if (!isCenter) {
                      e.stopPropagation();
                      setActiveIndex(index);
                    } else {
                      onSelectSpotlight(item);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    width: '210px',
                    height: '310px',
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                    zIndex,
                    opacity,
                    transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
                  }}
                  className={`group rounded-[20px] overflow-hidden cursor-pointer select-none bg-[#090f1d] shadow-[0_20px_45px_rgba(0,0,0,0.18)] transition-shadow duration-300 ${
                    isCenter 
                      ? 'ring-2 ring-indigo-400/60 shadow-[0_25px_55px_rgba(15,23,42,0.28)]' 
                      : 'hover:opacity-95'
                  }`}
                >
                  {/* Card Artwork */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Sci-Fi / Cyber Ambient Tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060c18] via-[#060c18]/25 to-transparent pointer-events-none" />

                    {/* Minimal Border Frame */}
                    <div className="absolute inset-0 rounded-[20px] border border-white/15 pointer-events-none" />

                    {/* Top Left Code: 04, 03, 02, 01, 07, 06 matching screenshot */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="text-[11px] font-mono font-medium text-white/90 tracking-wider">
                        {item.code}
                      </span>
                    </div>

                    {/* Bottom Left Name matching screenshot */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                      <h3 className="text-base font-semibold text-white font-['Outfit',sans-serif] tracking-wide drop-shadow-sm">
                        {item.name}
                      </h3>
                      {isCenter && (
                        <p className="text-[10px] text-cyan-300 font-medium tracking-wide uppercase mt-0.5 truncate">
                          {item.category}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* Bottom Interaction Guide & Active Detail Bar */}
        {/* ============================================================ */}
        <div className="mt-6 max-w-4xl mx-auto">
          
          {/* Centered Drag / Swipe Guidance text matching screenshot */}
          <div className="text-center mb-6">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-slate-400 uppercase font-mono">
              DRAG • SWIPE • ARROW KEYS
            </span>
          </div>

          {/* Active Work Detail Banner matching screenshot */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-3 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm">
            
            {/* Left: Code Number & Title */}
            <div className="flex items-baseline gap-4 sm:gap-6">
              <span className="text-3xl sm:text-4xl font-light text-slate-900 font-serif">
                {activeItem.code}
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-normal text-slate-900 font-serif leading-none">
                  {activeItem.name}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1 font-mono">
                  2026 • {activeItem.category} • <span className="text-amber-500 font-bold">★ 9.2</span>
                </p>
              </div>
            </div>

            {/* Right: Actions & Circular Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectSpotlight(activeItem)}
                className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-all cursor-pointer"
              >
                কোর্স সিলেবাস দেখুন
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  aria-label="Previous work"
                  className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next work"
                  className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
