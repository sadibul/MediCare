import {
  Appointment,
  Doctor,
  TimeSlot,
  mockAppointments,
  getDayFromDate,
} from '../types/appointment';
import { PatientData } from '../types/patient';

// Mock data to simulate a backend
let appointments = [...mockAppointments];

// Mock patient data
const mockPatients: { [key: string]: PatientData } = {
  'patient-1': {
    id: 'patient-1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Patient St',
    dob: new Date(new Date().getFullYear() - 45, 0, 1)
      .toISOString()
      .split('T')[0], // ~45 years old
    bloodType: 'A+',
    height: '175 cm',
    weight: '70 kg',
    bmi: '22.9',
    profileImage: '/images/patients/patient-1.jpg',
  },
  'patient-2': {
    id: 'patient-2',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '+1 (555) 234-5678',
    address: '456 Health Ave',
    dob: new Date(new Date().getFullYear() - 32, 0, 1)
      .toISOString()
      .split('T')[0], // ~32 years old
    bloodType: 'B-',
    height: '165 cm',
    weight: '58 kg',
    bmi: '21.3',
    profileImage: '/images/patients/patient-2.jpg',
  },
  'patient-3': {
    id: 'patient-3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 345-6789',
    address: '789 Wellness Blvd',
    dob: new Date(new Date().getFullYear() - 28, 0, 1)
      .toISOString()
      .split('T')[0], // ~28 years old
    bloodType: 'O+',
    height: '180 cm',
    weight: '75 kg',
    bmi: '23.1',
    profileImage: '/images/patients/patient-3.jpg',
  },
};

// Modify the getDoctors function to only return doctors with time slots
const getDoctors = async (): Promise<Doctor[]> => {
  try {
    // This would be an API call in a real application
    const response = await fetch('/api/doctors/available');
    const data = await response.json();
    return data.doctors;
  } catch (error) {
    console.error('Error fetching available doctors:', error);

    // Fallback to mock data for demo purposes
    // In a real app, this would be removed and proper error handling added
    const allDoctors = [
      {
        id: '1',
        doctorName: 'Doctor 1',
        doctorSpecialty: 'Cardiology',
        doctorEmail: 'doctor1@gmail.com',
        doctorPhone: '+1 (555) 123-4567',
        doctorAddress: '123 Medical Center Dr, Suite 101, Boston, MA 02115',
        doctorExperience: '8 years',
        about:
          'Board-certified cardiologist with extensive experience in treating heart conditions.',
        profileImage: '/images/doctors/doctor-1.jpg',
        doctorWorkingHours: '',
      },
      {
        id: '2',
        doctorName: 'Doctor 2',
        doctorSpecialty: 'Dermatology',
        doctorEmail: 'doctor2@gmail.com',
        doctorPhone: '+1 (555) 234-5678',
        doctorAddress: '456 Healthcare Ave, Suite 202, New York, NY 10001',
        doctorExperience: '8 years',
        about:
          'Expert dermatologist focused on skin cancer prevention and cosmetic procedures.',
        profileImage: '/images/doctors/doctor-2.jpg',
        doctorWorkingHours: '',
      },
      // The full list would include all 10 doctors from seed.ts
    ];

    // Filter to only include doctors that have time slots
    // In the real implementation, this would be handled by the API
    return allDoctors;
  }
};

