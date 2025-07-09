import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Userdata() {

const [user, setUser] = useState(null);
const token = localStorage.getItem("token");

useEffect(() => {
    if(token!=null){
     axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then((response) => {
        setUser(response.data.user);
    }).catch((error) => {
        console.error("Error fetching user data:", error);
        setUser(null);
    })
}
}, [token]);

  return (
    <div>
      {
        user==null?
        <div className="w-full h-full flex justify-center items-center flex-row">
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</Link>
            <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md ml-4">Register</Link>
        </div>
        :<div className="w-full h-full flex justify-center items-center flex-row ">
            <Link to="/profile" className="bg-blue-500 text-white px-4 py-2 rounded-md">Profile</Link>
            <Link to="/logout" className="bg-red-500 text-white px-4 py-2 rounded-md ml-4" onClick={() => {
                // Handle logout logic here
                setUser(null);
                localStorage.removeItem("token");
                window.location = "/login"; // Redirect to login page
            }}>Logout</Link>
        </div>
      }
    </div>
  )
}

export default Userdata
