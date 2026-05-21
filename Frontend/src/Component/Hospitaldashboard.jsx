import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalSubDepartments, setTotalSubDepartments] = useState(0);

  const [tests, setTests] = useState([]);

  const token = localStorage.getItem("token");

  const fetchDoctors = async () => {
    const res = await axios.get("http://127.0.0.1:1010/Doctor/get-all-Doctor", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setTotalDoctors(res.data.doctors.length);
  };

  const fetchDepartments = async () => {
    const res = await axios.get(
      "http://127.0.0.1:1010/Department/get-all-Department",
      { headers: { Authorization: `Bearer ${token}` } },
    );

    setTotalDepartments(res.data.Department.length);
  };

  const fetchSubDepartments = async () => {
    const res = await axios.get(
      "http://127.0.0.1:1010/SubDepartment/get-all-subdepartment",
      { headers: { Authorization: `Bearer ${token}` } },
    );

    setTotalSubDepartments(res.data.subdepartment.length);
  };

  const fetchtest = async () => {
    const res = await axios.get("http://127.0.0.1:1010/Test/get-tests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data.tests);
    setTests(res.data.tests);
  };

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
    fetchSubDepartments();
    fetchtest();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex gap-5 items-center mb-6">
        <button
          onClick={() => navigate("/Superadmin")}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-xl shadow-md transition duration-300"
        >
          <span className="text-lg">⬅</span>Back
        </button>

        {/* BUTTON */}
        <button
          onClick={() => setShowSidebar(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          Hospital Menu
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold">Total Doctors</h2>
          <p className="text-3xl text-blue-600 font-bold">{totalDoctors}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold">Departments</h2>
          <p className="text-3xl text-green-600 font-bold">
            {totalDepartments}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold">Sub Departments</h2>
          <p className="text-3xl text-purple-600 font-bold">
            {totalSubDepartments}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div
            key={test._id}
            className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              🧪 {test.testName}
            </h3>

            <p className="text-gray-600 mb-1">
              💰 Charge:{" "}
              <span className="font-semibold text-green-600">
                ₹{test.charge}
              </span>
            </p>

            <p className="text-gray-500 text-sm">📝 {test.precautions}</p>
          </div>
        ))}
      </div>

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
          <h2 className="text-2xl font-bold text-gray-800">Hospital Menu</h2>

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

          <button
            onClick={() => {
              navigate("/lab");
            }}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
          >
            Add Lab
          </button>

          <button
            onClick={() => {
              navigate("/test");
            }}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
          >
            Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
