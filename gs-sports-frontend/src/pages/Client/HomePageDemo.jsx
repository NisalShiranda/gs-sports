import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      {/* HERO SECTION */}
      <section className="min-h-[80vh] bg-[url('/hero.jpg')] bg-cover bg-center flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white/70 backdrop-blur-sm p-10 rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to GS SPORTS
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-xl">
            Your one-stop destination for premium sportswear, equipment, and
            accessories.
          </p>
          <Link to="/products">
            <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          At GS SPORTS, we provide top-quality sports gear, apparel, and
          accessories to athletes and enthusiasts. Whether you're competing
          professionally or training casually, we’ve got everything you need to
          perform your best.
        </p>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Accessories", img: "/categories/accessories.jpg" },
              { name: "Clothes", img: "/categories/clothes.jpg" },
              { name: "Trophys", img: "/categories/trophys.jpg" },
              { name: "Shoes", img: "/categories/shoes.jpg" },
            ].map((category, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden h-48 group shadow hover:shadow-lg transition"
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER FEEDBACK */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Customer Reviews
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Thilina Perera",
              text: "Excellent service and amazing quality gear. Highly recommend!",
            },
            {
              name: "Dinithi Silva",
              text: "The best place to shop for cricket and gym equipment in Sri Lanka.",
            },
            {
              name: "Akalanka Fernando",
              text: "Fast delivery and great support team. 5 stars!",
            },
          ].map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-600">"{review.text}"</p>
              <p className="mt-4 text-sm text-red-500 font-medium">
                - {review.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-200 py-8 px-6 text-center text-gray-600 text-sm">
        <p>&copy; 2025 GS SPORTS. All rights reserved.</p>
        <p className="mt-2">
          Email: support@gssports.lk | Phone: +94 77 123 4567
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-red-500">
            Facebook
          </a>
          <a href="#" className="hover:text-red-500">
            Instagram
          </a>
          <a href="#" className="hover:text-red-500">
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
