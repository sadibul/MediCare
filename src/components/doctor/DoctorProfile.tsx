import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { motion } from 'framer-motion';

const DoctorProfile = () => {
  const {
    profileImage,
    doctorName,
    doctorSpecialty,
    doctorEmail,
    doctorPhone,
    doctorAddress,
    doctorExperience,
    doctorWorkingHours,
    updateProfileImage,
    updateDoctorName,
    updateDoctorSpecialty,
    updateDoctorEmail,
    updateDoctorPhone,
    updateDoctorAddress,
    updateDoctorExperience,
    updateDoctorWorkingHours,
  } = useUser();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: doctorName,
    email: doctorEmail,
    phone: doctorPhone,
    specialization: doctorSpecialty,
    experience: doctorExperience,
    address: doctorAddress,
    workingHours: doctorWorkingHours,
    education: 'MD - Harvard Medical School',
    certifications: [
      'American Board of Internal Medicine',
      'Cardiovascular Disease Certification',
    ],
  });

  useEffect(() => {
    if (!isEditing) {
      setTempImage(null);
    }
  }, [isEditing]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (tempImage) {
      updateProfileImage(tempImage);
    }
    updateDoctorName(profile.name);
    updateDoctorSpecialty(profile.specialization);
    updateDoctorEmail(profile.email);
    updateDoctorPhone(profile.phone);
    updateDoctorAddress(profile.address);
    updateDoctorExperience(profile.experience);
    updateDoctorWorkingHours(profile.workingHours);
    setIsEditing(false);
    setTempImage(null);
  };

  const handleCancel = () => {
    setTempImage(null);
    setProfile({
      ...profile,
      name: doctorName,
      email: doctorEmail,
      phone: doctorPhone,
      specialization: doctorSpecialty,
      experience: doctorExperience,
      address: doctorAddress,
      workingHours: doctorWorkingHours,
    });
    setIsEditing(false);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Doctor Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save size={18} />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-50"
                whileHover={isEditing ? { scale: 1.05 } : {}}
              >
                {tempImage || profileImage ? (
                  <img
                    src={tempImage ?? profileImage ?? undefined}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=random"
                    alt="Default Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>
              {isEditing && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                  >
                    <Camera size={16} />
                  </button>
                </>
              )}
            </div>
            <div className="ml-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {profile.name}
              </h3>
              <p className="text-gray-600">{profile.specialization}</p>
              <p className="text-gray-500 mt-1">
                {profile.experience} of experience
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-4">Personal Information</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.phone}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) =>
                        setProfile({ ...profile, address: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.address}</span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">
                Professional Information
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.workingHours}
                      onChange={(e) =>
                        setProfile({ ...profile, workingHours: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-600">
                      {profile.workingHours}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.experience}
                      onChange={(e) =>
                        setProfile({ ...profile, experience: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.experience}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-medium mb-4">
              Education & Certifications
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-800 mb-2">
                {profile.education}
              </p>
              <ul className="list-disc list-inside space-y-1">
                {profile.certifications.map((cert, index) => (
                  <li key={index} className="text-gray-600">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
