import React, { useState, useEffect } from 'react';
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  XCircle,
  Check,
  Pill,
  Package,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'PAIN_RELIEF',
  'ANTIBIOTICS',
  'ALLERGY',
  'DIGESTIVE_HEALTH',
];

interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  dosage: string;
}

const MedicineManagement = () => {
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [newMedicine, setNewMedicine] = useState<Omit<Medicine, 'id'>>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    dosage: '',
  });
  const [medicines, setMedicines] = useState<Medicine[]>([]);
   const [editedMedicine, setEditedMedicine] = useState<Medicine>({
    id: '',
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    dosage: '',
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await fetch('/api/medicines');
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const handleAddMedicine = async () => {
    try {
      await fetch('/api/medicines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMedicine),
      });
      setShowAddMedicine(false);
      fetchMedicines();
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  const handleEditMedicine = (id: string) => {
    const medicineToEdit = medicines.find((m) => m.id === id);
    if (medicineToEdit) {
      setEditedMedicine(medicineToEdit);
      setEditingId(id);
    }
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await fetch(`/api/medicines/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedMedicine),
      });
      setEditingId(null);
      fetchMedicines();
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDeleteMedicine = async (id: string) => {
    try {
      await fetch(`/api/medicines/${id}`, {
        method: 'DELETE',
      });
      fetchMedicines();
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  const getStockStatusClass = (stock: number) => {
    if (stock > 100) {
      return 'bg-green-100 text-green-800';
    } else if (stock > 30) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  const renderEditForm = (medicine: Medicine) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Edit Medicine</h3>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handleCancelEdit}
        >
          <XCircle size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="name"
          >
            Medicine Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={editedMedicine.name}
            onChange={(e) =>
              setEditedMedicine({ ...editedMedicine, name: e.target.value })
            }
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={editedMedicine.category}
            onChange={(e) =>
              setEditedMedicine({ ...editedMedicine, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="price"
          >
            Price ($)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={editedMedicine.price}
            onChange={(e) =>
              setEditedMedicine({
                ...editedMedicine,
                price: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="stock"
          >
            Stock
          </label>
          <input
            id="stock"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={editedMedicine.stock}
            onChange={(e) =>
              setEditedMedicine({
                ...editedMedicine,
                stock: parseInt(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          rows={2}
          value={editedMedicine.description}
          onChange={(e) =>
            setEditedMedicine({
              ...editedMedicine,
              description: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="dosage"
        >
          Dosage Instructions
        </label>
        <textarea
          id="dosage"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          rows={2}
          value={editedMedicine.dosage}
          onChange={(e) =>
            setEditedMedicine({ ...editedMedicine, dosage: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          className="text-gray-500 hover:text-gray-700 font-medium"
          onClick={handleCancelEdit}
        >
          Cancel
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 flex items-center"
          onClick={() => handleSaveEdit(medicine.id)}
        >
          <Check size={16} className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderAddMedicineForm = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Add New Medicine</h3>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowAddMedicine(false)}
        >
          <XCircle size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="newName"
          >
            Medicine Name
          </label>
          <input
            id="newName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={newMedicine.name}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, name: e.target.value })
            }
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="newCategory"
          >
            Category
          </label>
          <select
            id="newCategory"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={newMedicine.category}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="newPrice"
          >
            Price ($)
          </label>
          <input
            id="newPrice"
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={newMedicine.price}
            onChange={(e) =>
              setNewMedicine({
                ...newMedicine,
                price: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="newStock"
          >
            Stock
          </label>
          <input
            id="newStock"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={newMedicine.stock}
            onChange={(e) =>
              setNewMedicine({
                ...newMedicine,
                stock: parseInt(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="newDescription"
        >
          Description
        </label>
        <textarea
          id="newDescription"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          rows={2}
          value={newMedicine.description}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, description: e.target.value })
          }
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="newDosage"
        >
          Dosage Instructions
        </label>
        <textarea
          id="newDosage"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          rows={2}
          value={newMedicine.dosage}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, dosage: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          className="text-gray-500 hover:text-gray-700 font-medium"
          onClick={() => setShowAddMedicine(false)}
        >
          Cancel
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 flex items-center"
          onClick={handleAddMedicine}
        >
          <Plus size={16} className="mr-2" />
          Confirm
        </button>
      </div>
    </div>
  );

  const renderMedicineList = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Medicine Inventory
          </h2>
          <p className="text-gray-500 mt-1">
            Manage and monitor medicine stock
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddMedicine(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/30"
        >
          <Plus size={20} className="mr-2" />
          Add Medicine
        </motion.button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search medicines by name or category..."
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
            <thead className="bg-gray-50/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Medicine
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
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
              {medicines
                .filter(
                  (medicine) =>
                    medicine.name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    medicine.category
                      .toLowerCase()
                      .includes(search.toLowerCase())
                )
                .map((medicine) => (
                  <motion.tr
                    key={medicine.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-blue-50/50 transition-all duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                          <Pill className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {medicine.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {medicine.description.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                        <Package size={14} className="mr-1.5" />
                        {medicine.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        ${medicine.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {medicine.stock < 30 && (
                          <AlertCircle
                            size={14}
                            className="text-red-500 mr-1.5"
                          />
                        )}
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStockStatusClass(
                            medicine.stock
                          )}`}
                        >
                          {medicine.stock} units
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => handleEditMedicine(medicine.id)}
                        >
                          <Edit2 size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => handleDeleteMedicine(medicine.id)}
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>

        {medicines.filter(
          (medicine) =>
            medicine.name.toLowerCase().includes(search.toLowerCase()) ||
            medicine.category.toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
              <Package size={24} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No medicines found
            </h3>
            <p className="text-gray-500">
              {search
                ? 'Try adjusting your search'
                : 'Add your first medicine to get started'}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  // If editing a medicine, show the edit form
  if (editingId) {
    const medicineToEdit = medicines.find(
      (medicine) => medicine.id === editingId
    );
    if (medicineToEdit) {
      return renderEditForm(medicineToEdit);
    }
  }

  return (
    <div className="h-full">
      {showAddMedicine && renderAddMedicineForm()}
      {renderMedicineList()}
    </div>
  );
};

export default MedicineManagement;
