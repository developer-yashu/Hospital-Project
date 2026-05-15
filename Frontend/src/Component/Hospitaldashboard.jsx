import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* BUTTON */}
      <button
        onClick={() => setShowSidebar(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg"
      >
        Hospital Menu
      </button>

      {/* BACKDROP */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* LEFT SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Hospital Menu
          </h2>

          <button
            onClick={() => setShowSidebar(false)}
            className="text-red-500 text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {/* MENU */}
        <div className="p-5 flex flex-col gap-4">

          <button
            onClick={() => {
              navigate("/department");
            }}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
          >
            Department
          </button>

          <button
            onClick={() => {
              navigate("/doctor");
            }}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
          >
            Doctor
          </button>

          <button
            onClick={() => {
              navigate("/SubDepartment");
            }}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
          >
            Subdepartment
          </button>

        </div>

      </div>
    </div>
  );
};

export default HospitalDashboard;