import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash, CheckCircle } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientAge: number;
  date: string;
  time: string;
  status: string;
  reason: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface AddPrescriptionProps {
  appointment: Appointment;
  onComplete: () => void;
}

const AddPrescription: React.FC<AddPrescriptionProps> = ({ appointment, onComplete }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }
  ]);
  
  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        id: String(Date.now()),
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      }
    ]);
  };
  
  const handleRemoveMedication = (id: string) => {
    if (medications.length > 1) {
      setMedications(medications.filter(med => med.id !== id));
    }
  };
  
  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };
  
  const handleSubmit = () => {
    // Here you would submit the prescription to the backend
    console.log('Prescription:', { diagnosis, medications });
    onComplete();
  };
  
  return (
    <div className="h-full">
      <div className="flex items-center mb-6">
        <button
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={onComplete}
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">Add Prescription</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-medium">{appointment.patientName}</h3>
              <p className="text-gray-500">{appointment.patientAge} years old</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">
                {new Date(appointment.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="diagnosis">
            Diagnosis
          </label>
          <textarea
            id="diagnosis"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter diagnosis..."
            rows={2}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Medications</h4>
            <button 
              className="text-blue-500 hover:text-blue-600 flex items-center text-sm font-medium"
              onClick={handleAddMedication}
            >
              <Plus size={16} className="mr-1" />
              Add Medication
            </button>
          </div>
          
          {medications.map((medication, index) => (
            <div key={medication.id} className="mb-6 bg-gray-50 p-4 rounded-md relative">
              {medications.length > 1 && (
                <button 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                  onClick={() => handleRemoveMedication(medication.id)}
                >
                  <Trash size={16} />
                </button>
              )}
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={`med-name-${index}`}>
                  Medication Name
                </label>
                <input
                  id={`med-name-${index}`}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter medication name"
                  value={medication.name}
                  onChange={(e) => handleMedicationChange(medication.id, 'name', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={`med-dosage-${index}`}>
                    Dosage
                  </label>
                  <input
                    id={`med-dosage-${index}`}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., 10mg"
                    value={medication.dosage}
                    onChange={(e) => handleMedicationChange(medication.id, 'dosage', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={`med-frequency-${index}`}>
                    Frequency
                  </label>
                  <input
                    id={`med-frequency-${index}`}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Twice daily"
                    value={medication.frequency}
                    onChange={(e) => handleMedicationChange(medication.id, 'frequency', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={`med-duration-${index}`}>
                    Duration
                  </label>
                  <input
                    id={`med-duration-${index}`}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., 7 days"
                    value={medication.duration}
                    onChange={(e) => handleMedicationChange(medication.id, 'duration', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={`med-instructions-${index}`}>
                    Special Instructions
                  </label>
                  <input
                    id={`med-instructions-${index}`}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Take with food"
                    value={medication.instructions}
                    onChange={(e) => handleMedicationChange(medication.id, 'instructions', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="notes">
            Additional Notes
          </label>
          <textarea
            id="notes"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter any additional notes or instructions..."
            rows={3}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 flex items-center"
            onClick={handleSubmit}
          >
            <CheckCircle size={16} className="mr-2" />
            Save Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPrescription;