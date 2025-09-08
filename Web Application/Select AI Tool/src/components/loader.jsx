// Loading.jsx
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 gap-6">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-20 w-20"></div>
      <p className="text-gray-700 text-lg font-medium animate-pulse">
        Loading, please wait...
      </p>
      <style>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
