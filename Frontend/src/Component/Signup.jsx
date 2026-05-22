import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // basic validation
    if (!name || !email || !phone || !password) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);

      const data = { name, email, phone, password };

      const res = await axios.post(
        "http://127.0.0.1:1010/superadmin/signup",
        data
      );

      alert(res.data.message);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

      navigate("/login");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-200 p-4">

    <form
      onSubmit={handleSignup}
      className="relative bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-6 w-full max-w-sm border border-white/40"
    >

      {/* Background glow */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-cyan-400 rounded-full blur-3xl opacity-30"></div>

      {/* TITLE */}
      <h1 className="text-3xl font-extrabold text-center text-blue-700">
        Create Account 🚀
      </h1>

      <p className="text-center text-gray-500 mb-6 text-xs mt-1">
        Join hospital system quickly
      </p>

      {/* NAME */}
      <input
        type="text"
        placeholder="Enter Name"
        className="w-full border border-gray-200 p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Enter Email"
        className="w-full border border-gray-200 p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* PHONE */}
      <input
        type="text"
        placeholder="Enter Phone"
        className="w-full border border-gray-200 p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {/* PASSWORD */}
        <div className="relative mb-4">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg pr-20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-blue-600 font-semibold"
          >
            {showPassword  ? <EyeOff /> : <Eye />}
          </button>

        </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full p-3 rounded-lg font-bold text-white text-sm transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Creating..." : "Signup"}
      </button>

      {/* LOGIN LINK */}
      <p className="text-center mt-4 text-xs text-gray-600">
        Already have an account?{" "}
        <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
        
        <Link to={'/login'}>Login</Link>  
        </span>
      </p>

    </form>

  </div>
);
};

export default Signup;
