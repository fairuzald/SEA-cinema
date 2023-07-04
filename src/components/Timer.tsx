"use client"
import { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0); // Initial time in seconds
  const expirationTime = 5 * 60; // Expiration time in seconds

  useEffect(() => {
    const storedTimestamp = localStorage.getItem('timerTimestamp');
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // Calculate the remaining time based on the stored timestamp
    const storedTimeLeft = storedTimestamp ? expirationTime - (currentTime - parseInt(storedTimestamp)) : expirationTime;

    // Set the initial time left
    setTimeLeft(storedTimeLeft > 0 ? storedTimeLeft : 0);

    // Save the current timestamp to local storage
    localStorage.setItem('timerTimestamp', currentTime.toString());
  }, [expirationTime]);

  useEffect(() => {
    // Reduce time by 1 second every second
    const countdown = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(countdown);
    };
  }, []);

  // Convert the remaining time in seconds to {minutes, seconds} object
  const getTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return { minutes, seconds };
  };

  const { minutes, seconds } = getTimeLeft();
  return (
    <div className="flex items-center justify-center text-red font-semibold gap-2">
      <div className="w-fit py-1 px-2  bg-[#553333] rounded-lg">
        {minutes.toString().padStart(2, "0")}
      </div>
      <p>:</p>
      <div className="w-fit py-1 px-2  bg-[#553333] rounded-lg">
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default Timer;
