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
  const [search, setSearch] = useState("");

  // get-state
  const apiget = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:1010/location/get-state?search=${search}`);
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
  }, [search]);

 return (
  <div className="p-6 min-h-screen bg-gray-50">

    {/* TOP BAR */}
    <div className="flex items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-3">

        {/* SIDEBAR TOGGLE */}
        <button
          onClick={() => setShowSidebar(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          <span className="text-lg">☰</span> Menu
        </button>

        <input
        type="text"
        placeholder="Search state.../statename"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-3 rounded-xl mb-6 outline-none"
      />

        <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          📍 All states
        </h1>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => { setShowPopup(true); setEditId(null); setStateName(""); }}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg transition"
      >
        + Add state
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

    {/* STATE CARDS GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.length > 0 ? data.map((item) => (
        <div
          key={item._id}
          className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-gray-300 transition"
        >
          {/* CARD TOP */}
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${item.status === "inactive" ? "bg-red-50" : "bg-blue-50"}`}>
              🗺️
            </div>

            {/* ACTION ICONS */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => getOneState(item._id)}
                className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition text-sm"
                title="View"
              >👁️</button>

              <button
                onClick={() => { setEditId(item._id); setEditState(item.state); setShowPopup(true); }}
                className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition text-sm"
                title="Edit"
              >✏️</button>

              <button
                onClick={() => deleteState(item._id)}
                className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition text-sm"
                title="Delete"
              >🗑️</button>

              {item.status === "inactive" ? (
                <button
                  onClick={() => restoreState(item._id)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-green-600 hover:bg-green-50 transition text-sm"
                  title="Restore"
                >🔄</button>
              ) : (
                <button
                  onClick={() => softDelete(item._id)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition text-sm"
                  title="Deactivate"
                >🚫</button>
              )}
            </div>
          </div>

          {/* STATE INFO */}
          <h2 className="text-base font-semibold text-gray-800 mb-1">{item.state}</h2>
          <p className="text-sm text-gray-500 mb-3">🌍 {item.country}</p>

          {/* STATUS BADGE */}
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
            item.status === "inactive"
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}>
            {item.status === "inactive" ? "● Inactive" : "● Active"}
          </span>
        </div>
      )) : (
        <p className="text-gray-400 text-sm col-span-4 text-center py-12">No state found.</p>
      )}
    </div>

    {/* ADD / EDIT POPUP */}
    {showPopup && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-2xl w-80 border border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            {editId ? "Update state" : "Add state"}
          </h2>

          <input
            type="text"
            placeholder="Enter state name"
            className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={editId ? editState : stateName}
            onChange={(e) => editId ? setEditState(e.target.value) : setStateName(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={() => editId ? updateState(editId) : handleAddState()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm transition"
            >
              {editId ? "Update" : "Submit"}
            </button>
            <button
              onClick={() => { setShowPopup(false); setEditId(null); setEditState(""); }}
              className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-100 py-2.5 rounded-lg text-sm transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}

    {/* VIEW POPUP */}
    {showViewPopup && singleState && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-2xl w-80 border border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-4">View state</h2>

          <div className="space-y-3">
            {[
              { label: "State",   val: singleState.state },
              { label: "Country", val: singleState.country },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                <span className="text-gray-500">{row.label}</span>
                <span className="font-medium text-gray-800">{row.val}</span>
              </div>
            ))}

            <div className="flex justify-between items-center py-2 text-sm">
              <span className="text-gray-500">Status</span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${singleState.status === "inactive" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                {singleState.status === "inactive" ? "● Inactive" : "● Active"}
              </span>
            </div>
          </div>

          <button
            onClick={() => { setShowViewPopup(false); setSingleState(null); }}
            className="mt-5 w-full border border-gray-200 text-gray-600 hover:bg-gray-100 py-2.5 rounded-lg text-sm transition"
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
