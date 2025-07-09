import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-[#0f172a] text-white">
      
      {/* HERO SECTION */}
      <section className="min-h-[90vh] bg-[url('/loginBg.jpg')] bg-cover bg-center flex items-center justify-center text-center px-4">
        <div className="bg-black/60 backdrop-blur-md p-10 rounded-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to GS SPORTS</h1>
          <p className="text-lg text-gray-300 mb-6">Your One-Stop Shop for All Things Sports</p>
          <Link to="/product">
            <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-black text-white font-semibold rounded-lg hover:opacity-90">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">About GS SPORTS</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          GS SPORTS is committed to providing high-quality sportswear and equipment to athletes, enthusiasts, and teams across the country. Whether you're on the field, in the gym, or training at home — we’ve got the gear that fuels your passion and performance.
        </p>
      </section>

      {/* POPULAR PRODUCTS SECTION */}
      <section className="py-16 bg-[#1e293b] px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Popular Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white/10 backdrop-blur-lg p-4 rounded-lg text-white shadow-md hover:scale-105 transition">
                <img src="/product-placeholder.png" alt="Product" className="w-full h-48 object-cover rounded-md mb-3" />
                <h3 className="text-lg font-semibold">Product Name {item}</h3>
                <p className="text-sm text-gray-300">Top-selling sports gear</p>
                <p className="text-red-400 mt-2 font-bold">Rs. 5,900</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER FEEDBACK SECTION */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-lg">
            <p className="text-gray-300">"Excellent service and amazing quality gear. Highly recommend!"</p>
            <p className="text-sm text-red-400 mt-4 font-medium">- Thilina Perera</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <p className="text-gray-300">"The best place to shop for cricket and gym equipment in Sri Lanka."</p>
            <p className="text-sm text-red-400 mt-4 font-medium">- Dinithi Silva</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <p className="text-gray-300">"Fast delivery and great support team. 5 stars!"</p>
            <p className="text-sm text-red-400 mt-4 font-medium">- Akalanka Fernando</p>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-black py-8 px-6 text-center text-gray-400">
        <p>&copy; 2025 GS SPORTS. All rights reserved.</p>
        <p className="mt-2">Email: support@gssports.lk | Phone: +94 77 123 4567</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="hover:text-red-400">Facebook</a>
          <a href="#" className="hover:text-red-400">Instagram</a>
          <a href="#" className="hover:text-red-400">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
