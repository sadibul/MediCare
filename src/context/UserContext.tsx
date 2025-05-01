import React, { createContext, useContext, useState } from 'react';

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
  updateDoctorName: (name: string) => void;
  updateDoctorSpecialty: (specialty: string) => void;
  updateDoctorEmail: (email: string) => void;
  updateDoctorPhone: (phone: string) => void;
  updateDoctorAddress: (address: string) => void;
  updateDoctorExperience: (experience: string) => void;
  updateDoctorWorkingHours: (hours: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userType] = useState<'patient' | 'doctor' | 'admin'>('doctor'); // For this example
  const [doctorName, setDoctorName] = useState('Dr. Sarah Johnson');
  const [doctorSpecialty, setDoctorSpecialty] = useState('Cardiology');
  const [doctorEmail, setDoctorEmail] = useState('sarah.johnson@medicare.com');
  const [doctorPhone, setDoctorPhone] = useState('+1 (555) 123-4567');
  const [doctorAddress, setDoctorAddress] = useState(
    '123 Medical Center Drive, Suite 200'
  );
  const [doctorExperience, setDoctorExperience] = useState('15 years');
  const [doctorWorkingHours, setDoctorWorkingHours] =
    useState('9:00 AM - 5:00 PM');

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
        updateDoctorName: setDoctorName,
        updateDoctorSpecialty: setDoctorSpecialty,
        updateDoctorEmail: setDoctorEmail,
        updateDoctorPhone: setDoctorPhone,
        updateDoctorAddress: setDoctorAddress,
        updateDoctorExperience: setDoctorExperience,
        updateDoctorWorkingHours: setDoctorWorkingHours,
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
