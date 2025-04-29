import React, { useState } from 'react';
import { FileText, Search, ArrowRight, Calendar, Pill } from 'lucide-react';

interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  prescription: string[];
  notes: string;
}

const PatientMedicalHistory = () => {
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  
  // Mock data
  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      date: '2025-05-10',
      doctorName: 'Dr. Sarah Johnson',
      diagnosis: 'Hypertension',
      prescription: ['Lisinopril 10mg', 'Hydrochlorothiazide 12.5mg'],
      notes: 'Patient presented with elevated blood pressure readings over past 3 months. Recommended lifestyle changes including reduced sodium intake and regular exercise.'
    },
    {
      id: '2',
      date: '2025-04-15',
      doctorName: 'Dr. Emily Martinez',
      diagnosis: 'Eczema',
      prescription: ['Hydrocortisone 1% cream', 'Cetaphil moisturizing lotion'],
      notes: 'Flare-up on forearms and neck. Avoid hot showers and wear loose cotton clothing. Follow up in 3 weeks if not improving.'
    },
    {
      id: '3',
      date: '2025-03-02',
      doctorName: 'Dr. Robert Chen',
      diagnosis: 'Sprained ankle',
      prescription: ['Ibuprofen 600mg', 'Acetaminophen 500mg'],
      notes: 'Grade 2 sprain of right ankle. R.I.C.E protocol explained. Provided with walking boot and crutches. Physical therapy referral made.'
    }
  ];
  
  const filteredRecords = medicalRecords.filter(record => 
    record.doctorName.toLowerCase().includes(search.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };
  
  const handleBack = () => {
    setSelectedRecord(null);
  };
  
  const renderRecordList = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Medical History</h2>
      </div>
      
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search records..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredRecords.length > 0 ? (
            filteredRecords.map(record => (
              <div 
                key={record.id} 
                className="p-4 hover:bg-gray-50 transition duration-150 cursor-pointer"
                onClick={() => handleViewRecord(record)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{record.diagnosis}</h3>
                    <p className="text-sm text-gray-500">{record.doctorName}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="mt-2 flex justify-end">
                  <button className="text-teal-500 text-sm font-medium flex items-center hover:text-teal-600">
                    View Details
                    <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <FileText size={48} className="mx-auto mb-2 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">No records found</h3>
              <p className="mt-1 text-gray-500">
                {search ? 'Try adjusting your search' : 'Your medical records will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
  
  const renderRecordDetail = () => (
    <>
      <div className="flex items-center mb-6">
        <button
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={handleBack}
        >
          <ArrowRight size={20} className="transform rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">Medical Record</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <h3 className="text-xl font-medium">{selectedRecord?.diagnosis}</h3>
          <span className="text-sm text-gray-500 flex items-center">
            <Calendar size={16} className="mr-1" />
            {new Date(selectedRecord?.date || '').toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Doctor</h4>
          <p className="text-gray-700">{selectedRecord?.doctorName}</p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Prescription</h4>
          <div className="bg-blue-50 rounded-md p-4">
            <ul className="space-y-2">
              {selectedRecord?.prescription.map((med, index) => (
                <li key={index} className="flex items-start">
                  <Pill size={18} className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{med}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Notes</h4>
          <p className="text-gray-700">{selectedRecord?.notes}</p>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button className="bg-teal-100 text-teal-700 px-4 py-2 rounded-md font-medium hover:bg-teal-200 transition duration-300">
            Download Record
          </button>
        </div>
      </div>
    </>
  );
  
  return (
    <div className="h-full">
      {selectedRecord ? renderRecordDetail() : renderRecordList()}
    </div>
  );
};

export default PatientMedicalHistory;