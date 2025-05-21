import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Search,
  User,
  CheckCircle,
  ArrowRight,
  X,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Doctor, generateTimeSlots } from '../../types/appointment';
import { appointmentService } from '../../services/AppointmentService'; // Changed from '../../services/appointmentService'
import { useUser } from '../../context/UserContext';

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
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [reason, setReason] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Get logged in patient info
  const { user } = useUser();

  // Fetch doctors with available time slots
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        // This will now only fetch doctors who have time slots
        const doctorsList = await appointmentService.getDoctors();
        setDoctors(doctorsList);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Update the useEffect that fetches available dates
  useEffect(() => {
    if (selectedDoctor) {
      const fetchAvailableDays = async () => {
        try {
          // Update endpoint to fetch days instead of dates
          const response = await fetch(
            `/api/doctor/available-dates?doctorId=${selectedDoctor.id}`
          );
          const data = await response.json();
          if (data.success) {
            // Store day names like "Monday", "Tuesday", etc.
            setAvailableDates(data.days);
          }
        } catch (error) {
          console.error('Failed to fetch available days:', error);
        }
      };

      fetchAvailableDays();
    }
  }, [selectedDoctor]);

  // Update the useEffect that fetches time slots
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const fetchAvailableTimes = async () => {
        try {
          // Update API call to use day parameter instead of date
          const response = await fetch(
            `/api/doctor/available-times?doctorId=${selectedDoctor.id}&day=${selectedDate}`
          );
          const data = await response.json();
          if (data.success) {
            setAvailableTimes(data.times);
          }
        } catch (error) {
          console.error('Failed to fetch available times:', error);
        }
      };

      fetchAvailableTimes();
    }
  }, [selectedDoctor, selectedDate]);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      doctor.doctorSpecialty.toLowerCase().includes(search.toLowerCase())
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

  const handleConfirm = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !user?.id) {
      return;
    }

    try {
      // When saving the appointment date, convert day name to actual date object:
      let appointmentDate = selectedDate;
      if (
        [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ].includes(selectedDate)
      ) {
        const today = new Date();
        const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ...
        const daysOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        const targetDayIndex = daysOfWeek.indexOf(selectedDate);

        // Calculate the difference to the next occurrence of the target day
        let daysToAdd = targetDayIndex - currentDay;
        if (daysToAdd <= 0) daysToAdd += 7; // If it's in the past, get next week's occurrence

        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + daysToAdd);

        // Format as ISO string or another format your backend expects
        appointmentDate = targetDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      }

      await appointmentService.createAppointment({
        patientId: user.id,
        doctorId: selectedDoctor.id,
        date: appointmentDate,
        time: selectedTime,
        reason: reason,
      });

      // Close and return to appointments
      onClose();
    } catch (error) {
      console.error('Failed to create appointment:', error);
    }
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

      {loading ? (
        <div className="flex justify-center py-8">
          <p>Loading doctors...</p>
        </div>
      ) : (
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
                        {doctor.profileImage ? (
                          <img
                            src={doctor.profileImage}
                            alt={doctor.doctorName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User
                            size={48}
                            className="w-full h-full text-gray-400 p-2"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {doctor.doctorName}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {doctor.doctorSpecialty}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Experience: {doctor.doctorExperience}
                        </p>
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
      )}
    </>
  );

  const renderStepTwo = () => (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {selectedDoctor?.profileImage ? (
                <img
                  src={selectedDoctor.profileImage}
                  alt={selectedDoctor.doctorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={24} className="text-gray-500" />
              )}
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedDoctor?.doctorName}</h3>
            <p className="text-sm text-gray-500">
              {selectedDoctor?.doctorSpecialty}
            </p>
          </div>
        </div>
      </div>

      <h3 className="font-medium mb-4">Select Day</h3>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {availableDates.length > 0 ? (
          availableDates.map((day) => (
            <button
              key={day}
              className={`p-3 rounded-md border ${
                selectedDate === day
                  ? 'bg-teal-100 border-teal-500 text-teal-800'
                  : 'border-gray-300 hover:border-teal-500'
              }`}
              onClick={() => handleSelectDate(day)}
            >
              <div className="flex flex-col items-center">
                <Calendar size={16} className="mb-1" />
                <span className="text-sm font-medium">{day}</span>
              </div>
            </button>
          ))
        ) : (
          <div className="col-span-full text-center py-4">
            <p className="text-gray-500">No available days for this doctor</p>
          </div>
        )}
      </div>
    </>
  );

  const renderDateSelection = () => (
    <div className="space-y-6">
      {/* Display the doctor's name and specialty */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            {selectedDoctor?.doctorName}
          </h3>
          <p className="text-gray-500">{selectedDoctor?.doctorSpecialty}</p>
        </div>
      </div>

      <h3 className="text-lg font-medium">Select Day</h3>

      {availableDates.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableDates.map((date) => {
            // Format date for display
            const displayDate = new Date(date);
            const dayName = displayDate.toLocaleDateString('en-US', {
              weekday: 'long',
            });
            const dayNum = displayDate.getDate();
            const month = displayDate.toLocaleDateString('en-US', {
              month: 'short',
            });

            return (
              <button
                key={date}
                onClick={() => handleSelectDate(date)}
                className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-center"
              >
                <p className="font-medium">{dayName}</p>
                <p className="text-2xl font-semibold">{dayNum}</p>
                <p className="text-gray-500">{month}</p>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">
          No available appointments for this doctor
        </p>
      )}
    </div>
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
            <h3 className="font-medium">{selectedDoctor?.doctorName}</h3>
            <p className="text-sm text-gray-500">
              {selectedDoctor?.doctorSpecialty}
            </p>
            <p className="text-sm mt-1">
              <Calendar size={14} className="inline mr-1" />
              {selectedDate} {/* Display the day name directly */}
            </p>
          </div>
        </div>
      </div>

      <h3 className="font-medium mb-4">Select Time</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {availableTimes.length > 0 ? (
          availableTimes.map((time) => (
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
          ))
        ) : (
          <div className="col-span-full text-center py-4">
            <p className="text-gray-500">
              No available time slots for this date
            </p>
          </div>
        )}
      </div>
    </>
  );

  const renderTimeSelection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Select Time</h3>

      {availableTimes.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableTimes.map((time) => (
            <button
              key={time}
              onClick={() => handleSelectTime(time)}
              className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <div className="flex items-center justify-center">
                <Clock size={18} className="mr-2" />
                <span>{time}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">
          No available time slots on this day
        </p>
      )}
    </div>
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
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {selectedDoctor?.profileImage ? (
                  <img
                    src={selectedDoctor.profileImage}
                    alt={selectedDoctor.doctorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} className="text-gray-500" />
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium">{selectedDoctor?.doctorName}</h4>
              <p className="text-sm text-gray-500">
                {selectedDoctor?.doctorSpecialty}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-3">
            <div>
              <p className="text-sm text-gray-500">Day</p>
              <p className="font-medium">{selectedDate}</p>{' '}
              {/* Display day directly */}
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{selectedTime}</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-500 mb-2">
              Reason for visit
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please describe your symptoms or reason for the appointment"
            />
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
              <span className="text-xs">Day</span>{' '}
              {/* Change "Date" to "Day" */}
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
