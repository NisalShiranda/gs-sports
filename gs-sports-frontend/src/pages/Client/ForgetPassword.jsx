import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    // const [status,setStatus] = useState("email-input"); //email-send,
    const [emailSent, setEmailSent] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    function sendEmail() {
        if (!email || email.trim() === "") {
          toast.error("Please enter a valid email address.");
          return;
        }
      
        console.log("Sending to:", import.meta.env.VITE_BACKEND_URL);
      
        axios
          .post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendMail", {
            email: email,
          })
          .then((res) => {
            console.log(res.data);
            setEmailSent(true);
            toast.success("Email sent successfully! Please check your inbox.");
          })
          .catch((err) => {
            console.error("Error response:", err?.response);
            toast.error("Failed to send email. Please try again.");
          });
      }

      function changePassword(e){
        e.preventDefault(); // 👈 Prevent form submission
      
        if(password !== confirmPassword){
          toast.error("Passwords do not match.");
          return;
        }
      
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/changePw", {
          email: email,
          otp: otp,
          password: password
        }).then((res) => {
          console.log(res.data);
          toast.success("Password changed successfully!");
          navigate("/login");
        }).catch((err) => {
          console.error("Error response:", err?.response);
          toast.error("Failed to change password. Please check your OTP and try again.");
          window.location.reload();
        });
      }
      
      

  return (
   <div>
    {emailSent ? 
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
          Reset Password
        </h2>
        <p className="text-sm text-gray-300 text-center">
          Enter your OTP and new password
        </p>

        {/* OTP */}
        <input
          type="text"
          placeholder="OTP"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setOtp(e.target.value)}
        />

        {/* New Password */}
        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Reset Password Button */}
        <button
          onClick={changePassword}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-black text-white font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Reset Password
        </button>
      </div>
    </div>:
    
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
          Forget Password
        </h2>
        <p className="text-sm text-gray-300 text-center">
          Enter your email to receive a reset link
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />

        {/* Send Reset Link Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            sendEmail();
          }}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-black text-white font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Send Reset Link
        </button>
      </div>
    </div>
    
    
    }
        
   </div>
  )
}

export default ForgetPassword