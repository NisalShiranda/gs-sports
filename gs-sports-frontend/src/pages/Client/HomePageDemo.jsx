import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard";
import Offsection from "../../components/Offsection";
import CustomerReviewsSection from "../../components/CustomerReview";

const logos = [
  "/brands/mrf.svg",
  "/brands/adidas.svg",
  "/brands/puma.svg",
  "/brands/nike1.svg",
  "/brands/yonex.svg",
  "/brands/wilson.svg",
  "/brands/north.svg",
  "/brands/asics.svg",
  "/brands/converse.svg",
  "/brands/lacoste.svg",
  
  
  
];


function HomePage() {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
      .then((res) => {
        const shuffled = res.data.sort(() => 0.5 - Math.random()).slice(0, 4); // 👈 Pick 4 random products
        setRandomProducts(shuffled);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  return (
    <div className=" text-gray-800 font-sans">
      
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

      <section className="pt-12 px-4">
        

        <div className="brand-slider-wrapper">
          <div className="brand-slider">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="w-24 h-24  flex items-center justify-center shrink-0 mx-10"
              >
                <img
                  src={logo}
                  alt={`Brand ${index}`}
                  className="h-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-16 px-6 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-10">
            EVERYTHING FOR ALL SPORTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Accessory", img: "../../../public/acc1.png" },
              { name: "Cloth", img: "../../../public/clothes.png" },
              { name: "Trophy", img: "../../../public/trophy1.png" },
              { name: "Shoe", img: "../../../public/shoes1.png" },
            ].map((category, idx) => (
              <CategoryCard key={idx} name={category.name} img={category.img} />
            ))}
          </div>
        </div>
      </section>

      {/* 25% OFF SECTION */}
      <section className="pb-10 px-6 max-w-4xl mx-auto text-center w-full ">
        <div className="max-w-6xl mx-auto">
        <div className>
            <div className="sm:text-md md:text-lg">At GS SPORTS, we are more than just a store — we’re a team of sports lovers, athletes, and fitness enthusiasts dedicated to helping you perform your best. From cricket bats to gym wear, we stock high-quality gear for every sport under one roof.</div>
            <div className="sm:text-md md:text-lg pt-2">Whether you're a professional athlete or a weekend warrior, we’re here to fuel your journey with trusted brands, expert advice, and unmatched customer service. Your game, your gear — all in one place.</div>
        </div>
        </div>
      </section>

     

      {/* Best Selling Items */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Best Selling Items
          </h2>

          {randomProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
              {randomProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading products...</p>
          )}
          <Link to="/products" className="mt-4 flex justify-end items-center">
            <button className="px-6 py-3  text-black underline font-semibold rounded-full hover:text-red-600 transition cursor-pointer">
              Show More
            </button>
          </Link>
          
        </div>
        
      </section>

      {/* 25% OFF SECTION */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
      <div className>
            <div className="text-lg md:text-xl text-gray-700 italic mt-4 mb-6 leading-relaxed">“Champions aren't made in gyms. Champions are made from something they have deep inside them — a desire, a dream, a vision. They have to have the skill, and the will. But the will must be stronger than the skill.”</div>
            <div className="font-black pt-2 ">Muhammad Ali</div>
        </div>
      </section>

      {/* CUSTOMER FEEDBACK
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
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
        </div>
      </section> */}

      
      <section className="py-16 px-6 bg-gray-100">
      <div className="">
        <CustomerReviewsSection />
      </div>
      
      </section>
        

      {/* FOOTER */}
      <footer className="bg-black text-white py-8 px-6 text-center text-sm">
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
