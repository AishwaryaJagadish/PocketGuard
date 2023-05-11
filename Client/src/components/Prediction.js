import React from "react";
import Navbar from "./Navbar";

const Prediction = () => {
  return (
    <div>
      <Navbar />
      <div className="flex py-8">
        <div className="max-w-xs mx-auto bg-white rounded-md shadow-md overflow-hidden aspect-w-1 aspect-h-1">
          <div className="bg-gray-200 px-4 py-2">
            <h2 className="text-lg font-bold text-gray-900">Car Price Estimation</h2>
          </div>
          <div className="p-4">
            <p className="text-gray-700">We can check the price at which we can sell our car.</p>
          </div>
        </div>

        <div className="max-w-xs mx-auto bg-white rounded-md shadow-md overflow-hidden aspect-w-1 aspect-h-1">
          <div className="bg-gray-200 px-4 py-2">
            <h2 className="text-lg font-bold text-gray-900">Loan Status</h2>
          </div>
          <div className="p-4">
            <p className="text-gray-700">We check if you are eligible to be approved for a loan or not.</p>
          </div>
        </div>

        <div className="max-w-xs mx-auto bg-white rounded-md shadow-md overflow-hidden aspect-w-1 aspect-h-1">
          <div className="bg-gray-200 px-4 py-2">
            <h2 className="text-lg font-bold text-gray-900">Gold Price Prediction</h2>
          </div>
          <div className="p-4">
            <p className="text-gray-700">We can check about the gold price in the market and plan accordingly for our investments.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
