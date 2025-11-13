// src/components/Toast.tsx - Elegante Error/Success Notifications

import { useEffect, useState } from "react";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
    duration = 3000
  ) => {
    const id = Date.now().toString();
    const toast: ToastMessage = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

function Toast({ toast, onRemove }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    fontSize: "14px",
    fontWeight: "500",
    zIndex: 9999,
    animation: "slideIn 0.3s ease-in-out",
  };

  const typeStyles: Record<string, React.CSSProperties> = {
    success: {
      backgroundColor: "#10b981",
      color: "white",
    },
    error: {
      backgroundColor: "#ef4444",
      color: "white",
    },
    info: {
      backgroundColor: "#3b82f6",
      color: "white",
    },
  };

  return (
    <div
      style={{
        ...baseStyle,
        ...typeStyles[toast.type],
      }}
      role="alert"
    >
      {toast.message}
      <button
        onClick={() => onRemove(toast.id)}
        style={{
          background: "none",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          marginLeft: "10px",
          fontSize: "16px",
        }}
      >
        ×
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </>
  );
}
