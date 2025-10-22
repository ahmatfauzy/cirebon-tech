import { NextResponse } from "next/server";

interface CropData {
  yield_per_m2: number;
  price_per_kg: number;
  days: number;
}

const CROP_DATA: Record<string, CropData> = {
  tomat: { yield_per_m2: 0.8, price_per_kg: 5000, days: 75 },
  cabai: { yield_per_m2: 0.6, price_per_kg: 12000, days: 90 },
  selada: { yield_per_m2: 1.2, price_per_kg: 3000, days: 45 },
  wortel: { yield_per_m2: 1.0, price_per_kg: 4000, days: 60 },
  bayam: { yield_per_m2: 1.5, price_per_kg: 2500, days: 30 },
  "bawang-merah": { yield_per_m2: 1.1, price_per_kg: 14000, days: 100 },
  "bawang-putih": { yield_per_m2: 0.9, price_per_kg: 30000, days: 120 },
  kentang: { yield_per_m2: 2.5, price_per_kg: 6000, days: 90 },
  terong: { yield_per_m2: 0.7, price_per_kg: 4500, days: 70 },
  mentimun: { yield_per_m2: 1.3, price_per_kg: 3500, days: 45 },
  kangkung: { yield_per_m2: 2.0, price_per_kg: 2000, days: 25 },
  sawi: { yield_per_m2: 1.8, price_per_kg: 2200, days: 30 },
  semangka: { yield_per_m2: 4.0, price_per_kg: 4000, days: 80 },
  melon: { yield_per_m2: 3.5, price_per_kg: 5000, days: 75 },
  jeruk: { yield_per_m2: 1.5, price_per_kg: 8000, days: 365 },
  mangga: { yield_per_m2: 2.0, price_per_kg: 12000, days: 365 },
  padi: { yield_per_m2: 0.5, price_per_kg: 7000, days: 120 },
  jagung: { yield_per_m2: 0.7, price_per_kg: 4000, days: 90 },
  kedelai: { yield_per_m2: 0.4, price_per_kg: 10000, days: 85 },
};

export async function POST(req: Request) {
  const { crop_type, area, planting_date, price_per_kg } = await req.json();

  const crop = CROP_DATA[crop_type?.toLowerCase()];

  if (!crop) {
    return NextResponse.json({ error: "Crop not found" }, { status: 404 });
  }

  const harvestDate = new Date(planting_date);
  harvestDate.setDate(harvestDate.getDate() + crop.days);

  const yieldKg = crop.yield_per_m2 * area;
  const effectivePrice = price_per_kg || crop.price_per_kg;
  const income = yieldKg * effectivePrice;

  return NextResponse.json({
    crop_type,
    area,
    price_per_kg: effectivePrice,
    estimated_yield: +yieldKg.toFixed(2),
    estimated_income: Math.round(income),
    harvest_duration_days: crop.days,
    estimated_harvest_date: harvestDate.toISOString().split("T")[0],
  });
}
