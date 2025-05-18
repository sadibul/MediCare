import { prisma } from '@/lib/prisma';
import { DoctorData } from '@/types/doctor';
import { samplePatients, PatientData } from '@/types/patient';

interface User {
  type: 'patient' | 'doctor' | 'admin';
  name: string;
}

interface LoginResponse {
  success: boolean;
  data?: DoctorData;
  message?: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: 'patient' | 'doctor' | 'admin';
}

type AuthResponse = {
  success: boolean;
  message?: string;
  data?: PatientData;
};

class AuthService {
  login(email: string, password: string, type: 'patient' | 'doctor' | 'admin') {
    if (type === 'patient') {
      // Find a patient with matching email and password
      const patient = samplePatients.find(
        (p) => p.email === email && p.password === password
      );

      // Return authentication result
      return {
        success: !!patient,
        data: patient || null,
      };
    }

    // For other types, implement similar logic
    return {
      success: false,
      data: null,
    };
  }

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
  }

  register(data: RegisterData) {
    // Check if user with the email already exists
    if (samplePatients.some((patient) => patient.email === data.email)) {
      return false;
    }

    // In a real app, this would add the user to the database
    // Here we just return success
    return true;
  }
}

export const authService = new AuthService();
