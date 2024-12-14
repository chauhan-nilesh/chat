import React from "react";

const HeroSection = () => {
  return (
    <section data-theme="light" className="bg-gray-900 text-white py-10 lg:py-0 px-2 lg:px-28">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
          Improve your Business <span className="text-yellow-500">Chat</span> Support
          </h2>
          <p className="text-sm lg:text-base text-gray-300 mb-6">
          ChatVerse is an international chat system where you can chat with multiple people at the same time.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-3/4 p-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-gray-900 px-6 rounded-r-lg hover:bg-yellow-600"
            >
              Get Started
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/hero-image.png" // Replace with actual image
            alt="Chat Illustration"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
