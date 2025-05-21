'use client';

import { PatientData } from '../types/patient';
import { DoctorData } from '../types/doctor';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authService } from '../services/authService';

// Define the User type
export type User = {
  id: string;
  name?: string;
  email?: string;
  type: 'patient' | 'doctor' | 'admin';
  patientData?: PatientData; // Store full patient data here
};

// Make sure PatientData fields are properly typed
export interface UserContextType {
  user: User | null;
  doctorData?: DoctorData;
  profileImage?: string;
  doctorName?: string;
  doctorSpecialty?: string;
  setDoctorData: (data: DoctorData) => void;
  loginUser: (email: string, password: string, type: string) => boolean;
  // Update return type to include id
  getPatientInfo: () =>
    | {
        id?: string;
        name?: string;
        email?: string;
        phone?: string;
        address?: string;
        dob?: string;
        bloodType?: string;
        height?: string;
        weight?: string;
        bmi?: string;
        profileImage?: string | null;
      }
    | undefined;
}

// Create the context with a default value
const UserContext = createContext<UserContextType>({
  user: null,
  setDoctorData: () => {},
  loginUser: () => false,
  getPatientInfo: () => undefined,
});

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [doctorData, setDoctorDataState] = useState<DoctorData | undefined>();

  const loginUser = (
    email: string,
    password: string,
    type: string
  ): boolean => {
    if (type === 'patient') {
      // Use authService to validate patient credentials
      const result = authService.login(email, password, 'patient');

      if (result.success && result.data) {
        // Set user state with patient data
        setUser({
          id: result.data.id || `patient-${Date.now()}`,
          name: result.data.name,
          email: result.data.email,
          type: 'patient',
          patientData: result.data, // Store full patient data
        });
        return true;
      }
      return false;
    } else if (type === 'doctor' || type === 'admin') {
      // Mock login logic for doctor and admin (can be enhanced later)
      if (email && password) {
        setUser({
          id: `${type}-${Date.now()}`,
          email,
          type: type as 'doctor' | 'admin',
        });
        return true;
      }
      return false;
    }

    return false;
  };

  const setDoctorData = (data: DoctorData) => {
    setDoctorDataState(data);
  };

  // Update getPatientInfo to include id
  const getPatientInfo = () => {
    if (!user || user.type !== 'patient') return undefined;

    // Return a patient data object with string values only, including id
    return {
      id: user.id || '', // Add id from user object
      name: user.name || '',
      email: user.email || '',
      phone: user.patientData?.phone || '',
      address: user.patientData?.address || '',
      dob: user.patientData?.dob || '',
      bloodType: user.patientData?.bloodType || '',
      height: user.patientData?.height || '',
      weight: user.patientData?.weight || '',
      bmi: user.patientData?.bmi || '',
      profileImage: user.patientData?.profileImage || null,
    };
  };

  return (
    <UserContext.Provider
      value={{
        user,
        doctorData,
        profileImage: doctorData?.profileImage || null,
        doctorName: doctorData?.doctorName,
        doctorSpecialty: doctorData?.doctorSpecialty,
        setDoctorData,
        loginUser,
        getPatientInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook for using the context
export const useUser = () => useContext(UserContext);

export default UserContext;
