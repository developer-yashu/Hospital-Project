import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Doctor = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [doctors, setDoctors] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  const [subDepartments, setSubDepartments] = useState([]);

  // updatePopup
  const [updatePopup, setUpdatePopup] = useState(false);
  //editId
  const [editId, setEditId] = useState("");


  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [qualification, setQualification] = useState("");
  const [address, setAddress] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [subDepartmentId, setSubDepartmentId] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // get doctors
  const getDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:1010/Doctor/get-all-Doctor");

      setDoctors(res.data.doctors);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getHospitals = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:1010/Hospital/get-all-hospital",
      );
      setHospitals(res.data.hospitals);
    } catch (error) {
      console.log(error);
    }
  };

  // get departments
  const getDepartments = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:1010/Department/get-all-department",
      );

      setDepartments(res.data.Department);
    } catch (error) {
      console.log(error);
    }
  };

  // get sub departments
  const getSubDepartments = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:1010/SubDepartment/get-all-subDepartment",
      );

      setSubDepartments(res.data.subdepartment);
    } catch (error) {
      console.log(error);
    }
  };

  // add doctor
  const addDoctor = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
      experience,
      gender,
      age,
      qualification,
      address,
      role: "doctor",
      hospitalId,
      departmentId,
      subDepartmentId,
      image,
    };
    try {
      const res = await axios.post(
        "http://127.0.0.1:1010/Doctor/add-Doctor",
        data,
        {
          headers: {
            token,
          },
        },
      );

      alert(res.data.message);

      setName("");
      setEmail("");
      setPhone("");
      setExperience("");
      setGender("");
      setAge("");
      setQualification("");
      setAddress("");
      setHospitalId("");
      setDepartmentId("");
      setSubDepartmentId("");

      setShowPopup(false);

      getDoctors();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  // delete
  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:1010/Doctor/delete-Doctor/${id}`);
      alert("Delete-Doctor-Sucuffle");
      getDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  // soft delete
  const softDeleteDoctor = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/Doctor/soft-Delete-Doctor/${id}`,
      );

      alert(res.data.message);
      getDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  // restore
  const restoreDoctor = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/Doctor/restore-Doctor/${id}`,
      );

      alert(res.data.message);
      getDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE DOCTOR
  const updateDoctor = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
      experience,
      gender,
      age,
      qualification,
      address,
      hospitalId,
      departmentId,
      subDepartmentId,
    };

    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/Doctor/update-Doctor/${editId}`,
        data,
        { headers: { token } },
      );

      alert(res.data.message);
      setUpdatePopup(false);
      getDoctors();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getDoctors();
    getDepartments();
    getSubDepartments();
    getHospitals();
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowSidebar(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          Hospital Menu
        </button>

        <h1 className="text-3xl font-bold">📍 Doctors</h1>

        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Doctor
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        { loading ? 
          <div className="flex w-200 justify-center items-center h-screen">  <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          className=" ml-150"
        />
        </div>
         :  doctors?.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-2xl shadow relative"
          >
            {/* ACTIONS */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => {
                  setEditId(item._id);
                  setName(item.name);
                  setEmail(item.email);
                  setPhone(item.phone);
                  setExperience(item.experience);
                  setGender(item.gender);
                  setAge(item.age);
                  setQualification(item.qualification);
                  setAddress(item.address);
                  setHospitalId(item.hospitalId?._id);
                  setDepartmentId(item.departmentId?._id);
                  setSubDepartmentId(item.subDepartmentId?._id);

                  setUpdatePopup(true);
                }}
                className="text-yellow-500"
              >
                ✏️
              </button>

              <button
                onClick={() => navigate(`/doctor/${item._id}`)}
                className="text-green-500"
              >
                👁️
              </button>

              <button
                onClick={() => deleteDoctor(item._id)}
                className="text-red-500"
              >
                🗑
              </button>

              {item.status === "active" ? (
                <button
                  onClick={() => softDeleteDoctor(item._id)}
                  className="text-red-500"
                >
                  🚫
                </button>
              ) : (
                <button
                  onClick={() => restoreDoctor(item._id)}
                  className="text-green-500"
                >
                  🔄
                </button>
              )}
            </div>

            {/* CONTENT */}

            <div className="flex justify-start mb-4 -mt-4">
              <LazyLoadImage
               effect="blur"
                src={item.image}
                className="w-30 h-30 rounded-full object-cover border-4 border-blue-100"
              />
            </div>
            <h1 className="text-xl font-bold">{item.name}</h1>

            <p className="text-gray-500">Email : {item.email}</p>

            <p className="text-gray-500">Phone : {item.phone}</p>

            <p className="text-gray-500">Experience : {item.experience}</p>

            <p className="text-gray-500">
              Hospital : {item.hospitalId?.hospitalName}
            </p>

            <p className="mt-2">
              Status :
              <span
                className={
                  item.status === "active"
                    ? " text-green-600 font-bold"
                    : " text-red-500 font-bold"
                }
              >
                {" "}
                {item.status}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-5 border-b bg-gradient-to-r from-blue-600 to-blue-500">
              <h2 className="text-2xl font-bold text-white">👨‍⚕ Add Doctor</h2>

              <button
                onClick={() => setShowPopup(false)}
                className="text-white text-3xl hover:rotate-90 transition duration-300"
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={addDoctor}
              className="p-6 max-h-[80vh] overflow-y-auto"
            >
              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* NAME */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Doctor Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter doctor name"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Phone
                  </label>

                  <input
                    type="number"
                    placeholder="Enter phone number"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* EXPERIENCE */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Experience
                  </label>

                  <input
                    type="number"
                    placeholder="Enter experience"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>

                {/* AGE */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Age
                  </label>

                  <input
                    type="number"
                    placeholder="Enter age"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                {/* QUALIFICATION */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Qualification
                  </label>

                  <input
                    type="text"
                    placeholder="Enter qualification"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                  />
                </div>

                {/* GENDER */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Gender
                  </label>

                  <select
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="mt-4">
                <label className="block mb-1 font-semibold text-gray-700">
                  Address
                </label>

                <textarea
                  placeholder="Enter address"
                  rows={3}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Hospital
                </label>

                <select
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
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
              </div>

              {/* DEPARTMENT */}
              <div className="mt-4">
                <label className="block mb-1 font-semibold text-gray-700">
                  Department
                </label>

                <select
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value="">Select Department</option>

                  {departments?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.departmentName}
                    </option>
                  ))}
                </select>
              </div>

              {/* SUB DEPARTMENT */}
              <div className="mt-4">
                <label className="block mb-1 font-semibold text-gray-700">
                  Sub Department
                </label>

                <select
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
                  value={subDepartmentId}
                  onChange={(e) => setSubDepartmentId(e.target.value)}
                >
                  <option value="">Select Sub Department</option>

                  {subDepartments
                    ?.filter((item) => item.departmentId?._id === departmentId)
                    .map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.SubdepartmentName}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Doctor Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="w-full border p-3 rounded-xl"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
                >
                  Submit
                </button>

                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition duration-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE POPUP */}
      {updatePopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">✏️ Update Doctor</h2>

              <button
                onClick={() => setUpdatePopup(false)}
                className="text-red-500 text-3xl"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={updateDoctor}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Name"
                className="border p-3 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="number"
                placeholder="Phone"
                className="border p-3 rounded-xl"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="number"
                placeholder="Experience"
                className="border p-3 rounded-xl"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />

              <input
                type="number"
                placeholder="Age"
                className="border p-3 rounded-xl"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <input
                type="text"
                placeholder="Qualification"
                className="border p-3 rounded-xl"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />

              <textarea
                placeholder="Address"
                className="border p-3 rounded-xl md:col-span-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button
                type="submit"
                className="bg-blue-600 text-white py-3 rounded-xl md:col-span-2"
              >
                Update Doctor
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SIDEBAR BG */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Hospital Menu</h2>

          <button
            onClick={() => setShowSidebar(false)}
            className="text-red-500 text-3xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <button
            onClick={() => navigate("/department")}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl"
          >
            Department
          </button>

          <button
            onClick={() => navigate("/subdepartment")}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl"
          >
            Sub Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
