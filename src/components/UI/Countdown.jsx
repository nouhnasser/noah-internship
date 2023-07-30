import { useEffect, useState } from "react";

export default function Countdown({ nftInfo }) {
  const [timeRemaining, setTimeRemaining] = useState(getTimer());

  function getTimer() {
    let currentDate = Date.now();

    const milliseconds = nftInfo.expiryDate - currentDate;
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;

    return {
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimer());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {timeRemaining.milliseconds > 0 ? (
        <div className="de_countdown">
          {timeRemaining.hours}h {timeRemaining.minutes}m{" "}
          {timeRemaining.seconds}s
        </div>
      ) : (
        <div className="de_countdown">EXPIRED</div>
      )}
    </>
  );
}
