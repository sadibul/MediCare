import React, { useState } from 'react';
import {
  ArrowLeft,
  Pill,
  Plus,
  Minus,
  ShoppingCart,
  AlertCircle,
} from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  dosage: string;
  inStock: boolean;
}

interface MedicineDetailProps {
  medicine: Medicine;
  onClose: () => void;
  onAddToCart: (medicine: Medicine, quantity: number) => void;
}

const MedicineDetail: React.FC<MedicineDetailProps> = ({
  medicine,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(medicine, quantity);
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
        <h2 className="text-2xl font-bold">Medicine Details</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-medium">{medicine.name}</h3>
            <p className="text-sm text-gray-500">{medicine.category}</p>
          </div>
          <span className="text-teal-600 text-xl font-bold">
            ${medicine.price.toFixed(2)}
          </span>
        </div>

        

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Description</h4>
          <p className="text-gray-700">{medicine.description}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Dosage Instructions</h4>
          <div className="bg-blue-50 rounded-md p-4 flex items-start">
            <Pill
              size={18}
              className="mr-2 text-blue-500 flex-shrink-0 mt-0.5"
            />
            <p className="text-gray-700">{medicine.dosage}</p>
          </div>
        </div>

        {medicine.inStock && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <button
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus
                    size={16}
                    className={
                      quantity <= 1 ? 'text-gray-300' : 'text-gray-600'
                    }
                  />
                </button>
                <span className="mx-4 font-medium">{quantity}</span>
                <button
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  onClick={handleIncreaseQuantity}
                >
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold text-teal-600">
                  ${(medicine.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <button
              className="w-full bg-teal-500 text-white py-3 px-4 rounded-md font-medium hover:bg-teal-600 transition duration-300 flex items-center justify-center"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineDetail;
