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
      // const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://127.0.0.1:1010/Hospital/approveHospital/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
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
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert(res.data.message);
      fetchHospitals();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const totalBeds = hospitals.reduce(
    (acc, item) => acc + Number(item.totalbad),
    0,
  );

  const totalICUBeds = hospitals.reduce(
    (acc, item) => acc + Number(item.icubad),
    0,
  );

  const totalHospitals = hospitals.length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TITLE */}
      {/* HEADER */}
      <div className="mb-10">
        {/* TOP BAR */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg px-6 py-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 border border-gray-100">
          {/* MENU BUTTON */}
          <button
            onClick={() => setShowSidebar(true)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-2xl transition shadow-sm"
          >
            <span className="text-xl">☰</span>
            <span className="font-semibold text-gray-700">Menu</span>
          </button>

          {/* TITLE */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 tracking-wide text-center flex-1">
            🏥 All Hospitals
          </h1>

          {/* STATS */}
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <div className="bg-blue-50 text-blue-600 px-4 py-3 rounded-2xl shadow-sm text-center min-w-[110px]">
              🏥 <span className="font-bold">{totalHospitals}</span>
              <p className="text-xs text-gray-500">Hospitals</p>
            </div>

            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-2xl shadow-sm text-center min-w-[110px]">
              🛏️ <span className="font-bold">{totalBeds}</span>
              <p className="text-xs text-gray-500">Beds</p>
            </div>

            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl shadow-sm text-center min-w-[110px]">
              ❤️ <span className="font-bold">{totalICUBeds}</span>
              <p className="text-xs text-gray-500">ICU Beds</p>
            </div>
          </div>
        </div>
      </div>

      {/* HOSPITAL LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hospitals.length > 0 ? (
          hospitals.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition duration-300 p-5"
            >
              {/* IMAGE */}
              <img
                className="w-full h-40 object-cover rounded-xl mb-4 cursor-pointer"
                src={
                  item.image ||
                  "https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
                }
                onClick={() => navigate(`/get-one-hospital/${item._id}`)}
              />

              {/* NAME */}
              <h1 className="text-xl font-bold text-gray-800">
                {item.hospitalName}
              </h1>

              {/* INFO */}
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                {/* <p>📧 {item.hospitalEmail}</p> */}
                {/* <p>📞 {item.hospitalPhone}</p> */}
                <p>🚑 {item.emergencyhelpine}</p>
                <p>🚐 Ambulance: {item.ambulancecount}</p>
                {/* <p>👨‍⚕ CEO: {item.CEO}</p> */}

                <p>📍 State: {item.stateId?.state}</p>
                <p>🗺️ District: {item.districtId?.district}</p>
                <p>🏙️ City: {item.CityId?.city}</p>
              </div>

              {/* STATUS */}
              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    item.status === "approved"
                      ? "bg-green-500"
                      : item.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                >
                  {item.status.toUpperCase()}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => approveHospital(item._id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectHospital(item._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition"
                >
                  Reject
                </button>
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
          <h2
            className="text-base font-semibold text-gray-800"
            onClick={() => {
              navigate("/Superadmin");
            }}
          >
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
