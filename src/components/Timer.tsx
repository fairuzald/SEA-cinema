"use client";
import { STEPS } from "@/app/movies/[movieId]/MovieClient";
import { useState, useEffect, SetStateAction } from "react";

const Timer = ({
  setStep,
}: {
  setStep?: React.Dispatch<SetStateAction<STEPS>>;
}) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // Initial time in seconds

  // Reduce time by 1 second every second
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(countdown);
          if (setStep) {
            setStep(STEPS.DATE_SELECTION);
          }
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [setStep]);

  // Convert the remaining time in seconds to {minutes, seconds} object
  const getTimeLeft = () => {                                               
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return { minutes, seconds };
  };

  const { minutes, seconds } = getTimeLeft();
  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
      if (setStep) {
        return setStep(STEPS.DATE_SELECTION);
      }
    }
  }, [minutes, seconds, setStep]);
  return (
    <div className="flex items-center justify-center text-red font-semibold gap-2">
      <div className="w-fit py-1 px-2 bg-[#553333] rounded-lg">
        {minutes.toString().padStart(2, "0")}
      </div>
      <p>:</p>
      <div className="w-fit py-1 px-2 bg-[#553333] rounded-lg">
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default Timer;
