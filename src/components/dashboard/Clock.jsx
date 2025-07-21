import { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-right leading-4">
      <span className="block text-sm md:text-base font-medium">{time.toLocaleTimeString()}</span>
      <span className="block text-xs text-gray-500">{time.toLocaleDateString()}</span>
    </div>
  );
};

export default Clock;
