'use client';

import { useTranslation } from 'react-i18next';
import Day from './weather-components/Day';
import { useWeather } from '@/hooks/useWeather';
import Image from 'next/image';
import Night from './weather-components/Night';

import { useEffect, useState } from 'react';
import { useTime } from '@/hooks/useTime';

export default function WeatherCard() {
  const { t } = useTranslation('global');
  const { data: dataWeather, isLoading: isLoadingWeather } = useWeather();
  const { data: dataTime } = useTime();
  const [isDayTime, setIsDayTime] = useState<boolean | null>(null);
  const [time, setTime] = useState<string>('');

  const formatter = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid',
    hour: 'numeric',
    minute: 'numeric',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!dataTime) return;
    if (
      dataTime.results.sunrise < new Date().toISOString() &&
      new Date().toISOString() < dataTime.results.sunset
    ) {
      setIsDayTime(true);
    } else {
      setIsDayTime(false);
    }
  }, [dataTime]);

  const Weather = () => {
    if (isDayTime === null) return;
    if (isDayTime) {
      return <Day />;
    } else {
      return <Night />;
    }
  };

  return (
    <div
      className={`${
        isDayTime ? 'bg-[#00ADF2]' : 'bg-[#0C1445]'
      } relative w-full h-full p-4 md:p-8 flex flex-col justify-center`}>
      {isLoadingWeather ? (
        <p className="text-white font-bold">{t('loading')}</p>
      ) : (
        <>
          <div className="flex items-center">
            <p className="text-white text-lg md:text-5xl lg:text-7xl font-bold">
              {Math.round(dataWeather?.current.temp) + '°'}
            </p>
            <Image
              src={`https://openweathermap.org/img/wn/${dataWeather?.current.weather[0].icon}@2x.png`}
              alt="Weather icon from openweather map"
              width={100}
              height={100}
              className="w-8 h-8 md:w-10 md:h-10 lg:w-20 lg:h-20"
              draggable="false"
            />
          </div>
          <div className="z-[1]">
            <p className="capitalize text-white text-xs md:text-2xl font-semibold">
              {dataWeather?.current.weather[0].description}
            </p>
            <p className="text-white text-xs hidden lg:flex md:text-2xl font-semibold">
              {time}
            </p>
            <p className="text-white text-xs sm:text-lg md:text-xl lg:text-2xl relative">
              {t('weather.location')}
            </p>
          </div>
          <Weather />
        </>
      )}
    </div>
  );
}
