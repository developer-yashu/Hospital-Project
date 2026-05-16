import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ViewDoctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(false);

  const getDoctor = async () => {
      try {
        setLoading(true);

      const res = await axios.get(`http://127.0.0.1:1010/Doctor/get-One-Doctor/${id}`,);
      setDoctor(res.data.doctor);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

 if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="loading"
          className="w-20 h-20"
        />
      </div>
    );
  }

  if (!doctor) {
    return <h2 className="p-6">No Doctor Found</h2>;
  }

return (
  <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
    <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl">

      {/* IMAGE */}
      <div className="flex justify-center mb-6">
        <LazyLoadImage
                       effect="blur"
          src={doctor.image}
          alt="doctor"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-300 shadow-lg"
        />
      </div>

      {/* NAME */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {doctor.name}
      </h2>

      {/* INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

        <p><b>Email:</b> {doctor.email}</p>
        <p><b>Phone:</b> {doctor.phone}</p>
        <p><b>Experience:</b> {doctor.experience} years</p>
        <p><b>Gender:</b> {doctor.gender}</p>
        <p><b>Age:</b> {doctor.age}</p>
        <p><b>Qualification:</b> {doctor.qualification}</p>
        <p className="md:col-span-2"><b>Address:</b> {doctor.address}</p>

        <p><b>Hospital:</b> {doctor.hospitalId?.hospitalName}</p>
        <p><b>Department:</b> {doctor.departmentId?.departmentName}</p>
        <p><b>Sub Department:</b> {doctor.subDepartmentId?.SubdepartmentName}</p>
        <p><b>Role:</b> {doctor.role}</p>

        <p>
          <b>Joining Date:</b>{" "}
          {doctor.createdAt?.split("T")[0]}
        </p>

        {/* STATUS BADGE */}
        <p>
          <b>Status:</b>{" "}
          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${
              doctor.status === "active"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {doctor.status}
          </span>
        </p>

      </div>
    </div>
  </div>
);
};

export default ViewDoctor;
