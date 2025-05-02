import React, { useState } from 'react';
import { User, Lock, ChevronRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';

interface LoginProps {
  onLogin: (userType: 'patient' | 'doctor' | 'admin') => void;
  onRegisterClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegisterClick }) => {
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>(
    'patient'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Set default credentials based on selected type
  const updateDefaultCredentials = (type: 'patient' | 'doctor' | 'admin') => {
    setUserType(type);
    setEmail(`${type}@gmail.com`);
    setPassword('1');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = authService.login(email, password);

    if (user) {
      // Only allow login if the email matches the selected user type
      if (
        (userType === 'doctor' && email.includes('doctor')) ||
        (userType === 'admin' && email.includes('admin')) ||
        (userType === 'patient' &&
          !email.includes('doctor') &&
          !email.includes('admin'))
      ) {
        onLogin(user.type);
      } else {
        setError('Invalid credentials for selected user type');
      }
    } else {
      setError('Invalid email or password');
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

  const tabVariants = {
    inactive: { color: '#6B7280', borderColor: 'transparent' },
    active: {
      color: '#0EA5E9',
      borderColor: '#0EA5E9',
      transition: { duration: 0.3 },
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
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sign in to access your account
        </p>

        <div className="flex border-b border-gray-200 mb-8">
          {['patient', 'doctor', 'admin'].map((type) => (
            <motion.button
              key={type}
              className={`flex-1 py-3 font-medium text-base capitalize`}
              variants={tabVariants}
              animate={userType === type ? 'active' : 'inactive'}
              onClick={() => updateDefaultCredentials(type as typeof userType)}
              whileHover={{ backgroundColor: '#F3F4F6' }}
            >
              {type}
            </motion.button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
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
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                className="input-field w-full pl-12"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            className="btn-primary w-full py-3 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {userType === 'patient'
              ? "Don't have an account? "
              : 'Need assistance? '}
            <motion.button
              onClick={onRegisterClick}
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              whileHover={{ x: 5 }}
            >
              {userType === 'patient' ? 'Create Account' : 'Contact Support'}
              <ChevronRight size={16} className="ml-1" />
            </motion.button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
