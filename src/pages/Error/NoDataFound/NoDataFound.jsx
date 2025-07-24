import React from 'react';
import Lottie from 'lottie-react';
import noDataAnimation from '../../../assets/animation/search imm.json';

const NoDataFound = ({ message = "No data found" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="-mb-10 w-48 md:w-[260px] xl:w-[320px] h-48 md:h-[260px] xl:h-[320px]">
        <Lottie animationData={noDataAnimation} loop={true} />
      </div>
      <p className="-mt-11 text-base-content/50 text-lg md:text-xl lg:text-2xl">{message}</p>
    </div>
  );
};

export default NoDataFound;
