import { prisma } from '@/lib/prisma';
import { DoctorData } from '@/types/doctor';

interface User {
  type: 'patient' | 'doctor' | 'admin';
  name: string;
}

interface LoginResponse {
  success: boolean;
  data?: DoctorData;
  message?: string;
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

  async loginDoctor(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log('Attempting login for:', email); // Add logging
      const response = await fetch('/api/auth/doctor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        cache: 'no-store', // Prevent caching
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Login result:', result.success); // Add logging
      return result;
    } catch (error) {
      console.error('Login error details:', error);
      return {
        success: false,
        message: 'Network or server error occurred',
      };
    }
  },
};
