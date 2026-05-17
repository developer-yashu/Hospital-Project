import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubDepartment = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //  popup
  const [addPopup, setAddPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);

  // STATES
  const [subDepartmentName, setSubDepartmentName] = useState("");
  const [updateSubDepartmentName, setUpdateSubDepartmentName] = useState("");

  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [updateSelectedDepartmentId, setUpdateSelectedDepartmentId] = useState("");

  const [subDepartment, setSubDepartment] = useState([]);
  const [Departments, setDepartments] = useState([]);

  // get one
  const [OneSubDepartment,setOneSubDepartment] = useState("");

  // UPDATE
  const [editId, setEditId] = useState("");

  // Sidebar
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");
  // ADD
  const AddDepartment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:1010/SubDepartment/add-subDepartment",
        {SubdepartmentName: subDepartmentName,                      
          departmentId: selectedDepartmentId,},
        { headers: { token }}
      );
      alert(res.data.message);

      setSubDepartmentName("");
      setSelectedDepartmentId("");
      setAddPopup(false);

      GetAllSubDepartments();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  // UPDATE
  const UpdateDepartment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://127.0.0.1:1010/SubDepartment/update-subdepartment/${editId}`,
      {
   SubdepartmentName: updateSubDepartmentName,
   departmentId: updateSelectedDepartmentId
},
        {headers: { token},});
      alert(res.data.message);

      setEditId("");
      setUpdateSubDepartmentName("");
      setUpdateSelectedDepartmentId("");

      setUpdatePopup(false);

      GetAllSubDepartments();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  // get-all-subDepartment
  const GetAllSubDepartments = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:1010/SubDepartment/get-all-subDepartment?search=${search}`);
      setSubDepartment(res.data.subdepartment);
    } catch (error) {
      console.log(error);
    }
  };

  // get-all-department
  const GetDepartments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/Department/get-all-department");
      setDepartments(res.data.Department);
    } catch (error) {
      console.log(error);
    }
  };

  // get-one
  const getOneSubDepartment = async (id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:1010/SubDepartment/get-One-subdepartment/${id}`);
      console.log(res.data.subdepartment);
      setOneSubDepartment(res.data.subdepartment);
      setViewPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const deleteSubDepartment = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:1010/SubDepartment/delete-subDepartment/${id}`);
      alert("Sub Department Delete");
      GetAllSubDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  // SOFT DELETE
  const softDeleteSubDepartment = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:1010/SubDepartment/soft-delete-subDepartment/${id}`);
      GetAllSubDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  // RESTORE
  const restoreSubDepartment = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:1010/SubDepartment/restore-subDepartment/${id}`);
      GetAllSubDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllSubDepartments();
    GetDepartments();
  }, [search]);

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

          <input 
        type="text"
        placeholder="Search Sub Department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-3 rounded-xl mb-6 outline-none w-full md:w-auto"
      />

        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          📍 Sub Departments
        </h1>

        <button
          onClick={() => setAddPopup(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg w-full md:w-auto"
        >
          + Add Sub Department
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subDepartment.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl shadow-lg p-5 relative hover:shadow-2xl transition"
          >
            {/* ACTIONS */}
            <div className="absolute top-4 right-4 flex gap-3 text-xl">
              {/* VIEW */}
              <button
                onClick={() => getOneSubDepartment(item._id)}
                className="hover:scale-125 transition"
              >
                👁️
              </button>

              {/* UPDATE */}
              <button
                onClick={() => {
                  setEditId(item._id);
                  setUpdateSubDepartmentName(item.SubdepartmentName);
                  setUpdateSelectedDepartmentId(item.departmentId?._id);
                  setUpdatePopup(true);
                }}
                className="hover:scale-125 transition"
              >
                ✏️
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteSubDepartment(item._id)}
                className="hover:scale-125 transition"
              >
                🗑️
              </button>

              {/* SOFT DELETE */}
              {item.status === "inactive" ? (
                <button
                  onClick={() => restoreSubDepartment(item._id)}
                  className="hover:scale-125 transition"
                >
                  🔄
                </button>
              ) : (
                <button
                  onClick={() => softDeleteSubDepartment(item._id)}
                  className="hover:scale-125 transition"
                >
                  🚫
                </button>
              )}
            </div>

            {/* CONTENT */}
            <div className="mt-6">
              <p className="text-gray-500 mb-2">
                Department :
                <span className="font-bold ml-2 text-black">
                  {item.departmentId?.departmentName}
                </span>
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🏥 Subdepartment : {item.SubdepartmentName}
              </h2>

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
        ))}
      </div>

      {/* ADD POPUP */}
      {addPopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Add Sub Department</h2>

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
                value={selectedDepartmentId}
                onChange={(e) => setSelectedDepartmentId(e.target.value)}
              >
                <option value="">Select Department</option>

                {Departments?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.departmentName}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Enter Sub Department Name"
                className="w-full border-2 border-gray-200 p-4 rounded-2xl mb-5"
                value={subDepartmentName}
                onChange={(e) => setSubDepartmentName(e.target.value)}
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

      {/* UPDATE POPUP */}
      {updatePopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Update Sub Department</h2>

              <button
                onClick={() => setUpdatePopup(false)}
                className="text-red-500 text-4xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={UpdateDepartment}>
              <select
                className="w-full border-2 border-gray-200 p-4 rounded-2xl mb-5"
                value={updateSelectedDepartmentId}
                onChange={(e) => setUpdateSelectedDepartmentId(e.target.value)}
              >
                <option value="">Select Department</option>

                {Departments?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.departmentName}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Update Sub Department"
                className="w-full border-2 border-gray-200 p-4 rounded-2xl mb-5"
                value={updateSubDepartmentName}
                onChange={(e) =>
                  setUpdateSubDepartmentName(e.target.value)
                }
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

      {/* VIEW POPUP */}
      {viewPopup && OneSubDepartment && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">View Sub Department</h2>

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
                  {
                    OneSubDepartment?.departmentId
                      ?.departmentName
                  }
                </h1>
              </div>

              <div className="bg-gray-100 p-5 rounded-2xl">
                <p className="text-gray-500 mb-2">
                  Sub Department Name
                </p>

                <h1 className="text-2xl font-bold">
                  {OneSubDepartment?.SubdepartmentName}
                </h1>
              </div>

              <div className="bg-gray-100 p-5 rounded-2xl">
                <p className="text-gray-500 mb-2">Status</p>

                <h1
                  className={`text-2xl font-bold ${
                    OneSubDepartment?.status === "active"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {OneSubDepartment?.status}
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
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold">Hospital Menu</h2>

          <button
            onClick={() => setShowSidebar(false)}
            className="text-red-500 text-4xl"
          >
            ×
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <button
            onClick={() => navigate("/department")}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-2xl">
            Department
          </button>

          <button
            onClick={() => navigate("/doctor")}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-2xl"
          >
            Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubDepartment;