import { useState } from 'react';
import { Calendar, Clock, FileText, User, Bell, LogOut } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={20} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                MediCare
              </h1>
              <p className="text-sm text-gray-500">Doctor Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button 
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>
            <motion.button 
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={20} className="text-gray-600" />
            </motion.button>
          </div>
        </div>
      </motion.header>
      
      {/* Main content */}
      <div className="flex-grow flex">
        {/* Side navigation */}
        <motion.nav 
          className="w-20 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col items-center py-8 sticky top-[73px] h-[calc(100vh-73px)]"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {sidebarItems.map((item, index) => (
            <motion.button 
              key={item.id}
              className={`p-3 rounded-xl mb-6 relative group ${
                activeTab === item.id 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(item.id as Tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <item.icon size={24} />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                {item.label}
              </span>
            </motion.button>
          ))}
        </motion.nav>
        
        {/* Content area */}
        <div className="flex-grow p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom navigation for mobile */}
      <motion.div 
        className="md:hidden bg-white/80 backdrop-blur-sm border-t border-gray-200/50 fixed bottom-0 left-0 right-0 flex justify-around py-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {sidebarItems.map((item) => (
          <motion.button 
            key={item.id}
            className={`p-2 rounded-xl ${
              activeTab === item.id ? 'text-primary-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(item.id as Tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon size={24} />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default DoctorDashboard;