import { NextRequest } from "next/server";

const API_KEY = process.env.OPENWEATHER_API!;
if (!API_KEY) throw new Error("OPENWEATHER_API key missing in environment");

/** Struktur data item dari OpenWeather 3-hour forecast */
interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
}

/** Struktur data hasil forecast harian */
interface DailyForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  tempAvg: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}

/** Struktur data hasil cuaca saat ini */
interface CurrentWeather {
  temp: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  description: string;
  pressure: number;
}

/** Struktur data hasil akhir cuaca */
export interface WeatherData {
  current: CurrentWeather;
  forecast: DailyForecast[];
}

export async function getWeatherData(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`
    ),
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`
    ),
  ]);

  if (!currentRes.ok || !forecastRes.ok) {
    const text = await currentRes.text();
    throw new Error(`OpenWeather API error: ${currentRes.status} ${text}`);
  }

  const cur = await currentRes.json();
  const fore = await forecastRes.json();

  const current: CurrentWeather = {
    temp: Math.round(cur.main.temp),
    humidity: cur.main.humidity,
    windSpeed: +(cur.wind?.speed || 0).toFixed(1),
    visibility: Math.round((cur.visibility || 0) / 1000),
    description: cur.weather?.[0]?.description || "",
    pressure: cur.main.pressure,
  };

  const forecast = processForecast(fore.list as OpenWeatherForecastItem[]);
  return { current, forecast };
}

/**
 * Mengubah data 3-jam menjadi data harian
 */
function processForecast(list: OpenWeatherForecastItem[]): DailyForecast[] {
  const daily: Record<
    string,
    {
      date: string;
      temps: number[];
      humidity: number[];
      rainfall: number;
      windSpeed: number[];
    }
  > = {};

  for (const item of list) {
    const dt = new Date(item.dt * 1000);
    const key = dt.toISOString().split("T")[0];

    if (!daily[key]) {
      daily[key] = {
        date: key,
        temps: [],
        humidity: [],
        rainfall: 0,
        windSpeed: [],
      };
    }

    daily[key].temps.push(item.main.temp);
    daily[key].humidity.push(item.main.humidity);
    daily[key].windSpeed.push(item.wind?.speed || 0);

    const rain = item.rain ?? {};
    daily[key].rainfall +=
      rain["3h"] !== undefined
        ? rain["3h"]
        : rain["1h"] !== undefined
        ? rain["1h"] * 3
        : 0;
  }

  return Object.values(daily).map((d) => ({
    date: d.date,
    tempMin: Math.round(Math.min(...d.temps)),
    tempMax: Math.round(Math.max(...d.temps)),
    tempAvg: Math.round(d.temps.reduce((a, b) => a + b, 0) / d.temps.length),
    humidity: Math.round(
      d.humidity.reduce((a, b) => a + b, 0) / d.humidity.length
    ),
    rainfall: +d.rainfall.toFixed(1),
    windSpeed: +(
      d.windSpeed.reduce((a, b) => a + b, 0) / d.windSpeed.length
    ).toFixed(1),
  }));
}

/**
 * Mendapatkan lokasi pengguna berdasarkan IP (fallback ke Indonesia)
 */
export async function geoIp(req: NextRequest): Promise<{
  lat: number;
  lon: number;
  name: string;
}> {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "1.1.1.1";
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();

    return {
      lat: +data.latitude,
      lon: +data.longitude,
      name: `${data.city}, ${data.region}`,
    };
  } catch {
    return { lat: -2.5489, lon: 118.0149, name: "Indonesia" };
  }
}
