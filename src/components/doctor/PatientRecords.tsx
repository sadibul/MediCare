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
                        <div className="text-xs text-gray-500">
                          ID: {patient.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(patient.lastVisit).toLocaleDateString()}
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
            <p className="text-gray-500">Patient ID: {selectedPatient?.id}</p>
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
