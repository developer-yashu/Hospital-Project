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
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">

    {/* HEADER */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-extrabold text-blue-700">
        🩺 Doctor Dashboard
      </h1>

           <Link
                    to="/AppointmentHistory"
                    className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700"
                  >
                    👨‍⚕️AppointmentHistory
                  </Link>
      <p className="text-gray-500 mt-2">
        Manage Tests & Labs efficiently
      </p>
    </div>

    {/* TESTS SECTION */}
    <h2 className="text-2xl font-bold text-blue-600 mb-4">
      🧪 Available Tests
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

      {tests.map((test) => (
        <div
          key={test._id}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 
                     hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >

          <h3 className="text-xl font-bold text-blue-700 mb-2">
            🧪 {test.testName}
          </h3>

          <p className="text-gray-600 mb-1">
            💰 Charge:
            <span className="font-semibold text-green-600 ml-2">
              ₹{test.charge}
            </span>
          </p>

          <p className="text-gray-500 text-sm">
            📝 {test.precautions}
          </p>

        </div>
      ))}

    </div>

    {/* LABS SECTION */}
    <h2 className="text-2xl font-bold text-blue-600 mb-4">
      🏥 Available Labs
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {labs.map((lab) => (
        <div
          key={lab._id}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 
                     hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >

          <h3 className="text-xl font-bold text-blue-700 mb-2">
            🧪 {lab.labName}
          </h3>

          <p className="text-gray-600 mb-1">
            📧 {lab.email}
          </p>

          <p className="text-gray-600 mb-1">
            📞 {lab.phone}
          </p>

          <p className="text-sm">
            Status:
            <span className="ml-2 px-3 py-1 rounded-full text-white text-xs 
                             bg-green-500">
              {lab.status}
            </span>
          </p>

        </div>
      ))}

    </div>

  </div>
);

};

export default Doctordashboard;
