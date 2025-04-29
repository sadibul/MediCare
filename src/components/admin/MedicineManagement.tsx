import React, { useState } from 'react';
import { Search, Edit, Trash, Plus, XCircle, Check, Filter } from 'lucide-react';

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
    dosage: ''
  });
  
  // Mock data
  const medicines: Medicine[] = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 5.99,
      stock: 150,
      description: 'For relief of mild to moderate pain and fever.',
      dosage: 'Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.'
    },
    {
      id: '2',
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      price: 12.99,
      stock: 75,
      description: 'Antibiotic used to treat a number of bacterial infections.',
      dosage: 'Take as prescribed by your doctor. Typically 1 capsule 3 times daily.'
    },
    {
      id: '3',
      name: 'Loratadine 10mg',
      category: 'Allergy',
      price: 8.49,
      stock: 100,
      description: 'Antihistamine for relief of allergy symptoms.',
      dosage: 'Take 1 tablet daily. Do not exceed recommended dose.'
    },
    {
      id: '4',
      name: 'Omeprazole 20mg',
      category: 'Digestive Health',
      price: 14.99,
      stock: 50,
      description: 'Reduces stomach acid production to treat heartburn and acid reflux.',
      dosage: 'Take 1 capsule daily before breakfast.'
    }
  ];
  
  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(search.toLowerCase()) ||
    medicine.category.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleAddMedicine = () => {
    // Here you would add the new medicine to the database
    console.log('Adding new medicine:', newMedicine);
    setShowAddMedicine(false);
    setNewMedicine({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      description: '',
      dosage: ''
    });
  };
  
  const handleEditMedicine = (id: string) => {
    setEditingId(id);
  };
  
  const handleSaveEdit = (id: string) => {
    // Here you would save the edited medicine to the database
    console.log('Saving edited medicine:', id);
    setEditingId(null);
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  
  const handleDeleteMedicine = (id: string) => {
    // Here you would delete the medicine from the database
    console.log('Deleting medicine:', id);
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
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
            Medicine Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            defaultValue={medicine.name}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            defaultValue={medicine.category}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price">
            Price ($)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            defaultValue={medicine.price}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            defaultValue={medicine.stock}
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          rows={2}
          defaultValue={medicine.description}
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="dosage">
          Dosage Instructions
        </label>
        <textarea
          id="dosage"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          rows={2}
          defaultValue={medicine.dosage}
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
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="newName">
            Medicine Name
          </label>
          <input
            id="newName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={newMedicine.name}
            onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="newCategory">
            Category
          </label>
          <input
            id="newCategory"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={newMedicine.category}
            onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="newPrice">
            Price ($)
          </label>
          <input
            id="newPrice"
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={newMedicine.price}
            onChange={(e) => setNewMedicine({ ...newMedicine, price: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="newStock">
            Stock
          </label>
          <input
            id="newStock"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={newMedicine.stock}
            onChange={(e) => setNewMedicine({ ...newMedicine, stock: parseInt(e.target.value) })}
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="newDescription">
          Description
        </label>
        <textarea
          id="newDescription"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          rows={2}
          value={newMedicine.description}
          onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="newDosage">
          Dosage Instructions
        </label>
        <textarea
          id="newDosage"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          rows={2}
          value={newMedicine.dosage}
          onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
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
          Add Medicine
        </button>
      </div>
    </div>
  );
  
  const renderMedicineList = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Medicines Management</h2>
        <button
          className="flex items-center bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition duration-300"
          onClick={() => setShowAddMedicine(true)}
        >
          <Plus size={16} className="mr-2" />
          Add Medicine
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row mb-6 gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <button className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
          <Filter size={16} className="mr-2 text-gray-500" />
          Filter
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medicine
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{medicine.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${medicine.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusClass(medicine.stock)}`}>
                      {medicine.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-purple-600 hover:text-purple-900 mr-3"
                      onClick={() => handleEditMedicine(medicine.id)}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteMedicine(medicine.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredMedicines.length === 0 && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingBag size={24} className="text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No medicines found</h3>
            <p className="mt-1 text-gray-500">
              {search ? 'Try adjusting your search' : 'Add your first medicine to get started'}
            </p>
          </div>
        )}
      </div>
    </>
  );
  
  // If editing a medicine, show the edit form
  if (editingId) {
    const medicineToEdit = medicines.find(medicine => medicine.id === editingId);
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