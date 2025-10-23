import React, { createContext } from "react";
import { useState } from "react";
import type { ReactNode } from "react";

export enum Status {
    NORMAL,
    COMPLETED,
    URGENT,
    FAILED
}

interface Toast {
    id: number;
    message: string;
    lifetimeSeconds: number;
    status: Status 
}

interface ToastContext {
    toasts: Toast[];
    addToast: (message: string, status: Status, lifetimeSeconds: number) => void;
    removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContext | undefined>(undefined)

export const ToastProvider = (children: ReactNode) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = (message: string, status: Status = Status.NORMAL, lifetimeSeconds: number = 5) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, lifetimeSeconds, status }]);
    }
    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }
    return(
        <ToastContext.Provider
        value={{ toasts, addToast, removeToast }}
        >
            {children}
        </ToastContext.Provider>
    );
}

