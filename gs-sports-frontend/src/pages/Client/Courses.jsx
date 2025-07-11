import React, { useState } from "react";

// Mock icons for demonstration
const Clock = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const Users = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Award = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
  </svg>
);

const Target = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const Calendar = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Mail = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const Phone = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const courses = [
    {
      id: 1,
      title: "Elite Fitness Training",
      category: "Fitness",
      duration: "12 weeks",
      level: "All Levels",
      students: "250+",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Transform your body and mind with our comprehensive fitness training program designed for athletes and fitness enthusiasts.",
      highlights: [
        "Personalized workout plans",
        "Nutrition guidance",
        "Progress tracking",
        "Access to premium equipment",
      ],
      schedule: "Mon, Wed, Fri - 6:00 AM to 8:00 AM",
      instructor: "Coach Sarah Johnson",
      gallery: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: 2,
      title: "Basketball Skills Academy",
      category: "Sports",
      duration: "8 weeks",
      level: "Beginner to Advanced",
      students: "180+",
      price: "$199",
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Master the fundamentals of basketball with professional coaching and structured skill development programs.",
      highlights: [
        "Shooting techniques",
        "Defensive strategies",
        "Team play dynamics",
        "Mental game development",
      ],
      schedule: "Tue, Thu, Sat - 4:00 PM to 6:00 PM",
      instructor: "Coach Michael Davis",
      gallery: [
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: 3,
      title: "Yoga & Mindfulness",
      category: "Wellness",
      duration: "6 weeks",
      level: "All Levels",
      students: "320+",
      price: "$149",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Find balance and inner peace through our comprehensive yoga and mindfulness program suitable for all experience levels.",
      highlights: [
        "Flexibility improvement",
        "Stress reduction",
        "Breathing techniques",
        "Meditation practices",
      ],
      schedule: "Mon, Wed, Fri - 7:00 AM to 8:30 AM",
      instructor: "Instructor Emma Wilson",
      gallery: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: 4,
      title: "Swimming Mastery",
      category: "Aquatics",
      duration: "10 weeks",
      level: "Beginner to Intermediate",
      students: "150+",
      price: "$249",
      image:
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Learn proper swimming techniques and build endurance with our professional swimming instructors in our state-of-the-art facility.",
      highlights: [
        "Stroke technique refinement",
        "Breathing control",
        "Endurance building",
        "Water safety skills",
      ],
      schedule: "Mon, Wed, Fri - 5:00 PM to 6:30 PM",
      instructor: "Coach Robert Martinez",
      gallery: [
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
    },
  ];

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    // Smooth scroll to course details
    setTimeout(() => {
      document.getElementById("course-details").scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      alert(
        `Thank you ${contactForm.name}! We'll contact you soon about the ${selectedCourse.title} course.`
      );
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Background */}
        <div className="relative text-center mb-16 rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          ></div>
          {/* Black Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

          {/* Content */}
          <div className="relative z-10 py-24 px-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Master Your <span className="text-red-500">Game</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Join our expert-led courses designed to elevate your athletic performance and achieve your fitness goals.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Course Selection Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Course
              </h2>
              <p className="text-gray-600 text-lg">
                Select a course below to learn more details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleCourseSelect(course)}
                  className={`group cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                    selectedCourse?.id === course.id
                      ? "ring-4 ring-red-500"
                      : ""
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-500 transition-colors">
                      {course.title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{course.students} Students</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        <span>{course.level}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-red-500">
                        {course.price}
                      </span>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Details Section */}
          {selectedCourse && (
            <div
              id="course-details"
              className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Course Information */}
                <div>
                  <div className="mb-6">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedCourse.category}
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4 mb-4">
                      {selectedCourse.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {selectedCourse.description}
                    </p>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-red-500 mr-2" />
                        <span className="font-semibold text-gray-900">
                          Duration
                        </span>
                      </div>
                      <p className="text-gray-600">{selectedCourse.duration}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-red-500 mr-2" />
                        <span className="font-semibold text-gray-900">
                          Students
                        </span>
                      </div>
                      <p className="text-gray-600">{selectedCourse.students}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center mb-2">
                        <Award className="w-5 h-5 text-red-500 mr-2" />
                        <span className="font-semibold text-gray-900">
                          Level
                        </span>
                      </div>
                      <p className="text-gray-600">{selectedCourse.level}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-red-500 mr-2" />
                        <span className="font-semibold text-gray-900">
                          Schedule
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {selectedCourse.schedule}
                      </p>
                    </div>
                  </div>

                  {/* Course Highlights */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      What You'll Learn
                    </h3>
                    <div className="space-y-3">
                      {selectedCourse.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <Target className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructor Info */}
                  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Your Instructor
                    </h3>
                    <p className="text-red-700 font-medium">
                      {selectedCourse.instructor}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Professional trainer with 10+ years of experience
                    </p>
                  </div>
                </div>

                {/* Gallery and Contact */}
                <div>
                  {/* Course Gallery */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Course Gallery
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedCourse.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="relative h-48 rounded-2xl overflow-hidden"
                        >
                          <img
                            src={image}
                            alt={`Course ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Get Course Information
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Interested in this course? Send us a message and we'll get
                      back to you with more details.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name *"
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Your Email *"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={contactForm.phone}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder="Your Message *"
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              message: e.target.value,
                            })
                          }
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <button
                        onClick={handleContactSubmit}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>

                  {/* Direct Contact Options */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <a
                      href="mailto:info@gssports.com"
                      className="flex items-center justify-center bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Email Us
                    </a>
                    <a
                      href="tel:+1234567890"
                      className="flex items-center justify-center bg-green-500 text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
    {/* FOOTER */}
<div className="w-full">
  {/* FOOTER */}
  <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              &copy; 2025 GS SPORTS. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Email: support@gssports.lk | Phone: +94 77 123 4567
            </p>
            <div className="flex justify-center gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
</div>

    </>
    
    
  );
}

export default CoursesPage;
