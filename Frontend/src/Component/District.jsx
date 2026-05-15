import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const District = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [district, setDistrict] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);

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
        "http://127.0.0.1:1010/location/getDistrictByState",
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
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/*  button open popup */}
      <div className="flex justify-between items-center mb-6">
        
        <button
          onClick={() => setShowSidebar(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          Sidebar
        </button>

        <h1 className="text-3xl font-bold text-gray-800">📍 Add District</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition"
        >
          + Add District
        </button>
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
