import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const showNotification = useCallback((message, severity = 'success') => {
        setNotification({
            open: true,
            message,
            severity,
        });
    }, []);

    const hideNotification = useCallback(() => {
        setNotification((prev) => ({ ...prev, open: false }));
    }, []);

    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={hideNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={hideNotification} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};
