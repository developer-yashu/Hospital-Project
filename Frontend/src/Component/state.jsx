import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const State = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [stateName, setStateName] = useState("");

  // update
  const [editId, setEditId] = useState(null);
  const [editState, setEditState] = useState("");

  // singe view
  const [singleState, setSingleState] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);

  // get-state
  const apiget = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/location/get-state");
      setData(res.data.states);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneState = async (id) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:1010/location/get-state-one/${id}`,
      );
      console.log(res.data);
      setSingleState(res.data.states);
      setShowViewPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  //  add state
  const handleAddState = async () => {
    if (!stateName) return alert("Enter state name");

    try {
      await axios.post(
        "http://127.0.0.1:1010/location/addState",
        { country: "India", state: stateName },
        { headers: { token } },
      );

      alert("State Added");
      setStateName("");
      setShowPopup(false);
      apiget();
    } catch (error) {
      console.log(error);
    }
  };

  const updateState = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/location/update-State/${id}`,
        { state: editState },
      );
      alert(res.data.message);
      setEditId(null);
      setEditState("");
      apiget();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteState = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:1010/location/delete-state-One/${id}`,
      );
      alert("State deleted");
      apiget();
    } catch (error) {
      console.log(error);
    }
  };

  const softDelete = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/location/soft-delete/${id}`,
      );
      alert(res.data.message);
      apiget();
    } catch (error) {
      console.log(error);
    }
  };

  const restoreState = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/location/restore/${id}`,
      );
      alert(res.data.message);
      apiget();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiget();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowSidebar(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          Sidebar
        </button>
        {/* BACKDROP */}
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

        <h1 className="text-3xl font-bold text-gray-800">📍 All States</h1>
        <button
          onClick={() => {
            setShowPopup(true);
            setEditId(null);
            setStateName("");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition"
        >
          + Add State
        </button>
      </div>

      {/* STATE LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-2xl shadow-md border relative"
            >
              <div className="absolute top-3 right-3 flex gap-3 text-xl">
                <button
                  onClick={() => getOneState(item._id)}
                  className="text-green-500 hover:scale-110 transition"
                >
                  👁️
                </button>
                {/* UPDATE */}
                <button
                  onClick={() => {
                    setEditId(item._id);
                    setEditState(item.state);
                    setShowPopup(true);
                  }}
                  className="text-yellow-500 hover:scale-110 transition"
                >
                  ✏️
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteState(item._id)}
                  className="text-red-500 hover:scale-110 transition"
                >
                  🗑️
                </button>

                {/* RESTORE / SOFT DELETE */}
                {item.status === "inactive" ? (
                  <button
                    onClick={() => restoreState(item._id)}
                    className="text-blue-500 hover:scale-110 transition"
                  >
                    🔄
                  </button>
                ) : (
                  <button
                    onClick={() => softDelete(item._id)}
                    className="text-gray-700 hover:scale-110 transition"
                  >
                    🚫
                  </button>
                )}
              </div>

              {/* STATE DATA */}
              <h1 className="text-xl font-bold text-gray-800">{item.state}</h1>
              <p className="text-gray-500 mt-2">🌍 {item.country}</p>
              <p className="text-gray-500 mt-2">Status : {item.status}</p>
            </div>
          ))
        ) : (
          <p>No State Found</p>
        )}
      </div>

      {/* POPUP */}

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-[380px] shadow-2xl">
            <h1 className="text-2xl font-bold mb-5 text-gray-800">
              {editId ? "Update State" : "Add State"}
            </h1>

            <input
              type="text"
              placeholder="Enter State Name"
              className="w-full border p-3 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editId ? editState : stateName}
              onChange={(e) =>
                editId
                  ? setEditState(e.target.value)
                  : setStateName(e.target.value)
              }
            />

            <div className="flex gap-3">
              <button
                onClick={() =>
                  editId ? updateState(editId) : handleAddState()
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition"
              >
                {editId ? "Update" : "Submit"}
              </button>

              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditId(null);
                  setEditState("");
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW POPUP */}

      {showViewPopup && singleState && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-[400px] shadow-2xl">
            <h1 className="text-2xl font-bold mb-5 text-gray-800">
              View State
            </h1>

            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-bold">State :</span>
                {singleState.state}
              </p>

              <p className="text-lg">
                <span className="font-bold">Country :</span>
                {singleState.country}
              </p>

              <p className="text-lg">
                <span className="font-bold">Status :</span>
                {singleState.status}
              </p>
            </div>
            <button
              onClick={() => {
                setShowViewPopup(false);
                setSingleState(null);
              }}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default State;
