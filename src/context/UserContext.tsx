import React, { createContext, useContext, useState } from 'react';
import { DoctorData } from '@/types/doctor';

interface UserContextType {
  profileImage: string | null;
  updateProfileImage: (image: string | null) => void;
  userType: 'patient' | 'doctor' | 'admin';
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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userType] = useState<'patient' | 'doctor' | 'admin'>('doctor');
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);

  // Use doctorData values if available, otherwise use defaults
  const doctorName = doctorData?.doctorName ?? '';
  const doctorSpecialty = doctorData?.doctorSpecialty ?? '';
  const doctorEmail = doctorData?.doctorEmail ?? '';
  const doctorPhone = doctorData?.doctorPhone ?? '';
  const doctorAddress = doctorData?.doctorAddress ?? '';
  const doctorExperience = doctorData?.doctorExperience ?? '';
  const doctorWorkingHours = doctorData?.doctorWorkingHours ?? '';
  const about = doctorData?.about ?? '';

  // Update functions
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

  const updateProfileImage = (image: string | null) => {
    setProfileImage(image);
  };

  return (
    <UserContext.Provider
      value={{
        profileImage,
        updateProfileImage,
        userType,
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
