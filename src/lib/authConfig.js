export const ADMIN_CREDENTIALS = {
  email: 'sajjaduli724@gmail.com',
  password: 'Sajjadul123',
  name: 'Sajjadul Islam',
  role: 'admin'
};

export const isUserAdmin = (user) => {
  if (!user || !user.email) return false;
  return user.email.toLowerCase().trim() === ADMIN_CREDENTIALS.email.toLowerCase();
};
