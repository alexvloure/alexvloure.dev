"use client";

import { satoshi_bold } from "@/styles/fonts";
import { format } from "date-fns";
import { useLayoutEffect, useRef } from "react";

export function Clock() {
  const clockRef = useRef<HTMLSpanElement | null>(null);

  const getTimezoneName = () => {
    let now = new Date();
    let isDaylightSavingTime =
      now.getTimezoneOffset() <
      getTimezoneOffset(new Date(now.getFullYear(), 0, 1));

    return isDaylightSavingTime ? "CEST" : "CET";
  };

  const getTimezoneOffset = (date: Date) => {
    return Math.max(
      date.getTimezoneOffset(),
      new Date(date.getFullYear(), 6, 1).getTimezoneOffset(),
    );
  };

  const getGreetingMessage = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      return "Good morning!";
    }
    if (hours >= 12 && hours < 18) {
      return "Good afternoon!";
    }
    if (hours >= 18 || hours < 5) {
      return "Good evening!";
    }
  };

  useLayoutEffect(() => {
    function updateTime() {
      const now = new Date();

      if (clockRef.current) {
        clockRef.current.innerText = format(now, "HH:mm:ss");
      }
    }

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="flex h-full w-full cursor-default flex-col items-center justify-center
        text-gray-600"
    >
      <div className="opacity-85 text-accent">{getGreetingMessage()}</div>
      <div className="ml-4 w-full text-center text-5xl tabular-nums">
        <span ref={clockRef} className={satoshi_bold.className} />
        <span className="text-base font-bold text-accent">
          {getTimezoneName()}
        </span>
      </div>
    </div>
  );
}
