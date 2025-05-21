import { PatientData } from './patient';

export interface Doctor {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorEmail: string;
  doctorPhone: string;
  doctorAddress: string;
  doctorExperience: string;
  about: string;
  profileImage: string;
  doctorWorkingHours: string;

  name?: string;
  specialty?: string;
  experience?: string;
  location?: string;
  phone?: string;
  email?: string;
  image?: string;
}

export interface TimeSlot {
  id?: string;
  doctorId: string;
  day: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
}

export interface Appointment {
  id?: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
  patient?: PatientData;
  doctor?: Doctor;

  doctorName?: string;
  specialty?: string;
  patientName?: string;
  patientAge?: number;
  day?: string; // Add day field for day-based filtering
}

export const mockAppointments: Appointment[] = [
  {
    id: 'app-1',
    patientId: 'patient-1',
    doctorId: '1',
    date: new Date().toISOString().split('T')[0], // Today
    time: '10:00 AM',
    status: 'scheduled',
    reason: 'Annual checkup and blood pressure monitoring',
    doctorName: 'Doctor 1',
    specialty: 'Cardiology',
    patientName: 'John Smith',
    patientAge: 45,
    day: 'Monday', // Changed from Sunday to Monday (default selected day)
  },
  {
    id: 'app-2',
    patientId: 'patient-2',
    doctorId: '1',
    date: new Date().toISOString().split('T')[0], // Today
    time: '11:30 AM',
    status: 'scheduled',
    reason: 'Recurring headaches and dizziness',
    doctorName: 'Doctor 1',
    specialty: 'Cardiology',
    patientName: 'Emily Johnson',
    patientAge: 32,
    day: 'Monday', // Changed to Monday
  },
  {
    id: 'app-3',
    patientId: 'patient-3',
    doctorId: '1',
    date: new Date().toISOString().split('T')[0], // Today
    time: '2:15 PM',
    status: 'scheduled',
    reason: 'Follow-up after recent surgery',
    doctorName: 'Doctor 1',
    specialty: 'Cardiology',
    patientName: 'Michael Chen',
    patientAge: 28,
    day: 'Monday', // Changed to Monday
  },
  // Add more appointments for different days
  {
    id: 'app-4',
    patientId: 'patient-1',
    doctorId: '1',
    date: new Date().toISOString().split('T')[0],
    time: '9:00 AM',
    status: 'scheduled',
    reason: 'Quarterly diabetes check-up',
    doctorName: 'Doctor 1',
    specialty: 'Cardiology',
    patientName: 'John Smith',
    patientAge: 45,
    day: 'Tuesday',
  },
  {
    id: 'app-5',
    patientId: 'patient-2',
    doctorId: '1',
    date: new Date().toISOString().split('T')[0],
    time: '1:00 PM',
    status: 'scheduled',
    reason: 'Allergy consultation',
    doctorName: 'Doctor 1',
    specialty: 'Cardiology',
    patientName: 'Emily Johnson',
    patientAge: 32,
    day: 'Wednesday',
  },
  {
    id: 'app-6',
    patientId: 'patient-3',
    doctorId: '1',
    date: new Date().toISOString().split('T')[0],
    time: '3:30 PM',
    status: 'scheduled',
    reason: 'Physical therapy follow-up',
    doctorName: 'Doctor 1',
    specialty: 'Cardiology',
    patientName: 'Michael Chen',
    patientAge: 28,
    day: 'Thursday',
  },
];

// Generate available time slots based on doctor's schedule and selected date
export const generateTimeSlots = (
  timeSlots: TimeSlot[],
  selectedDay: string
): string[] => {
  const slots: string[] = [];

  // Find the time slot for the selected day
  const daySlot = timeSlots.find(
    (slot) => slot.day.toLowerCase() === selectedDay.toLowerCase()
  );

  if (!daySlot) return slots;

  // Convert start and end times to hours
  const startHour = parseInt(daySlot.startTime.split(':')[0]);
  const endHour = parseInt(daySlot.endTime.split(':')[0]);

  // Generate hourly slots between start and end time
  for (let hour = startHour; hour < endHour; hour++) {
    const formattedHour = hour % 12 || 12;
    const amPm = hour >= 12 ? 'PM' : 'AM';
    slots.push(`${formattedHour}:00 ${amPm}`);
  }

  return slots;
};

// Format day string from date
export const getDayFromDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};
