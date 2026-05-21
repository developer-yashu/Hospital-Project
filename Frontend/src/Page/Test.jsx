import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";

const AddTestPopup = () => {
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  const [testName, setTestName] = useState("");
   const [departmentId, setDepartmentId] = useState("");
  const [charge, setCharge] = useState("");
  const [precautions, setPrecautions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {testName,charge,precautions,departmentId};

      const res = await axios.post("http://127.0.0.1:1010/Test/add-test",
        data,{headers: {Authorization: `Bearer ${token}`,},});
      alert(res.data.message);
      setTestName("");
      setCharge("");
      setPrecautions("");
      setOpen(false);
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

    useEffect(() => {
      getDepartments();
    }, []);

  return (
    <div className="p-6">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
      >
        <Plus size={18} />
        Add Test
      </button>

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative">

            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
            >
              <X size={18} />
            </button>

            <h2 className="text-2xl font-bold text-center text-blue-700 mb-5">
              Add Test
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Test Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="number"
                placeholder="Charge"
                value={charge}
                onChange={(e) => setCharge(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                placeholder="Precautions"
                value={precautions}
                onChange={(e) => setPrecautions(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />


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

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700"
              >
                Save Test
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AddTestPopup;
