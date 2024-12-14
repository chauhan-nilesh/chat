import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-16 px-8 bg-grayLight">
      <h2 className="text-3xl font-extrabold text-center text-darkText mb-10">
        Valuable Words from Our Customers
      </h2>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg text-center">
        <p className="italic text-gray-600 mb-4">
          &ldquo;Lorem ipsum dolor sit amet consectetur. Est tristique tortor autem.&rdquo;
        </p>
        <h3 className="text-xl font-bold text-darkText">David Jhump</h3>
        <p className="text-yellow-500">Managing Director</p>
      </div>
    </section>
  );
};

export default Testimonials;
