import React, { useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Userdata from './Userdata';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
    { name: 'Reviews', path: '/reviews' },
  ];

  return (
    <header className="w-full h-[70px] bg-white text-gray-800 flex items-center justify-between px-6 shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-red-600">
        <Link to="/">GS SPORTS</Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 text-lg font-medium items-center">
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

      {/* Right Icons */}
      <div className="hidden md:flex items-center gap-4">
        <Userdata />
        <Link to="/cart" className="relative">
          <TiShoppingCart className="text-3xl hover:text-red-500 transition" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">2</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <div className="flex flex-col p-6 space-y-6 text-lg">
          <button className="text-right text-2xl" onClick={() => setMobileOpen(false)}><FiX /></button>
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
          <div className="mt-4"><Userdata /></div>
          <Link to="/cart" className="flex items-center gap-2 mt-4 text-gray-800 hover:text-red-500">
            <TiShoppingCart className="text-2xl" />
            Cart (2)
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
