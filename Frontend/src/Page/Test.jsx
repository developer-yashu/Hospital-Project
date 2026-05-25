// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Plus, X } from "lucide-react";

// const AddTestPopup = () => {
//   const token = localStorage.getItem("token");

//   const [open, setOpen] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [tests, setTests] = useState([]);

//   const [testName, setTestName] = useState("");
//   const [departmentId, setDepartmentId] = useState("");
//   const [charge, setCharge] = useState("");
//   const [precautions, setPrecautions] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = { testName, charge, precautions, departmentId };

//       const res = await axios.post(
//         "http://127.0.0.1:1010/Test/add-test",
//         data,
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       alert(res.data.message);
//       setTestName("");
//       setCharge("");
//       setPrecautions("");
//       setOpen(false);
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message);
//     }
//   };

//   // get departments
//   const getDepartments = async () => {
//     try {
//       const res = await axios.get(
//         "http://127.0.0.1:1010/Department/get-all-department",
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       setDepartments(res.data.Department);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const TestGet = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:1010/Test/get-tests", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("res>>>>>>>>>", res);
//       setTests(res.data.tests);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getDepartments();
//     TestGet();
//   }, []);

//   return (
//     <div className="p-6">
//       {/* BUTTON */}
//       <button
//         onClick={() => setOpen(true)}
//         className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
//       >
//         <Plus size={18} />
//         Add Test
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {tests.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
//           >
//             {/* TOP SECTION */}
//             <div className="bg-gradient-to-r from-blue-700 to-cyan-500 p-4 text-white">
//               <h2 className="text-xl font-bold tracking-wide capitalize">
//                 {item.testName}
//               </h2>
//               <p className="text-xs mt-1 opacity-90">
//                 Medical Test Information
//               </p>
//             </div>

//             {/* BODY */}
//             <div className="p-4 space-y-4">
//               {/* CHARGE */}
//               <div className="flex items-center justify-between bg-green-50 p-3 rounded-xl border border-green-100">
//                 <span className="font-semibold text-gray-700">💰 Charge</span>
//                 <span className="text-lg font-bold text-green-700">
//                   ₹{item.charge}
//                 </span>
//               </div>

//               {/* DEPARTMENT */}
//               <div className="flex items-center justify-between bg-blue-50 p-3 rounded-xl border border-blue-100">
//                 <span className="font-semibold text-gray-700">
//                   🏥 Department
//                 </span>
//                 <span className="font-bold text-blue-700">
//                   {item.departmentId?.departmentName}
//                 </span>
//               </div>

//               {/* PRECAUTIONS */}

//               <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl">
//                 <p className="font-semibold text-yellow-700 mb-1">
//                   ⚠ Precautions
//                 </p>
//                 <p className="text-gray-700 text-sm">{item.precautions}</p>
//               </div>

//               {/* STATUS */}

//               <div className="flex items-center justify-between">
//                 <span className="font-semibold text-gray-700">Status</span>

//                 <span
//                   className={`px-4 py-1 rounded-full text-sm font-bold ${
//                     item.status === "active"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {item.status}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* POPUP */}
//       {open && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative">
//             {/* CLOSE */}
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
//             >
//               <X size={18} />
//             </button>

//             <h2 className="text-2xl font-bold text-center text-blue-700 mb-5">
//               Add Test
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Test Name"
//                 value={testName}
//                 onChange={(e) => setTestName(e.target.value)}
//                 className="w-full border p-3 rounded-lg"
//               />

//               <input
//                 type="number"
//                 placeholder="Charge"
//                 value={charge}
//                 onChange={(e) => setCharge(e.target.value)}
//                 className="w-full border p-3 rounded-lg"
//               />

//               <textarea
//                 placeholder="Precautions"
//                 value={precautions}
//                 onChange={(e) => setPrecautions(e.target.value)}
//                 className="w-full border p-3 rounded-lg"
//               />

//               <select
//                 value={departmentId}
//                 onChange={(e) => setDepartmentId(e.target.value)}
//                 className="w-full border p-3 rounded-lg"
//               >
//                 <option>Select Department</option>
//                 {departments.map((d) => (
//                   <option key={d._id} value={d._id}>
//                     {d.departmentName}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700"
//               >
//                 Save Test
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddTestPopup;





import React, { useEffect, useState } from "react";
import axios from "axios";
import {Plus,X,Eye,Pencil,Trash2,RotateCcw,Ban,TestTube,IndianRupee,ShieldAlert,Building2,} from "lucide-react";

const AddTestPopup = () => {
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);

  const [tests, setTests] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [testName, setTestName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [charge, setCharge] = useState("");
  const [precautions, setPrecautions] = useState("");

  // update
  // const [editId, setEditId] = useState(null);
  // const [editTest, setEditTest] = useState("");

  // single view
  const [singleTest, setSingleTest] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);

  //TestGet
  const TestGet = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/Test/get-tests",
        {headers: {Authorization: `Bearer ${token}`,},});
      setTests(res.data.tests);
    } catch (error) {
      console.log(error);
    }
  };

  //  getDepartments

  const getDepartments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/Department/get-all-department",
        {headers: {Authorization: `Bearer ${token}`,},});

      setDepartments(res.data.Department);
    } catch (error) {
      console.log(error);
    }
  };

  // add test 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {testName,charge,precautions,departmentId,};
      const res = await axios.post("http://127.0.0.1:1010/Test/add-test",
        data,{headers: {Authorization: `Bearer ${token}`,},});
      alert(res.data.message);
      setTestName("");
      setCharge("");
      setPrecautions("");
      setDepartmentId("");
     setOpen(false);
      TestGet();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  // getSingleTest
  const getSingleTest = async (id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:1010/Test/get-test/${id}`,
        {headers: {Authorization: `Bearer ${token}`,},});
      setSingleTest(res.data.test);
      setShowViewPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

// deleteTest

  const deleteTest = async (id) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:1010/Test/delete-test/${id}`,
        {headers: {Authorization: `Bearer ${token}`,},});
      alert(res.data.message);
      TestGet();
    } catch (error) {
      console.log(error);
    }
  };

  // softDelete
  const softDelete = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/Test/soft-delete-test/${id}`,
        {},{headers: {Authorization: `Bearer ${token}`,},});
      // alert(res.data.message);
      TestGet();
    } catch (error) {
      console.log(error);
    }
  };

  //restoreTest
  const restoreTest = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/Test/restore-test/${id}`,
        {},{headers: {Authorization: `Bearer ${token}`,},}
      );
      // alert(res.data.message);
      TestGet();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    TestGet();
    getDepartments();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* TOP BAR */}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <TestTube className="text-blue-600" size={34} />
          All Medical Tests
        </h1>

        <button
          onClick={() => {
            setOpen(true);
            setEditId(null);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition"
        >
          <Plus size={18} />
          Add Test
        </button>
      </div>

      {/* TEST CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* TOP */}

            <div className="bg-gradient-to-r from-blue-700 to-cyan-500 p-5 text-white flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold capitalize">
                  {item.testName}
                </h2>

                <p className="text-sm opacity-90 mt-1">
                  Medical Test Details
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => getSingleTest(item._id)}
                  className="bg-white/20 p-2 rounded-lg hover:bg-white/30"
                >
                  <Eye size={16} />
                </button>

                <button
                  className="bg-white/20 p-2 rounded-lg hover:bg-white/30"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => deleteTest(item._id)}
                  className="bg-white/20 p-2 rounded-lg hover:bg-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* BODY */}

            <div className="p-5 space-y-4">
              {/* CHARGE */}

              <div className="flex items-center justify-between bg-green-50 border border-green-100 p-3 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <IndianRupee size={18} />
                  Charge
                </div>

                <span className="text-green-700 font-bold text-lg">
                  ₹{item.charge}
                </span>
              </div>

              {/* DEPARTMENT */}

              <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-3 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <Building2 size={18} />
                  Department
                </div>

                <span className="font-bold text-blue-700">
                  {item.departmentId?.departmentName}
                </span>
              </div>

              {/* PRECAUTIONS */}

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-yellow-700 font-semibold">
                  <ShieldAlert size={18} />
                  Precautions
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.precautions}
                </p>
              </div>

              {/* STATUS */}

              <div className="flex items-center justify-between pt-2">
                <span className="font-medium text-gray-700">Status</span>

                <div className="flex gap-2">
                  {item.status === "inactive" ? (
                    <button
                      onClick={() => restoreTest(item._id)}
                      className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold hover:bg-green-200"
                    >
                      <RotateCcw size={14} />
                      Restore
                    </button>
                  ) : (
                    <button
                      onClick={() => softDelete(item._id)}
                      className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold hover:bg-red-200"
                    >
                      <Ban size={14} />
                      Active
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD POPUP */}

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-3xl shadow-2xl relative">
            {/* CLOSE */}

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
            >
              <X size={18} />
            </button>

            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
              Add Medical Test
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Test Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
              />

              <input
                type="number"
                placeholder="Charge"
                value={charge}
                onChange={(e) => setCharge(e.target.value)}
                className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
              />

              <textarea
                placeholder="Precautions"
                value={precautions}
                onChange={(e) => setPrecautions(e.target.value)}
                className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
              />

              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select Department</option>

                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.departmentName}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-bold transition"
              >
                Save Test
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW POPUP */}

      {showViewPopup && singleTest && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-blue-700 mb-5">
              Test Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Test Name</span>
                <span className="font-semibold">
                  {singleTest.testName}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Charge</span>
                <span className="font-semibold">
                  ₹{singleTest.charge}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Department</span>
                <span className="font-semibold">
                  {singleTest.departmentId?.departmentName}
                </span>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Precautions</p>

                <p className="bg-yellow-50 border border-yellow-100 p-3 rounded-xl text-sm">
                  {singleTest.precautions}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowViewPopup(false);
                setSingleTest(null);
              }}
              className="mt-6 w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTestPopup;