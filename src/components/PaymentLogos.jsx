import React, { useState } from 'react';

/**
 * 100% Same-to-Same bKash Logo Component
 * Uses the exact 512x512 official bKash App icon matching the user's uploaded bKash-Logo.png
 */
export const BkashIcon = ({ className = "w-14 h-14" }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`${className} bg-[#E2136E] rounded-2xl flex items-center justify-center text-white font-bold font-sans text-xs shadow-sm`}>
        bKash
      </div>
    );
  }

  return (
    <img 
      src="/bkash.png" 
      alt="bKash" 
      onError={() => setHasError(true)}
      className={`${className} object-contain rounded-2xl`} 
      loading="eager"
    />
  );
};

/**
 * 100% Same-to-Same Nagad Logo Component
 * Uses the exact 512x512 official Nagad App icon matching the user's uploaded unnamed.png
 */
export const NagadIcon = ({ className = "w-14 h-14" }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`${className} bg-[#EA1D25] rounded-2xl flex items-center justify-center text-white font-bold font-sans text-xs shadow-sm`}>
        Nagad
      </div>
    );
  }

  return (
    <img 
      src="/nagad.png" 
      alt="Nagad" 
      onError={() => setHasError(true)}
      className={`${className} object-contain rounded-2xl`} 
      loading="eager"
    />
  );
};
