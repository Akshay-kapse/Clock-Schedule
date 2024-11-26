import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Corrected condition to check both fields
    if (!email || !password) {
      toast.success("All fields are required");
      return;
    }

    // Create JSON object instead of FormData
    const payload = { email, password };

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/login/login",
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Set header to JSON
          },
        }
      );
      console.log(data);
      toast.success(data.message || "User Logged In Successfully");
      setEmail("");
      setPassword("");

      document.cookie = `token=${data.token}; path=/;`;
      
      navigateTo("/");
    } catch (error) {
      console.log("Error fetching data:", error);
      toast.error(
        error.response?.data?.message || "Please check your credentials"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen m-0 bg-[#0C67A0] font-sans">
      <div className="container flex items-center justify-center h-full w-full">
        <div className="bg-white p-5 rounded-lg shadow-md w-72">
          <form onSubmit={handleLogin}>
            <div className="flex justify-center items-center mb-5">
              <div className="mx-5 font-semibold text-xl">
                Clock<span className="font-bold text-blue-500">Schedule</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="mb-5 text-xl font-semibold">Login Form</h2>

              <label className="mb-1 text-sm">Email</label>
              <input
                className="p-2 mb-3 border border-gray-300 rounded"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
              />

              <label className="mb-1 text-sm">Password</label>
              <input
                className="p-2 mb-3 border border-gray-300 rounded"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <a
                href="#"
                className="text-blue-500 text-right mb-3 hover:underline"
              >
                Forgot Password?
              </a>

              <button
                type="submit"
                className="p-2 bg-[#033452] text-white rounded cursor-pointer hover:bg-[#02223f]"
              >
                Login
              </button>
              <p className="mt-4 text-center">
                New User?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Sign Up Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
