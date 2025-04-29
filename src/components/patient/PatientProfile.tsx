import React, { useState, useRef } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Shield,
  Edit2,
  Camera,
  Save,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

const PatientProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Residential Ave, Apt 301',
    dob: '6/15/1985',
    bloodType: 'O+',
    height: '5\'10" (178 cm)',
    weight: '165 lbs (75 kg)',
    bmi: '23.7',
    emergencyContact: {
      name: 'Mary Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 123-4567',
      email: 'mary.smith@example.com',
    },
    profileImage: null as string | null,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <p className="text-gray-500 mt-1">
            Manage your personal information and preferences
          </p>
        </div>
        {isEditing ? (
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save size={18} />
              <span>Save Changes</span>
            </motion.button>
            <motion.button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 flex items-center space-x-2 hover:bg-gray-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <X size={18} />
              <span>Cancel</span>
            </motion.button>
          </div>
        ) : (
          <motion.button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 flex items-center space-x-2 hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit2 size={18} />
            <span>Edit Profile</span>
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <motion.div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="p-6 pb-4 border-b border-gray-200 bg-gradient-to-r from-blue-500/5 to-transparent">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden">
                    {profileData.profileImage ? (
                      <img
                        src={profileData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-blue-500" />
                    )}
                  </div>
                  {isEditing && (
                    <>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-1.5 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
                      >
                        <Camera size={14} />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="text-lg font-semibold text-gray-800 border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-800">
                      {profileData.name}
                    </h3>
                  )}
                  <p className="text-gray-500 text-sm">Patient ID: #12345</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {[
                { icon: Mail, value: 'email' },
                { icon: Phone, value: 'phone' },
                { icon: MapPin, value: 'address' },
                { icon: Calendar, value: 'dob' },
              ].map((item, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  <item.icon className="w-5 h-5 mr-3 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={
                        profileData[
                          item.value as keyof typeof profileData
                        ] as string
                      }
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          [item.value]: e.target.value,
                        }))
                      }
                      className="flex-1 border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <span>
                      {String(profileData[item.value as keyof Omit<typeof profileData, 'emergencyContact' | 'profileImage'>])}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Medical Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Medical Information */}
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Heart size={20} className="text-red-500 mr-2" />
              Medical Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Blood Type', value: 'bloodType' },
                { label: 'Height', value: 'height' },
                { label: 'Weight', value: 'weight' },
                { label: 'BMI', value: 'bmi' },
              ].map((item, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    {item.label}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={
                        profileData[
                          item.value as keyof typeof profileData
                        ] as string
                      }
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          [item.value]: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-gray-800">
                      {String(profileData[item.value as keyof Omit<typeof profileData, 'emergencyContact' | 'profileImage'>])}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Emergency Contact */}
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield size={20} className="text-orange-500 mr-2" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Name', value: 'name' },
                { label: 'Relationship', value: 'relationship' },
                { label: 'Phone', value: 'phone' },
                { label: 'Email', value: 'email' },
              ].map((item, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    {item.label}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={
                        profileData.emergencyContact[
                          item.value as keyof typeof profileData.emergencyContact
                        ]
                      }
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          emergencyContact: {
                            ...prev.emergencyContact,
                            [item.value]: e.target.value,
                          },
                        }))
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-gray-800">
                      {
                        profileData.emergencyContact[
                          item.value as keyof typeof profileData.emergencyContact
                        ]
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
