import React, { useState, useEffect } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!expiryDate) return;
    const calculateTimeLeft = () => {
      const difference = expiryDate - Date.now();
      setTimeLeft(difference > 0 ? difference : 0);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="de_countdown">
      {timeLeft > 0 ? `${hours}h ${minutes}m ${seconds}s` : "EXPIRED"}
    </div>
  );
};

export default CountdownTimer;