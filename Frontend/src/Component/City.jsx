import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const City = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // states
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [cityName, setCityName] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  // update
  const [editId, setEditId] = useState(null);
  const [editCity, setEditCity] = useState("");
  // siingel view

  const [singleCity, setSingleCity] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);

  ///get-state
  const fetchStates = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/location/get-state");
      setStates(res.data.states);
    } catch (error) {
      console.log(error);
    }
  };

  // getDistrict
  const fetchDistricts = async (stateId) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:1010/location/getDistrictByState/${stateId}`,
      );
      setDistricts(res.data.districts);
    } catch (error) {
      console.log(error);
    }
  };

  // get-city
  const fetchCities = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/location/get-city");
      setCities(res.data.cities);
    } catch (error) {
      console.log(error);
    }
  };

  //addCity
  const handleAddCity = async (e) => {
    // e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:1010/location/addCity",
        {
          stateId: selectedState,
          districtId: selectedDistrict,
          city: cityName,
        },
        { headers: { token } },
      );
      alert("City Added Successfully");
      setCityName("");
      setSelectedState("");
      setSelectedDistrict("");
      setShowPopup(false);

      fetchCities();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCity = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:1010/location/delete-city-one/${id}`,
      );
      alert("City Deleted");
      fetchCities();
    } catch (error) {
      console.log(error);
    }
  };

  // GET ONE CITY
  const getOneCity = async (id) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:1010/location/get-one-city/${id}`,
      );
      setSingleCity(res.data.city);
      setShowViewPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE CITY

  const updateCity = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/location/update-city/${id}`,
        { city: editCity },
      );
      alert(res.data.message);
      setEditId(null);
      setEditCity("");
      setShowPopup(false);

      fetchCities();
    } catch (error) {
      console.log(error);
    }
  };

  // SOFT DELETE CITY

  const softDeleteCity = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/location/soft-delete-city/${id}`,
      );
      alert(res.data.message);
      fetchCities();
    } catch (error) {
      console.log(error);
    }
  };

  // RESTORE CITY

  const restoreCity = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/location/restore-city/${id}`,
      );
      alert(res.data.message);
      fetchCities();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchCities();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
          <button
          onClick={() => setShowSidebar(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          <span className="text-lg">☰</span> Menu
        </button>

        <h1 className="text-3xl font-bold text-gray-800">📍 All Cities</h1>

        <button
          onClick={() => {
            setShowPopup(true);
            setEditId(null);
            setCityName("");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition"
        >
          + Add City
        </button>
      </div>

      {/* ADD / UPDATE POPUP */}

      {showPopup && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-start overflow-y-auto pt-5">
          <div className="bg-white p-6 rounded-2xl w-[400px] shadow-2xl my-5">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              {editId ? "✏️ Update City" : "🏙️ Add City"}
            </h2>

            {/* STATE */}

            <select
              className="w-full border p-3 rounded-xl mb-4"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                fetchDistricts(e.target.value);
              }}
            >
              <option value="">Select State</option>

              {states.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.state}
                </option>
              ))}
            </select>

            {/* DISTRICT */}

            <select
              className="w-full border p-3 rounded-xl mb-4"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Select District</option>

              {districts.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.district}
                </option>
              ))}
            </select>

            {/* CITY */}

            <input
              type="text"
              placeholder="Enter City Name"
              className="w-full border p-3 rounded-xl mb-5"
              value={editId ? editCity : cityName}
              onChange={(e) =>
                editId
                  ? setEditCity(e.target.value)
                  : setCityName(e.target.value)
              }
            />

            {/* BUTTONS */}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => (editId ? updateCity(editId) : handleAddCity())}
                className="w-full bg-blue-600 text-white p-3 rounded-xl"
              >
                {editId ? "Update" : "Submit"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowPopup(false);
                  setEditId(null);
                  setEditCity("");
                }}
                className="w-full bg-red-500 text-white p-3 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CITY LIST */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cities.length > 0 ? (
          cities.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-2xl shadow relative"
            >
              {/* ICONS */}

              <div className="absolute top-3 right-3 flex gap-3 text-xl">
                {/* VIEW */}

                <button
                  onClick={() => getOneCity(item._id)}
                  className="text-green-500 hover:scale-110 transition"
                >
                  👁️
                </button>

                {/* UPDATE */}

                <button
                  onClick={() => {
                    setEditId(item._id);
                    setEditCity(item.city);
                    setSelectedState(item.stateId?._id);
                    setSelectedDistrict(item.districtId?._id);
                    fetchDistricts(item.stateId?._id);
                    setShowPopup(true);
                  }}
                  className="text-yellow-500 hover:scale-110 transition"
                >
                  ✏️
                </button>

                {/* DELETE */}

                <button
                  onClick={() => deleteCity(item._id)}
                  className="text-red-500 hover:scale-110 transition"
                >
                  🗑️
                </button>

                {/* RESTORE / SOFT DELETE */}

                {item.status === "inactive" ? (
                  <button
                    onClick={() => restoreCity(item._id)}
                    className="text-blue-500 hover:scale-110 transition"
                  >
                    🔄
                  </button>
                ) : (
                  <button
                    onClick={() => softDeleteCity(item._id)}
                    className="text-gray-700 hover:scale-110 transition"
                  >
                    🚫
                  </button>
                )}
              </div>

              {/* DATA */}

              <h1 className="text-xl font-bold">{item.city}</h1>

              <p className="text-gray-600">State : {item.stateId?.state}</p>

              <p className="text-gray-600">
                District : {item.districtId?.district}
              </p>

              <p className="text-gray-600">Status : {item.status}</p>
            </div>
          ))
        ) : (
          <p>No cities found</p>
        )}
      </div>

      {/* VIEW POPUP */}

      {showViewPopup && singleCity && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-center items-start overflow-y-auto pt-5">
          <div className="bg-white w-[400px] rounded-3xl shadow-2xl p-6 my-5">
            {/* ICON */}

            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 text-blue-600 text-4xl p-4 rounded-full">
                🏙️
              </div>
            </div>

            {/* TITLE */}

            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              View City
            </h1>

            {/* DATA */}

            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-2xl">
                <p className="text-sm text-gray-500">City Name</p>

                <h2 className="text-lg font-semibold text-gray-800">
                  {singleCity.city}
                </h2>
              </div>

              <div className="bg-gray-100 p-4 rounded-2xl">
                <p className="text-sm text-gray-500">State</p>

                <h2 className="text-lg font-semibold text-gray-800">
                  {singleCity.stateId?.state}
                </h2>
              </div>

              <div className="bg-gray-100 p-4 rounded-2xl">
                <p className="text-sm text-gray-500">District</p>

                <h2 className="text-lg font-semibold text-gray-800">
                  {singleCity.districtId?.district}
                </h2>
              </div>

              <div
                className={`p-4 rounded-2xl text-center text-white font-bold ${
                  singleCity.status === "inactive"
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              >
                {singleCity.status}
              </div>
            </div>

            {/* CLOSE BUTTON */}

            <button
              onClick={() => {
                setShowViewPopup(false);
                setSingleCity(null);
              }}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

   {/* BACKDROP */}
    {showSidebar && (
      <div
        onClick={() => setShowSidebar(false)}
        className="fixed inset-0 bg-black/40 z-40"
      />
    )}

    {/* SIDEBAR */}
    <div className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-50 flex flex-col transform transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-800">Add location</h2>
        <button
          onClick={() => setShowSidebar(false)}
          className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 rounded-md flex items-center justify-center text-xl transition"
        >
          ×
        </button>
      </div>

      <nav className="p-3 flex flex-col gap-1">
        {[
          { label: "State",    path: "/state",       icon: "📍" },
          { label: "District", path: "/district",    icon: "🗺️" },
          { label: "City",     path: "/city",        icon: "🏙️" },
          { label: "Hospital", path: "/gethospital", icon: "🏥" },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => { navigate(item.path); setShowSidebar(false); }}
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

export default City;
