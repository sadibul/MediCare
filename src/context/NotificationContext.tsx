'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type?: NotificationType) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;
  showNotification: (props: NotificationProps) => void;
}

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// Create the provider
export const NotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Add new notification
  const addNotification = useCallback(
    (message: string, type: NotificationType = 'info') => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        message,
        type,
        read: false,
        timestamp: new Date(),
      };

      setNotifications((prev) => [newNotification, ...prev]);
    },
    []
  );

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const showNotification = ({
    type,
    title,
    message,
    duration = 5000,
  }: NotificationProps) => {
    switch (type) {
      case 'success':
        toast.success(
          <div>
            <h4 className="font-bold">{title}</h4>
            <p>{message}</p>
          </div>,
          { autoClose: duration }
        );
        break;
      case 'error':
        toast.error(
          <div>
            <h4 className="font-bold">{title}</h4>
            <p>{message}</p>
          </div>,
          { autoClose: duration }
        );
        break;
      case 'info':
        toast.info(
          <div>
            <h4 className="font-bold">{title}</h4>
            <p>{message}</p>
          </div>,
          { autoClose: duration }
        );
        break;
      case 'warning':
        toast.warning(
          <div>
            <h4 className="font-bold">{title}</h4>
            <p>{message}</p>
          </div>,
          { autoClose: duration }
        );
        break;
      default:
        toast(
          <div>
            <h4 className="font-bold">{title}</h4>
            <p>{message}</p>
          </div>,
          { autoClose: duration }
        );
    }
  };

  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    unreadCount,
    showNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </NotificationContext.Provider>
  );
};

// Create the hook
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }

  return context;
};
