'use client';

import { useTimer } from "react-timer-hook";

function getTime(){
  const time = new Date();
  time.setSeconds(time.getSeconds() + 340000); // 4 days timer

  return time
}

export function FlashSalesTimer({ expiryTimestamp = getTime() }) {
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });

  return (
    <div>
      <div className="flex gap-8">
        <span className="text-xs font-medium mr-2">Days</span>
        <span className="text-xs font-medium ml-2">Hours</span>
        <span className="text-xs font-medium ml-1">Minutes</span>
        <span className="text-xs font-medium">Seconds</span>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col">
          {days < 10
            ? <span className="font-inter font-bold text-4xl">0{days}</span>
            : <span className="font-inter font-bold text-4xl">{days}</span>
          }
        </div>
        <span className="font-bold text-4xl text-exclusive-secondary opacity-70">:</span>

        {hours < 10
          ? <span className="font-inter font-bold text-4xl">0{hours}</span>
          : <span className="font-inter font-bold text-4xl">{hours}</span>
        }
        <span className="font-bold text-4xl text-exclusive-secondary opacity-70">:</span>

        {minutes < 10
          ? <span className="font-inter font-bold text-4xl">0{minutes}</span>
          : <span className="font-inter font-bold text-4xl">{minutes}</span>
        }
        <span className="font-bold text-4xl text-exclusive-secondary opacity-70">:</span>

        {seconds < 10
          ? <span className="font-inter font-bold text-4xl">0{seconds}</span>
          : <span className="font-inter font-bold text-4xl">{seconds}</span>
        }
      </div>
    </div>
  );
}