import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TiShoppingCart } from 'react-icons/ti';
import logo from "../../public/logo.png"
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import Userdata from './Userdata';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current page is home page
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Courses', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    navigate('/login'); // Redirect to login
  };

  return (
    <header className={`w-full ${isHomePage ? 'fixed' : 'sticky'} top-0 z-50 py-4 px-6`}>
      {/* Main Navigation Container */}
      <div 
        className={`max-w-6xl mx-auto flex items-center justify-between px-8 py-3 rounded-full transition-all duration-300 ease-in-out ${
          scrolled 
            ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl' 
            : 'bg-white/10 backdrop-blur-sm shadow-lg border border-white/30'
        }`}
        style={{
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px)',
        }}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="group">
            <div className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="Company Logo" 
                className="h-10 w-[100px] border-0 rounded-full max-w-[120px] sm:h-12 sm:max-w-[140px] transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Nav - Centered */}
        <nav className="hidden md:flex gap-8 text-[15px] items-center font-medium">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`relative group transition-all duration-300 font-semibold px-4 py-2 rounded-full hover:bg-white/20 hover:backdrop-blur-sm ${
                scrolled 
                  ? 'text-gray-800 hover:text-red-500' 
                  : 'bg-gradient-to-r from-gray-800 to-red-500 bg-clip-text text-transparent hover:from-red-500 hover:to-red-600'
              }`}
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300 ease-in-out rounded-full"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/cart" className="relative group">
            <div className={`p-2 rounded-full transition-all duration-300 ${
              scrolled ? 'hover:bg-white/20 backdrop-blur-sm' : 'hover:bg-gray-100'
            }`}>
              <TiShoppingCart className="text-2xl text-gray-800 hover:text-red-500 transition-colors duration-300" />
            </div>
            <span className={`absolute -top-1 -right-1 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
              scrolled 
                ? 'bg-red-500/90 backdrop-blur-sm shadow-lg' 
                : 'bg-red-500'
            }`}>
              2
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className={`p-2 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer ${
              scrolled 
                ? 'bg-red-500/80 text-white hover:bg-red-600/90 shadow-lg' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            <FiLogOut className="text-lg" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden text-xl p-2 rounded-full transition-all duration-300 ${
            scrolled 
              ? 'text-gray-800 hover:bg-white/20 backdrop-blur-sm' 
              : 'text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full transform ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="flex flex-col p-6 space-y-6 text-lg">
          <button
            className="text-right text-2xl self-end p-2 rounded-full hover:bg-white/20 transition-all duration-300 text-gray-800"
            onClick={() => setMobileOpen(false)}
          >
            <FiX />
          </button>

          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-gray-800 hover:text-red-500 transition-all duration-300 p-3 rounded-lg hover:bg-white/20 backdrop-blur-sm"
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
              className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600/90 transition-all duration-300 flex items-center justify-center backdrop-blur-sm shadow-lg cursor-pointer"
            >
              <FiLogOut className="text-xl cursor-pointer" />
            </button>
            Logout
          </div>

          <Link
            to="/cart"
            className="flex items-center gap-2 mt-6 text-gray-800 hover:text-red-500 p-3 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <TiShoppingCart className="text-2xl" />
            Cart (2)
          </Link>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;