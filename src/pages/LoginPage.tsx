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
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-blue-50 to-primary-100"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231d4ed8' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Medicare Logo in the background - positioned in the area marked by red circle */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center">
            <svg
              className="h-12 w-12 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12H5.16667L8.33333 4L12.8333 20L17.3333 8.66667L20.5 12H22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2 text-4xl font-bold text-blue-600">
              MediCare
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden relative z-10">
        <div className="p-6">
          <div className="text-center mb-6">
            {/* Logo Section */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center">
                <svg
                  className="h-8 w-8 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12H5.16667L8.33333 4L12.8333 20L17.3333 8.66667L20.5 12H22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ml-2 text-2xl font-bold text-blue-600">
                  MediCare
                </span>
              </div>
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
