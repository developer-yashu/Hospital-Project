import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:1010/superadmin/superadmin-login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Success");

      const role = res.data.role;

      if (role === "superadmin") navigate("/Superadmin");
      else if (role === "hospital") navigate("/hospital-dashboard");
      else if (role === "doctor") navigate("/Doctor-dashboard");
      else if (role === "lab") navigate("/TestDashboard");

      else navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-200 p-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white"
      >

        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          Welcome Back 👋
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-4 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="relative mb-6">
          <input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition duration-300 flex justify-center items-center"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* LINKS */}
        <div className="flex justify-between mt-5 text-sm">

          <Link to="/reset-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>

          <Link to="/signup" className="text-green-600 hover:underline">
            Create Account
          </Link>

        </div>

      </form>

    </div>
  );
};

export default Login;
