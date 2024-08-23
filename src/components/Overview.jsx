import React from 'react';

const Overview = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-4xl font-josefin mb-12 text-center  ">Overview</h2>
      <div className="grid grid-cols-4 gap-y-10 gap-x-16">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 tracking-widest">Condition</h3>
          <p className="text-xl font-medium">Used</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 tracking-widest">Year of Manufacture</h3>
          <p className="text-xl font-medium">2015</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 tracking-widest">Engine Size</h3>
          <p className="text-xl font-medium">7,739 KM</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 tracking-widest">Color</h3>
          <p className="text-xl font-medium">black</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 tracking-widest">Engine Type</h3>
          <p className="text-xl font-medium">5750-7500 RPM CV</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 tracking-widest">Ownership</h3>
          <p className="text-xl font-medium">Single</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 tracking-widest">Insurance Date</h3>
          <p className="text-xl font-medium">90° V8</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 tracking-widest">Transmission</h3>
          <p className="text-xl font-medium">320 KM/H</p>
        </div>

      </div>
      <div className="mt-4 text-center">
          <h3 className="text-xs font-semibold text-gray-400 tracking-widest">Status</h3>
          <p className="text-xl font-medium">Available </p>
        </div>
    </div>
  );
};

export default Overview;
