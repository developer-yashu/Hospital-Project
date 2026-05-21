import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const DoctorMedicine = () => {
    const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);

  const token = localStorage.getItem("token");

  const getMedicines = async () => {

    try {

      const res = await axios.get("http://127.0.0.1:1010/Medicine/doctor-medicines",
        {headers: {Authorization: `Bearer ${token}`,},}
      );
      console.log(res.data.medicines);
      setMedicines(res.data.medicines);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedicines();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-8">

  <button
    onClick={() => navigate(-1)}
    className="px-5 py-2 bg-gray-800 text-white rounded-xl shadow-lg hover:bg-gray-900 hover:scale-105 transition duration-300"
  >
    ⬅ Back
  </button>

  <h1 className="text-4xl font-extrabold text-blue-700 tracking-wide">
    My Patients Medicines
  </h1>

  <div></div>

</div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {medicines?.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >

            <h1 className="text-2xl font-bold text-blue-700 mb-4">
              👤 {item.userId?.name}
            </h1>

            <p>
              💊 Medicine :
              <span className="font-bold">
                {" "}
                {item.medicineName}
              </span>
            </p>

            <p>
              🦠 Disease :
              <span className="font-bold">
                {" "}
                {item.DiseaseName}
              </span>
            </p>

            <p>
              🍴 Food Restriction :
              <span className="font-bold">
                {" "}
                {item.Food_Restrictions}
              </span>
            </p>

            <p>
              💰 Price :
              <span className="font-bold">
                {" "}
                ₹{item.price}
              </span>
            </p>

            <p>
              📅 Next Appointment :
              <span className="font-bold">
                {" "}
                {item.nextAppointmentDate?.split("T")[0]}
              </span>
            </p>

            

          </div>
        ))}

      </div>

    </div>
  );
};

export default DoctorMedicine;