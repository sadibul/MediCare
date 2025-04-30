import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit2, Trash2, Save } from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'blocked';
}

const DoctorSchedule = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
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

  // Mock data
  const timeSlots: TimeSlot[] = [
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
  ];

  const filteredSlots = timeSlots.filter((slot) => slot.day === selectedDay);

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

  const handleAddSlot = () => {
    // Here you would add the new slot to the database
    console.log('Adding new slot:', { day: selectedDay, ...newSlot });
    setShowAddSlot(false);
    setNewSlot({
      startTime: '09:00',
      endTime: '10:00',
    });
  };

  const handleSaveEdit = (id: string) => {
    // Here you would save the edited slot to the database
    console.log('Saving edited slot:', id);
    setEditingSlot(null);
  };

  const handleDeleteSlot = (id: string) => {
    // Here you would delete the slot from the database
    console.log('Deleting slot:', id);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Schedule</h2>
      </div>

      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-3 py-2">
          {days.map((day) => (
            <button
              key={day}
              className={`px-4 py-2 rounded-md border ${
                selectedDay === day
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white border-gray-300 hover:border-blue-500'
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {showAddSlot && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-medium text-lg mb-4">Add New Time Slot</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="startTime"
              >
                Start Time
              </label>
              <input
                id="startTime"
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={newSlot.startTime}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, startTime: e.target.value })
                }
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="endTime"
              >
                End Time
              </label>
              <input
                id="endTime"
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={newSlot.endTime}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, endTime: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              className="text-gray-500 hover:text-gray-700 font-medium"
              onClick={() => setShowAddSlot(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition duration-300"
              onClick={handleAddSlot}
            >
              Add Slot
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <div
                key={slot.id}
                className="p-4 hover:bg-gray-50 transition duration-150"
              >
                {editingSlot === slot.id ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 sm:mb-0">
                      <input
                        type="time"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        defaultValue={slot.startTime}
                      />
                      <input
                        type="time"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        defaultValue={slot.endTime}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-green-500 hover:text-green-600 p-1"
                        onClick={() => handleSaveEdit(slot.id)}
                      >
                        <Save size={18} />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-600 p-1"
                        onClick={() => setEditingSlot(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Clock size={18} className="mr-2 text-blue-500" />
                        <span className="font-medium">
                          {formatTime(slot.startTime)} -{' '}
                          {formatTime(slot.endTime)}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          slot.status
                        )}`}
                      >
                        {slot.status.charAt(0).toUpperCase() +
                          slot.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex mt-3 sm:mt-0">
                      {slot.status !== 'booked' && (
                        <>
                          <button
                            className="text-blue-500 hover:text-blue-600 p-1 mr-2"
                            onClick={() => setEditingSlot(slot.id)}
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-600 p-1"
                            onClick={() => handleDeleteSlot(slot.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                      {slot.status === 'booked' && (
                        <span className="text-sm text-gray-500">
                          Patient booked
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Calendar size={48} className="mx-auto mb-2 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">
                No time slots for {selectedDay}
              </h3>
              <p className="mt-1 text-gray-500">
                Click the "Add Time Slot" button to create availability
              </p>
              <button
                className="mt-4 inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition duration-300"
                onClick={() => setShowAddSlot(true)}
              >
                <Plus size={16} className="mr-2" />
                Add Time Slot
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
