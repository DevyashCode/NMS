import React from "react";

export default function LoadingAnimation() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-110 max-w-full text-center flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mb-4"></div>
      <p className="text-lg text-gray-900 dark:text-gray-200">
        Updating...
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
  )
}
