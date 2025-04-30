import React, { useState } from 'react';
import { Search, Filter, User, FileText, Calendar, Phone, Mail } from 'lucide-react';

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
          prescription: ['Lisinopril 10mg', 'Hydrochlorothiazide 12.5mg']
        },
        {
          date: '2024-02-10',
          diagnosis: 'Common Cold',
          doctor: 'Dr. Robert Chen',
          prescription: ['Acetaminophen 500mg', 'Cough Syrup']
        }
      ]
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 987-6543',
      type: 'doctor',
      joinDate: '2023-12-01',
      lastActive: '2024-03-21'
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
          prescription: ['Cetirizine 10mg', 'Nasal Spray']
        }
      ]
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const renderUserList = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.type === 'doctor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
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
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUserDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSelectedUser(null)}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          ← Back to Users
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedUser?.name}</h2>
              <p className="text-gray-500">{selectedUser?.type ? selectedUser.type.charAt(0).toUpperCase() + selectedUser.type.slice(1) : ''}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <div className="mt-1 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">{selectedUser?.email}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <div className="mt-1 flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">{selectedUser?.phone}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Join Date</label>
                <div className="mt-1 flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">
                    {new Date(selectedUser?.joinDate || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {selectedUser?.type === 'patient' && selectedUser.medicalRecords && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Records</h3>
              <div className="space-y-4">
                {selectedUser.medicalRecords.map((record, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{record.diagnosis}</h4>
                        <p className="text-sm text-gray-500">{record.doctor}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-2">
                      <h5 className="text-sm font-medium text-gray-700">Prescription:</h5>
                      <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                        {record.prescription.map((med, idx) => (
                          <li key={idx}>{med}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Management</h2>
      {selectedUser ? renderUserDetails() : renderUserList()}
    </div>
  );
};

export default UserManagement;