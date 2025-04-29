import React, { useState } from 'react';
import { Search, ShoppingCart, Filter, ChevronRight } from 'lucide-react';
import MedicineDetail from './MedicineDetail';
import Cart from './Cart';

interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  dosage: string;
  inStock: boolean;
}

const MedicineShop = () => {
  const [search, setSearch] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [cartItems, setCartItems] = useState<{medicine: Medicine; quantity: number}[]>([]);
  
  // Mock data
  const medicines: Medicine[] = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 5.99,
      description: 'For relief of mild to moderate pain and fever.',
      dosage: 'Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.',
      inStock: true
    },
    {
      id: '2',
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      price: 12.99,
      description: 'Antibiotic used to treat a number of bacterial infections.',
      dosage: 'Take as prescribed by your doctor. Typically 1 capsule 3 times daily.',
      inStock: true
    },
    {
      id: '3',
      name: 'Loratadine 10mg',
      category: 'Allergy',
      price: 8.49,
      description: 'Antihistamine for relief of allergy symptoms.',
      dosage: 'Take 1 tablet daily. Do not exceed recommended dose.',
      inStock: true
    },
    {
      id: '4',
      name: 'Omeprazole 20mg',
      category: 'Digestive Health',
      price: 14.99,
      description: 'Reduces stomach acid production to treat heartburn and acid reflux.',
      dosage: 'Take 1 capsule daily before breakfast.',
      inStock: false
    }
  ];
  
  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(search.toLowerCase()) ||
    medicine.category.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleAddToCart = (medicine: Medicine, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(item => item.medicine.id === medicine.id);
    
    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { medicine, quantity }]);
    }
    
    setSelectedMedicine(null);
  };
  
  const handleRemoveFromCart = (medicineId: string) => {
    setCartItems(cartItems.filter(item => item.medicine.id !== medicineId));
  };
  
  const handleUpdateQuantity = (medicineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(medicineId);
      return;
    }
    
    const updatedCartItems = cartItems.map(item => {
      if (item.medicine.id === medicineId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedCartItems);
  };
  
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.medicine.price * item.quantity), 0);
  };
  
  const renderMedicineList = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Medicine Shop</h2>
        <button
          className="relative p-2 rounded-full hover:bg-gray-100"
          onClick={() => setShowCart(true)}
        >
          <ShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>
      
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search medicines..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      <div className="mb-4 flex overflow-x-auto py-2 -mx-2 px-2">
        <button className="px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-medium whitespace-nowrap mr-2">
          All Categories
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium whitespace-nowrap mr-2 hover:border-teal-500">
          Pain Relief
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium whitespace-nowrap mr-2 hover:border-teal-500">
          Antibiotics
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium whitespace-nowrap mr-2 hover:border-teal-500">
          Allergy
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium whitespace-nowrap hover:border-teal-500">
          Digestive Health
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map(medicine => (
            <div 
              key={medicine.id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{medicine.name}</h3>
                    <p className="text-sm text-gray-500">{medicine.category}</p>
                  </div>
                  <span className="text-teal-600 font-medium">${medicine.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{medicine.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${medicine.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <button 
                    className="text-teal-500 text-sm font-medium flex items-center hover:text-teal-600"
                    onClick={() => setSelectedMedicine(medicine)}
                  >
                    View Details
                    <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center bg-white rounded-lg shadow-sm">
            <ShoppingCart size={48} className="mx-auto mb-2 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">No medicines found</h3>
            <p className="mt-1 text-gray-500">
              {search ? 'Try adjusting your search' : 'Browse our categories to find what you need'}
            </p>
          </div>
        )}
      </div>
    </>
  );
  
  if (selectedMedicine) {
    return (
      <MedicineDetail 
        medicine={selectedMedicine} 
        onClose={() => setSelectedMedicine(null)} 
        onAddToCart={handleAddToCart}
      />
    );
  }
  
  if (showCart) {
    return (
      <Cart 
        items={cartItems} 
        onClose={() => setShowCart(false)} 
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        totalPrice={getTotalPrice()}
      />
    );
  }
  
  return (
    <div className="h-full">
      {renderMedicineList()}
    </div>
  );
};

export default MedicineShop;