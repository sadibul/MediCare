import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>(
    'patient'
  );
  const [error, setError] = useState('');

  const { loginUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isAuthenticated = loginUser(email, password, userType);

    if (isAuthenticated) {
      if (userType === 'patient') {
        navigate('/patient/dashboard');
      } else if (userType === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-1">Sign in to access your account</p>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-md ${
                userType === 'patient'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setUserType('patient')}
            >
              Patient
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                userType === 'doctor'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setUserType('doctor')}
            >
              Doctor
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                userType === 'admin'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setUserType('admin')}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin}>
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-800 text-sm rounded">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-gray-700 text-sm font-medium">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:text-blue-600">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
