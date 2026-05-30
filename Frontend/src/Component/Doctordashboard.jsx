import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Doctordashboard = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [labs, setLabs] = useState([]);

  const token = localStorage.getItem("token");

  const fetchtest = async () => {
    const res = await axios.get("http://127.0.0.1:1010/Test/get-tests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data.tests);
    setTests(res.data.tests);
  };

  const getLabs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:1010/AddLab/get-labs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.labs);
      setLabs(res.data.labs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLabs();
    fetchtest();
  }, []);

return (
  <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-100 p-6">

    {/* HEADER */}
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-10 border border-blue-100">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

        <div>
          <h1 className="text-5xl font-extrabold text-blue-700 tracking-wide">
            🩺 Doctor Dashboard
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Manage Labs & Medical Tests Easily
          </p>
        </div>

        <Link
          to="/AppointmentHistory"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 
          text-white font-bold shadow-lg hover:scale-105 transition duration-300"
        >
          👨‍⚕️ Appointment History
        </Link>

      </div>
    </div>

    {/* TEST SECTION */}
    <div className="mb-14">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
          🧪
        </div>

        <h2 className="text-3xl font-extrabold text-blue-700">
          Available Tests
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

        {tests.map((test) => (
          <div
            key={test._id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 
            shadow-md hover:shadow-2xl transition duration-300"
          >

            {/* CARD TOP */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-white">
              <h3 className="text-2xl font-bold">
                🧪 {test.testName}
              </h3>

              <p className="text-sm opacity-90 mt-1">
                Medical Test Information
              </p>
            </div>

            {/* BODY */}
            <div className="p-5 space-y-4">

              <div className="flex justify-between items-center bg-green-50 p-4 rounded-2xl border border-green-100">
                <span className="font-semibold text-gray-700">
                  💰 Charge
                </span>

                <span className="text-xl font-extrabold text-green-600">
                  ₹{test.charge}
                </span>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl">
                <h4 className="font-bold text-yellow-700 mb-2">
                  ⚠ Precautions
                </h4>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {test.precautions}
                </p>
              </div>

              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <span className="font-semibold text-gray-700">
                  🏥 Department
                </span>

                <span className="font-bold text-blue-700">
                  {test.departmentId?.departmentName}
                </span>
              </div>

              <div className="flex justify-between items-center">

                <span className="font-semibold text-gray-700">
                  Status
                </span>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-bold ${
                    test.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {test.status}
                </span>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>

    {/* LAB SECTION */}
    <div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-2xl">
          🏥
        </div>

        <h2 className="text-3xl font-extrabold text-cyan-700">
          Available Labs
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

        {labs.map((lab) => (
          <div
            key={lab._id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 
            shadow-md hover:shadow-2xl transition duration-300"
          >

            {/* TOP */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 text-white">

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                  🧪
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    {lab.labName}
                  </h3>

                  <p className="text-sm opacity-90">
                    Laboratory Details
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="p-5 space-y-4">

              <div className="bg-gray-50 p-4 rounded-2xl border">
                <p className="text-gray-700">
                  📧 {lab.email}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border">
                <p className="text-gray-700">
                  📞 {lab.phone}
                </p>
              </div>

              <div className="flex justify-between items-center">

                <span className="font-semibold text-gray-700">
                  Status
                </span>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-bold ${
                    lab.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {lab.status}
                </span>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>

  </div>
);

};

export default Doctordashboard;
