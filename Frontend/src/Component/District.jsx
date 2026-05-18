import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  // IconMapPin,
  // IconBuildingCommunity,
  // IconPlus,
  // IconTrash,
  // IconX,
  // IconCheck,
  IconMenu2,
  // IconFlag,
  // IconBuilding,
  // IconBuildingHospital,
  // IconMap,
  // IconMapPinPlus,
} from "@tabler/icons-react";
const District = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [district, setDistrict] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");

  // get states
  const fetchStates = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/location/get-state");
      setStates(res.data.states);
    } catch (error) {
      console.log(error);
    }
  };

  // get all districts
  const fetchDistricts = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:1010/location/getDistrictByState?search=${search}`,
      );
      setDistricts(res.data.districts);
    } catch (error) {
      console.log(error);
      setDistricts([]);
    }
  };

  //addDistrict
  const handleAddDistrict = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:1010/location/addDistrict",
        { stateId: selectedState, district: district },
        { headers: { token } },
      );

      alert("District Added Successfully");
      setDistrict("");
      setSelectedState("");
      setShowPopup(false);

      fetchDistricts();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDistrict = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:1010/location/delete-District-One/${id}`,
      );
      alert("District deleted");
      fetchDistricts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchDistricts();
  }, [search]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/*  button open popup */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowSidebar(true)}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition"
        >
          <IconMenu2 size={18} /> Menu
        </button>

        <input
          type="text"
          placeholder="Search state.../statename"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-3 rounded-xl mb-6 outline-none"
        />

        <h1 className="text-3xl font-bold text-gray-800">📍 Add District</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition"
        >
          + Add District
        </button>
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

      {/* popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-[400px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-5">Add District</h2>

            {/* STATE DROPDOWN */}
            <select
              className="w-full border p-3 rounded-xl mb-4"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select State</option>

              {states.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.state}
                </option>
              ))}
            </select>

            {/* district input*/}
            <input
              type="text"
              placeholder="Enter District"
              className="w-full border p-3 rounded-xl mb-5"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />

            {/* button */}

            <div className="flex gap-3">
              <button
                onClick={handleAddDistrict}
                className="w-full bg-blue-600 text-white p-3 rounded-xl"
              >
                Submit
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="w-full bg-red-500 text-white p-3 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* get all districts */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {districts.length > 0 ? (
          districts.map((item) => (
            <div key={item._id} className="bg-white p-5 rounded-2xl shadow">
              <h1 className="text-xl font-bold">{item.district}</h1>

              <p className="text-gray-500">State ID: {item.stateId.state}</p>

              <button
                onClick={() => deleteDistrict(item._id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No districts found</p>
        )}
      </div>
    </div>
  );
};

export default District;
