import React from 'react';

const StatCard = ({ icon , title, value, color }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition duration-300">
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full text-white text-2xl`}
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-600">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
