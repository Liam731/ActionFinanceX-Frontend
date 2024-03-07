import React, { useState, useEffect } from "react";
export default function AuctionStatus() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const year = new Date().getFullYear();
      const different =
        Number(new Date(2024, 2, 8, 12, 30, 45)) - Number(new Date());
      if (different > 0) {
        const days = Math.floor(different / (1000 * 60 * 60 * 24));
        const hours = Math.floor((different / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((different / (1000 * 60)) % 60);
        const seconds = Math.floor((different / 1000) % 60);
        return { days, hours, minutes, seconds };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // 在组件卸载时清除定时器
    return () => clearInterval(interval);
  }, []);

  return (
    <p>
      距離 12/25 還有 {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
      {timeLeft.seconds}s
    </p>
  );
}
