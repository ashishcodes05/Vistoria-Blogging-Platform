import React from "react";

const AdminError = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center space-y-4">
      <i className="fa-solid fa-ban text-6xl text-red-500"></i>
      <p className="text-gray-600">
        You do not have permission to access this page.
      </p>
      <p className="text-gray-600">Please Login through your correct credentials first.</p>
    </div>
  );
};

export default AdminError;
