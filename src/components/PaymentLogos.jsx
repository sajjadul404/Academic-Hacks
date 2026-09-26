import React from 'react';

/**
 * Pixel-accurate bKash Origami Logo Component matching the user's uploaded bKash-Logo.png
 */
export const BkashIcon = ({ className = "w-14 h-14" }) => (
  <svg 
    viewBox="0 0 512 512" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rounded squircle background */}
    <rect width="512" height="512" rx="105" fill="#E2136E" />
    
    {/* Origami Bird Facets with crisp fold seams */}
    <g stroke="#E2136E" strokeWidth="3" strokeLinejoin="round">
      {/* 1. Large Top Wing */}
      <path 
        d="M65 72 L245 94 L200 246 Z" 
        fill="#FFFFFF" 
      />
      
      {/* 2. Top-left small wing under-fold */}
      <path 
        d="M58 101 L129 171 L65 72 Z" 
        fill="#FFFFFF" 
      />
      
      {/* 3. Center Body Quadrilateral/Triangle */}
      <path 
        d="M245 94 L381 270 L200 246 Z" 
        fill="#FFFFFF" 
      />
      
      {/* 4. Head with pointed beak */}
      <path 
        d="M381 270 L420 186 L454 221 Z" 
        fill="#FFFFFF" 
      />
      
      {/* 5. Lower Wing / Belly triangle */}
      <path 
        d="M200 246 L374 282 L225 350 Z" 
        fill="#FFFFFF" 
      />
      
      {/* 6. Underwing shadow crease */}
      <path 
        d="M250 345 L374 282 L368 296 L258 350 Z" 
        fill="#E2136E" 
      />
      
      {/* 7. Long Lower Tail */}
      <path 
        d="M200 246 L225 350 L143 438 Z" 
        fill="#FFFFFF" 
      />
    </g>
  </svg>
);

/**
 * Pixel-accurate Nagad Logo Component matching the user's uploaded unnamed.png
 */
export const NagadIcon = ({ className = "w-14 h-14" }) => (
  <svg 
    viewBox="0 0 512 512" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="nagadBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FA3A29" />
        <stop offset="100%" stopColor="#DC1422" />
      </linearGradient>
    </defs>

    {/* Rounded squircle background */}
    <rect width="512" height="512" rx="105" fill="url(#nagadBg)" />

    {/* Center Swirl Emblem */}
    <g transform="translate(0, -10)">
      {/* Swirling aperture ribbons */}
      <path 
        d="M256 60 C320 60 376 96 405 150 C380 135 340 120 290 120 C235 120 190 150 170 185 C185 140 215 90 256 60 Z" 
        fill="#FFFFFF" 
      />
      <path 
        d="M405 150 C430 200 425 260 395 305 C385 270 355 240 320 220 C365 200 390 170 405 150 Z" 
        fill="#FFFFFF" 
      />
      <path 
        d="M395 305 C360 355 305 385 250 380 C275 355 285 320 275 280 C325 310 365 315 395 305 Z" 
        fill="#FFFFFF" 
      />
      <path 
        d="M250 380 C185 375 135 335 115 275 C145 285 185 280 220 260 C170 270 135 245 115 275 Z" 
        fill="#FFFFFF" 
      />
      <path 
        d="M115 275 C95 220 110 160 150 115 C140 150 150 195 175 225 C140 180 135 140 150 115 Z" 
        fill="#FFFFFF" 
      />
      
      {/* Outer circular ribbon loop */}
      <path 
        d="M256 95 C335 95 398 158 398 237 C398 316 335 379 256 379 C177 379 114 316 114 237 C114 158 177 95 256 95 Z" 
        stroke="#FFFFFF" 
        strokeWidth="38" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Internal Postal Runner ("ডাক হরকরা" / Dak Harkara) Silhouette */}
      <g fill="#FFFFFF" transform="translate(182, 160) scale(0.72)">
        {/* Head with Turban */}
        <circle cx="95" cy="40" r="14" />
        <path d="M88 32 C95 24 108 24 114 33 C110 30 96 30 88 32 Z" />
        
        {/* Mail staff / spear held over shoulder */}
        <rect x="15" y="65" width="135" height="7" rx="3.5" transform="rotate(-6 85 68)" />
        
        {/* Hanging Lantern (হারিকেন) from the spear */}
        <path d="M38 72 L38 82 M32 82 L44 82 L42 98 L34 98 Z M34 98 L42 98 L40 102 L36 102 Z" stroke="#FFFFFF" strokeWidth="2.5" fill="#FFFFFF" />
        <circle cx="38" cy="90" r="3" fill="#E11925" />

        {/* Torso & Backpack mail sack */}
        <path d="M85 52 C95 52 108 60 105 78 L88 88 L80 62 Z" />
        <path d="M102 55 C115 58 122 70 118 82 C112 90 102 88 98 82 Z" /> {/* Sack */}

        {/* Runner Front Leg (lunging right) */}
        <path d="M88 88 L110 102 L132 108 L136 116 L124 114 L106 106 L82 92 Z" />

        {/* Runner Back Leg (trailing left) */}
        <path d="M80 85 L65 98 L48 95 L44 98 L48 103 L68 104 L84 90 Z" />
      </g>
    </g>

    {/* Bengali Typography: "নগদ" */}
    <g fill="#FFFFFF">
      {/* Top continuous matra bar */}
      <rect x="105" y="362" width="302" height="15" rx="7.5" />

      {/* Letter: ন */}
      <path d="M125 372 V445 C125 452 131 458 138 458 C145 458 151 452 151 445 V405 C162 422 178 425 188 418 C198 410 200 395 195 385 C190 375 178 372 165 375 C155 377 151 385 151 388 V372 Z M175 398 C178 404 175 410 168 410 C162 410 156 405 154 398 C156 392 165 392 175 398 Z" />

      {/* Letter: গ */}
      <path d="M225 410 C225 390 238 375 258 375 C275 375 285 388 285 405 C285 418 278 428 268 432 L285 452 H262 L248 434 C236 432 225 422 225 410 Z M248 410 C248 418 255 422 262 420 C268 418 270 412 270 405 C270 395 265 390 258 390 C250 390 248 398 248 410 Z" />
      <rect x="295" y="372" width="22" height="85" rx="8" />

      {/* Letter: দ */}
      <path d="M342 372 V415 C342 425 348 430 358 430 H372 C378 430 382 434 382 440 V452 C382 462 390 468 400 464 C406 461 408 452 406 442 L402 425 C398 415 390 412 378 412 H364 V372 Z" />
    </g>
  </svg>
);
