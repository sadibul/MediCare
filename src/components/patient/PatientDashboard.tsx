import { useState } from 'react';
import {
  Calendar,
  FileText,
  ShoppingBag,
  User,
  Bell,
  LogOut,
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-blue-600 border-b border-blue-600/20 backdrop-blur-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-white">MediCare</h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50">
              <img
                src="https://ui-avatars.com/api/?name=Patient&background=random"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="p-2 hover:bg-blue-600/50 rounded-full transition-colors">
              <Bell size={20} className="text-white" />
            </button>
            <button
              className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              onClick={() => {
                /* handle logout */
              }}
            >
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
          className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 py-8 sticky top-[73px] h-[calc(100vh-73px)]"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              className={`w-full px-6 py-3 mb-2 flex items-center space-x-4 relative group ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(item.id as Tab)}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className={`p-2 rounded-lg ${
                  activeTab === item.id
                    ? 'bg-blue-100'
                    : 'bg-gray-100 group-hover:bg-blue-50'
                }`}
              >
                <item.icon size={20} />
              </div>
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r"
                  layoutId="activeTab"
                />
              )}
            </motion.button>
          ))}
        </motion.nav>

        {/* Content area */}
        <div className="flex-grow p-8">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
