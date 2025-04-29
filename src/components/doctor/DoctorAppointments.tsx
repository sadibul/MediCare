import React, { useState } from 'react';
import { Calendar, Search, ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react';
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
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
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
      reason: 'Annual check-up and blood pressure monitoring'
    },
    {
      id: '2',
      patientName: 'Emily Johnson',
      patientAge: 32,
      date: '2025-06-15',
      time: '11:30 AM',
      status: 'upcoming',
      reason: 'Recurring headaches and dizziness'
    },
    {
      id: '3',
      patientName: 'Michael Chen',
      patientAge: 28,
      date: '2025-06-15',
      time: '2:15 PM',
      status: 'upcoming',
      reason: 'Follow-up after recent surgery'
    },
    {
      id: '4',
      patientName: 'Sarah Williams',
      patientAge: 52,
      date: '2025-06-14',
      time: '9:00 AM',
      status: 'completed',
      reason: 'Diabetes management and medication review'
    }
  ];
  
  const dates = [
    '2025-06-14', 
    '2025-06-15', 
    '2025-06-16', 
    '2025-06-17', 
    '2025-06-18',
    '2025-06-19',
    '2025-06-20'
  ];
  
  const filteredAppointments = appointments.filter(appointment => 
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointments</h2>
      </div>
      
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-3 py-2">
          {dates.map(date => (
            <button
              key={date}
              className={`px-4 py-2 rounded-md border ${
                selectedDate === date 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white border-gray-300 hover:border-blue-500'
              }`}
              onClick={() => handleDateClick(date)}
            >
              {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <div key={appointment.id} className="p-4 hover:bg-gray-50 transition duration-150">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-500">{appointment.patientAge} years old</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 mb-3">
                  <Clock size={16} className="mr-1" />
                  <span>{appointment.time}</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Reason:</strong> {appointment.reason}
                </p>
                <div className="mt-2 flex justify-end">
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                    onClick={() => handleStartConsultation(appointment)}
                  >
                    Start Consultation
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Calendar size={48} className="mx-auto mb-2 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">No appointments for this date</h3>
              <p className="mt-1 text-gray-500">
                {search ? 'Try adjusting your search' : 'Select another date to view appointments'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
  
  const renderConsultation = () => (
    <>
      <div className="flex items-center mb-6">
        <button
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => setSelectedAppointment(null)}
        >
          <ArrowRight size={20} className="transform rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">Patient Consultation</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-medium">{selectedAppointment?.patientName}</h3>
            <p className="text-gray-500">{selectedAppointment?.patientAge} years old</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Appointment Time</p>
            <p className="font-medium">{selectedAppointment?.time}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Reason for Visit</h4>
          <p className="text-gray-700">{selectedAppointment?.reason}</p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Medical History</h4>
          <div className="bg-gray-50 rounded-md p-4">
            <p className="text-gray-700">Previous visits and conditions will appear here.</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Consultation Notes</h4>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Add your consultation notes here..."
            rows={4}
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md font-medium transition duration-300 flex items-center"
          >
            <XCircle size={16} className="mr-1" />
            Cancel Appointment
          </button>
          <button 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 flex items-center"
            onClick={handleCompleteConsultation}
          >
            <CheckCircle size={16} className="mr-1" />
            Complete & Add Prescription
          </button>
        </div>
      </div>
    </>
  );
  
  if (showAddPrescription && selectedAppointment) {
    return <AddPrescription appointment={selectedAppointment} onComplete={handleFinishPrescription} />;
  }
  
  return (
    <div className="h-full">
      {selectedAppointment ? renderConsultation() : renderAppointmentsList()}
    </div>
  );
};

export default DoctorAppointments;