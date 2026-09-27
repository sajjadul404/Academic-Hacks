export const ADMIN_PHONE = '01560060092';

export const ADMIN_CREDENTIALS = {
  phone: '01560060092',
  email: 'sajjaduli724@gmail.com',
  password: 'Sajjadul123',
  name: 'এডমিন (সাজ্জাদুল ইসলাম)',
  role: 'admin'
};

export const normalizePhone = (phone) => {
  if (!phone) return '';
  return String(phone).replace(/[^0-9]/g, '').replace(/^88/, '');
};

export const isUserAdmin = (user) => {
  if (!user) return false;
  const adminPhone = normalizePhone(ADMIN_PHONE);
  
  // Check phone number
  const userPhone = normalizePhone(user.phone || '');
  if (userPhone && userPhone === adminPhone) return true;
  
  // Check if phone was stored in email or user id
  if (user.email) {
    const emailPhone = normalizePhone(user.email);
    if (emailPhone === adminPhone) return true;
  }
  if (user.id && user.id.includes(adminPhone)) return true;

  return false;
};


