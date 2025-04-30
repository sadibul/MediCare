import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
}

const AppointmentsManagement = () => {
  const [search, setSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  // Mock data
  const appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'John Smith',
      patientId: 'P001',
      doctorName: 'Dr. Sarah Johnson',
      doctorId: 'D001',
      date: '2024-03-25',
      time: '10:00 AM',
      status: 'scheduled',
      reason: 'Annual check-up',
    },
    {
      id: '2',
      patientName: 'Emily Davis',
      patientId: 'P002',
      doctorName: 'Dr. Robert Chen',
      doctorId: 'D002',
      date: '2024-03-25',
      time: '11:30 AM',
      status: 'completed',
      reason: 'Follow-up consultation',
    },
    {
      id: '3',
      patientName: 'Michael Wilson',
      patientId: 'P003',
      doctorName: 'Dr. Sarah Johnson',
      doctorId: 'D001',
      date: '2024-03-26',
      time: '2:00 PM',
      status: 'scheduled',
      reason: 'Chronic pain management',
    },
  ];

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAppointmentList = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Appointments Management
          </h2>
          <p className="text-gray-500 mt-1">View and manage all appointments</p>
        </div>
        <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200">
          <Filter size={20} className="mr-2" />
          Filter
        </button>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search appointments, patients or doctors..."
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
          <table className="min-w-full divide-y divide-gray-200/50">
            <thead className="bg-gray-50/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Patient
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Doctor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date & Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {filteredAppointments.map((appointment) => (
                <motion.tr
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-blue-50/50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {appointment.patientName}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {appointment.patientId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.doctorName}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {appointment.doctorId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedAppointment(appointment)}
                      className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const renderAppointmentDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center mb-8">
        <button
          onClick={() => setSelectedAppointment(null)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
            ←
          </motion.div>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Appointment Details
          </h2>
          <p className="text-gray-500 mt-1">
            View and manage appointment information
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200/50 p-6 transition-all duration-200"
            whileHover={{ y: -2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Patient Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {selectedAppointment?.patientName}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {selectedAppointment?.patientId}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200/50 p-6 transition-all duration-200"
            whileHover={{ y: -2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Doctor Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {selectedAppointment?.doctorName}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {selectedAppointment?.doctorId}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200/50 p-6 transition-all duration-200"
          whileHover={{ y: -2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Appointment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="font-medium">
                    {new Date(
                      selectedAppointment?.date || ''
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Time</div>
                  <div className="font-medium">{selectedAppointment?.time}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    selectedAppointment?.status || ''
                  )}`}
                >
                  {selectedAppointment?.status
                    ? selectedAppointment.status.charAt(0).toUpperCase() +
                      selectedAppointment.status.slice(1)
                    : ''}
                </span>
              </div>
              <p className="text-gray-700">{selectedAppointment?.reason}</p>
            </div>
          </div>

          {selectedAppointment?.status === 'scheduled' && (
            <div className="mt-8 flex justify-end space-x-4">
              <motion.button
                className="flex items-center px-4 py-2 border-2 border-red-500 text-red-500 rounded-xl font-medium hover:bg-red-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <XCircle className="h-5 w-5 mr-2" />
                Cancel Appointment
              </motion.button>
              <motion.button
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Mark as Completed
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {selectedAppointment
          ? renderAppointmentDetails()
          : renderAppointmentList()}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentsManagement;
