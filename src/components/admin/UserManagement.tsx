import React, { useState } from 'react';
import {
  Search,
  Filter,
  User,
  FileText,
  Calendar,
  Phone,
  Mail,
  ArrowLeft,
  Activity,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'patient' | 'doctor';
  joinDate: string;
  lastActive: string;
  medicalRecords?: {
    date: string;
    diagnosis: string;
    doctor: string;
    prescription: string[];
  }[];
}

const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Mock data
  const users: UserData[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      type: 'patient',
      joinDate: '2024-01-15',
      lastActive: '2024-03-20',
      medicalRecords: [
        {
          date: '2024-03-15',
          diagnosis: 'Hypertension',
          doctor: 'Dr. Sarah Johnson',
          prescription: ['Lisinopril 10mg', 'Hydrochlorothiazide 12.5mg'],
        },
        {
          date: '2024-02-10',
          diagnosis: 'Common Cold',
          doctor: 'Dr. Robert Chen',
          prescription: ['Acetaminophen 500mg', 'Cough Syrup'],
        },
      ],
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 987-6543',
      type: 'doctor',
      joinDate: '2023-12-01',
      lastActive: '2024-03-21',
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+1 (555) 456-7890',
      type: 'patient',
      joinDate: '2024-02-01',
      lastActive: '2024-03-19',
      medicalRecords: [
        {
          date: '2024-03-10',
          diagnosis: 'Allergic Rhinitis',
          doctor: 'Dr. Sarah Johnson',
          prescription: ['Cetirizine 10mg', 'Nasal Spray'],
        },
      ],
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const renderUserList = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-500 mt-1">View and manage system users</p>
        </div>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Join Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Active
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-blue-50/50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.type === 'doctor'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-green-50 text-green-700'
                      }`}
                    >
                      {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedUser(user)}
                      className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      View Details
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const renderUserDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-8">
        <motion.button
          onClick={() => setSelectedUser(null)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </motion.button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
          <p className="text-gray-500 mt-1">View and manage user information</p>
        </div>
      </div>

      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center mb-8">
          <div className="h-20 w-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
            <User className="h-10 w-10 text-blue-600" />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedUser?.name}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium inline-block mt-2 ${
                selectedUser?.type === 'doctor'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {(selectedUser?.type ?? '').charAt(0).toUpperCase() +
                (selectedUser?.type ?? '').slice(1)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">
                Email
              </label>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-900">{selectedUser?.email}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">
                Phone
              </label>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-900">{selectedUser?.phone}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">
                Join Date
              </label>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-900">
                  {new Date(selectedUser?.joinDate || '').toLocaleDateString()}
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">
                Last Active
              </label>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <Activity className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-900">
                  {new Date(
                    selectedUser?.lastActive || ''
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {selectedUser ? renderUserDetails() : renderUserList()}
    </AnimatePresence>
  );
};

export default UserManagement;
