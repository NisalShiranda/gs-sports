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
    <div>
        <div className="w-full h-screen flex justify-center items-center">
            <form className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                <div className="mb-4">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                    <input type="text" id="otp" name="otp" 
                    required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setOtp(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" id="password" name="password" 
                    required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" 
                    required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={changePassword}>
  Reset Password
</button>

            </form>
        </div>
    </div>:
    
        <div className="w-full h-screen flex justify-center items-center">
            <form className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Forget Password</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" 
                required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                value={email} />
            </div>
            <button
  type="submit"
  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
  onClick={(e) => {
    e.preventDefault();
    sendEmail();
  }}
>
  Send Reset Link
</button>

            </form>
        </div>
    
    
    }
        
   </div>
  )
}

export default ForgetPassword
