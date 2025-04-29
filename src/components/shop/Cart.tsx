import React from 'react';
import { ArrowLeft, Trash, Plus, Minus, CreditCard } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  dosage: string;
  inStock: boolean;
}

interface CartProps {
  items: { medicine: Medicine; quantity: number }[];
  onClose: () => void;
  onUpdateQuantity: (medicineId: string, quantity: number) => void;
  onRemoveItem: (medicineId: string) => void;
  totalPrice: number;
}

const Cart: React.FC<CartProps> = ({ 
  items, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem,
  totalPrice
}) => {
  const handleCheckout = () => {
    // Checkout logic would go here
    console.log('Proceeding to checkout with items:', items);
  };
  
  return (
    <div className="h-full">
      <div className="flex items-center mb-6">
        <button
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">Your Cart</h2>
      </div>
      
      {items.length > 0 ? (
        <>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="divide-y divide-gray-200">
              {items.map(item => (
                <div key={item.medicine.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{item.medicine.name}</h3>
                      <p className="text-sm text-gray-500">{item.medicine.category}</p>
                    </div>
                    <span className="text-teal-600 font-medium">${item.medicine.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <button 
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        onClick={() => onUpdateQuantity(item.medicine.id, item.quantity - 1)}
                      >
                        <Minus size={14} className="text-gray-600" />
                      </button>
                      <span className="mx-3 font-medium">{item.quantity}</span>
                      <button 
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        onClick={() => onUpdateQuantity(item.medicine.id, item.quantity + 1)}
                      >
                        <Plus size={14} className="text-gray-600" />
                      </button>
                    </div>
                    <button 
                      className="text-red-500 hover:text-red-600 p-1"
                      onClick={() => onRemoveItem(item.medicine.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">$5.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${(totalPrice * 0.07).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 my-3 pt-3 flex justify-between">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg text-teal-600">
                ${(totalPrice + 5 + (totalPrice * 0.07)).toFixed(2)}
              </span>
            </div>
          </div>
          
          <button
            className="w-full bg-teal-500 text-white py-3 px-4 rounded-md font-medium hover:bg-teal-600 transition duration-300 flex items-center justify-center"
            onClick={handleCheckout}
          >
            <CreditCard size={18} className="mr-2" />
            Proceed to Checkout
          </button>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Browse our medicine shop to add items to your cart</p>
          <button
            className="inline-flex items-center bg-teal-500 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-600 transition duration-300"
            onClick={onClose}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;