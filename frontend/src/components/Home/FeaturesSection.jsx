import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Power up your digital marketing easily",
      description: "Personalize your customer experience across channels.",
    },
    {
      title: "Supercharge your sales in quick time",
      description:
        "Scale efforts without hiring more agents. Automate conversations.",
    },
    {
      title: "Optimize your instant support",
      description: "Improve your customer's resolution time efficiently.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-3xl lg:text-4xl font-bold mb-8">
          Get the best features for your customers
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 shadow-lg rounded-lg">
              <div className="bg-yellow-100 inline-block p-4 rounded-full mb-4">
                {/* Replace with icons */}
                <span className="text-yellow-500 text-2xl">⭐</span>
              </div>
              <h4 className="text-2xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
