import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:1010/Hospital/get-all-hospital",
      );
      console.log("get-all-hospital", res.data);
      setHospitals(res.data.hospitals);
    } catch (error) {
      console.log(error);
    }
  };

  const approveHospital = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://127.0.0.1:1010/Hospital/approveHospital/${id}`,
        {},
        {
          headers: {
            token: token,
          },
        },
      );

      alert(res.data.message);
      fetchHospitals();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  const rejectHospital = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/Hospital/rejected-hospital/${id}`,
      );
      alert(res.data.message);
      fetchHospitals();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-8">

         <button
          onClick={() => setShowSidebar(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          Sidebar
        </button>

        <h1 className="text-3xl font-bold text-blue-600">All Hospitals</h1>
      </div>

      {/* HOSPITAL LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hospitals.length > 0 ? (
          hospitals.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-2xl shadow-lg border"
            >
              {/* HOSPITAL NAME */}
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {item.hospitalName}
              </h1>

              {/* EMAIL */}
              <p className="text-gray-600">📧 {item.hospitalEmail}</p>

              {/* PHONE */}
              <p className="text-gray-600">📞 {item.hospitalPhone}</p>

              {/* REGISTRATION NUMBER */}
              <p className="text-gray-600">🆔 {item.registrationNumber}</p>

              {/* EMERGENCY */}
              <p className="text-gray-600">🚑 {item.emergencyhelpine}</p>

              {/* TOTAL BEDS */}
              <p className="text-gray-600">🛏 Total Beds: {item.totalbad}</p>

              {/* ICU BEDS */}
              <p className="text-gray-600">❤️ ICU Beds: {item.icubad}</p>

              {/* OPERATION THEATERS */}
              <p className="text-gray-600">
                🏥 Operation Theaters: {item.operationTheaters}
              </p>

              {/* AMBULANCE */}
              <p className="text-gray-600">
                🚐 Ambulances: {item.ambulancecount}
              </p>

              {/* LICENSE */}
              <p className="text-gray-600">📜 License: {item.LicenseNumber}</p>

              {/* CEO */}
              <p className="text-gray-600">👨‍⚕ CEO: {item.CEO}</p>
              <p className="text-gray-600"> state: {item.stateId?.state}</p>
              <p className="text-gray-600">
                district : {item.districtId?.district}
              </p>
              <p className="text-gray-600">city {item.CityId?.city}</p>

              {/* STATUS */}
              <div className="mt-4">
                <span
                  className={`px-4 py-1 rounded-full text-white text-sm ${
                    item.status === "approved"
                      ? "bg-green-500"
                      : item.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                >
                  Status {item.status}
                </span>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => approveHospital(item._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>
                {/* {item.status === "pending" && ( */}
                <button
                  onClick={() => rejectHospital(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
                {/* // )} */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No Hospitals Found</p>
        )}
      </div>


             {showSidebar && (
          <div
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 bg-black/40 z-40"
          ></div>
        )}


            <div
          className={`fixed top-0 left-0 h-full w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Add Location</h2>

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
                navigate("/state");
              }}
              className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
            >
              State
            </button>

            <button
              onClick={() => {
                navigate("/district");
              }}
              className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
            >
              District
            </button>

            <button
              onClick={() => {
                navigate("/city");
              }}
              className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
            >
              City
            </button>

            <button
              onClick={() => {
                navigate("/gethospital");
              }}
              className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
            >
              Hospital
            </button>
          </div>
        </div>  
    </div>
  );
};

export default GetHospital;
