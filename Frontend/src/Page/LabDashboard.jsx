import React, { useEffect, useState } from "react";
import axios from "axios";

const LabDashboard = () => {

  const token = localStorage.getItem("token");

  const [tests, setTests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [selectedTest, setSelectedTest] = useState("");

  const [description, setDescription] = useState("");

  const [reportImage, setReportImage] = useState("");

  // =========================
  // GET LAB TESTS
  // =========================

  const getLabTests = async () => {
    try {

      const res = await axios.get(
        "http://127.0.0.1:1010/Medicine/lab-tests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTests(res.data.tests);

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // SUBMIT REPORT
  // =========================

  const submitReport = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("testId", selectedTest);
      formData.append("description", description);
      formData.append("reportImage", reportImage);

      const res = await axios.post(
        "http://127.0.0.1:1010/TestReport/add-test-report",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      setShowPopup(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLabTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-8">
        Lab Assigned Tests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {tests?.map((item) => (

          <div
            key={item._id}
            className="bg-white p-5 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold text-blue-700">
              {item.testId?.testName}
            </h2>

            <p>👤 Patient: {item.userId?.name}</p>

            <p>👨‍⚕️ Doctor: {item.doctorId?.name}</p>

            <p>💊 Medicine: {item.medicineName}</p>

            <p>📅 Next Date: {item.nextAppointmentDate?.split("T")[0]}</p>

            <button
              onClick={() => {
                setShowPopup(true);
                setSelectedTest(item.testId?._id);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-xl mt-4"
            >
              Upload Report
            </button>

          </div>

        ))}

      </div>

      {/* POPUP */}

      {showPopup && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-[400px]">

            <h1 className="text-2xl font-bold mb-4">
              Upload Test Report
            </h1>

            <form
              onSubmit={submitReport}
              className="space-y-4"
            >

              <textarea
                placeholder="Report Description"
                className="w-full border p-3 rounded-lg"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="file"
                className="w-full border p-2 rounded-lg"
                onChange={(e) =>
                  setReportImage(e.target.files[0])
                }
              />

              <button
                type="submit"
                className="bg-blue-600 text-white w-full py-3 rounded-xl"
              >
                Submit Report
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default LabDashboard;