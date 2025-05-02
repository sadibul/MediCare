import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Filter,
  ChevronRight,
  Package,
  Pill,
  Plus,
  Minus,
} from 'lucide-react';
import { motion } from 'framer-motion';
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
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [cartItems, setCartItems] = useState<
    { medicine: Medicine; quantity: number }[]
  >([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>('All Categories');

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

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(search.toLowerCase()) ||
      medicine.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' ||
      medicine.category === selectedCategory.replace(' ', '_').toUpperCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (medicine: Medicine, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.medicine.id === medicine.id
    );

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
    setCartItems(cartItems.filter((item) => item.medicine.id !== medicineId));
  };

  const handleUpdateQuantity = (medicineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(medicineId);
      return;
    }

    const updatedCartItems = cartItems.map((item) => {
      if (item.medicine.id === medicineId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const handleQuickAddToCart = (medicine: Medicine) => {
    const existingItem = cartItems.find(
      (item) => item.medicine.id === medicine.id
    );
    if (existingItem) {
      handleUpdateQuantity(medicine.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { medicine, quantity: 1 }]);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.medicine.price * item.quantity,
      0
    );
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
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="mb-4 flex overflow-x-auto py-2 -mx-2 px-2">
        {[
          'All Categories',
          'Pain Relief',
          'Antibiotics',
          'Allergy',
          'Digestive Health',
        ].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 transition-all ${
              selectedCategory === category
                ? 'bg-teal-500 text-white'
                : 'bg-white border border-gray-300 hover:border-teal-500'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-200/50 overflow-hidden transition-all duration-200"
            >
              <div className="p-6">
                {/* Medicine Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {medicine.name}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                      <Package size={14} className="mr-1.5" />
                      {medicine.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-teal-600">
                      ${medicine.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Medicine Description */}
                <p className="text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                  {medicine.description}
                </p>

                {/* Dosage Preview */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4 flex items-start">
                  <Pill className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 ml-2 line-clamp-2">
                    {medicine.dosage}
                  </p>
                </div>

                {/* Add to Cart Section */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  {cartItems.find(
                    (item) => item.medicine.id === medicine.id
                  ) ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const currentItem = cartItems.find(
                            (item) => item.medicine.id === medicine.id
                          );
                          if (currentItem) {
                            handleUpdateQuantity(
                              medicine.id,
                              currentItem.quantity - 1
                            );
                          }
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Minus size={16} className="text-gray-600" />
                      </button>
                      <span className="font-medium text-gray-900">
                        {cartItems.find(
                          (item) => item.medicine.id === medicine.id
                        )?.quantity || 0}
                      </span>
                      <button
                        onClick={() => {
                          const currentItem = cartItems.find(
                            (item) => item.medicine.id === medicine.id
                          );
                          if (currentItem) {
                            handleUpdateQuantity(
                              medicine.id,
                              currentItem.quantity + 1
                            );
                          }
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Plus size={16} className="text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => handleQuickAddToCart(medicine)}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center bg-white rounded-lg shadow-sm">
            <ShoppingCart size={48} className="mx-auto mb-2 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">
              No medicines found
            </h3>
            <p className="mt-1 text-gray-500">
              {search
                ? 'Try adjusting your search'
                : 'Browse our categories to find what you need'}
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

  return <div className="h-full">{renderMedicineList()}</div>;
};

export default MedicineShop;
