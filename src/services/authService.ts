interface User {
  type: 'patient' | 'doctor' | 'admin';
  name: string;
}

export const authService = {
  login: (email: string, password: string) => {
    if (email === 'patient@gmail.com' && password === '1') {
      return { type: 'patient', name: 'John Doe' };
    }
    if (email === 'doctor@gmail.com' && password === '1') {
      return { type: 'doctor', name: 'Dr. Smith' };
    }
    if (email === 'admin@gmail.com' && password === '1') {
      return { type: 'admin', name: 'Admin User' };
    }
    return null;
  },
};
