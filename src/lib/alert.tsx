"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Notification = {
  message: string;
  type: "success" | "error" | "info";
};

type NotificationContextType = {
  notify: (message: string, type: Notification["type"]) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within NotificationProvider");
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const notify = (message: string, type: Notification["type"]) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-[9999]
              ${notification.type === "success" ? "bg-green-500 text-white" :
                notification.type === "error" ? "bg-red-500 text-white" :
                "bg-blue-500 text-white"}
            `}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};
