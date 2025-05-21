import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Edit2,
  Camera,
  Save,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const PatientProfile = () => {
  const { user, getPatientInfo } = useUser();
  const patientData = getPatientInfo();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  // Convert any potential object values to strings
  const [profileData, setProfileData] = useState({
    name: patientData?.name ? String(patientData.name) : 'N/A',
    email: patientData?.email
      ? typeof patientData.email === 'object'
        ? JSON.stringify(patientData.email)
        : String(patientData.email)
      : 'N/A',
    phone: patientData?.phone
      ? typeof patientData.phone === 'object'
        ? JSON.stringify(patientData.phone)
        : String(patientData.phone)
      : 'N/A',
    address: patientData?.address
      ? typeof patientData.address === 'object'
        ? JSON.stringify(patientData.address)
        : String(patientData.address)
      : 'N/A',
    dob: patientData?.dob
      ? typeof patientData.dob === 'object'
        ? JSON.stringify(patientData.dob)
        : String(patientData.dob)
      : 'N/A',
    bloodType: patientData?.bloodType ? String(patientData.bloodType) : 'N/A',
    height: patientData?.height ? String(patientData.height) : 'N/A',
    weight: patientData?.weight ? String(patientData.weight) : 'N/A',
    bmi: patientData?.bmi ? String(patientData.bmi) : 'N/A',
    profileImage: patientData?.profileImage || null,
  });

  // Update local state when patient data changes
  useEffect(() => {
    if (patientData) {
      // Safely convert any object values to strings
      setProfileData({
        name: patientData.name ? String(patientData.name) : 'N/A',
        email: patientData.email
          ? typeof patientData.email === 'object'
            ? JSON.stringify(patientData.email)
            : String(patientData.email)
          : 'N/A',
        phone: patientData.phone
          ? typeof patientData.phone === 'object'
            ? JSON.stringify(patientData.phone)
            : String(patientData.phone)
          : 'N/A',
        address: patientData.address
          ? typeof patientData.address === 'object'
            ? JSON.stringify(patientData.address)
            : String(patientData.address)
          : 'N/A',
        dob: patientData.dob
          ? typeof patientData.dob === 'object'
            ? JSON.stringify(patientData.dob)
            : String(patientData.dob)
          : 'N/A',
        bloodType: patientData.bloodType
          ? String(patientData.bloodType)
          : 'N/A',
        height: patientData.height ? String(patientData.height) : 'N/A',
        weight: patientData.weight ? String(patientData.weight) : 'N/A',
        bmi: patientData.bmi ? String(patientData.bmi) : 'N/A',
        profileImage: patientData.profileImage || null,
      });
    }
  }, [patientData]);

  useEffect(() => {
    // Reset temp image when editing is cancelled
    if (!isEditing) {
      setTempImage(null);
    }
  }, [isEditing]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setTempImage(imageUrl);
        setProfileData((prev) => ({
          ...prev,
          profileImage: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // In a real app, you would save changes to a backend
    // For now, we'll just update local state
    setIsEditing(false);
    setTempImage(null);
    // You would typically call an API here to update the patient profile
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempImage(null);
    // Reset form data to original values
    if (patientData) {
      setProfileData({
        name: patientData.name || 'N/A',
        email: patientData.email || 'N/A',
        phone: patientData.phone || 'N/A',
        address: patientData.address || 'N/A',
        dob: patientData.dob || 'N/A',
        bloodType: patientData.bloodType || 'N/A',
        height: patientData.height || 'N/A',
        weight: patientData.weight || 'N/A',
        bmi: patientData.bmi || 'N/A',
        profileImage: patientData.profileImage || null,
      });
    }
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
        {isEditing && (
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
              onClick={handleCancel}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 flex items-center space-x-2 hover:bg-gray-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <X size={18} />
              <span>Cancel</span>
            </motion.button>
          </div>
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
                    {tempImage || profileData.profileImage ? (
                      <img
                        src={tempImage || profileData.profileImage || ''}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <User size={32} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-1.5 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors shadow-lg"
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
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {/* Remove this object being rendered directly in JSX */}
              {Object.entries(profileData)
                .filter(([key]) =>
                  ['email', 'phone', 'address', 'dob'].includes(key)
                )
                .map(([key, value]) => {
                  // Create a mapping for icons
                  const iconMap = {
                    email: Mail,
                    phone: Phone,
                    address: MapPin,
                    dob: Calendar,
                  };

                  // Get the icon component safely
                  const IconComponent = iconMap[key as keyof typeof iconMap];

                  // Only render if we have a valid icon
                  if (!IconComponent) return null;

                  return (
                    <div key={key} className="flex items-center text-gray-600">
                      <IconComponent className="w-5 h-5 mr-3 text-gray-400" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={value as string}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          className="flex-1 border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        <span>{String(value)}</span>
                      )}
                    </div>
                  );
                })}
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
              {/* Remove this object being rendered directly in JSX */}
              {Object.entries(profileData)
                .filter(([key]) =>
                  ['bloodType', 'height', 'weight', 'bmi'].includes(key)
                )
                .map(([key, value]) => {
                  // Create label mapping
                  const labelMap = {
                    bloodType: 'Blood Type',
                    height: 'Height',
                    weight: 'Weight',
                    bmi: 'BMI',
                  };

                  const label = labelMap[key as keyof typeof labelMap];
                  if (!label) return null;

                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        {label}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={value as string}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        <p className="text-gray-800">{String(value)}</p>
                      )}
                    </div>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
