'use client';

import { satoshi_bold } from '@/styles/fonts';
import { format } from 'date-fns';
import { useLayoutEffect, useRef } from 'react';

export function Clock() {
  const clockRef = useRef<HTMLSpanElement | null>(null);

  const getTimezoneName = () => {
    let now = new Date();
    let isDaylightSavingTime =
      now.getTimezoneOffset() <
      getTimezoneOffset(new Date(now.getFullYear(), 0, 1));

    return isDaylightSavingTime ? 'CEST' : 'CET';
  };

  const getTimezoneOffset = (date: Date) => {
    return Math.max(
      date.getTimezoneOffset(),
      new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
    );
  };

  const getGreetingMessage = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      return 'Good morning!';
    }
    if (hours >= 12 && hours < 18) {
      return 'Good afternoon!';
    }
    if (hours >= 18 || hours < 5) {
      return 'Good evening!';
    }
  };

  useLayoutEffect(() => {
    function updateTime() {
      const now = new Date();
      // const hours = now.getHours();
      // const minutes = now.getMinutes();
      // const seconds = now.getSeconds();
      // const clockStr = `${hours.toString().padStart(2, '0')}:${minutes
      //   .toString()
      //   .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (clockRef.current) {
        clockRef.current.innerText = format(now, 'HH:mm:ss');
      }
    }

    updateTime();
    setInterval(updateTime, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full cursor-default text-gray-600">
      <div className="text-[var(--accent)] opacity-85">
        {getGreetingMessage()}
      </div>
      <div className="w-full text-5xl text-center tabular-nums ml-4">
        <span ref={clockRef} className={satoshi_bold.className} />
        <span className="text-base font-bold text-[var(--accent)]">
          {getTimezoneName()}
        </span>
      </div>
    </div>
  );
}
