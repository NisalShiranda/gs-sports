import React from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Userdata from './Userdata';

function Header() {
  return (
    <header className="w-full h-[70px] bg-black/70 backdrop-blur-md text-white flex items-center px-6 shadow-md sticky top-0 z-50">
      {/* Logo / Title */}
      <div className="flex-1 text-2xl font-bold">
        <Link to="/" className="text-red-500 hover:text-white transition">GS SPORTS</Link>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex gap-6 text-lg font-medium">
        <Link to="/" className="hover:text-red-400 transition">Home</Link>
        <Link to="/products" className="hover:text-red-400 transition">Products</Link>
        <Link to="/contact" className="hover:text-red-400 transition">Contact</Link>
        <Link to="/reviews" className="hover:text-red-400 transition">Reviews</Link>
      </nav>

      {/* User & Cart */}
      <div className="flex items-center gap-6 ml-6 relative">
        <Userdata />
        <Link to="/cart" className="relative group">
          <TiShoppingCart className="text-3xl hover:text-red-400 transition" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
