import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GetOneHospital = () => {
  const { hospitalId } = useParams();

  const [hospital, setHospital] = useState({});
//   const [loading, setLoading] = useState(false);

  const GetHospital = async () => {
    try {
    //   setLoading(true);
      const res = await axios.get(
        `http://127.0.0.1:1010/Hospital/get-one-hospital/${hospitalId}`,
      );
      console.log("get-one-hospital", res.data.hospitals);
      setHospital(res.data.hospitals);
    //   setLoading(false);
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message,
      );
    }
  };

  useEffect(() => {
    GetHospital();
    }, [hospitalId]);

    
  return <div>
      <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">
          {/* HEADER */}
          <div className="bg-gradient-to-r mt-1 from-blue-600 to-cyan-500 p-8 flex flex-col lg:flex-row gap-8 items-center">
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

  </div>;
};

export default GetOneHospital;
