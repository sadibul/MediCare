interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: 'patient' | 'doctor' | 'admin';
}

// Simulate a database with localStorage
const USERS_KEY = 'medicare_users';

export const authService = {
  register: (userData: User): boolean => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    // Check if email already exists
    if (users.some((user: User) => user.email === userData.email)) {
      return false;
    }

    users.push(userData);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  },

  login: (email: string, password: string): User | null => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );
    return user || null;
  },
};
