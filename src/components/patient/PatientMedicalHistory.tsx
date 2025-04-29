import React, { useState } from 'react';
import { FileText, Search, ArrowRight, Calendar, Pill } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  );

  // Mock data
  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      date: '2025-05-10',
      doctorName: 'Dr. Sarah Johnson',
      diagnosis: 'Hypertension',
      prescription: ['Lisinopril 10mg', 'Hydrochlorothiazide 12.5mg'],
      notes:
        'Patient presented with elevated blood pressure readings over past 3 months. Recommended lifestyle changes including reduced sodium intake and regular exercise.',
    },
    {
      id: '2',
      date: '2025-04-15',
      doctorName: 'Dr. Emily Martinez',
      diagnosis: 'Eczema',
      prescription: ['Hydrocortisone 1% cream', 'Cetaphil moisturizing lotion'],
      notes:
        'Flare-up on forearms and neck. Avoid hot showers and wear loose cotton clothing. Follow up in 3 weeks if not improving.',
    },
    {
      id: '3',
      date: '2025-03-02',
      doctorName: 'Dr. Robert Chen',
      diagnosis: 'Sprained ankle',
      prescription: ['Ibuprofen 600mg', 'Acetaminophen 500mg'],
      notes:
        'Grade 2 sprain of right ankle. R.I.C.E protocol explained. Provided with walking boot and crutches. Physical therapy referral made.',
    },
  ];

  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };

  const handleBack = () => {
    setSelectedRecord(null);
  };

  return (
    <div className="h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Medical History</h2>
        <p className="text-gray-500 mt-1">
          View your complete medical records and history
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search in medical records..."
          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {!selectedRecord ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <motion.div
              key={record.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/50 overflow-hidden relative"
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full mb-2 inline-block">
                      {record.diagnosis}
                    </span>
                    <h3 className="font-medium text-gray-900 mt-2">
                      {record.doctorName}
                    </h3>
                  </div>
                  <span className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    <Calendar size={14} className="mr-1.5" />
                    {new Date(record.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start space-x-2">
                    <Pill
                      size={16}
                      className="text-blue-500 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {record.prescription.join(', ')}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {record.notes}
                  </p>
                </div>

                <motion.button
                  className="mt-6 w-full px-4 py-2.5 bg-gradient-to-r from-white to-gray-50 text-blue-600 rounded-lg group-hover:shadow-lg border border-gray-200 group-hover:border-blue-100 transition-all duration-300 flex items-center justify-center font-medium"
                  onClick={() => handleViewRecord(record)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View Details</span>
                </motion.button>
              </div>
            </motion.div>
          ))}

          {filteredRecords.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-gray-200/50">
              <FileText size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No records found
              </h3>
              <p className="text-gray-500 mt-1">
                {search
                  ? 'Try adjusting your search'
                  : 'Your medical records will appear here'}
              </p>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          className="bg-white rounded-xl shadow-xl border border-gray-200/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500/5 to-transparent">
            <button
              className="mr-4 p-2 rounded-full hover:bg-white/80 transition-colors"
              onClick={handleBack}
            >
              <ArrowRight
                size={20}
                className="transform rotate-180 text-blue-600"
              />
            </button>
            <div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                {selectedRecord?.diagnosis}
              </span>
              <h2 className="text-xl font-bold mt-2">
                {selectedRecord?.doctorName}
              </h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <Calendar size={14} className="mr-1.5" />
                {new Date(selectedRecord?.date || '').toLocaleDateString(
                  'en-US',
                  {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }
                )}
              </p>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-xl p-6">
              <h4 className="text-lg font-medium mb-4 text-blue-900">
                Prescription
              </h4>
              <ul className="space-y-3">
                {selectedRecord?.prescription.map((med, index) => (
                  <li
                    key={index}
                    className="flex items-center bg-white p-3 rounded-lg shadow-sm"
                  >
                    <Pill size={18} className="text-blue-500 mr-3" />
                    <span className="text-gray-700 font-medium">{med}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Notes</h4>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
                {selectedRecord?.notes}
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <motion.button
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/25 flex items-center font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText size={18} className="mr-2" />
                Download Record
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PatientMedicalHistory;
