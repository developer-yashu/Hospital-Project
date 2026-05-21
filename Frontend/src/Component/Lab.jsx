import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";

const Lab = () => {
  const token = localStorage.getItem("token");

  const [Popup, setPopup] = useState(false);
  const [departments, setDepartments] = useState([]);

  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [labName, setLabName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { labName, email, phone, departmentId, experience, status };

      const res = await axios.post(
        "http://127.0.0.1:1010/AddLab/add-lab",
        data,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      alert(res.data.message);
      setLabName("");
      setEmail("");
      setPhone("");
      setDepartmentId("");
      setExperience("");
      setStatus("active");
      setPopup(false);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  // get departments
  const getDepartments = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:1010/Department/get-all-department",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setDepartments(res.data.Department);
    } catch (error) {
      console.log(error);
    }
  };

  const getLabs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:1010/AddLab/get-labs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.labs);
      setLabs(res.data.labs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteLab = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:1010/AddLab/delete-lab/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getLabs();
    } catch (error) {
      console.log(error);
    }
  };

  const softDelete = async (id) => {
    await axios.put(
      `http://127.0.0.1:1010/AddLab/soft-delete-lab/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    getLabs();
  };

  const restoreLab = async (id) => {
    await axios.put(
      `http://127.0.0.1:1010/AddLab/restore-lab/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    getLabs();
  };

  useEffect(() => {
    getDepartments();
    getLabs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      {" "}
      {/* HEADER */}{" "}
      <div className="flex items-center justify-between mb-10">
        {" "}
        <h1 className="text-4xl font-extrabold text-blue-700">
          {" "}
          🧪 Labs Management{" "}
        </h1>{" "}
        <button
          onClick={() => setPopup(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-lg font-semibold transition"
        >
          {" "}
          <Plus size={20} /> Add Lab{" "}
        </button>{" "}
      </div>{" "}
      {/* LAB CARDS */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {" "}
        {labs.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
          >
            {" "}
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              {" "}
              🧪 {item.labName}{" "}
            </h2>{" "}
            <p className="text-gray-600">📧 {item.email}</p>{" "}
            <p className="text-gray-600">📞 {item.phone}</p>{" "}
            <p className="text-gray-600">
              {" "}
              🏥 {item.departmentId?.departmentName}{" "}
            </p>{" "}
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold ${item.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {" "}
              {item.status}{" "}
            </span>{" "}
            {/* BUTTONS */}{" "}
            <div className="flex gap-2 mt-4">
              {" "}
              <button
                onClick={() => deleteLab(item._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                {" "}
                Delete{" "}
              </button>{" "}
              <button
                onClick={() => softDelete(item._id)}
                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
              >
                {" "}
                Soft{" "}
              </button>{" "}
              <button
                onClick={() => restoreLab(item._id)}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                {" "}
                Restore{" "}
              </button>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {/* POPUP */}{" "}
      {Popup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          {" "}
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
            {" "}
            {/* CLOSE */}{" "}
            <button
              onClick={() => setPopup(false)}
              className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full"
            >
              {" "}
              <X size={16} />{" "}
            </button>{" "}
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
              Add New Lab
            </h2> 
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Lab Name"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                className="w-full border p-3 rounded-lg"
              /> 
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />{" "}
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full border p-3 rounded-lg"
              >
                <option>Select Department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.departmentName}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border p-3 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Add Lab
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lab;
