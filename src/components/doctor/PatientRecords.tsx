import React, { useState } from 'react';
import { Search, Filter, FileText, Calendar, User, Pill, ArrowLeft } from 'lucide-react';

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
          notes: 'Patient reports improved symptoms. Blood pressure still elevated but showing improvement from last visit.',
          vitals: {
            bloodPressure: '140/90',
            heartRate: '75',
            temperature: '98.6'
          }
        },
        {
          date: '2024-02-01',
          diagnosis: 'Upper Respiratory Infection',
          prescription: ['Amoxicillin 500mg', 'Cough Syrup'],
          notes: 'Patient presented with fever, cough, and congestion. Prescribed antibiotics and symptomatic treatment.',
          vitals: {
            bloodPressure: '135/85',
            heartRate: '82',
            temperature: '100.2'
          }
        }
      ]
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
          notes: 'Regular follow-up. Blood sugar levels well controlled with current medication regimen.',
          vitals: {
            bloodPressure: '120/80',
            heartRate: '70',
            temperature: '98.4'
          }
        }
      ]
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
          notes: 'Acute asthma exacerbation. Patient responded well to nebulizer treatment in office.',
          vitals: {
            bloodPressure: '118/78',
            heartRate: '88',
            temperature: '98.8'
          }
        }
      ]
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(search.toLowerCase()) ||
    patient.condition.toLowerCase().includes(search.toLowerCase())
  );

  const renderPatientList = () => (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">ID: {patient.id}</div>
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderPatientDetails = () => (
    <>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setSelectedPatient(null)}
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">Patient Record</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-gray-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{selectedPatient?.name}</h3>
            <p className="text-gray-500">Patient ID: {selectedPatient?.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Age</p>
            <p className="text-lg font-medium">{selectedPatient?.age} years</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Last Visit</p>
            <p className="text-lg font-medium">
              {new Date(selectedPatient?.lastVisit || '').toLocaleDateString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Current Condition</p>
            <p className="text-lg font-medium">{selectedPatient?.condition}</p>
          </div>
        </div>

        <h4 className="text-lg font-medium mb-4">Medical History</h4>
        <div className="space-y-6">
          {selectedPatient?.medicalHistory.map((record, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-medium text-lg">{record.diagnosis}</h5>
                  <p className="text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Vitals</p>
                  <p className="text-sm">BP: {record.vitals.bloodPressure}</p>
                  <p className="text-sm">HR: {record.vitals.heartRate} bpm</p>
                  <p className="text-sm">Temp: {record.vitals.temperature}°F</p>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="font-medium mb-2">Prescription</h6>
                <div className="space-y-2">
                  {record.prescription.map((med, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <Pill className="h-4 w-4 mr-2 text-blue-500" />
                      {med}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h6 className="font-medium mb-2">Notes</h6>
                <p className="text-gray-700">{record.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="h-full">
      {selectedPatient ? renderPatientDetails() : renderPatientList()}
    </div>
  );
};

export default PatientRecords;