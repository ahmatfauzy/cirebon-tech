import { NextRequest, NextResponse } from "next/server";
import { getWeatherData, geoIp } from "@/lib/weather";
import { recommendCrop } from "@/lib/recommend";
import crops from "@/lib/crops.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const crop_id = searchParams.get("crop_id") || "padi";
  const lat = parseFloat(searchParams.get("lat") || "");
  const lon = parseFloat(searchParams.get("lon") || "");

  const geo = isNaN(lat) || isNaN(lon) ? await geoIp(req) : { lat, lon };

  try {
    const weather = await getWeatherData(geo.lat, geo.lon);
    const rec = recommendCrop(weather, crop_id);

    const crop = crops.find((c) => c.id === crop_id);

    return NextResponse.json({
      location: geo,
      current: weather.current,
      forecast: weather.forecast,
      recommendation: { ...rec, crop: crop?.name },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
  }
}
