import crops from "./crops.json";
import plantingRules from "./planting_rules.json";

interface Range {
  min: number;
  max: number;
}

interface Condition {
  optimal: Range;
  acceptable: Range;
}

interface Rule {
  temperature: Condition;
  rainfall: Condition;
  humidity: Condition;
  avoidConditions: {
    maxConsecutiveDryDays: number;
    maxDailyRainfall: number;
    minTemperature: number;
  };
}

interface ForecastDay {
  date: string;
  tempAvg: number;
  tempMin: number;
  rainfall: number;
  humidity: number;
}

interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    rainfall?: number;
  };
  forecast: ForecastDay[];
}

export function recommendCrop(weather: WeatherData, cropId: string) {
  const crop = crops.find((c) => c.id === cropId);
  const rule = (plantingRules as Record<string, Rule>)[cropId];

  if (!crop || !rule || !weather.forecast?.length) {
    return {
      status: "unknown",
      statusText: "Data tidak lengkap",
      recommendation: "Tidak dapat memberikan rekomendasi",
    };
  }

  const forecast: ForecastDay[] = weather.forecast.slice(0, 8);
  if (!forecast.length) {
    return {
      status: "unknown",
      statusText: "Data tidak lengkap",
      recommendation: "Tidak dapat memberikan rekomendasi",
    };
  }

  const avgT = Math.round(
    forecast.reduce((a, d) => a + d.tempAvg, 0) / forecast.length
  );
  const totalR = +forecast.reduce((a, d) => a + d.rainfall, 0).toFixed(1);
  const avgH = Math.round(
    forecast.reduce((a, d) => a + d.humidity, 0) / forecast.length
  );

  // ✅ tanpa any — menggunakan Range type
  const score = (val: number, opt: Range, acc: Range): number =>
    val >= opt.min && val <= opt.max
      ? 1.0
      : val >= acc.min && val <= acc.max
      ? 0.6
      : 0.2;

  const tScore = score(
    avgT,
    rule.temperature.optimal,
    rule.temperature.acceptable
  );
  const rScore = score(totalR, rule.rainfall.optimal, rule.rainfall.acceptable);
  const hScore = score(avgH, rule.humidity.optimal, rule.humidity.acceptable);
  const overall = (tScore + rScore + hScore) / 3;

  // avoid conditions
  const issues: string[] = [];
  let streak = 0;
  let maxDry = 0;
  for (const d of forecast) {
    if (d.rainfall < 1) {
      streak += 1;
      maxDry = Math.max(maxDry, streak);
    } else {
      streak = 0;
    }
  }
  if (maxDry > rule.avoidConditions.maxConsecutiveDryDays) {
    issues.push(`${maxDry} hari berturut-turut tanpa hujan`);
  }

  const maxRain = Math.max(...forecast.map((d) => d.rainfall));
  if (maxRain > rule.avoidConditions.maxDailyRainfall) {
    issues.push(`hujan terlalu deras (${maxRain}mm/hari)`);
  }

  const minTemp = Math.min(...forecast.map((d) => d.tempMin));
  if (minTemp < rule.avoidConditions.minTemperature) {
    issues.push(`suhu terlalu rendah (${minTemp}°C)`);
  }

  // best dates
  const best: string[] = [];
  for (const d of forecast) {
    if (
      d.tempAvg >= rule.temperature.acceptable.min &&
      d.tempAvg <= rule.temperature.acceptable.max &&
      d.rainfall <= rule.avoidConditions.maxDailyRainfall &&
      d.humidity >= rule.humidity.acceptable.min &&
      d.humidity <= rule.humidity.acceptable.max &&
      d.tempMin >= rule.avoidConditions.minTemperature
    ) {
      best.push(d.date);
    }
  }
  best.splice(3); // maksimal 3 hari terbaik

  // status mapping
  let status: string, txt: string, rec: string;
  if (issues.length) {
    status = "bad";
    txt = "Tidak Disarankan";
    rec = `Hindari menanam karena: ${issues.join(", ")}`;
  } else if (overall >= 0.8 && best.length) {
    status = "optimal";
    txt = "Sangat Baik";
    rec = `Kondisi sangat optimal untuk menanam ${crop.name}.`;
  } else if (overall >= 0.6 && best.length) {
    status = "good";
    txt = "Baik";
    rec = `Kondisi baik untuk menanam ${crop.name}.`;
  } else if (overall >= 0.4) {
    status = "poor";
    txt = "Kurang Baik";
    rec = best.length
      ? "Kondisi kurang optimal tapi masih memungkinkan."
      : "Pertimbangkan menunda penanaman.";
  } else {
    status = "bad";
    txt = "Buruk";
    rec = "Kondisi tidak mendukung. Disarankan menunda.";
    best.length = 0;
  }

  console.log(`[${cropId}] issues:`, issues);
  console.log(
    `[${cropId}] maxRain=${maxRain}, maxAllow=${rule.avoidConditions.maxDailyRainfall}`
  );
  console.log(
    `[${cropId}] minTemp=${minTemp}, minAllow=${rule.avoidConditions.minTemperature}`
  );
  console.log(
    `[${cropId}] maxDry=${maxDry}, maxDryAllow=${rule.avoidConditions.maxConsecutiveDryDays}`
  );

  return {
    status,
    statusText: txt,
    recommendation: rec,
    bestDates: best,
    avgTemp: avgT,
    totalRainfall: totalR,
    avgHumidity: avgH,
    scores: {
      temperature: tScore,
      rainfall: rScore,
      humidity: hScore,
      overall,
    },
  };
}
