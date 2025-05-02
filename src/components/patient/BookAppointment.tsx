import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Search,
  User,
  CheckCircle,
  Star,
  ArrowRight,
  X,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availableDates: string[];
  experience?: string;
  location?: string;
  phone?: string;
  email?: string;
  education?: string;
  about?: string;
}

interface BookAppointmentProps {
  onClose: () => void;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [search, setSearch] = useState('');
  const [showDoctorDetails, setShowDoctorDetails] = useState<Doctor | null>(
    null
  );

  // Mock data
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.8,
      availableDates: ['2025-06-15', '2025-06-16', '2025-06-17'],
      experience: '15 years',
      location: '123 Medical Center Drive, Suite 200',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@medicare.com',
      education: 'MD - Harvard Medical School',
      about:
        'Dr. Sarah Johnson is a board-certified cardiologist with extensive experience in treating various heart conditions. She specializes in preventive cardiology and heart disease management.',
    },
    {
      id: '2',
      name: 'Dr. Robert Chen',
      specialty: 'Orthopedics',
      rating: 4.7,
      availableDates: ['2025-06-15', '2025-06-18', '2025-06-19'],
      experience: '10 years',
      location: '456 Health Plaza, Suite 300',
      phone: '+1 (555) 987-6543',
      email: 'robert.chen@medicare.com',
      education: 'MD - Stanford University School of Medicine',
      about:
        'Dr. Robert Chen is a highly skilled orthopedic surgeon with a focus on joint replacement and sports injuries. He is dedicated to providing personalized care and helping patients regain their mobility.',
    },
    {
      id: '3',
      name: 'Dr. Emily Martinez',
      specialty: 'Dermatology',
      rating: 4.9,
      availableDates: ['2025-06-16', '2025-06-17', '2025-06-20'],
      experience: '8 years',
      location: '789 Skin Care Blvd, Suite 100',
      phone: '+1 (555) 555-1234',
      email: 'emily.martinez@medicare.com',
      education: 'MD - Johns Hopkins University School of Medicine',
      about:
        'Dr. Emily Martinez is a renowned dermatologist specializing in skin cancer treatment and cosmetic dermatology. She is committed to providing the highest quality care and helping patients achieve healthy, beautiful skin.',
    },
  ];

  const availableTimes = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setStep(3);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handleConfirm = () => {
    // Here you would handle the actual booking
    console.log('Booking confirmed with:', {
      selectedDoctor,
      selectedDate,
      selectedTime,
    });
    // Close and return to appointments
    onClose();
  };

  const DoctorDetailsCard = ({ doctor }: { doctor: Doctor }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setShowDoctorDetails(null)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              <User size={64} className="w-full h-full text-gray-400 p-2" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(doctor.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
                <span className="ml-2 text-gray-600">{doctor.rating}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowDoctorDetails(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="font-medium">Experience</p>
                <p className="text-gray-600">{doctor.experience}</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-600">{doctor.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">{doctor.phone}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">{doctor.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-2">Education</h4>
          <p className="text-gray-600">{doctor.education}</p>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-2">About</h4>
          <p className="text-gray-600">{doctor.about}</p>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            onClick={() => {
              setShowDoctorDetails(null);
              handleSelectDoctor(doctor);
            }}
          >
            Book Appointment
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderStepOne = () => (
    <>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search doctors by name or specialty..."
          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="grid gap-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200/50 transition-all duration-200 overflow-hidden"
              whileHover={{
                y: -4,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                      <User
                        size={48}
                        className="w-full h-full text-gray-400 p-2"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < Math.floor(doctor.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          {doctor.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-end text-sm text-gray-500">
                    <div
                      className="flex items-center text-blue-500 hover:text-blue-600 cursor-pointer"
                      onClick={() => setShowDoctorDetails(doctor)}
                    >
                      <span>View Details</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-8 text-center">
            <User size={48} className="mx-auto mb-2 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">
              No doctors found
            </h3>
            <p className="mt-1 text-gray-500">Try adjusting your search</p>
          </div>
        )}
      </div>
    </>
  );

  const renderStepTwo = () => (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={24} className="text-gray-500" />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedDoctor?.name}</h3>
            <p className="text-sm text-gray-500">{selectedDoctor?.specialty}</p>
          </div>
        </div>
      </div>

      <h3 className="font-medium mb-4">Select Date</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {selectedDoctor?.availableDates.map((date) => (
          <button
            key={date}
            className={`p-3 rounded-md border ${
              selectedDate === date
                ? 'bg-teal-100 border-teal-500 text-teal-800'
                : 'border-gray-300 hover:border-teal-500'
            }`}
            onClick={() => handleSelectDate(date)}
          >
            <div className="flex flex-col items-center">
              <Calendar size={16} className="mb-1" />
              <span className="text-sm font-medium">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );

  const renderStepThree = () => (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={24} className="text-gray-500" />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedDoctor?.name}</h3>
            <p className="text-sm text-gray-500">{selectedDoctor?.specialty}</p>
            <p className="text-sm mt-1">
              <Calendar size={14} className="inline mr-1" />
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      <h3 className="font-medium mb-4">Select Time</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {availableTimes.map((time) => (
          <button
            key={time}
            className={`p-3 rounded-md border ${
              selectedTime === time
                ? 'bg-teal-100 border-teal-500 text-teal-800'
                : 'border-gray-300 hover:border-teal-500'
            }`}
            onClick={() => handleSelectTime(time)}
          >
            <div className="flex flex-col items-center">
              <Clock size={16} className="mb-1" />
              <span className="text-sm font-medium">{time}</span>
            </div>
          </button>
        ))}
      </div>
    </>
  );

  const renderStepFour = () => (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="text-center mb-4">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <CheckCircle size={24} className="text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900">
            Confirm Your Appointment
          </h3>
        </div>

        <div className="border-t border-b border-gray-200 py-4 my-4">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-500" />
              </div>
            </div>
            <div>
              <h4 className="font-medium">{selectedDoctor?.name}</h4>
              <p className="text-sm text-gray-500">
                {selectedDoctor?.specialty}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-3">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{selectedTime}</p>
            </div>
            <div className="col-span-2 mt-2">
              <p className="text-sm text-gray-500">Appointment Type</p>
              <p className="font-medium">In-person consultation</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            By confirming, you agree to our appointment policies, including the
            24-hour cancellation policy.
          </p>
          <button
            className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-md font-medium transition duration-300"
            onClick={handleConfirm}
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="h-full">
      <div className="flex items-center mb-6">
        <button
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={step === 1 ? onClose : () => setStep(step - 1)}
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">
          {step === 1 && 'Book an Appointment'}
          {step === 2 && 'Select Date'}
          {step === 3 && 'Select Time'}
          {step === 4 && 'Confirm Appointment'}
        </h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="w-full max-w-xs mx-auto flex items-center">
            <div
              className={`flex-1 flex flex-col items-center ${
                step >= 1 ? 'text-teal-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 1 ? 'bg-teal-100' : 'bg-gray-200'
                }`}
              >
                <User
                  size={16}
                  className={step >= 1 ? 'text-teal-600' : 'text-gray-400'}
                />
              </div>
              <span className="text-xs">Doctor</span>
            </div>
            <div
              className={`w-10 h-0.5 ${
                step >= 2 ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            ></div>
            <div
              className={`flex-1 flex flex-col items-center ${
                step >= 2 ? 'text-teal-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 2 ? 'bg-teal-100' : 'bg-gray-200'
                }`}
              >
                <Calendar
                  size={16}
                  className={step >= 2 ? 'text-teal-600' : 'text-gray-400'}
                />
              </div>
              <span className="text-xs">Date</span>
            </div>
            <div
              className={`w-10 h-0.5 ${
                step >= 3 ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            ></div>
            <div
              className={`flex-1 flex flex-col items-center ${
                step >= 3 ? 'text-teal-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 3 ? 'bg-teal-100' : 'bg-gray-200'
                }`}
              >
                <Clock
                  size={16}
                  className={step >= 3 ? 'text-teal-600' : 'text-gray-400'}
                />
              </div>
              <span className="text-xs">Time</span>
            </div>
            <div
              className={`w-10 h-0.5 ${
                step >= 4 ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            ></div>
            <div
              className={`flex-1 flex flex-col items-center ${
                step >= 4 ? 'text-teal-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 4 ? 'bg-teal-100' : 'bg-gray-200'
                }`}
              >
                <CheckCircle
                  size={16}
                  className={step >= 4 ? 'text-teal-600' : 'text-gray-400'}
                />
              </div>
              <span className="text-xs">Confirm</span>
            </div>
          </div>
        </div>
      </div>

      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
      {step === 3 && renderStepThree()}
      {step === 4 && renderStepFour()}
      {showDoctorDetails && <DoctorDetailsCard doctor={showDoctorDetails} />}
    </div>
  );
};

export default BookAppointment;
