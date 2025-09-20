
import React, { useState, useCallback, useContext, ReactNode, createContext } from 'react';
import type { ToastMessage } from '../types';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XIcon } from './icons/Icons';

interface ToastContextType {
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const Toast: React.FC<{ message: ToastMessage; onDismiss: (id: number) => void }> = ({ message, onDismiss }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(message.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, onDismiss]);

  const icons = {
    success: <CheckCircleIcon className="w-6 h-6 text-green-400" />,
    error: <XCircleIcon className="w-6 h-6 text-red-400" />,
    info: <InformationCircleIcon className="w-6 h-6 text-blue-400" />,
  };
  
  const baseClasses = "flex items-center w-full max-w-xs p-4 text-gray-300 bg-gray-800 rounded-lg shadow-lg border border-gray-700";

  return (
    <div className={`${baseClasses} animate-toast-in`}>
      {icons[message.type]}
      <div className="ml-3 text-sm font-normal">{message.message}</div>
      <button 
        type="button" 
        className="ml-auto -mx-1.5 -my-1.5 bg-gray-800 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8" 
        aria-label="Close"
        onClick={() => onDismiss(message.id)}
      >
        <span className="sr-only">Close</span>
        <XIcon className="w-5 h-5" />
      </button>
       <style>{`
        @keyframes toast-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-toast-in {
          animation: toast-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};


const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
