import React, { useState } from 'react';
import { Search, Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react';

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
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
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
      reason: 'Annual check-up'
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
      reason: 'Follow-up consultation'
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
      reason: 'Chronic pain management'
    }
  ];

  const filteredAppointments = appointments.filter(appointment =>
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
    <>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                        <div className="text-sm text-gray-500">ID: {appointment.patientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.doctorName}</div>
                    <div className="text-sm text-gray-500">ID: {appointment.doctorId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedAppointment(appointment)}
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
    </>
  );

  const renderAppointmentDetails = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedAppointment(null)}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          ← Back to Appointments
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-900">{selectedAppointment?.patientName}</span>
              </div>
              <div className="text-sm text-gray-500">
                Patient ID: {selectedAppointment?.patientId}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Doctor Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-900">{selectedAppointment?.doctorName}</span>
              </div>
              <div className="text-sm text-gray-500">
                Doctor ID: {selectedAppointment?.doctorId}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-900">
                  {new Date(selectedAppointment?.date || '').toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-900">{selectedAppointment?.time}</span>
              </div>
            </div>

            <div>
              <div className="mb-3">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  getStatusColor(selectedAppointment?.status || '')
                }`}>
                  {selectedAppointment?.status.charAt(0).toUpperCase() + selectedAppointment?.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-700">{selectedAppointment?.reason}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          {selectedAppointment?.status === 'scheduled' && (
            <>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <XCircle className="h-5 w-5 mr-2" />
                Cancel Appointment
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <CheckCircle className="h-5 w-5 mr-2" />
                Mark as Completed
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="h-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Appointments Management</h2>
      {selectedAppointment ? renderAppointmentDetails() : renderAppointmentList()}
    </div>
  );
};

export default AppointmentsManagement;