// Get time slots for a doctor
const getDoctorTimeSlots = async (doctorId: string): Promise<TimeSlot[]> => {
  try {
    // This would be an API call in a real application
    const response = await fetch(`/api/doctor/schedule?doctorId=${doctorId}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching time slots:', error);
    // Fallback mock data
    if (doctorId === '1') {
      return [
        {
          id: '1',
          doctorId: '1',
          day: 'Monday',
          startTime: '09:00',
          endTime: '11:00',
        },
      ];
    }
    return [];
  }
};

// Helper function to get doctor by ID
const getDoctorById = async (doctorId: string): Promise<Doctor | undefined> => {
  const doctors = await getDoctors();
  return doctors.find((doctor) => doctor.id === doctorId);
};

// Helper function to get patient by ID
const getPatientById = async (
  patientId: string
): Promise<PatientData | undefined> => {
  // In a real app, this would be an API call
  return mockPatients[patientId];
};

// Helper function to calculate age from DOB
const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Get doctor appointments with complete patient information
const getDoctorAppointments = async (
  doctorId: string
): Promise<Appointment[]> => {
  try {
    // Filter appointments for the specified doctor
    const doctorAppointments = appointments.filter(
      (appointment) => appointment.doctorId === doctorId
    );

    // Enrich with patient data
    return await Promise.all(
      doctorAppointments.map(async (appointment) => {
        // Get patient data
        const patient = await getPatientById(appointment.patientId);

        return {
          ...appointment,
          patient: patient || undefined,
          patientName: patient?.name,
          patientAge: patient?.dob ? calculateAge(patient.dob) : undefined,
        };
      })
    );
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    return [];
  }
};

// Get patient appointments with complete doctor information
const getPatientAppointments = async (
  patientId: string
): Promise<Appointment[]> => {
  try {
    // Filter appointments for the specified patient
    const patientAppointments = appointments.filter(
      (appointment) => appointment.patientId === patientId
    );

    // Enrich with doctor data
    return await Promise.all(
      patientAppointments.map(async (appointment) => {
        // Get doctor data
        const doctor = await getDoctorById(appointment.doctorId);

        return {
          ...appointment,
          doctor: doctor || undefined,
          doctorName: doctor?.doctorName,
          specialty: doctor?.doctorSpecialty,
        };
      })
    );
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    return [];
  }
};

// Create a new appointment
const createAppointment = async (
  appointment: Omit<Appointment, 'id' | 'status'>
): Promise<Appointment> => {
  const newAppointment: Appointment = {
    ...appointment,
    id: `app-${Date.now()}`,
    status: 'scheduled',
  };

  // Get doctor and patient data to enrich the appointment
  try {
    const doctor = await getDoctorById(appointment.doctorId);
    const patient = await getPatientById(appointment.patientId);

    if (doctor) {
      newAppointment.doctorName = doctor.doctorName;
      newAppointment.specialty = doctor.doctorSpecialty;
      newAppointment.doctor = doctor;
    }

    if (patient) {
      newAppointment.patientName = patient.name;
      newAppointment.patientAge = patient.dob
        ? calculateAge(patient.dob)
        : undefined;
      newAppointment.patient = patient;
    }

    appointments.push(newAppointment);
    return newAppointment;
  } catch (error) {
    console.error('Error creating appointment:', error);
    appointments.push(newAppointment);
    return newAppointment;
  }
};

// Update appointment status
const updateAppointmentStatus = async (
  appointmentId: string,
  status: 'scheduled' | 'completed' | 'cancelled'
): Promise<boolean> => {
  const appointment = appointments.find((a) => a.id === appointmentId);
  if (appointment) {
    appointment.status = status;
    return true;
  }
  return false;
};

const getAvailableDates = async (doctorId: string): Promise<string[]> => {
  try {
    const response = await fetch(
      `/api/doctor/available-dates?doctorId=${doctorId}`
    );
    const data = await response.json();

    if (data.success) {
      return data.dates;
    }

    const timeSlots = await getDoctorTimeSlots(doctorId);
    const availableDays = Array.from(
      new Set(timeSlots.map((slot) => slot.day))
    ); // it was iteration error without requiring TypeScript configuration changes.

    const dates: string[] = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i + 1);

      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

      if (availableDays.includes(dayOfWeek)) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }

    return dates;
  } catch (error) {
    console.error('Error fetching available dates:', error);
    return [];
  }
};

const getAvailableTimeSlots = async (
  doctorId: string,
  date: string
): Promise<string[]> => {
  try {
    // This would be an API call in a real application
    const response = await fetch(
      `/api/doctor/available-times?doctorId=${doctorId}&date=${date}`
    );
    const data = await response.json();

    if (data.success) {
      return data.times;
    }

    // Fallback implementation if API fails
    const timeSlots = await getDoctorTimeSlots(doctorId);
    const dayOfWeek = getDayFromDate(date);

    const daySlot = timeSlots.find((slot) => slot.day === dayOfWeek);
    if (!daySlot) return [];

    const startHour = parseInt(daySlot.startTime.split(':')[0]);
    const endHour = parseInt(daySlot.endTime.split(':')[0]);

    const availableTimes: string[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const formattedHour = hour % 12 || 12;
      const amPm = hour >= 12 ? 'PM' : 'AM';
      availableTimes.push(`${formattedHour}:00 ${amPm}`);
    }

    return availableTimes;
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    return [];
  }
};

// Export the appointment service functions
export const appointmentService = {
  getDoctors,
  getDoctorTimeSlots,
  getAvailableDates,
  getAvailableTimeSlots,
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
};
