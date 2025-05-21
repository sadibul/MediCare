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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
          Medicine Shop
        </h2>
        <motion.button
          className="relative p-3 rounded-full hover:bg-gray-100 bg-white shadow-sm border border-gray-100 transition-all duration-200"
          onClick={() => setShowCart(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart size={22} className="text-teal-600" />
          {cartItems.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium shadow-md"
            >
              {getTotalItems()}
            </motion.span>
          )}
        </motion.button>
      </div>

      <div className="mb-8 relative">
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white shadow-sm transition-all duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-8 flex overflow-x-auto py-2 -mx-2 px-2 scrollbar-hide">
        {[
          'All Categories',
          'Pain Relief',
          'Antibiotics',
          'Allergy',
          'Digestive Health',
        ].map((category) => (
          <motion.button
            key={category}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap mr-3 transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-teal-400 hover:shadow-sm'
            }`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <motion.div
              key={medicine.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
              whileHover={{
                y: -4,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                {/* Medicine Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-xl mb-1.5">
                      {medicine.name}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 shadow-sm">
                      <Package size={14} className="mr-1.5" />
                      {medicine.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-teal-600 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                      ${medicine.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Medicine Description */}
                <p className="text-gray-600 mb-5 line-clamp-2 min-h-[48px] text-base">
                  {medicine.description}
                </p>

                {/* Dosage Preview */}
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 mb-5 flex items-start border border-gray-100">
                  <Pill className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 ml-3 line-clamp-2">
                    {medicine.dosage}
                  </p>
                </div>

                {/* Add to Cart Section */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  {cartItems.find(
                    (item) => item.medicine.id === medicine.id
                  ) ? (
                    <div className="flex items-center gap-4">
                      <motion.button
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
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Minus size={16} className="text-gray-600" />
                      </motion.button>
                      <span className="font-bold text-gray-900 text-lg">
                        {cartItems.find(
                          (item) => item.medicine.id === medicine.id
                        )?.quantity || 0}
                      </span>
                      <motion.button
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
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Plus size={16} className="text-gray-600" />
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => handleQuickAddToCart(medicine)}
                      className="w-full bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-md"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full p-10 text-center bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No medicines found
            </h3>
            <p className="mt-1 text-gray-500 max-w-md mx-auto">
              {search
                ? 'Try adjusting your search terms or browse different categories'
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
