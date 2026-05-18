import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Department = () => {
  const [addPopup, setAddPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);

  const [departmentName, setDepartmentName] = useState("");
  const [updateDepartmentName, setUpdateDepartmentName] = useState("");

  const [departments, setDepartments] = useState([]);

  // UPDATE
  const [editId, setEditId] = useState("");

  // VIEW
  const [singleDepartment, setSingleDepartment] = useState("");
  const [viewPopup, setViewPopup] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  const [hospitalId, setHospitalId] = useState("");
  const [hospitals, setHospitals] = useState([]);

  // add
  const AddDepartment = async (e) => {
    e.preventDefault();
    try {
      const data = { departmentName, hospitalId };
      const res = await axios.post(
        "http://127.0.0.1:1010/Department/add-Department",
        data,
       {  headers: {
      Authorization: `Bearer ${token}`
    }}
      );
      alert(res.data.message);
      setDepartmentName("");
      setAddPopup(false);

      GetAllDepartments();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  // update
  const UpdateDepartment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/Department/update-Department/${editId}`,
        { departmentName: updateDepartmentName },
         {  headers: {
      Authorization: `Bearer ${token}`
    }}
      );

      alert(res.data.message);
      setEditId("");
      setUpdateDepartmentName("");
      setUpdatePopup(false);

      GetAllDepartments();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  // get-all
  const GetAllDepartments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/Department/get-all-Department",
         {  headers: {
      Authorization: `Bearer ${token}`
    }}
      );
      setDepartments(res.data.Department);
    } catch (error) {
      console.log(error);
    }
  };

  //  get-One
  const getOneDepartment = async (id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:1010/Department/get-One-Department/${id}`,
         {  headers: {
      Authorization: `Bearer ${token}`
    }}
      );
      console.log("getOne ", res.data.Department);
      setSingleDepartment(res.data.Department);
      setViewPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const deleteDepartment = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:1010/Department/delete-Department/${id}`,
         {  headers: {
      Authorization: `Bearer ${token}`
    }}
      );
      alert("Department Deleted");
      GetAllDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  // soft-delete
  const softDeleteDepartment = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:1010/Department/soft-delete-Department/${id}`,
         {  headers: {
      Authorization: `Bearer ${token}`
    }}
      );
      GetAllDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  // restore
  const restoreDepartment = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:1010/Department/restore-Department/${id}`, {  headers: {
      Authorization: `Bearer ${token}`
    }}
      );
      GetAllDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  const getHospitals = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:1010/Hospital/get-all-Hospital",
         {  headers: {
      Authorization: `Bearer ${token}`
    }}
      );
      setHospitals(res.data.hospitals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllDepartments();
    getHospitals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <button
          onClick={() => setShowSidebar(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg w-full md:w-auto"
        >
          Hospital Menu
        </button>

        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          📍 Departments
        </h1>

        <button
          onClick={() => setAddPopup(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg w-full md:w-auto"
        >
          + Add Department
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments?.length > 0 ? (
          departments.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-lg p-5 relative hover:shadow-2xl transition"
            >
              {/* ACTIONS */}
              <div className="absolute top-4 right-4 flex gap-3 text-xl">
                {/* VIEW */}
                <button
                  onClick={() => getOneDepartment(item._id)}
                  className="hover:scale-125 transition"
                >
                  👁️
                </button>

                {/* UPDATE */}
                <button
                  onClick={() => {
                    setEditId(item._id);
                    setUpdateDepartmentName(item.departmentName);
                    setUpdatePopup(true);
                  }}
                  className="hover:scale-125 transition"
                >
                  ✏️
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteDepartment(item._id)}
                  className="hover:scale-125 transition"
                >
                  🗑️
                </button>

                {/* SOFT DELETE / RESTORE */}
                {item.status === "inactive" ? (
                  <button
                    onClick={() => restoreDepartment(item._id)}
                    className="hover:scale-125 transition"
                  >
                    🔄
                  </button>
                ) : (
                  <button
                    onClick={() => softDeleteDepartment(item._id)}
                    className="hover:scale-125 transition"
                  >
                    🚫
                  </button>
                )}
              </div>

              {/* CONTENT */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  🏥 {item.departmentName}
                </h2>

                <p className="text-lg text-gray-600">
                  Hospital :
                  <span className="font-bold ml-2 text-black">
                    {item.hospitalId?.hospitalName}
                  </span>
                </p>

                <p className="text-lg">
                  Status :
                  <span
                    className={`ml-2 font-bold ${
                      item.status === "active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-xl">No Departments Found</p>
        )}
      </div>

      {/*add popup */}
      {addPopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Add Department</h2>

              <button
                onClick={() => setAddPopup(false)}
                className="text-red-500 text-4xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={AddDepartment}>
              <select
                className="w-full border-2 border-gray-200 p-4 rounded-2xl mb-5"
                value={hospitalId}
                onChange={(e) => setHospitalId(e.target.value)}
              >
                <option value="">Select Hospital</option>

                {hospitals?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.hospitalName}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Enter Department Name"
                className="w-full border-2 border-gray-200 focus:border-blue-500 outline-none p-4 rounded-2xl mb-5"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* update popup */}
      {updatePopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Update Department</h2>

              <button
                onClick={() => setUpdatePopup(false)}
                className="text-red-500 text-4xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={UpdateDepartment}>
              <input
                type="text"
                placeholder="Update Department Name"
                className="w-full border-2 border-gray-200 focus:border-yellow-500 outline-none p-4 rounded-2xl mb-5"
                value={updateDepartmentName}
                onChange={(e) => setUpdateDepartmentName(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-2xl text-lg font-semibold"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* view Popup */}
      {viewPopup && singleDepartment && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">View Department</h2>

              <button
                onClick={() => setViewPopup(false)}
                className="text-red-500 text-4xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-5">
              <div className="bg-gray-100 p-5 rounded-2xl">
                <p className="text-gray-500 mb-2">Department Name</p>

                <h1 className="text-2xl font-bold">
                  {singleDepartment.departmentName}
                </h1>
              </div>

              <div className="bg-gray-100 p-5 rounded-2xl">
                <p className="text-gray-500 mb-2">Status</p>

                <h1
                  className={`text-2xl font-bold ${
                    singleDepartment.status === "active"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {singleDepartment.status}
                </h1>
              </div>
            </div>

            <button
              onClick={() => setViewPopup(false)}
              className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl text-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* OVERLAY */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold">Hospital Menu</h2>

          <button
            onClick={() => setShowSidebar(false)}
            className="text-red-500 text-4xl"
          >
            ×
          </button>
        </div>

        {/* MENU */}
        <div className="p-5 flex flex-col gap-4">
          <button
            onClick={() => navigate("/doctor")}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-2xl"
          >
            Doctor
          </button>

          <button
            onClick={() => navigate("/SubDepartment")}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-2xl"
          >
            Sub Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default Department;
