import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TestTube,
  IndianRupee,
  Building2,
  ShieldAlert,
} from "lucide-react";

const TestDashboard = () => {

  const token = localStorage.getItem("token");

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // GET TESTS
  // =========================

  const getTests = async () => {
    try {

      setLoading(true);

      const res = await axios.get(
        "http://127.0.0.1:1010/Test/get-tests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data.tests);

      setTests(res.data.tests);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }
  };

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TITLE */}

      <div className="flex items-center gap-3 mb-8">

        <TestTube className="text-blue-600" size={34} />

        <h1 className="text-3xl font-bold text-gray-800">
          All Medical Tests
        </h1>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="flex justify-center items-center h-[70vh]">

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            alt="loading"
            className="w-24"
          />

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tests.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition duration-300"
            >

              {/* TOP */}

              <div className="bg-gradient-to-r from-blue-700 to-cyan-500 p-5 text-white">

                <h2 className="text-2xl font-bold capitalize">
                  {item.testName}
                </h2>

                <p className="text-sm mt-1 opacity-90">
                  Medical Test Details
                </p>

              </div>

              {/* BODY */}

              <div className="p-5 space-y-4">

                {/* CHARGE */}

                <div className="flex items-center justify-between bg-green-50 border border-green-100 p-3 rounded-2xl">

                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <IndianRupee size={18} />
                    Charge
                  </div>

                  <span className="text-green-700 font-bold text-lg">
                    ₹{item.charge}
                  </span>

                </div>

                {/* DEPARTMENT */}

                <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-3 rounded-2xl">

                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <Building2 size={18} />
                    Department
                  </div>

                  <span className="font-bold text-blue-700">
                    {item.departmentId?.departmentName}
                  </span>

                </div>

                {/* PRECAUTIONS */}

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl">

                  <div className="flex items-center gap-2 mb-2 text-yellow-700 font-semibold">
                    <ShieldAlert size={18} />
                    Precautions
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.precautions}
                  </p>

                </div>

                {/* STATUS */}

                <div className="flex items-center justify-between pt-2">

                  <span className="font-medium text-gray-700">
                    Status
                  </span>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-bold ${
                      item.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

              </div>
            </div>

          ))}

        </div>

      )}
    </div>
  );
};

export default TestDashboard;