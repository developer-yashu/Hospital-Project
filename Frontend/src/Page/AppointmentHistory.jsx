import axios from "axios";
import React, {useEffect,useState,} from "react";

const AppointmentHistory = () => {
  const [appointments, setAppointments]=useState([]);

  const [loading, setLoading] =useState(false);

  const token =localStorage.getItem("token");

  const getAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:1010/superadmin/get-all-appointments",
        {headers: {Authorization: `Bearer ${token}`,},
        }
      );

     setAppointments(res.data.appointments);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        Appointment History
      </h1>

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
                  src={item.doctorId?.image || "https://cdn-icons-png.flaticon.com/512/387/387561.png"}
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-200"
                />
              </div>

              {/* DETAILS */}
              <div className="mt-5 space-y-3">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                  {item.doctorId?.name}
                </h2>

                <p className="text-gray-600">
                  👤 User :
                  {item.userID?.name}
                </p>

                <p className="text-gray-600">
                  🏥 Hospital :
                  {item.hospitalId?.hospitalName}
                </p>

                <p className="text-gray-600">
                  📅 Date :
                  {item.appointmentDate}
                </p>

                <p className="text-gray-600">
                  ⏰ Time : {item.appointmentTime}
                </p>

                <p>
                  Status :
                  <span
                    className={`ml-2 font-bold ${
                      item.status ===
                      "approved"
                        ? "text-green-600"
                        : item.status ===
                            "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;