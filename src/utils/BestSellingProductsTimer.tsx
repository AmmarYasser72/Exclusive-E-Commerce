'use client';

import { useTimer } from "react-timer-hook";

function getTime(){
  const time = new Date();
  time.setSeconds(time.getSeconds() + 340000); 

  return time
}

export function BestSellingProductsTimer({ expiryTimestamp = getTime() }) {
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });

  return (
    <div className="flex gap-4 justify-center">
      <div className="bg-exclusive-background flex flex-col items-center rounded-full p-3 px-4">
        {days < 10
          ? <span className="font-semibold text-sm md:text-base">0{days}</span>
          : <span className="font-semibold text-sm md:text-base">{days}</span>
        }
        <span className="text-xs">Days</span>
      </div>

      <div className="bg-exclusive-background flex flex-col items-center rounded-full p-3 px-4">
        {hours < 10
          ? <span className="font-semibold text-sm md:text-base">0{hours}</span>
          : <span className="font-semibold text-sm md:text-base">{hours}</span>
        }
        <span className="text-xs">Hours</span>
      </div>

      <div className="bg-exclusive-background flex flex-col items-center justify-center rounded-full p-2">
        {minutes < 10
          ? <span className="font-semibold text-sm md:text-base">0{minutes}</span>
          : <span className="font-semibold text-sm md:text-base">{minutes}</span>
        }
        <span className="text-xs">Minutes</span>
      </div>

      <div className="bg-exclusive-background flex flex-col items-center justify-center rounded-full p-2">
      {seconds < 10
        ? <span className="font-semibold text-xs md:text-base">0{seconds}</span>
        : <span className="font-semibold text-xs md:text-base">{seconds}</span>
      }
      <span className="text-xs">Seconds</span>
      </div>
     
    </div>
  );
}