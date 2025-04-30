import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'blocked';
}

const DoctorSchedule = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [slots, setSlots] = useState<TimeSlot[]>([
    {
      id: '1',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      status: 'available',
    },
    {
      id: '2',
      day: 'Monday',
      startTime: '11:00',
      endTime: '12:30',
      status: 'booked',
    },
    {
      id: '3',
      day: 'Monday',
      startTime: '14:00',
      endTime: '15:30',
      status: 'available',
    },
    {
      id: '4',
      day: 'Tuesday',
      startTime: '09:00',
      endTime: '10:30',
      status: 'available',
    },
    {
      id: '5',
      day: 'Tuesday',
      startTime: '11:00',
      endTime: '12:30',
      status: 'blocked',
    },
    {
      id: '6',
      day: 'Wednesday',
      startTime: '09:00',
      endTime: '10:30',
      status: 'available',
    },
  ]);
  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({
    startTime: '09:00',
    endTime: '10:00',
  });

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleAddSlot = () => {
    const newTimeSlot: TimeSlot = {
      id: `${Date.now()}`,
      day: selectedDay,
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      status: 'available',
    };

    setSlots([...slots, newTimeSlot]);
    setShowAddSlot(false);
    setNewSlot({
      startTime: '09:00',
      endTime: '10:00',
    });
  };

  const handleSaveEdit = (id: string) => {
    setSlots(
      slots.map((slot) => {
        if (slot.id === id) {
          return {
            ...slot,
            startTime: (
              document.getElementById(`start-${id}`) as HTMLInputElement
            ).value,
            endTime: (document.getElementById(`end-${id}`) as HTMLInputElement)
              .value,
          };
        }
        return slot;
      })
    );
    setEditingSlot(null);
  };

  const handleDeleteSlot = (id: string) => {
    setSlots(slots.filter((slot) => slot.id !== id));
  };

  const filteredSlots = slots.filter((slot) => slot.day === selectedDay);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${suffix}`;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'booked':
        return 'bg-blue-100 text-blue-800';
      case 'blocked':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Schedule</h2>
          <p className="text-gray-500 mt-1">Set your weekly availability</p>
        </div>
        <button
          onClick={() => setShowAddSlot(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Time Slot
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-4">
        <div className="flex space-x-3 overflow-x-auto py-2">
          {days.map((day) => (
            <button
              key={day}
              className={`px-6 py-3 rounded-xl border transition-all duration-200 whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                  : 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50'
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showAddSlot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Time Slot
              </h3>
              <button
                onClick={() => setShowAddSlot(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  value={newSlot.startTime}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, startTime: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  value={newSlot.endTime}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, endTime: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddSlot(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSlot}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-medium transition duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
              >
                Add Slot
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {filteredSlots.length > 0 ? (
          filteredSlots.map((slot) => (
            <motion.div
              key={slot.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200/50 p-6 transition-all duration-200"
            >
              {editingSlot === slot.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <input
                        id={`start-${slot.id}`}
                        type="time"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                        defaultValue={slot.startTime}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <input
                        id={`end-${slot.id}`}
                        type="time"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                        defaultValue={slot.endTime}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setEditingSlot(null)}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(slot.id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-xl font-medium transition duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-0.5 flex items-center"
                    >
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock size={18} className="mr-2 text-blue-500" />
                      <span className="font-medium text-gray-900">
                        {formatTime(slot.startTime)} -{' '}
                        {formatTime(slot.endTime)}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        slot.status
                      )}`}
                    >
                      {slot.status.charAt(0).toUpperCase() +
                        slot.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {slot.status !== 'booked' && (
                      <>
                        <button
                          onClick={() => setEditingSlot(slot.id)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200/50"
          >
            <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No time slots for {selectedDay}
            </h3>
            <p className="text-gray-500 mb-6">
              Click the "Add Time Slot" button to create availability
            </p>
            <button
              onClick={() => setShowAddSlot(true)}
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
            >
              <Plus size={20} className="mr-2" />
              Add Time Slot
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedule;
