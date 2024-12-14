import React from "react";

const PlatformSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-6">
          Easy Integration with 200+ tools
        </h3>
        <p className="text-gray-600 mb-10">
          Connect with your favorite eCommerce tools and systems to streamline
          workflows.
        </p>
        {/* Integration Icons */}
        <div className="flex justify-center space-x-8">
          <img
            src="https://via.placeholder.com/80" // Replace with actual icons
            alt="Platform"
          />
          <img
            src="https://via.placeholder.com/80"
            alt="Platform"
          />
          <img
            src="https://via.placeholder.com/80"
            alt="Platform"
          />
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
