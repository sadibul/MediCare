import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'warning' | 'danger' | 'info';
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'warning',
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          buttonBg: 'bg-red-600 hover:bg-red-700',
        };
      case 'info':
        return {
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          buttonBg: 'bg-blue-500 hover:bg-blue-600',
        };
      case 'warning':
      default:
        return {
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600',
          buttonBg: 'bg-amber-500 hover:bg-amber-600',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900 bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden p-6"
      >
        <div className="flex items-start mb-4">
          <div className={`p-3 rounded-full mr-4 ${styles.iconBg}`}>
            <AlertTriangle className={`h-6 w-6 ${styles.iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1">{message}</p>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${styles.buttonBg}`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationDialog;
