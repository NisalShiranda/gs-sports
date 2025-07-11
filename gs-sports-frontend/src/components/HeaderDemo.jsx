import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TiShoppingCart } from 'react-icons/ti';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import Userdata from './Userdata';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Courses', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
    
  ];

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    navigate('/login'); // Redirect to login
  };

  return (
    <header className="w-full h-[70px] bg-white text-gray-800 flex items-center justify-between px-6 shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-red-600">
        <Link to="/">GS SPORTS</Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 text-[16px] items-center font-medium">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="relative group transition"
          >
            {link.name}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </Link>
        ))}
      </nav>

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center gap-4">
       

        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          <FiLogOut className="text-xl" />
        </button>

        <Link to="/cart" className="relative group ml-2">
          <TiShoppingCart className="text-3xl hover:text-red-500 transition" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            2
          </span>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="flex flex-col p-6 space-y-6 text-lg">
          <button
            className="text-right text-2xl self-end"
            onClick={() => setMobileOpen(false)}
          >
            <FiX />
          </button>

          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-gray-800 hover:text-red-500 transition"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex gap-4 mt-4">
            

            <button
              onClick={() => {
                handleLogout();
                setMobileOpen(false);
              }}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center justify-center"
            >
              <FiLogOut className="text-xl cursor-pointer" />
            </button>
          </div>

          <Link
            to="/cart"
            className="flex items-center gap-2 mt-6 text-gray-800 hover:text-red-500"
            onClick={() => setMobileOpen(false)}
          >
            <TiShoppingCart className="text-2xl" />
            Cart (2)
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
