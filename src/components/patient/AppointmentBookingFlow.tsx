import { useState } from 'react';
import ConfirmAppointment from './ConfirmAppointment';
// Import other steps as needed

const AppointmentBookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentDetails, setAppointmentDetails] = useState({
    doctorId: '1',
    doctorName: 'Doctor 1',
    specialty: 'Cardiology',
    day: 'Tuesday',
    time: '9:00 AM',
  });
  
  // Handle navigation between steps
  
  return (
    <div>
      {currentStep === 3 && (
        <ConfirmAppointment
          doctorId={appointmentDetails.doctorId}
          doctorName={appointmentDetails.doctorName}
          specialty={appointmentDetails.specialty}
          day={appointmentDetails.day}
          time={appointmentDetails.time}
          onCancel={() => setCurrentStep(currentStep - 1)}
        />
      )}
      {/* Other steps */}
    </div>
  );
};

export default AppointmentBookingFlow;
