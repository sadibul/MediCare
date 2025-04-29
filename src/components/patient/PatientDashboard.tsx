import React, { useState } from 'react';
import {
  Calendar,
  FileText,
  ShoppingBag,
  User,
  Bell,
  LogOut,
  Activity,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PatientAppointments from './PatientAppointments';
import PatientMedicalHistory from './PatientMedicalHistory';
import MedicineShop from '../shop/MedicineShop';
import PatientProfile from './PatientProfile';

type Tab = 'appointments' | 'history' | 'shop' | 'profile';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('appointments');

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <PatientAppointments />;
      case 'history':
        return <PatientMedicalHistory />;
      case 'shop':
        return <MedicineShop />;
      case 'profile':
        return <PatientProfile />;
      default:
        return <PatientAppointments />;
    }
  };

  const sidebarItems = [
    { id: 'appointments', icon: Calendar, label: 'Appointments' },
    { id: 'history', icon: FileText, label: 'History' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-grid-gray-200/50 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 border-b border-blue-700/20 backdrop-blur-sm shadow-lg"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <Activity size={32} className="text-white" />
            <h1 className="text-3xl font-bold text-white tracking-tight">
              MediCare
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Bell size={20} className="text-white" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right mr-2">
                <p className="text-white text-sm font-medium">John Doe</p>
                <p className="text-blue-200 text-xs">Patient ID: P-12345</p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=random"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-200 ease-in-out transform hover:scale-105">
              <LogOut size={20} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="flex-grow flex">
        {/* Side navigation */}
        <motion.nav
          className="w-64 bg-white/80 backdrop-blur-sm shadow-lg border-r border-gray-200/50 py-8 sticky top-[73px] h-[calc(100vh-73px)]"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {sidebarItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`w-full px-6 py-4 flex items-center space-x-4 relative group transition-all duration-200 ease-in-out ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(item.id as Tab)}
              whileHover={{ x: 5 }}
            >
              <div
                className={`p-2.5 rounded-xl shadow-sm ${
                  activeTab === item.id
                    ? 'bg-blue-100 shadow-blue-100/50'
                    : 'bg-gray-100 group-hover:bg-blue-50 group-hover:shadow-blue-100/50'
                }`}
              >
                <item.icon size={20} />
              </div>
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.nav>

        {/* Content area */}
        <motion.div
          className="flex-grow p-8 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDashboard;
