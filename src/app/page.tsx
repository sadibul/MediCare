'use client';

import { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import PatientDashboard from '../components/patient/PatientDashboard';
import DoctorDashboard from '../components/doctor/DoctorDashboard';
import AdminDashboard from '../components/admin/AdminDashboard';

type UserType = 'patient' | 'doctor' | 'admin' | null;
type AuthView = 'login' | 'register' | 'dashboard';

export default function Home() {
  const [userType, setUserType] = useState<UserType>(null);
  const [view, setView] = useState<AuthView>('login');

  const handleLogin = (type: UserType) => {
    setUserType(type);
    setView('dashboard');
  };

  const handleRegister = (type: UserType) => {
    setUserType(type);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUserType(null);
    setView('login');
  };

  const renderDashboard = () => {
    switch (userType) {
      case 'patient':
        return <PatientDashboard onLogout={handleLogout} />;
      case 'doctor':
        return <DoctorDashboard onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {view === 'login' && (
        <Login 
          onLogin={handleLogin} 
          onRegisterClick={() => setView('register')}
        />
      )}
      {view === 'register' && (
        <Register 
          onRegister={handleRegister}
          onLoginClick={() => setView('login')}
        />
      )}
      {view === 'dashboard' && renderDashboard()}
    </div>
  );
}