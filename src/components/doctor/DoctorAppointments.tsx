import React, { useState } from 'react';
import {
  Calendar,
  Search,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import AddPrescription from './AddPrescription';

interface Appointment {
  id: string;
  patientName: string;
  patientAge: number;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  reason: string;
}

const DoctorAppointments = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [search, setSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showAddPrescription, setShowAddPrescription] = useState(false);

  // Mock data
  const appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'John Smith',
      patientAge: 45,
      date: '2025-06-15',
      time: '10:00 AM',
      status: 'upcoming',
      reason: 'Annual check-up and blood pressure monitoring',
    },
    {
      id: '2',
      patientName: 'Emily Johnson',
      patientAge: 32,
      date: '2025-06-15',
      time: '11:30 AM',
      status: 'upcoming',
      reason: 'Recurring headaches and dizziness',
    },
    {
      id: '3',
      patientName: 'Michael Chen',
      patientAge: 28,
      date: '2025-06-15',
      time: '2:15 PM',
      status: 'upcoming',
      reason: 'Follow-up after recent surgery',
    },
    {
      id: '4',
      patientName: 'Sarah Williams',
      patientAge: 52,
      date: '2025-06-14',
      time: '9:00 AM',
      status: 'completed',
      reason: 'Diabetes management and medication review',
    },
  ];

  const dates = [
    '2025-06-14',
    '2025-06-15',
    '2025-06-16',
    '2025-06-17',
    '2025-06-18',
    '2025-06-19',
    '2025-06-20',
  ];

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.date === selectedDate &&
      appointment.patientName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleStartConsultation = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCompleteConsultation = () => {
    setShowAddPrescription(true);
  };

  const handleFinishPrescription = () => {
    setShowAddPrescription(false);
    setSelectedAppointment(null);
    // Here you would update the appointment status to completed
  };

  const renderAppointmentsList = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
          <p className="text-gray-500 mt-1">
            Manage your patient consultations
          </p>
        </div>
      </div>

      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-4 py-2">
          {dates.map((date) => (
            <button
              key={date}
              className={`px-6 py-3 rounded-xl border transition-all duration-200 ${
                selectedDate === date
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                  : 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50'
              }`}
              onClick={() => handleDateClick(date)}
            >
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50">
        <div className="divide-y divide-gray-200/50">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-6 hover:bg-blue-50/50 transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {appointment.patientName}
                    </h3>
                    <p className="text-gray-500">
                      {appointment.patientAge} years old
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                      appointment.status
                    )}`}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-500 mb-4">
                  <Clock size={18} className="mr-2" />
                  <span>{appointment.time}</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Reason:</strong>{' '}
                    {appointment.reason}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
                    onClick={() => handleStartConsultation(appointment)}
                  >
                    Start Consultation
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No appointments for this date
              </h3>
              <p className="text-gray-500">
                {search
                  ? 'Try adjusting your search'
                  : 'Select another date to view appointments'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderConsultation = () => (
    <>
      <div className="flex items-center mb-8">
        <button
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setSelectedAppointment(null)}
        >
          <ArrowRight
            size={20}
            className="transform rotate-180 text-gray-600"
          />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Patient Consultation
          </h2>
          <p className="text-gray-500 mt-1">
            Review and manage patient details
          </p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
        <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200/50">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {selectedAppointment?.patientName}
            </h3>
            <p className="text-gray-500 mt-1">
              {selectedAppointment?.patientAge} years old
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Appointment Time</p>
            <p className="font-medium text-gray-900">
              {selectedAppointment?.time}
            </p>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Reason for Visit
            </h4>
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
              <p className="text-gray-700">{selectedAppointment?.reason}</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Medical History
            </h4>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-700">
                Previous visits and conditions will appear here.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Consultation Notes
            </h4>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="Add your consultation notes here..."
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2.5 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-xl font-medium transition duration-300 flex items-center">
            <XCircle size={18} className="mr-2" />
            Cancel Appointment
          </button>
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition duration-300 flex items-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-0.5"
            onClick={handleCompleteConsultation}
          >
            <CheckCircle size={18} className="mr-2" />
            Complete & Add Prescription
          </button>
        </div>
      </div>
    </>
  );

  if (showAddPrescription && selectedAppointment) {
    return (
      <AddPrescription
        appointment={selectedAppointment}
        onComplete={handleFinishPrescription}
      />
    );
  }

  return (
    <div className="h-full">
      {selectedAppointment ? renderConsultation() : renderAppointmentsList()}
    </div>
  );
};

export default DoctorAppointments;
