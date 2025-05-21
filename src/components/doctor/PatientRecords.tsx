import React, { useState } from 'react';
import {
  Search,
  Filter,
  FileText,
  Calendar,
  User,
  Pill,
  ArrowLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
  medicalHistory: {
    date: string;
    diagnosis: string;
    prescription: string[];
    notes: string;
    vitals: {
      bloodPressure: string;
      heartRate: string;
      temperature: string;
    };
  }[];
}

const PatientRecords = () => {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Mock data
  const patients: Patient[] = [
    {
      id: '1',
      name: 'John Doe',
      age: 45,
      lastVisit: '2024-03-15',
      condition: 'Hypertension',
      medicalHistory: [
        {
          date: '2024-03-15',
          diagnosis: 'Hypertension',
          prescription: ['Lisinopril 10mg', 'Hydrochlorothiazide 12.5mg'],
          notes:
            'Patient reports improved symptoms. Blood pressure still elevated but showing improvement from last visit.',
          vitals: {
            bloodPressure: '140/90',
            heartRate: '75',
            temperature: '98.6',
          },
        },
        {
          date: '2024-02-10',
          diagnosis: 'Hypertension - Follow Up',
          prescription: ['Lisinopril 5mg', 'Hydrochlorothiazide 12.5mg'],
          notes:
            'Initial diagnosis of hypertension. Starting on medication regimen. Discussed lifestyle modifications including reduced sodium intake and regular exercise.',
          vitals: {
            bloodPressure: '150/95',
            heartRate: '82',
            temperature: '98.4',
          },
        },
        {
          date: '2023-11-22',
          diagnosis: 'Annual Physical',
          prescription: [],
          notes:
            'Regular check-up. Patient mentioned occasional headaches and dizziness. Recommended monitoring blood pressure at home.',
          vitals: {
            bloodPressure: '145/92',
            heartRate: '78',
            temperature: '98.7',
          },
        },
      ],
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 32,
      lastVisit: '2024-03-14',
      condition: 'Diabetes',
      medicalHistory: [
        {
          date: '2024-03-14',
          diagnosis: 'Type 2 Diabetes',
          prescription: ['Metformin 1000mg', 'Glipizide 5mg'],
          notes:
            'Regular follow-up. Blood sugar levels well controlled with current medication regimen.',
          vitals: {
            bloodPressure: '120/80',
            heartRate: '70',
            temperature: '98.4',
          },
        },
        {
          date: '2024-01-05',
          diagnosis: 'Type 2 Diabetes - Medication Adjustment',
          prescription: ['Metformin 850mg', 'Glipizide 2.5mg'],
          notes:
            'Increased dosage of Metformin due to slightly elevated A1C. Discussed importance of regular meal timing and carbohydrate counting.',
          vitals: {
            bloodPressure: '125/82',
            heartRate: '74',
            temperature: '98.2',
          },
        },
      ],
    },
    {
      id: '3',
      name: 'Robert Johnson',
      age: 28,
      lastVisit: '2024-03-10',
      condition: 'Asthma',
      medicalHistory: [
        {
          date: '2024-03-10',
          diagnosis: 'Asthma Exacerbation',
          prescription: ['Albuterol Inhaler', 'Prednisone 20mg'],
          notes:
            'Acute asthma exacerbation. Patient responded well to nebulizer treatment in office.',
          vitals: {
            bloodPressure: '118/78',
            heartRate: '88',
            temperature: '98.8',
          },
        },
        {
          date: '2023-12-18',
          diagnosis: 'Upper Respiratory Infection',
          prescription: [
            'Amoxicillin 500mg',
            'Benzonatate 100mg',
            'Albuterol Inhaler',
          ],
          notes:
            'Patient presented with cough, congestion and wheezing. Increased use of rescue inhaler past week.',
          vitals: {
            bloodPressure: '122/80',
            heartRate: '92',
            temperature: '100.2',
          },
        },
      ],
    },
    {
      id: '4',
      name: 'Emily Wilson',
      age: 41,
      lastVisit: '2024-03-12',
      condition: 'Migraine',
      medicalHistory: [
        {
          date: '2024-03-12',
          diagnosis: 'Chronic Migraines',
          prescription: ['Sumatriptan 50mg', 'Propranolol 40mg'],
          notes:
            'Patient reports 3-4 severe migraines per month. Discussed trigger identification and keeping a headache journal.',
          vitals: {
            bloodPressure: '115/75',
            heartRate: '68',
            temperature: '98.2',
          },
        },
        {
          date: '2024-01-20',
          diagnosis: 'Migraine with Aura',
          prescription: ['Sumatriptan 25mg'],
          notes:
            'Initial visit for migraine evaluation. Patient describes visual disturbances preceding headache. Recommended lifestyle modifications and prescription for acute attacks.',
          vitals: {
            bloodPressure: '118/76',
            heartRate: '72',
            temperature: '98.4',
          },
        },
      ],
    },
    {
      id: '5',
      name: 'Michael Chang',
      age: 56,
      lastVisit: '2024-03-08',
      condition: 'Hyperlipidemia',
      medicalHistory: [
        {
          date: '2024-03-08',
          diagnosis: 'Hyperlipidemia',
          prescription: ['Atorvastatin 20mg', 'Fenofibrate 145mg'],
          notes:
            'Follow-up lipid panel shows improvement. Continue current medication and dietary modifications.',
          vitals: {
            bloodPressure: '132/84',
            heartRate: '65',
            temperature: '97.8',
          },
        },
        {
          date: '2023-12-10',
          diagnosis: 'Hyperlipidemia',
          prescription: ['Atorvastatin 10mg'],
          notes:
            'Initial diagnosis based on lipid panel. LDL: 165, HDL: 38, Triglycerides: 210. Started on statin therapy and provided nutrition counseling.',
          vitals: {
            bloodPressure: '136/88',
            heartRate: '70',
            temperature: '98.0',
          },
        },
      ],
    },
    {
      id: '6',
      name: 'Sarah Martinez',
      age: 35,
      lastVisit: '2024-03-05',
      condition: 'Hypothyroidism',
      medicalHistory: [
        {
          date: '2024-03-05',
          diagnosis: 'Hypothyroidism',
          prescription: ['Levothyroxine 75mcg'],
          notes:
            'TSH levels normalized with current dosage. Patient reports improved energy levels and resolution of cold intolerance.',
          vitals: {
            bloodPressure: '110/70',
            heartRate: '72',
            temperature: '97.6',
          },
        },
        {
          date: '2023-09-15',
          diagnosis: 'Hypothyroidism',
          prescription: ['Levothyroxine 50mcg'],
          notes:
            'Follow-up visit after initial diagnosis. TSH still elevated at 7.2. Increasing dosage and will recheck in 8 weeks.',
          vitals: {
            bloodPressure: '112/72',
            heartRate: '68',
            temperature: '97.4',
          },
        },
        {
          date: '2023-07-22',
          diagnosis: 'Fatigue and Weight Gain',
          prescription: ['Levothyroxine 25mcg'],
          notes:
            'Patient presents with fatigue, weight gain, and hair thinning. TSH elevated at 9.6, consistent with hypothyroidism. Starting on low dose levothyroxine.',
          vitals: {
            bloodPressure: '116/74',
            heartRate: '64',
            temperature: '97.2',
          },
        },
      ],
    },
    {
      id: '7',
      name: 'David Anderson',
      age: 62,
      lastVisit: '2024-03-01',
      condition: 'Osteoarthritis',
      medicalHistory: [
        {
          date: '2024-03-01',
          diagnosis: 'Osteoarthritis - Knees',
          prescription: ['Meloxicam 15mg', 'Acetaminophen 500mg'],
          notes:
            'Pain well controlled with current regimen. Discussed importance of physical therapy exercises and maintaining healthy weight.',
          vitals: {
            bloodPressure: '138/82',
            heartRate: '74',
            temperature: '98.2',
          },
        },
        {
          date: '2023-11-05',
          diagnosis: 'Osteoarthritis - Knees',
          prescription: ['Meloxicam 7.5mg', 'Acetaminophen 500mg'],
          notes:
            'Initial evaluation for knee pain. X-rays show moderate joint space narrowing consistent with osteoarthritis. Referred to physical therapy.',
          vitals: {
            bloodPressure: '142/86',
            heartRate: '78',
            temperature: '98.4',
          },
        },
      ],
    },
    {
      id: '8',
      name: 'Lisa Parker',
      age: 38,
      lastVisit: '2024-02-28',
      condition: 'Anxiety Disorder',
      medicalHistory: [
        {
          date: '2024-02-28',
          diagnosis: 'Generalized Anxiety Disorder',
          prescription: ['Sertraline 75mg', 'Lorazepam 0.5mg (as needed)'],
          notes:
            'Anxiety symptoms improved with medication. Patient continues with cognitive behavioral therapy. Sleep has improved.',
          vitals: {
            bloodPressure: '124/78',
            heartRate: '82',
            temperature: '98.6',
          },
        },
        {
          date: '2023-08-15',
          diagnosis: 'Generalized Anxiety Disorder',
          prescription: ['Sertraline 50mg', 'Lorazepam 0.5mg (as needed)'],
          notes:
            'Initial evaluation for anxiety symptoms. Screening positive for GAD-7. Discussed medication options and referred to therapist.',
          vitals: {
            bloodPressure: '130/85',
            heartRate: '90',
            temperature: '98.8',
          },
        },
      ],
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.condition.toLowerCase().includes(search.toLowerCase())
  );

  const renderPatientList = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Patient Records</h2>
          <p className="text-gray-500 mt-1">
            View and manage patient medical histories
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200/50">
            <thead className="bg-gray-50/50 backdrop-blur-sm">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Patient
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Age
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Visit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Condition
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {filteredPatients.map((patient) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-blue-50/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {patient.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(patient.lastVisit).toLocaleDateString('en-US', {
                      weekday: 'long', // Keep only the day of week (e.g., "Friday")
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {patient.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      View Record
                      <FileText size={16} className="ml-2" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderPatientDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center mb-8">
        <button
          onClick={() => setSelectedPatient(null)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Patient Record</h2>
          <p className="text-gray-500 mt-1">View detailed medical history</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
        <div className="flex items-center mb-8">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {selectedPatient?.name}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-200/50">
            <p className="text-sm font-medium text-gray-500 mb-1">Age</p>
            <p className="text-xl font-semibold text-gray-900">
              {selectedPatient?.age} years
            </p>
          </div>
          <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-200/50">
            <p className="text-sm font-medium text-gray-500 mb-1">Last Visit</p>
            <p className="text-xl font-semibold text-gray-900">
              {new Date(selectedPatient?.lastVisit || '').toLocaleDateString()}
            </p>
          </div>
          <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-200/50">
            <p className="text-sm font-medium text-gray-500 mb-1">
              Current Condition
            </p>
            <p className="text-xl font-semibold text-gray-900">
              {selectedPatient?.condition}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-xl font-semibold text-gray-900 mb-6">
            Medical History
          </h4>
          <AnimatePresence>
            {selectedPatient?.medicalHistory.map((record, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pb-6 border-b border-gray-200/50 last:border-0"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900">
                      {record.diagnosis}
                    </h5>
                    <p className="text-gray-500 mt-1">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right bg-gray-50 px-4 py-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Vitals
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        BP: {record.vitals.bloodPressure}
                      </p>
                      <p className="text-sm text-gray-600">
                        HR: {record.vitals.heartRate} bpm
                      </p>
                      <p className="text-sm text-gray-600">
                        Temp: {record.vitals.temperature}°F
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h6 className="text-base font-semibold text-gray-900 mb-3">
                    Prescription
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {record.prescription.map((med, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-gray-700"
                      >
                        <Pill className="h-4 w-4 mr-2 text-blue-500" />
                        {med}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h6 className="text-base font-semibold text-gray-900 mb-3">
                    Notes
                  </h6>
                  <p className="text-gray-700 leading-relaxed">
                    {record.notes}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {selectedPatient ? renderPatientDetails() : renderPatientList()}
      </AnimatePresence>
    </div>
  );
};

export default PatientRecords;
