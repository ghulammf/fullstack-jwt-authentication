"use client";

import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

// Definisikan tipe untuk handler kita
interface ToastHandler {
  showSuccess: (message?: string) => void;
  showError: (message?: string) => void;
  showInfo: (message?: string) => void;
  showWarn: (message?: string) => void;
}

const ToastContext = createContext<ToastHandler | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toastRef = useRef<Toast>(null);

  // Fungsi helper untuk Success
  const showSuccess = (message: string = "") => {
    toastRef.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000, // Durasi 3 detik
    });
  };

  // Fungsi helper untuk Error
  const showError = (message: string = "") => {
    toastRef.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 5000, // Error biasanya butuh waktu baca lebih lama
    });
  };

  // Fungsi helper untuk Info
  const showInfo = (message: string = "") => {
    toastRef.current?.show({
      severity: "info",
      summary: "Info",
      detail: message,
      life: 3000,
    });
  };

  // Fungsi helper untuk Warning
  const showWarn = (message: string = "") => {
    toastRef.current?.show({
      severity: "warn",
      summary: "Warning",
      detail: message,
      life: 4000,
    });
  };

  return (
    <ToastContext.Provider
      value={{ showSuccess, showError, showInfo, showWarn }}
    >
      <Toast ref={toastRef} position="top-right" />
      {children}
    </ToastContext.Provider>
  );
};

// Custom Hook agar mudah dipanggil
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
