import { useEffect, useState } from "react";

const CountdownTimer = ({
  endDate,
}) => {
  const calculateTimeLeft = () => {
    if (!endDate) {
      return null;
    }

    const difference =
      new Date(endDate).getTime() -
      new Date().getTime();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(
        difference /
          (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (difference /
          (1000 * 60 * 60)) %
          24
      ),

      minutes: Math.floor(
        (difference /
          (1000 * 60)) %
          60
      ),

      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const [timeLeft, setTimeLeft] =
    useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) {
    return (
      <span className="text-sm font-bold text-red-500">
        Sale Ended
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1">

      {timeLeft.days > 0 && (
        <>
          <TimeBox
            value={timeLeft.days}
            label="D"
          />

          <span>:</span>
        </>
      )}

      <TimeBox
        value={timeLeft.hours}
        label="H"
      />

      <span>:</span>

      <TimeBox
        value={timeLeft.minutes}
        label="M"
      />

      <span>:</span>

      <TimeBox
        value={timeLeft.seconds}
        label="S"
      />

    </div>
  );
};

const TimeBox = ({
  value,
  label,
}) => {
  return (
    <div className="flex items-center gap-0.5">

      <span className="font-bold text-sm">
        {String(value).padStart(2, "0")}
      </span>

      <span className="text-[9px] font-medium">
        {label}
      </span>

    </div>
  );
};

export default CountdownTimer;