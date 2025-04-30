import React, { useState } from 'react';
import {
  Calendar,
  PlusCircle,
  Search,
  ArrowRight,
  ArrowLeft,
  User,
  Clock,
  MapPin,
  Star,
  Phone,
  Mail,
} from 'lucide-react';
import { motion } from 'framer-motion';
import BookAppointment from './BookAppointment';
import Image from 'next/image';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  location: string;
  phone: string;
  email: string;
  education: string;
  about: string;
  image: string;
}

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  doctor: Doctor;
}

const PatientAppointments = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  // Mock data
  const appointments: Appointment[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-06-15',
      time: '10:00 AM',
      status: 'upcoming',
      doctor: {
        id: 'D1',
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        experience: '15 years',
        rating: 4.8,
        location: '123 Medical Center Drive, Suite 200',
        phone: '+1 (555) 123-4567',
        email: 'sarah.johnson@medicare.com',
        education: 'MD - Harvard Medical School',
        about:
          'Dr. Sarah Johnson is a board-certified cardiologist with extensive experience in treating various heart conditions. She specializes in preventive cardiology and heart disease management.',
        image: '/images/doctors/doctor-1.jpg',
      },
    },
    {
      id: '2',
      doctorName: 'Dr. Robert Chen',
      specialty: 'Orthopedics',
      date: '2025-06-18',
      time: '3:30 PM',
      status: 'upcoming',
      doctor: {
        id: 'D2',
        name: 'Dr. Robert Chen',
        specialty: 'Orthopedics',
        experience: '12 years',
        rating: 4.7,
        location: '456 Health Plaza, Unit 301',
        phone: '+1 (555) 234-5678',
        email: 'robert.chen@medicare.com',
        education: 'MD - Johns Hopkins University',
        about:
          'Dr. Robert Chen is a skilled orthopedic surgeon specializing in sports medicine and joint replacement surgery. He is committed to helping patients regain mobility and improve their quality of life.',
        image: '/images/doctors/doctor-2.jpg',
      },
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Martinez',
      specialty: 'Dermatology',
      date: '2025-05-28',
      time: '1:15 PM',
      status: 'completed',
      doctor: {
        id: 'D3',
        name: 'Dr. Emily Martinez',
        specialty: 'Dermatology',
        experience: '10 years',
        rating: 4.9,
        location: '789 Wellness Center, Floor 4',
        phone: '+1 (555) 345-6789',
        email: 'emily.martinez@medicare.com',
        education: 'MD - Stanford University',
        about:
          'Dr. Emily Martinez is a board-certified dermatologist specializing in medical and cosmetic dermatology. She is known for her expertise in treating various skin conditions and her patient-centered approach.',
        image: '/images/doctors/doctor-3.jpg',
      },
    },
  ];

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(search.toLowerCase())
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

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }
      />
    ));
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
                    <h3 className="font-medium">{appointment.doctorName}</h3>
                    <p className="text-sm text-gray-500">
                      {appointment.specialty}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
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
                    {new Date(appointment.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    at {appointment.time}
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
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
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
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={selectedAppointment?.doctor.image || ''}
                alt={selectedAppointment?.doctor.name || ''}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">
                {selectedAppointment?.doctor.name}
              </h3>
              <p className="text-gray-600">
                {selectedAppointment?.doctor.specialty}
              </p>
              <div className="flex items-center mt-1">
                {renderStars(selectedAppointment?.doctor.rating || 0)}
                <span className="ml-2 text-sm text-gray-500">
                  {selectedAppointment?.doctor.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-gray-600">
                    {selectedAppointment?.doctor.experience}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">
                    {selectedAppointment?.doctor.location}
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
                    {selectedAppointment?.doctor.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">
                    {selectedAppointment?.doctor.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Education</h4>
            <p className="text-gray-600">
              {selectedAppointment?.doctor.education}
            </p>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">About</h4>
            <p className="text-gray-600">{selectedAppointment?.doctor.about}</p>
          </div>
        </div>

        {selectedAppointment?.status === 'upcoming' && (
          <div className="mt-8 flex justify-end space-x-4">
            <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50">
              Cancel Appointment
            </button>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
              Reschedule
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
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">My Appointments</h2>
          <p className="text-gray-500">
            Manage your upcoming and past appointments
          </p>
        </div>
        <motion.button
          onClick={() => setShowBooking(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/30 flex items-center space-x-2 hover:translate-y-[-2px] transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <PlusCircle size={20} className="mr-2" />
          <span>Book Appointment</span>
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search appointments..."
          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Appointments List */}
      {!selectedAppointment ? (
        <div className="grid gap-4">
          {filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200/50"
              whileHover={{
                y: -4,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={appointment.doctor.image}
                        alt={appointment.doctorName}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {appointment.specialty}
                      </p>
                      <div className="flex items-center mt-1">
                        {renderStars(appointment.doctor.rating)}
                        <span className="ml-2 text-sm text-gray-500">
                          {appointment.doctor.rating}
                        </span>
                      </div>
                    </div>
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

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">
                        {new Date(appointment.date).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm">{appointment.time}</span>
                    </div>
                  </div>
                  <motion.button
                    className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center"
                    onClick={() => setSelectedAppointment(appointment)}
                    whileHover={{ x: 4 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        renderAppointmentDetails()
      )}

      {/* Show booking component */}
      {showBooking && <BookAppointment onClose={() => setShowBooking(false)} />}
    </div>
  );
};

export default PatientAppointments;
