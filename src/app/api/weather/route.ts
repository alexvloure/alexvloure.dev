import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') || 'en';
  const lat = '42.878212';
  const lon = '-8.544844';
  const exclude = 'minutely,hourly,daily';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&exclude=${exclude}&appid=${process.env.OPENWEATHER_KEY}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json());
  return NextResponse.json(response);
}
