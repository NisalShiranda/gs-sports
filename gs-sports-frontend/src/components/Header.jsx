// import React from 'react';
// import { TiShoppingCart } from 'react-icons/ti';
// import { Link } from 'react-router-dom';
// import Userdata from './Userdata';

// function Header() {
//   return (
//     <header className="w-full h-[70px] bg-black/70 backdrop-blur-md text-white flex items-center px-6 shadow-md sticky top-0 z-50">
//       {/* Logo / Title */}
//       <div className="flex-1 text-2xl font-bold">
//         <Link to="/" className="text-red-500 hover:text-white transition">GS SPORTS</Link>
//       </div>

//       {/* Nav Links */}
//       <nav className="hidden md:flex gap-6 text-lg font-medium">
//         <Link to="/" className="hover:text-red-400 transition">Home</Link>
//         <Link to="/products" className="hover:text-red-400 transition">Products</Link>
//         <Link to="/contact" className="hover:text-red-400 transition">Contact</Link>
//         <Link to="/reviews" className="hover:text-red-400 transition">Reviews</Link>
//       </nav>

//       {/* User & Cart */}
//       <div className="flex items-center gap-6 ml-6 relative">
//         <Userdata />
//         <Link to="/cart" className="relative group">
//           <TiShoppingCart className="text-3xl hover:text-red-400 transition" />
//           <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">2</span>
//         </Link>
//       </div>
//     </header>
//   );
// }

// export default Header;
import React from 'react';

// Mock components for demonstration
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

const TiShoppingCart = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1.54l-1.38 9.65A2 2 0 0 1 15.09 20H8.91a2 2 0 0 1-1.99-1.35L5.54 9H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3zM9 4h6V3H9v1zm6.09 16l1.38-9H7.53l1.38 9h6.18z"/>
  </svg>
);

const Userdata = () => (
  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
    <span className="text-white text-sm font-bold">U</span>
  </div>
);

function Header() {
  return (
    <div className="w-full px-4 lg:px-8 pt-4 sticky top-0 z-50">
      <header className="mx-auto max-w-7xl bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl lg:rounded-full shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between px-6 lg:px-8 py-4 lg:py-3">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="group">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                  <span className="text-white font-black text-lg">GS</span>
                </div>
                <span className="text-white text-xl lg:text-2xl font-bold tracking-tight group-hover:text-red-400 transition-colors duration-200">
                  SPORTS
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-6 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 font-medium">
              Home
            </Link>
            <Link to="/products" className="px-6 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 font-medium">
              Products
            </Link>
            
            <Link to="/reviews" className="px-6 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 font-medium">
              Courses
            </Link>
            <Link to="/contact" className="px-6 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 font-medium">
              Contact
            </Link>
          </nav>

          {/* Right Section - User & Cart */}
          <div className="flex items-center space-x-4">
            {/* User Data */}
            <div className="hidden md:block">
              <Userdata />
            </div>
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <div className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 transform group-hover:scale-105">
                <TiShoppingCart className="text-2xl lg:text-3xl text-gray-300 group-hover:text-red-400 transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg">
                  2
                </span>
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-current rounded-full"></div>
                <div className="w-full h-0.5 bg-current rounded-full"></div>
                <div className="w-full h-0.5 bg-current rounded-full"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden px-6 pb-4">
          <nav className="flex flex-col space-y-2 pt-4 border-t border-gray-700/50">
            <Link to="/" className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-200 font-medium">
              Home
            </Link>
            <Link to="/products" className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-200 font-medium">
              Products
            </Link>
            <Link to="/contact" className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-200 font-medium">
              Contact
            </Link>
            <Link to="/reviews" className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-200 font-medium">
              Reviews
            </Link>
            <div className="px-4 py-3 md:hidden">
              <Userdata />
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;