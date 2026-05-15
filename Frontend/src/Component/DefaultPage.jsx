import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DefaultPage = () => {
  const [hospitals, setHospitals] = useState([]);
    const navigate = useNavigate();
  

  //get-all-hospital
  const getHospitals = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/Hospital/get-all-hospital");
      console.log(res.data.hospitals);
      setHospitals(res.data.hospitals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🏥 All Hospitals</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {hospitals.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-2xl p-5"
            onClick={() => navigate(`/hospital/${item._id}`)}
          >
            <h2 className="text-2xl font-bold text-blue-600">
              {item.hospitalName}
            </h2>

            <p className="text-gray-600 mt-2">
              <b>Email :</b> {item.hospitalEmail
}
            </p>

            <p className="text-gray-600">
              <b>Phone :</b> {item.hospitalPhone}
            </p>

            <p className="text-gray-600">
              <b>state :</b> {item.stateId?.state}
            </p>
 
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultPage;