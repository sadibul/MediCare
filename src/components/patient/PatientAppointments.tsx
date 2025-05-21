import React, { useState, useEffect } from 'react';
import {
  Calendar,
  PlusCircle,
  Search,
  ArrowRight,
  ArrowLeft,
  User,
  Clock,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { motion } from 'framer-motion';
import BookAppointment from './BookAppointment';
import Image from 'next/image';
import { useUser } from '../../context/UserContext';
import { appointmentService } from '../../services/AppointmentService'; // Changed from '../../services/appointmentService'
import { Appointment } from '../../types/appointment';

const PatientAppointments = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // Get logged in patient info
  const { user } = useUser();

  // Fetch patient's appointments
  useEffect(() => {
    if (!user?.id) return;

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const patientAppointments =
          await appointmentService.getPatientAppointments(user.id);
        setAppointments(patientAppointments);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user?.id, showBooking]); // Re-fetch when returning from booking

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctor?.doctorName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      appointment.doctor?.doctorSpecialty
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      ''
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200';
      case 'completed':
        return 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await appointmentService.updateAppointmentStatus(
        appointmentId,
        'cancelled'
      );

      // Refresh appointments
      if (user?.id) {
        const patientAppointments =
          await appointmentService.getPatientAppointments(user.id);
        setAppointments(patientAppointments);
      }

      setSelectedAppointment(null);
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
    }
  };

  const formatAppointmentDate = (dateString) => {
    if (!dateString) return 'No date';

    try {
      // Ensure proper date parsing
      const date = new Date(dateString);

      // Check if date is valid before formatting
      if (isNaN(date.getTime())) {
        // If the date is selected from day buttons (like Monday, Tuesday)
        // Get the current week's corresponding day
        const today = new Date();
        const dayOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        const targetDay = dayOfWeek.indexOf(dateString);

        if (targetDay !== -1) {
          const diff = targetDay - today.getDay();
          const targetDate = new Date(today);
          targetDate.setDate(today.getDate() + diff + (diff < 0 ? 7 : 0));
          return targetDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        }

        return dateString; // Return the original string if we can't parse it
      }

      // Format the date if it's valid
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const renderAppointmentsList = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <button
          className="flex items-center bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition duration-300"
          onClick={() => setShowBooking(true)}
        >
          <PlusCircle size={16} className="mr-2" />
          Book Appointment
        </button>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search appointments..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 hover:bg-gray-50 transition duration-150"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {appointment.doctorName || appointment.doctor?.doctorName}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {appointment.specialty ||
                        appointment.doctor?.doctorSpecialty}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                      appointment.status
                    )}`}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-1" />
                  <span>
                    {formatAppointmentDate(appointment.date)} at{' '}
                    {appointment.time}
                  </span>
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    className="text-teal-500 text-sm font-medium flex items-center hover:text-teal-600"
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    View Details
                    <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Calendar size={48} className="mx-auto mb-2 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">
                No appointments found
              </h3>
              <p className="mt-1 text-gray-500">
                {search
                  ? 'Try adjusting your search'
                  : 'Book your first appointment to get started'}
              </p>
              {!search && (
                <button
                  className="mt-4 inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition duration-300"
                  onClick={() => setShowBooking(true)}
                >
                  <PlusCircle size={16} className="mr-2" />
                  Book Appointment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderAppointmentDetails = () => (
    <>
      <div className="flex items-center mb-6">
        <button
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={() => setSelectedAppointment(null)}
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">Appointment Details</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Appointment Status */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <Calendar size={20} className="text-gray-500 mr-2" />
            <div>
              <p className="font-medium">
                {new Date(selectedAppointment?.date || '').toLocaleDateString(
                  'en-US',
                  {
                    weekday: 'long', // Keep only the day of week (e.g., "Friday")
                  }
                )}
              </p>
              <p className="text-gray-500">{selectedAppointment?.time}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
              selectedAppointment?.status || ''
            )}`}
          >
            {selectedAppointment?.status
              ? selectedAppointment.status.charAt(0).toUpperCase() +
                selectedAppointment.status.slice(1)
              : ''}
          </span>
        </div>

        {/* Doctor Information */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-start">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              {selectedAppointment?.doctor?.profileImage ? (
                <img
                  src={selectedAppointment.doctor.profileImage}
                  alt={selectedAppointment.doctor.doctorName}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-full h-full p-4 text-gray-400" />
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">
                {selectedAppointment?.doctor?.doctorName}
              </h3>
              <p className="text-gray-600">
                {selectedAppointment?.doctor?.doctorSpecialty}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-gray-600">
                    {selectedAppointment?.doctor?.doctorExperience}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">
                    {selectedAppointment?.doctor?.doctorAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">
                    {selectedAppointment?.doctor?.doctorPhone}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">
                    {selectedAppointment?.doctor?.doctorEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Reason for Visit</h4>
            <p className="text-gray-600 p-4 bg-gray-50 rounded-lg">
              {selectedAppointment?.reason || 'No reason provided'}
            </p>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">About Doctor</h4>
            <p className="text-gray-600">
              {selectedAppointment?.doctor?.about}
            </p>
          </div>
        </div>

        {selectedAppointment?.status === 'scheduled' && (
          <div className="mt-8 flex justify-end space-x-4">
            <button
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
              onClick={() =>
                selectedAppointment?.id &&
                handleCancelAppointment(selectedAppointment.id)
              }
            >
              Cancel Appointment
            </button>
          </div>
        )}
      </div>
    </>
  );

  if (showBooking) {
    return <BookAppointment onClose={() => setShowBooking(false)} />;
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-200/50">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            My Appointments
          </h2>
          <p className="text-gray-500 text-lg">
            Manage your upcoming and past appointments
          </p>
        </div>
        <motion.button
          onClick={() => setShowBooking(true)}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-all duration-200 self-start md:self-auto"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <PlusCircle size={20} className="mr-2" />
          <span className="font-medium">Book Appointment</span>
        </motion.button>
      </div>

      {/* Enhanced Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search appointments..."
          className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 transition-all duration-200 shadow-sm hover:shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} className="text-blue-400" />
        </div>
      </div>

      {/* Appointments List or Details */}
      {!selectedAppointment ? (
        <div className="grid gap-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  {/* Top section: Doctor info and status */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-50 shadow-inner flex items-center justify-center border-2 border-white">
                        {appointment.doctor?.profileImage ? (
                          <img
                            src={appointment.doctor.profileImage}
                            alt={appointment.doctor?.doctorName || 'Doctor'}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <User className="h-7 w-7 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {appointment.doctorName}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {appointment.specialty}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </span>
                  </div>

                  {/* Middle section: Divider */}
                  <div className="my-4 border-t border-gray-100"></div>

                  {/* Bottom section: Date/time and action button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                        <Calendar size={18} className="mr-2 text-blue-500" />
                        <span className="text-sm font-medium">
                          {formatAppointmentDate(appointment.date)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                        <Clock size={18} className="mr-2 text-blue-500" />
                        <span className="text-sm font-medium">
                          {appointment.time}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                      onClick={() => setSelectedAppointment(appointment)}
                      whileHover={{ x: 3 }}
                    >
                      View Details
                      <ArrowRight size={16} className="ml-2" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="bg-blue-50 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Calendar size={40} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No appointments found
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {search
                  ? 'Try adjusting your search terms or removing filters'
                  : "You don't have any appointments scheduled. Book your first appointment to get started."}
              </p>
              {!search && (
                <motion.button
                  className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition duration-300 shadow-lg shadow-blue-500/30"
                  onClick={() => setShowBooking(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PlusCircle size={18} className="mr-2" />
                  Book Your First Appointment
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      ) : (
        renderAppointmentDetails()
      )}

      {/* Show booking component (unchanged) */}
      {showBooking && <BookAppointment onClose={() => setShowBooking(false)} />}
    </div>
  );
};

export default PatientAppointments;
