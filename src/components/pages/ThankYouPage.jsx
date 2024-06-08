import React from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/sammy-line-finance.gif'

function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={illustration} alt="Success illustration" />
      <h1 className="text-3xl font-bold mb-1 text-[#28ADBF] text-center">
        Thank you for your purchase!
      </h1>
      <p className="text-base mb-8 text-[rgba(48,48,48,0.7)]">Your payment was successful.</p>
      <Link to="/" className="bg-[#28ADBF] font-semibold text-white px-10 py-2 rounded-full">
        Back to Home
      </Link>
    </div>
  );
}

export default ThankYouPage;
