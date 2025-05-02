import React, { useState } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PatientDashboard from './components/patient/PatientDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import { UserProvider } from './context/UserContext';

type UserType = 'patient' | 'doctor' | 'admin' | null;
type AuthView = 'login' | 'register' | 'dashboard';

export default function Home() {
  const [userType, setUserType] = useState<UserType>(null);
  const [view, setView] = useState<AuthView>('login');

  const handleLogin = (type: UserType) => {
    setUserType(type);
    setView('dashboard');
  };

  const renderDashboard = () => {
    switch (userType) {
      case 'patient':
        return <PatientDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return null;
    }
  };

  return (
    <UserProvider>
      <div>
        {view === 'login' && (
          <Login
            onLogin={handleLogin}
            onRegisterClick={() => setView('register')}
          />
        )}
        {view === 'register' && (
          <Register
            onRegister={handleLogin}
            onLoginClick={() => setView('login')}
          />
        )}
        {view === 'dashboard' && renderDashboard()}
      </div>
    </UserProvider>
  );
}