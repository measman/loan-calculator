"use client";
import React from "react";

const About = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          About Our Loan Calculator
        </h1>
        <p className='text-xl text-gray-600'>
          Empowering you to make informed financial decisions with accurate loan
          calculations
        </p>
      </div>
      {/* Main Content */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>Our Mission</h2>
        <p>
          We believe that financial decisions should be made with clarity and
          confidence. Our loan calculator was developed to help individuals and
          businesses understand their loan options, monthly payments, and total
          costs before making important financial commitments.
        </p>
      </div>
    </div>
  );
};

export default About;
