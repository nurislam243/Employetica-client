import React from 'react';

const StatCard = ({ icon , title, value, color }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded shadow-md shadow-primary/20 bg-base-200/60 border border-gray-100 hover:shadow-lg transition duration-300">
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full text-white text-3xl bg-primary`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-base-content/80">{title}</h3>
        <p className="text-2xl font-bold text-base-content">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
