import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  profileImage: string | null;
  userName: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorEmail: string;
  doctorPhone: string;
  doctorAddress: string;
  doctorExperience: string;
  doctorWorkingHours: string;
  updateProfileImage: (image: string | null) => void;
  updateUserName: (name: string) => void;
  updateDoctorName: (name: string) => void;
  updateDoctorSpecialty: (specialty: string) => void;
  updateDoctorEmail: (email: string) => void;
  updateDoctorPhone: (phone: string) => void;
  updateDoctorAddress: (address: string) => void;
  updateDoctorExperience: (experience: string) => void;
  updateDoctorWorkingHours: (hours: string) => void;
}

const UserContext = createContext<UserContextType>({
  profileImage: null,
  userName: '',
  doctorName: '',
  doctorSpecialty: '',
  doctorEmail: '',
  doctorPhone: '',
  doctorAddress: '',
  doctorExperience: '',
  doctorWorkingHours: '',
  updateProfileImage: () => {},
  updateUserName: () => {},
  updateDoctorName: () => {},
  updateDoctorSpecialty: () => {},
  updateDoctorEmail: () => {},
  updateDoctorPhone: () => {},
  updateDoctorAddress: () => {},
  updateDoctorExperience: () => {},
  updateDoctorWorkingHours: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState('John Doe');
  const [doctorName, setDoctorName] = useState('Dr. Sarah Johnson');
  const [doctorSpecialty, setDoctorSpecialty] = useState('Cardiology');
  const [doctorEmail, setDoctorEmail] = useState('sarah.johnson@medicare.com');
  const [doctorPhone, setDoctorPhone] = useState('+1 (555) 123-4567');
  const [doctorAddress, setDoctorAddress] = useState('123 Medical Center Drive, Suite 200');
  const [doctorExperience, setDoctorExperience] = useState('15 years');
  const [doctorWorkingHours, setDoctorWorkingHours] = useState('9:00 AM - 5:00 PM');

  const updateProfileImage = (image: string | null) => {
    setProfileImage(image);
  };

  const updateUserName = (name: string) => {
    setUserName(name);
  };

  const updateDoctorName = (name: string) => {
    setDoctorName(name);
  };

  const updateDoctorSpecialty = (specialty: string) => setDoctorSpecialty(specialty);
  const updateDoctorEmail = (email: string) => setDoctorEmail(email);
  const updateDoctorPhone = (phone: string) => setDoctorPhone(phone);
  const updateDoctorAddress = (address: string) => setDoctorAddress(address);
  const updateDoctorExperience = (experience: string) => setDoctorExperience(experience);
  const updateDoctorWorkingHours = (hours: string) => setDoctorWorkingHours(hours);

  return (
    <UserContext.Provider
      value={{
        profileImage,
        userName,
        doctorName,
        doctorSpecialty,
        doctorEmail,
        doctorPhone,
        doctorAddress,
        doctorExperience,
        doctorWorkingHours,
        updateProfileImage,
        updateUserName,
        updateDoctorName,
        updateDoctorSpecialty,
        updateDoctorEmail,
        updateDoctorPhone,
        updateDoctorAddress,
        updateDoctorExperience,
        updateDoctorWorkingHours,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
