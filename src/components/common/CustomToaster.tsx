'use client'

import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useToasterStore } from 'react-hot-toast';

export default function CustomToaster() {
    const { toasts } = useToasterStore();
    const TOAST_LIMIT = 1; // Adjust this value as needed

    useEffect(() => {
        const visibleToasts = toasts.filter(t => t.visible);
        const excessToasts = visibleToasts.slice(TOAST_LIMIT);

        excessToasts.forEach(t => {
            toast.dismiss(t.id);
        });
    }, [toasts]);

    return (
        <Toaster
            position='top-right'
            reverseOrder={false}
            gutter={8}
            containerStyle={{}}
            toastOptions={{
                duration: 5000,
            }}
        />
    );
};
