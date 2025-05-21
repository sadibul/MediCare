import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Check,
  Info,
  AlertTriangle,
  XCircle,
  X,
  Clock,
} from 'lucide-react';
import {
  useNotifications,
  Notification,
  NotificationType,
} from '../../context/NotificationContext';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterType = 'new' | 'read' | 'all';

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    unreadCount,
  } = useNotifications();
  const [activeFilter, setActiveFilter] = useState<FilterType>('new');

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === 'new') return !notification.read;
    if (activeFilter === 'read') return notification.read;
    return true; // 'all'
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) {
      return 'just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(diffInMinutes / (24 * 60));
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  const getIconByType = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <Check size={16} className="text-green-500" />;
      case 'error':
        return <XCircle size={16} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500" />;
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };

  const getBackgroundByType = (type: NotificationType, read: boolean) => {
    if (read) return 'bg-gray-50';

    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-amber-50';
      default:
        return 'bg-blue-50';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose}>
      <motion.div
        className="absolute right-4 top-16 w-80 bg-white shadow-2xl rounded-xl overflow-hidden z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Bell size={16} className="mr-2" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                {unreadCount} new
              </span>
            )}
          </h3>
          <div className="flex space-x-1">
            {notifications.length > 0 && (
              <>
                <button
                  className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    markAllAsRead();
                  }}
                >
                  Mark all as read
                </button>
                <button
                  className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearNotifications();
                  }}
                >
                  Clear all
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filter tabs - Fixed alignment */}
        <div className="flex border-b border-gray-200">
          {(
            [
              { id: 'new', label: 'New' },
              { id: 'read', label: 'Mark as read' },
              { id: 'all', label: 'All' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              className={`flex-1 text-center py-2 px-1 text-sm font-medium ${
                activeFilter === filter.id
                  ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFilter(filter.id as FilterType);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 border-b ${getBackgroundByType(
                    notification.type,
                    notification.read
                  )}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(notification.id);
                  }}
                >
                  <div className="flex items-start">
                    <div className="p-1 mr-3">
                      {getIconByType(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          notification.read
                            ? 'text-gray-600'
                            : 'text-gray-900 font-medium'
                        }`}
                      >
                        {notification.message}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {formatTime(notification.timestamp)}
                      </div>
                    </div>
                    {!notification.read && (
                      <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 px-4 text-center text-gray-500">
                <Bell size={24} className="mx-auto mb-3 opacity-30" />
                <p>
                  {activeFilter === 'new'
                    ? 'No new notifications'
                    : activeFilter === 'read'
                    ? 'No read notifications'
                    : 'No notifications yet'}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationPanel;
