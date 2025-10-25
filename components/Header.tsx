
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center my-8 sm:my-12">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
        <span className="text-ghana-red">Ghana</span>
        <span className="text-ghana-yellow"> Phone</span>
        <span className="text-ghana-green"> Tracker</span>
      </h1>
      <p className="mt-4 text-lg text-gray-400">
        Discover the network behind any Ghanaian mobile number.
      </p>
    </header>
  );
};
