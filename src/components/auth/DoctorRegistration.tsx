import React, { useState } from 'react';
import {
  User,
  Lock,
  ChevronLeft,
  Mail,
  Phone,
  Building,
  MapPin,
  Clock,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DoctorRegistrationProps {
  onBack: () => void;
}

const DoctorRegistration: React.FC<DoctorRegistrationProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    experience: '',
    about: '',
    password: '',
    confirmPassword: '',
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <User size={40} className="text-white" />
      </motion.div>

      <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Create Account
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Join us to start your medical practice
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="input-group">
          <label className="input-label">Full Name</label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="input-field w-full pl-12"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="input-group">
          <label className="input-label">Email</label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              className="input-field w-full pl-12"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="input-group">
          <label className="input-label">Phone Number</label>
          <div className="relative">
            <Phone
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="tel"
              className="input-field w-full pl-12"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Location */}
        <div className="input-group">
          <label className="input-label">Location</label>
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="input-field w-full pl-12"
              placeholder="Enter your location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Experience */}
        <div className="input-group">
          <label className="input-label">Experience</label>
          <div className="relative">
            <Clock
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="input-field w-full pl-12"
              placeholder="Years of experience"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* About */}
        <div className="input-group">
          <label className="input-label">About</label>
          <div className="relative">
            <FileText
              size={18}
              className="absolute left-4 top-3 text-gray-400"
            />
            <textarea
              className="input-field w-full pl-12 min-h-[100px]"
              placeholder="Tell us about your specialization and expertise"
              value={formData.about}
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="input-group">
          <label className="input-label">Password</label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              className="input-field w-full pl-12"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="input-group">
          <label className="input-label">Confirm Password</label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              className="input-field w-full pl-12"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          className="btn-primary w-full py-3 flex items-center justify-center mt-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Create Account
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <motion.button
          onClick={onBack}
          className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
          whileHover={{ x: -5 }}
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Login
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DoctorRegistration;
