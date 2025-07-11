import React, { useState, useEffect, useRef } from 'react';

function CustomerReviewsSection() {
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(0);
  const sectionRef = useRef(null);

  const reviews = [
    {
      name: "Thilina Perera",
      text: "Excellent service and amazing quality gear. The cricket bat I bought has improved my game significantly!",
      rating: 5,
      location: "Colombo",
      sport: "Cricket",
      avatar: "TP",
      verified: true
    },
    {
      name: "Dinithi Silva", 
      text: "The best place to shop for cricket and gym equipment in Sri Lanka. Fast delivery and authentic products.",
      rating: 5,
      location: "Kandy",
      sport: "Fitness",
      avatar: "DS",
      verified: true
    },
    {
      name: "Akalanka Fernando",
      text: "Fast delivery and great support team. Their customer service is outstanding and products are top quality!",
      rating: 5,
      location: "Galle",
      sport: "Football", 
      avatar: "AF",
      verified: true
    },
    {
      name: "Sachini Mendis",
      text: "Amazing collection of sports wear! The quality exceeded my expectations and the fit is perfect.",
      rating: 5,
      location: "Negombo",
      sport: "Athletics",
      avatar: "SM",
      verified: true
    },
    {
      name: "Kasun Rajapaksha",
      text: "Great prices and authentic brands. I've been a loyal customer for 2 years now. Highly recommended!",
      rating: 5,
      location: "Matara",
      sport: "Tennis",
      avatar: "KR",
      verified: true
    },
    {
      name: "Nimali Wickramasinghe",
      text: "Professional service and quick responses. They helped me choose the perfect equipment for my training.",
      rating: 5,
      location: "Anuradhapura",
      sport: "Badminton",
      avatar: "NW",
      verified: true
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate reviews one by one
            reviews.forEach((_, index) => {
              setTimeout(() => {
                setVisibleReviews(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Auto-rotate featured review
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-lg transition-all duration-300 ${
            i < rating ? 'text-yellow-400 animate-pulse' : 'text-gray-300'
          }`}
        >
          ⭐
        </span>
      ))}
    </div>
  );

  const getSportIcon = (sport) => {
    const icons = {
      Cricket: "🏏",
      Fitness: "💪",
      Football: "⚽",
      Athletics: "🏃",
      Tennis: "🎾",
      Badminton: "🏸"
    };
    return icons[sport] || "🏆";
  };

  return (
    <section ref={sectionRef} className="pt-5 px-6  relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-red-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-100 rounded-full blur-2xl opacity-30 animate-bounce"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-block animate-bounce mb-4">
            <span className="text-6xl">💬</span>
          </div> */}
          <h2 className="text-4xl md:text-5xl font-black bg-black bg-clip-text text-transparent mb-4">
            What Our Athletes Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust GS Sports for their athletic journey
          </p>
          
          {/* Stats */}
          {/* <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 animate-pulse">50K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 animate-pulse">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 animate-pulse">99%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div> */}
        </div>

        {/* Featured Review Carousel */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-transparent to-blue-50 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg animate-pulse">
                  {reviews[currentReview].avatar}
                </div>
              </div>
              
              <div className="text-center">
                <StarRating rating={reviews[currentReview].rating} />
                <p className="text-xl md:text-2xl text-gray-700 italic mt-4 mb-6 leading-relaxed">
                  "{reviews[currentReview].text}"
                </p>
                
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span className="font-semibold text-red-600">{reviews[currentReview].name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    📍 {reviews[currentReview].location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {getSportIcon(reviews[currentReview].sport)} {reviews[currentReview].sport}
                  </span>
                  
                  
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview 
                    ? 'bg-red-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        

        
      </div>
    </section>
  );
}

export default CustomerReviewsSection;