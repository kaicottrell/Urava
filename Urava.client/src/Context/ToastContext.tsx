import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState(null);

    const triggerToast = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
    };

    useEffect(() => {
        if (toastMessage) {
            if (toastType === 'success') {
                toast.success(toastMessage);
            } else if (toastType === 'error') {
                toast.error(toastMessage);
            }
            setToastMessage(null); // Clear the toast message after displaying it
        }
    }, [toastMessage, toastType]);

    return (
        <ToastContext.Provider value={{ triggerToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
