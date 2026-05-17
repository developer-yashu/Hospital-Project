import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DefaultPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");

  // view mode
  const [viewType, setViewType] = useState("hospital");

  const navigate = useNavigate();

  // GET HOSPITALS
  const getHospitals = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:1010/Hospital/get-all-hospital?search=${search}`
      );

      setHospitals(res.data.hospitals);
    } catch (error) {
      console.log(error);
    }
  };

  // GET DOCTORS
  const getDoctors = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:1010/Doctor/get-all-Doctor?search=${search}`
      );

      setDoctors(res.data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (viewType === "hospital") {
      getHospitals();
    } else {
      getDoctors();
    }
  }, [search, viewType]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <h1 className="text-4xl font-bold text-blue-700">
          🏥 Healthcare Portal
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder={
            viewType === "hospital"
              ? "Search Hospital..."
              : "Search Doctor..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-5 py-3 rounded-2xl outline-none w-full md:w-80 shadow-sm"
        />

        {/* BUTTONS */}
        <div className="flex gap-4">

          <button
            onClick={() => setViewType("doctor")}
            className={`px-5 py-3 rounded-2xl font-semibold transition duration-300 ${
              viewType === "doctor"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white border border-gray-300"
            }`}
          >
            👨‍⚕ By Doctor
          </button>

          <button
            onClick={() => setViewType("hospital")}
            className={`px-5 py-3 rounded-2xl font-semibold transition duration-300 ${
              viewType === "hospital"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white border border-gray-300"
            }`}
          >
            🏥 By Hospital
          </button>

        </div>
      </div>

      {/* HOSPITAL DATA */}
      {viewType === "hospital" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {hospitals.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/hospital/${item._id}`)}
              className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:-translate-y-2 transition duration-300"
            >

              <img
                src={item.image  
                  // || "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                }
                alt="hospital"
                className="w-full h-52 object-cover"
             
             />

              <div className="p-5">

                <h2 className="text-2xl font-bold text-blue-600">
                  {item.hospitalName}
                </h2>

                <p className="text-gray-600 mt-3">
                  <b>Email :</b> {item.hospitalEmail}
                </p>

                <p className="text-gray-600 mt-2">
                  <b>Phone :</b> {item.hospitalPhone}
                </p>

                <p className="text-gray-600 mt-2">
                  <b>State :</b> {item.stateId?.state}
                </p>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* DOCTOR DATA */}
      {viewType === "doctor" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {doctors.map((item) => (
            <div
              key={item._id}
                onClick={() => navigate(`/doctor/${item._id}`)}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition duration-300"
            >

              <div className="bg-blue-600 h-24 relative">

                <img
                  src={
                    item.image ||
                    "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                  }
                  alt="doctor"
                  className="w-28 h-28 rounded-full border-4 border-white object-cover absolute left-1/2 -bottom-14 transform -translate-x-1/2"
                />
              </div>

              <div className="pt-20 p-5">

                <h2 className="text-2xl font-bold text-center text-gray-800">
                  {item.name}
                </h2>

                <p className="text-center text-blue-600 mt-1">
                  {item.departmentId?.departmentName}
                </p>

                <div className="mt-5 space-y-2 text-gray-600">

                  <p>
                    <b>Email :</b> {item.email}
                  </p>

                  <p>
                    <b>Phone :</b> {item.phone}
                  </p>

                  <p>
                    <b>Experience :</b> {item.experience} Years
                  </p>

                  <p>
                    <b>Hospital :</b>{" "}
                    {item.hospitalId?.hospitalName}
                  </p>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default DefaultPage;