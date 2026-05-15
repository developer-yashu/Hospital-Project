import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
        const data={email,oldpassword,newpassword,}
      const res = await axios.post("http://127.0.0.1:1010/superadmin/reset-Password",data);
      alert(res.data.message);
      setEmail("");
      setOldPassword("");
      setNewPassword("");

    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleResetPassword}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Old Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={oldpassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter New Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Reset Password
        </button>

      </form>
    </div>
  );
};

export default ResetPassword;