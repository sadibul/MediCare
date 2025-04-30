import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  profileImage: string | null;
  updateProfileImage: (image: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const updateProfileImage = (image: string | null) => {
    setProfileImage(image);
  };

  return (
    <UserContext.Provider value={{ profileImage, updateProfileImage }}>
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
