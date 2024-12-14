import React from 'react';

const features = [
  {
    title: 'Professional Company',
    description: 'We provide professional and reliable solutions for businesses.',
    iconColor: 'text-greenPrimary',
    rating: 4.9,
    reviews: '5.9k reviews',
  },
  {
    title: '24*7 Hours Service',
    description: 'Our services are available 24/7 for uninterrupted support.',
    iconColor: 'text-orangePrimary',
    rating: 4.9,
    reviews: '7.2k reviews',
  },
  {
    title: 'Country to Country Support',
    description: 'Worldwide chat support without limitations or barriers.',
    iconColor: 'text-purple-500',
    rating: 4.9,
    reviews: '5.0k reviews',
  },
];

const Features = () => {
  return (
    <section className="pb-16 px-6 bg-white text-center">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-darkText mb-10">Our Special Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition"
          >
            <div className={`mb-4 text-3xl ${feature.iconColor}`}>★</div>
            <h3 className="text-2xl font-bold text-darkText mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <div className="text-orangePrimary font-bold">
              ★ {feature.rating} <span className="text-gray-400 font-normal">({feature.reviews})</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
