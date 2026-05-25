import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewDefaultPage = () => {
  const { hospitalId } = useParams();
  const [hospital, setHospital] = useState({});
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const [appointmentTime, setAppointmentTime] = useState({});

  const GetHospital = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://127.0.0.1:1010/Hospital/get-one-hospital/${hospitalId}`,
      );
      console.log("get-one-hospital", res.data.hospitals);
      setHospital(res.data.hospitals);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Failed to fetch hospital details",
      );
    }
  };

  const getDoctorsByHospital = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:1010/Doctor/get-all-Doctor-by-hospital/${hospitalId}`,
      );

      setDoctors(res.data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetHospital();
    getDoctorsByHospital();
  }, [hospitalId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="loading"
          className="w-120 h-120"
        />
      </div>
    );
  }

  // const handleAppointment = async (doctorId) => {
  //   const token = localStorage.getItem("token");
  //   const time = appointmentTime[doctorId];

  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }
  //   try {
  //     const data = {
  //       doctorId,
  //       hospitalId,
  //       appointmentDate: new Date().toISOString().split("T")[0],
  //       appointmentTime: time,
  //     };
  //     const res = await axios.post(
  //       "http://127.0.0.1:1010/superadmin/add-appointment",
  //       data,
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     );

  //     alert("Appointment Booked Successfully");

  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //     alert(error.response?.data?.message || "Appointment failed");
  //   }
  // };


const handleAppointment = async (doctorId) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // LOGIN NAHI
  if (!token) {
    navigate("/login");
    return;
  }

  // ONLY USER ALLOWED
  if (role !== "user") {
    alert("Only User Can Book Appointment");
     navigate("/login");  
    return;
  }

  const time = appointmentTime[doctorId];

  try {
    const data = {
      doctorId,
      hospitalId,
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: time,
    };

    const res = await axios.post(
      "http://127.0.0.1:1010/superadmin/add-appointment",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Appointment Booked Successfully");

    console.log(res.data);

  } catch (error) {
    console.log(error);

    alert(error.response?.data?.message || "Appointment failed");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-10 px-4">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HOSPITAL CARD */}
        <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 flex flex-col lg:flex-row gap-8 items-center">
            {/* IMAGE */}
            <div className="w-full lg:w-[320px] flex justify-center">
              <img
                src={
                  hospital.image ||
                  "https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
                }
                alt="hospital"
                className="w-full h-60 object-cover rounded-3xl border-4 border-white shadow-2xl"
              />
            </div>

            {/* INFO */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                🏥 {hospital.hospitalName || "Hospital Name"}
              </h1>

              <div className="space-y-3 text-lg">
                <p className="flex items-center gap-2">
                  <span className="text-2xl">📧</span>
                  {hospital.hospitalEmail || "No Email"}
                </p>

                <p className="flex items-center gap-2">
                  <span className="text-2xl">📞</span>
                  {hospital.hospitalPhone || "No Phone"}
                </p>

                <p className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  {hospital.CityId?.city}, {hospital.districtId?.district},{" "}
                  {hospital.stateId?.state}
                </p>
              </div>

              {/* STATUS */}
              <div className="mt-6">
                <span
                  className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg ${
                    hospital.status === "approved"
                      ? "bg-green-500"
                      : hospital.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-400 text-black"
                  }`}
                >
                  {hospital.status || "Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Hospital Details
              </h2>

              <div className="h-1 w-24 bg-blue-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Registration Number",
                  value: hospital.registrationNumber,
                  icon: "📝",
                },
                {
                  title: "Emergency Helpline",
                  value: hospital.emergencyhelpine,
                  icon: "🚑",
                },
                {
                  title: "Total Beds",
                  value: hospital.totalbad,
                  icon: "🛏️",
                },
                {
                  title: "ICU Beds",
                  value: hospital.icubad,
                  icon: "💉",
                },
                {
                  title: "Operation Theaters",
                  value: hospital.operationTheaters,
                  icon: "🏨",
                },
                {
                  title: "Ambulance Count",
                  value: hospital.ambulancecount,
                  icon: "🚨",
                },
                {
                  title: "License Number",
                  value: hospital.LicenseNumber,
                  icon: "📜",
                },
                {
                  title: "CEO",
                  value: hospital.CEO,
                  icon: "👨‍💼",
                },
                {
                  title: "State",
                  value: hospital.stateId?.state,
                  icon: "🌍",
                },
                {
                  title: "District",
                  value: hospital.districtId?.district,
                  icon: "🗺️",
                },
                {
                  title: "City",
                  value: hospital.CityId?.city,
                  icon: "🏙️",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-5 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{item.icon}</span>

                    <p className="text-gray-500 text-sm font-medium">
                      {item.title}
                    </p>
                  </div>

                  <h2 className="text-lg font-bold text-gray-800 break-words">
                    {item.value || "Not Available"}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DOCTORS SECTION */}
        <div>
          {/* TITLE */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800">
              👨‍⚕ Hospital Doctors
            </h1>

            <div className="h-1 w-24 bg-blue-500 rounded-full"></div>
          </div>

          {/* DOCTORS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {doctors.length > 0 ? (
              doctors.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
                >
                  {/* TOP */}
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-28 relative">
                    <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
                      <img
                        src={
                          item.image ||
                          "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                        }
                        alt="doctor"
                        className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
                      />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="pt-20 pb-6 px-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {item.name}
                      </h2>

                      <p className="text-blue-600 font-medium mt-1">
                        {item.departmentId?.departmentName}
                      </p>
                    </div>

                    {/* INFO */}
                    <div className="mt-6 space-y-4 text-gray-600">
                      <div className="flex items-start gap-3">
                        <span className="text-lg">📧</span>
                        <p className="break-all">{item.email}</p>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-lg">📞</span>
                        <p>{item.phone}</p>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-lg">⭐</span>
                        <p>{item.experience} Years Experience</p>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-lg">🎓</span>
                        <p>{item.qualification}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <select
                        value={appointmentTime[item._id] || ""}
                        onChange={(e) =>
                          setAppointmentTime({
                            ...appointmentTime,
                            [item._id]: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Time Slot</option>
                        <option value="9-11">9 AM - 11 AM</option>
                        <option value="1-3">1 PM - 3 PM</option>
                        <option value="7-9">7 PM - 9 PM</option>
                      </select>
                      <button
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition duration-300 shadow-md"
                        onClick={() => handleAppointment(item._id)}
                      >
                        Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
                    alt="no doctors"
                    className="w-32 mx-auto mb-6"
                  />

                  <h2 className="text-3xl font-bold text-gray-700">
                    No Doctors Found
                  </h2>

                  <p className="text-gray-500 mt-3">
                    This hospital currently has no doctors available.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDefaultPage;
