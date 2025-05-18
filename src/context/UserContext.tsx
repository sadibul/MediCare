import React, { createContext, useContext, useState } from 'react';
import { PatientData } from '../types/patient';
import { DoctorData } from '../types/doctor';
import { authService } from '../services/authService';

interface UserContextType {
  profileImage: string | null;
  updateProfileImage: (image: string | null) => void;
  userType: 'patient' | 'doctor' | 'admin';
  setUserType: (type: 'patient' | 'doctor' | 'admin') => void;

  // Doctor-specific data
  doctorName: string;
  doctorSpecialty: string;
  doctorEmail: string;
  doctorPhone: string;
  doctorAddress: string;
  doctorExperience: string;
  doctorWorkingHours: string;
  about: string;
  updateDoctorName: (name: string) => void;
  updateDoctorSpecialty: (specialty: string) => void;
  updateDoctorEmail: (email: string) => void;
  updateDoctorPhone: (phone: string) => void;
  updateDoctorAddress: (address: string) => void;
  updateDoctorExperience: (experience: string) => void;
  updateDoctorWorkingHours: (hours: string) => void;
  setDoctorData: (data: DoctorData) => void;
  doctorData: DoctorData | null;

  // Patient-specific data
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userDob: string;
  userBloodType: string;
  userHeight: string;
  userWeight: string;
  userBmi: string;
  updateUserName: (name: string) => void;
  updateUserEmail: (email: string) => void;
  setPatientData: (data: PatientData) => void;
  patientData: PatientData | null;

  // Authentication
  loginUser: (
    email: string,
    password: string,
    type: 'patient' | 'doctor' | 'admin'
  ) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>(
    'patient'
  );
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  // Use doctorData values if available, otherwise use defaults
  const doctorName = doctorData?.doctorName ?? '';
  const doctorSpecialty = doctorData?.doctorSpecialty ?? '';
  const doctorEmail = doctorData?.doctorEmail ?? '';
  const doctorPhone = doctorData?.doctorPhone ?? '';
  const doctorAddress = doctorData?.doctorAddress ?? '';
  const doctorExperience = doctorData?.doctorExperience ?? '';
  const doctorWorkingHours = doctorData?.doctorWorkingHours ?? '';
  const about = doctorData?.about ?? '';

  // Patient data
  const userName = patientData?.name ?? '';
  const userEmail = patientData?.email ?? '';
  const userPhone = patientData?.phone ?? '';
  const userAddress = patientData?.address ?? '';
  const userDob = patientData?.dob ?? '';
  const userBloodType = patientData?.bloodType ?? '';
  const userHeight = patientData?.height ?? '';
  const userWeight = patientData?.weight ?? '';
  const userBmi = patientData?.bmi ?? '';

  // Doctor update functions
  const updateDoctorName = (name: string) =>
    setDoctorData((prev) => (prev ? { ...prev, doctorName: name } : null));
  const updateDoctorSpecialty = (specialty: string) =>
    setDoctorData((prev) =>
      prev ? { ...prev, doctorSpecialty: specialty } : null
    );
  const updateDoctorEmail = (email: string) =>
    setDoctorData((prev) => (prev ? { ...prev, doctorEmail: email } : null));
  const updateDoctorPhone = (phone: string) =>
    setDoctorData((prev) => (prev ? { ...prev, doctorPhone: phone } : null));
  const updateDoctorAddress = (address: string) =>
    setDoctorData((prev) =>
      prev ? { ...prev, doctorAddress: address } : null
    );
  const updateDoctorExperience = (experience: string) =>
    setDoctorData((prev) =>
      prev ? { ...prev, doctorExperience: experience } : null
    );
  const updateDoctorWorkingHours = (hours: string) =>
    setDoctorData((prev) =>
      prev ? { ...prev, doctorWorkingHours: hours } : null
    );

  // Patient update functions
  const updateUserName = (name: string) =>
    setPatientData((prev) => (prev ? { ...prev, name } : null));
  const updateUserEmail = (email: string) =>
    setPatientData((prev) => (prev ? { ...prev, email } : null));

  const updateProfileImage = (image: string | null) => {
    setProfileImage(image);
    if (userType === 'patient' && patientData) {
      setPatientData({ ...patientData, profileImage: image });
    } else if (userType === 'doctor' && doctorData) {
      setDoctorData({ ...doctorData, profileImage: image });
    }
  };

  // Authentication function
  const loginUser = (
    email: string,
    password: string,
    type: 'patient' | 'doctor' | 'admin'
  ): boolean => {
    if (type === 'patient') {
      const result = authService.login(email, password, 'patient');
      if (result.success && result.data) {
        setUserType('patient');
        setPatientData(result.data);
        setProfileImage(result.data.profileImage);
        return true;
      }
    } else if (type === 'doctor') {
      // Doctor authentication is handled by the component through authService.loginDoctor
      return true;
    } else if (type === 'admin') {
      // Simple admin login for demo purposes
      if (email === 'admin@gmail.com' && password === 'admin') {
        setUserType('admin');
        return true;
      }
    }
    return false;
  };

  return (
    <UserContext.Provider
      value={{
        profileImage,
        updateProfileImage,
        userType,
        setUserType,
        doctorName,
        doctorSpecialty,
        doctorEmail,
        doctorPhone,
        doctorAddress,
        doctorExperience,
        doctorWorkingHours,
        about,
        updateDoctorName,
        updateDoctorSpecialty,
        updateDoctorEmail,
        updateDoctorPhone,
        updateDoctorAddress,
        updateDoctorExperience,
        updateDoctorWorkingHours,
        doctorData,
        setDoctorData,
        userName,
        userEmail,
        userPhone,
        userAddress,
        userDob,
        userBloodType,
        userHeight,
        userWeight,
        userBmi,
        updateUserName,
        updateUserEmail,
        patientData,
        setPatientData,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
