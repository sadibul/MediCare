import { useState } from 'react';
import { Calendar, Clock, FileText, User, Bell, LogOut, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorAppointments from './DoctorAppointments';
import DoctorSchedule from './DoctorSchedule';
import PatientRecords from './PatientRecords';
import DoctorProfile from './DoctorProfile';

type Tab = 'appointments' | 'schedule' | 'records' | 'profile';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('appointments');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <DoctorAppointments />;
      case 'schedule':
        return <DoctorSchedule />;
      case 'records':
        return <PatientRecords />;
      case 'profile':
        return <DoctorProfile />;
      default:
        return <DoctorAppointments />;
    }
  };

  const sidebarItems = [
    { id: 'appointments', icon: Calendar, label: 'Appointments' },
    { id: 'schedule', icon: Clock, label: 'Schedule' },
    { id: 'records', icon: FileText, label: 'Records' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-grid-gray-200/50 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")',
          maskImage: 'linear-gradient(to bottom, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
        }}
      />

      {/* Enhanced Header */}
      <motion.header>
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-2 pl-8">
            <div className="relative">
              <Activity
                size={32}
                className="text-blue-600"
                style={{ filter: 'url(#blue-gradient)' }}
              />
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient
                    id="blue-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" style={{ stopColor: '#3B82F6' }} />
                    <stop offset="100%" style={{ stopColor: '#1D4ED8' }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text ml-1">
              MediCare
            </h1>
          </div>

          <div className="flex items-center">
            <div className="flex items-center mr-8">
              <div className="text-right mr-3">
                <p className="text-sm font-medium text-gray-700">
                  Dr. John Smith
                </p>
                <p className="text-xs text-gray-500">Doctor ID: D-12345</p>
              </div>
              <motion.button
                onClick={() => setActiveTab('profile')}
                className="h-10 w-10 relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 rounded-full ring-2 ring-gray-200/50 overflow-hidden bg-blue-50 hover:ring-blue-200 transition-all">
                  <img
                    src="https://ui-avatars.com/api/?name=John+Smith&background=random"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full ring-2 ring-white" />
              </motion.button>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative mr-6">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>

            <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
              <LogOut size={18} className="mr-2" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="flex-grow flex">
        {/* Side navigation */}
        <motion.nav
          className="w-72 bg-white/90 backdrop-blur-md shadow-xl border-r border-gray-200/50 py-8 sticky top-[73px] h-[calc(100vh-73px)]"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {sidebarItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`w-full px-6 py-4 flex items-center space-x-4 relative group transition-all duration-200 ease-in-out ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-transparent text-blue-600'
                  : 'text-gray-600 hover:bg-blue-50/50'
              }`}
              onClick={() => setActiveTab(item.id as Tab)}
              whileHover={{ x: 5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <div
                className={`p-2.5 rounded-xl shadow-sm transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-100 shadow-blue-200/50 ring-2 ring-blue-200'
                    : 'bg-white shadow-gray-200/50 group-hover:bg-blue-50 group-hover:ring-2 group-hover:ring-blue-100'
                }`}
              >
                <item.icon size={20} />
              </div>
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r"
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
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6"
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

export default DoctorDashboard;