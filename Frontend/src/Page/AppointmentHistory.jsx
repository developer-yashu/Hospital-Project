import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AppointmentHistory = () => {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [appointmentId, setAppointmentId] = useState("");

  const [medicineName, setMedicineName] = useState("");
  const [medicineType, setMedicineType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [DiseaseName, setDiseaseName] = useState("");
  const [Food_Restrictions, setFood_Restrictions] = useState("");
  const [nextAppointmentDate, setNextAppointmentDate] = useState("");

  const [tests, setTests] = useState([]);
  const [testId, setTestId] = useState("");

  const getAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://127.0.0.1:1010/superadmin/get-all-appointments",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setAppointments(res.data.appointments);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateReached = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1010/superadmin/update-reach/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert(res.data.message);
      getAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const addMedicine = async (e) => {
    e.preventDefault();

    try {
      const data = {
        medicineName,
        medicineType,
        price,
        description,
        DiseaseName,
        Food_Restrictions,
        AppointmentId: appointmentId,
        nextAppointmentDate,
      };

      const res = await axios.post(
        "http://127.0.0.1:1010/Medicine/add-medicine",
        data,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      alert(res.data.message);
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTests = async () => {
    const res = await axios.get("http://127.0.0.1:1010/Test/get-tests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data.tests);
    setTests(res.data.tests);
  };

  useEffect(() => {
    getAppointments();
    getTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TITLE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-blue-700 tracking-wide">
          Appointment History
        </h1>

        <div className="flex gap-4">
          <Link
            to="/user-medicines"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition duration-300"
          >
            💊 My Medicines
          </Link>

          <Link
            to="/doctor-medicines"
            className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition duration-300"
          >
            👨‍⚕️ Patient Medicines
          </Link>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            className="w-32"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              {/* DOCTOR IMAGE */}
              <div className="flex justify-center">
                <img
                  src={
                    item.doctorId?.image ||
                    "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                  }
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-200"
                />
              </div>

              {/* DETAILS */}
              <div className="mt-5 space-y-3">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                  {item.doctorId?.name}
                </h2>

                <p className="text-gray-600">👤 User :{item.userID?.name}</p>

                <p className="text-gray-600">
                  🏥 Hospital :{item.hospitalId?.hospitalName}
                </p>

                <p className="text-gray-600">📅 Date :{item.appointmentDate}</p>

                <p className="text-gray-600">
                  ⏰ Time : {item.appointmentTime}
                </p>
                <p>Reached :{item.isReached ? " Yes" : " No"}</p>

                <p>
                  Status :
                  <span
                    className={`ml-2 font-bold ${
                      item.status === "approved"
                        ? "text-green-600"
                        : item.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
                <button
                  onClick={() => updateReached(item._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl mt-3"
                >
                  Reached
                </button>

                {item.isReached && (
                  <button
                    onClick={() => {
                      setShowPopup(true);
                      setAppointmentId(item._id);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl mt-3"
                  >
                    Add Medicine
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[400px]">
            <h1 className="text-2xl font-bold mb-4">Add Medicine</h1>

            <form onSubmit={addMedicine} className="space-y-3">
              <input
                type="text"
                placeholder="Medicine Name"
                className="border w-full p-2 rounded"
                onChange={(e) => setMedicineName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Disease Name"
                className="border w-full p-2 rounded"
                onChange={(e) => setDiseaseName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Food Restrictions"
                className="border w-full p-2 rounded"
                onChange={(e) => setFood_Restrictions(e.target.value)}
              />

              <select
                className="border w-full p-2 rounded"
                onChange={(e) => setMedicineType(e.target.value)}
              >
                <option value="">Select Type</option>

                <option value="Tablet">Tablet</option>

                <option value="Capsule">Capsule</option>

                <option value="Syrup">Syrup</option>
              </select>

              <input
                type="number"
                placeholder="Price"
                className="border w-full p-2 rounded"
                onChange={(e) => setPrice(e.target.value)}
              />

              <textarea
                placeholder="Description"
                className="border w-full p-2 rounded"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="date"
                className="border w-full p-2 rounded"
                onChange={(e) => setNextAppointmentDate(e.target.value)}
              />
              <select
                value={testId}
                onChange={(e) => setTestId(e.target.value)}
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select Test</option>

                {tests.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.testName} - ₹{t.charge}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-xl w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
