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
      alert(error.response?.data?.message);
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

  const totalBeds = hospitals.reduce((acc, item) => acc + Number(item.totalbad),0);

  const totalICUBeds = hospitals.reduce((acc, item) => acc + Number(item.icubad),0);

  const totalHospitals = hospitals.length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TITLE */}
      {/* HEADER */}
      <div className="mb-10">
        {/* TOP BAR */}
        <div className="bg-white rounded-3xl shadow-md px-6 py-5 flex items-center justify-between border border-gray-100">
          {/* MENU BUTTON */}
          <button
            onClick={() => setShowSidebar(true)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-2xl transition"
          >
            <span className="text-xl">☰</span>

            <span className="font-semibold text-gray-700">Menu</span>
          </button>

          {/* TITLE */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
              All Hospitals
            </h1>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-blue-50 text-blue-600 px-5 py-3 rounded-2xl font-bold text-lg shadow-sm">
            🏥 {totalHospitals}
            <p className="text-slate-400">Hospitals</p>
          </div>

           <div className="bg-blue-50 text-blue-600 px-5 py-3 rounded-2xl font-bold text-lg shadow-sm">
              🛏️   {totalBeds} 
              <p className="text-slate-400">totalBeds</p>
          </div>

          <div className="bg-blue-50 text-blue-600 px-5 py-3 rounded-2xl font-bold text-lg shadow-sm">
              ❤️ {totalICUBeds}
              <p className="text-slate-400">ICU Beds</p>
          </div>
        </div>
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
              <img className="object-cover " src={item.image ||
               "https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
            }/>
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

      {/* BACKDROP */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-50 flex flex-col transform transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">
            Add location
          </h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 rounded-md flex items-center justify-center text-xl transition"
          >
            ×
          </button>
        </div>

        <nav className="p-3 flex flex-col gap-1">
          {[
            { label: "State", path: "/state", icon: "📍" },
            { label: "District", path: "/district", icon: "🗺️" },
            { label: "City", path: "/city", icon: "🏙️" },
            { label: "Hospital", path: "/gethospital", icon: "🏥" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setShowSidebar(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition text-left"
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default GetHospital;
