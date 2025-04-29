import React, { useState } from 'react';
import { User, Mail, Lock, Phone, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface RegisterProps {
  onRegister: (userType: 'patient') => void;
  onLoginClick: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onLoginClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister('patient');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div 
        className="glass-card w-full max-w-md p-8 rounded-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User size={40} className="text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-8">Join us to manage your health journey</p>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="input-group">
            <label className="input-label" htmlFor="name">Full Name</label>
            <div className="relative">
              <input
                id="name"
                type="text"
                className="input-field w-full pl-12"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                className="input-field w-full pl-12"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="phone">Phone Number</label>
            <div className="relative">
              <input
                id="phone"
                type="tel"
                className="input-field w-full pl-12"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Phone size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type="password"
                className="input-field w-full pl-12"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                className="input-field w-full pl-12"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <motion.button
            type="submit"
            className="btn-primary w-full py-3 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Account
          </motion.button>
        </form>
        
        <div className="mt-8 text-center">
          <motion.button 
            onClick={onLoginClick}
            className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Login
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;