import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/context/NotificationContext';
import { AppointmentService } from '@/services/AppointmentService';
import { toast } from 'react-toastify';

interface ConfirmAppointmentProps {
  doctorId: string;
  doctorName: string;
  specialty: string;
  day: string;
  time: string;
  onCancel?: () => void;
}

const ConfirmAppointment: React.FC<ConfirmAppointmentProps> = ({
  doctorId,
  doctorName,
  specialty,
  day,
  time,
  onCancel,
}) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotifications();
  const router = useRouter();

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Call your appointment service to save the appointment
      await AppointmentService.createAppointment({
        doctorId,
        date: day,
        time,
        reason,
      });

      // Show simple toast notification
      toast.success(
        `Appointment confirmed with Dr. ${doctorName} on ${day} at ${time}`
      );

      // Also add to notifications panel (bell icon)
      addNotification(
        `Your appointment with Dr. ${doctorName} on ${day} at ${time} has been confirmed successfully.`,
        'success'
      );

      // Redirect to appointments page or dashboard
      router.push('/appointments');
    } catch (error) {
      // Show simple error toast
      toast.error('Failed to confirm your appointment. Please try again.');

      // Also add to notifications panel (bell icon)
      addNotification(
        'Failed to confirm your appointment. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Confirm Appointment</h2>
        <div className="flex items-center">
          {/* Progress indicators */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-medium">Doctor {doctorName}</h3>
            <p className="text-sm text-gray-600">{specialty}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Day</p>
            <p className="font-medium">{day}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium">{time}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="reason"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Reason for visit
        </label>
        <textarea
          id="reason"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          placeholder="Please describe your symptoms or reason for the appointment"
          value={reason}
          onChange={handleReasonChange}
        ></textarea>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        By confirming, you agree to our appointment policies, including the
        24-hour cancellation policy.
      </p>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Appointment'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmAppointment;
