import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  // const token = localStorage.getItem("token");

  // const [showProfile, setShowProfile] = useState(false);
  // const [user, setUser] = useState({});

  // const getProfile = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     console.log("token>>>>>>", token);

  //     const res = await axios.get(
  //       "http://127.0.0.1:1010/superadmin/get-profile",
  //       {
  //         headers: {
  //           token,
  //         },
  //       },
  //     );

  //     console.log("res.data.user", res.data.user);
  //     setUser(res.data.user);
  //   } catch (error) {
  //     console.log(error);
  //     // alert(error.response.data.message);
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     getProfile();
  //   }
  // }, []);

  return (
    <div className="bg-blue-600 text-white px-10 py-4 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/addhospital")}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
        >
          Add Hospital
        </button>
      </div>

      {/* {token && (
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-full bg-white text-blue-600 font-bold text-lg flex justify-center items-center cursor-pointer"
          >
            {user.name}
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 bg-white text-black w-[250px] rounded-xl shadow-lg p-4">
              <h1 className="text-xl font-bold mb-3">Profile</h1>

              <p className="mb-2">
                <span className="font-semibold">Name :</span> {user.name}
              </p>

              <p className="mb-2">
                <span className="font-semibold">Email :</span> {user.email}
              </p>

              <p className="mb-2">
                <span className="font-semibold">Phone :</span> {user.phone}
              </p>

              <p className="mb-2">
                <span className="font-semibold">Role :</span> {user.role}
              </p>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="w-full bg-red-500 text-white p-2 rounded-lg mt-3"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Navbar;
