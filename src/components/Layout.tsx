
import React from "react";
import { Toaster } from "@/components/ui/toaster";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2" />
      {children}
      <Toaster />
    </div>
  );
};
