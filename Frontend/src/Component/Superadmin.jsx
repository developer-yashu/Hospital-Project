import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Superadmin = () => {
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);


  const [totalStates, setTotalStates] = useState(0);
const [totalDistricts, setTotalDistricts] = useState(0);
const [totalCities, setTotalCities] = useState(0);
const [totalHospitals, setTotalHospitals] = useState(0);


  const fetchStates = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:1010/location/get-state");
    setTotalStates(res.data.states.length);
  } catch (error) {
    console.log(error);
  }
};


const fetchDistricts = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:1010/location/getDistrictByState");
    setTotalDistricts(res.data.districts.length);
  } catch (error) {
    console.log(error);
  }
};


const fetchCities = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:1010/location/get-city");
    setTotalCities(res.data.cities.length);
  } catch (error) {
    console.log(error);
  }
};

const fetchHospitals = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:1010/Hospital/get-all-Hospital");
    setTotalHospitals(res.data.hospitals.length);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
  fetchStates();
  fetchDistricts();
  fetchCities();
  fetchHospitals();
}, []);


  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex gap-5 items-center mb-6">


        <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-xl shadow-md transition duration-300"
      >
        <span className="text-lg">⬅</span>Back
      </button>


      {/* BUTTON */}
      <button
        onClick={() => setShowSidebar(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
      >
        Add Location
      </button>
    </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

  <div className="bg-white p-6 rounded-2xl shadow">
    <h2 className="text-lg font-bold">States</h2>
    <p className="text-3xl text-blue-600 font-bold">{totalStates}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h2 className="text-lg font-bold">Districts</h2>
    <p className="text-3xl text-green-600 font-bold">{totalDistricts}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h2 className="text-lg font-bold">Cities</h2>
    <p className="text-3xl text-purple-600 font-bold">{totalCities}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h2 className="text-lg font-bold">Hospitals</h2>
    <p className="text-3xl text-red-600 font-bold">{totalHospitals}</p>
  </div>

</div>

      {/* BACKDROP */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* LEFT SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          showSidebar
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">                             
          
            Add Location
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
            onClick={() => { navigate("/city");
            }}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
          >
            City
          </button>

             <button
            onClick={() => { navigate("/gethospital");
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

export default Superadmin;