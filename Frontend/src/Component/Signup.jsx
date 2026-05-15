import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const data = { name, email, phone, password };

      const res = await axios.post("http://127.0.0.1:1010/superadmin/signup", data);
      alert(res.data.message);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border p-3 rounded-lg mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Phone"
          className="w-full border p-3 rounded-lg mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
