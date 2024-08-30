import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        userData
      );
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      setError(
        error.response
          ? error.response.data.message
          : "An error occurred during registration"
      );

      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    setUserData({
      firstname: "",
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-1 text-center">Train Tracker</h2>
        <p className="text-2xl font-bold mb-6 text-center">Sign Up</p>
        <input
          type="text"
          placeholder="First Name"
          id="firstname"
          value={userData.firstname}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={userData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={userData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={userData.password}
          onChange={handleChange}
          className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleClick}
          className="w-full p-2 text-white font-bold rounded
               bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </button>
        {error && (
          <span className="text-red-500 mt-4 block">{error.message}</span>
        )}
      </div>
    </div>
  );
};

export default Register;
