import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Lock,
  Phone,
  ChevronRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';

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
  const [error, setError] = useState('');

  // New validation states
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // Validate password when it changes
  useEffect(() => {
    if (passwordTouched) {
      validatePassword(password);
    }

    if (confirmPasswordTouched) {
      validateConfirmPassword(confirmPassword);
    }
  }, [password, confirmPassword, passwordTouched, confirmPasswordTouched]);

  // Password validation function
  const validatePassword = (value: string) => {
    if (value.length === 0) {
      setPasswordError('Password is required');
      return false;
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  // Confirm password validation function
  const validateConfirmPassword = (value: string) => {
    if (value.length === 0) {
      setConfirmPasswordError('Please confirm your password');
      return false;
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate both password fields before submission
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    const success = authService.register({
      name,
      email,
      phone,
      password,
      type: 'patient',
    });

    if (success) {
      onRegister('patient');
    } else {
      setError('Email already exists. Please try logging in.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
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

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join us to manage your health journey
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          <div className="input-group">
            <label className="input-label" htmlFor="name">
              Full Name
            </label>
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
              <User
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email
            </label>
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
              <Mail
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="phone">
              Phone Number
            </label>
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
              <Phone
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                className={`input-field w-full pl-12 ${
                  passwordError && passwordTouched
                    ? 'border-red-500'
                    : passwordTouched && !passwordError
                    ? 'border-green-500'
                    : ''
                }`}
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                required
              />
              <Lock
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />

              {passwordTouched &&
                (passwordError ? (
                  <AlertCircle
                    size={18}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500"
                  />
                ) : (
                  <CheckCircle
                    size={18}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500"
                  />
                ))}
            </div>
            {passwordError && passwordTouched && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                className={`input-field w-full pl-12 ${
                  confirmPasswordError && confirmPasswordTouched
                    ? 'border-red-500'
                    : confirmPasswordTouched && !confirmPasswordError
                    ? 'border-green-500'
                    : ''
                }`}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setConfirmPasswordTouched(true)}
                required
              />
              <Lock
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />

              {confirmPasswordTouched &&
                (confirmPasswordError ? (
                  <AlertCircle
                    size={18}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500"
                  />
                ) : (
                  <CheckCircle
                    size={18}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500"
                  />
                ))}
            </div>
            {confirmPasswordError && confirmPasswordTouched && (
              <p className="text-red-500 text-xs mt-1">
                {confirmPasswordError}
              </p>
            )}
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
