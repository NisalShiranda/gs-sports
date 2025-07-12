import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { GrGoogle } from 'react-icons/gr';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (res) => {
      setLoading(true);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
          accessToken: res.access_token,
        })
        .then((res) => {
          toast.success("Google Login Successful");
          localStorage.setItem("token", res.data.token);
          const user = res.data.user;
          navigate(user.role === "admin" ? "/admin" : "/");
          setLoading(false);
        })
        .catch(() => {
          toast.error("Google Login Failed");
          setLoading(false);
        });
    },
  });

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        toast.success("Login Successful");
        localStorage.setItem("token", res.data.token);
        const user = res.data.user;
        navigate(user.role === "admin" ? "/admin" : "/");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Login Failed");
        setLoading(false);
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/loginBg.jpg')" }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.png"
            alt="GS Sports Logo"
            className="w-24 h-24 rounded-full object-contain bg-white p-2 shadow-lg"
          />
        </div>

        {/* Headings */}
        <h2 className="text-3xl font-bold text-white text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-300 text-center">
          Login to your GS SPORTS account
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-black text-white font-semibold hover:opacity-90 transition cursor-pointer"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Google Login */}
        <button
          onClick={loginWithGoogle}
          className="w-full py-3 rounded-lg bg-white/20 text-white font-medium flex items-center justify-center hover:bg-white/30 transition cursor-pointer"
        >
          <GrGoogle className="mr-2" />
          {loading ? "Loading..." : "Login with Google"}
        </button>

        {/* Footer Links */}
        <div className="text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-400 hover:underline">
            Register
          </Link>
        </div>
        <div className="text-center text-sm text-gray-300">
          <Link to="/forget-password" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
