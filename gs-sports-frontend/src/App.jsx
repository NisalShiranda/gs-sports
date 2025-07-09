import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/AdminPage'

import { Toaster } from 'react-hot-toast'
import ImageUploadTesting from './pages/Admin/ImageUploadTesting'
import RegisterPage from './pages/Client/Register'
import HomePage from './pages/HomePage'
import Checkout from './pages/Client/Checkout'
import LoginPage from './pages/LoginPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPassword from './pages/Client/ForgetPassword'


function App() {
  

  return (
    <>
     <GoogleOAuthProvider clientId="24190198160-j2hrn584q49m2orouoh7ndmc7i35luld.apps.googleusercontent.com">
     <BrowserRouter>
     <Toaster position="top-right" />
        <Routes path="/*">
          <Route path="/*" element={<HomePage/>} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<>404 Not Found</>} />
          <Route path="/testingImage" element={<ImageUploadTesting />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
         
        </Routes>
     </BrowserRouter>
     </GoogleOAuthProvider>
    </>
  )
}

export default App
