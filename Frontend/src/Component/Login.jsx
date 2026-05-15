import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const res = await axios.post(
        "http://127.0.0.1:1010/superadmin/superadmin-login",data);
      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      alert("Login Success");

      if (res.data.role === "superadmin") {
        navigate("/Superadmin");
      } else if (res.data.role === "hospital") {
        navigate("/hospital-dashboard");
      }
    } catch (error) {
      console.log(error);
alert(error.response?.data?.message || "Login Failed");    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login Page</h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Login
        </button>

        <div className="flex justify-between items-center mt-4">
          <Link
            to="/reset-password"
            className="text-blue-600 hover:text-blue-800 font-semibold underline"
          >
            Reset Password
          </Link>

          <Link
            to="/signup"
            className="text-green-600 hover:text-green-800 font-semibold underline"
          >
            Signup
          </Link>
        </div>

      </form>
    </div>
  );
};

export default Login;
