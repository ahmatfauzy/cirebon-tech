"use client";

import {
  Calculator,
  MapPin,
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  CloudHail,
} from "lucide-react";
import React, { useState } from "react";

type WeatherData = {
  temp: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
};

const formatIDR = (n: number | string) =>
  Number(n || 0).toLocaleString("id-ID");

const CalculateSection = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  // Harvest Calculator State
  const [harvestData, setHarvestData] = useState({
    cropType: "padi",
    plantingDate: "",
    landArea: "",
    expectedYield: "",
    pricePerKg: "",
    totalSalesPrice: "",
  });

  const mockWeatherData: WeatherData = {
    temp: 28,
    humidity: 75,
    rainfall: 45,
    windSpeed: 12,
    condition: "Berawan",
  };

  const handleLocationSearch = async () => {
    if (!location.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setWeather(mockWeatherData);
      setLoading(false);
    }, 800);
  };

  const calculateHarvest = () => {
    if (!harvestData.plantingDate || !harvestData.landArea) {
      alert("Silakan isi semua field");
      return;
    }

    // contoh: gunakan value ini kalau nantinya mau ditampilkan
    const plantingDate = new Date(harvestData.plantingDate);
    const harvestDate = new Date(plantingDate);
    harvestDate.setDate(harvestDate.getDate() + 120);

    const estimatedYield = (Number(harvestData.landArea) * 5).toFixed(2); // 5 ton/ha
    let totalPrice = "";
    if (harvestData.pricePerKg) {
      const yieldInKg = Number(estimatedYield) * 1000;
      totalPrice = String(
        Math.round(yieldInKg * Number(harvestData.pricePerKg))
      );
    }

    setHarvestData((prev) => ({
      ...prev,
      expectedYield: estimatedYield,
      totalSalesPrice: totalPrice,
    }));
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      <div className="w-30 h-30 sm:w-40 sm:h-40 absolute rounded-full -top-4 sm:top-0 -right-20 sm:-right-12 z-10 bg-primary opacity-30 sm:opacity-40 pointer-events-none" />

      <div className="md:absolute left-0 right-0 z-20 flex flex-col items-center justify-center gap-6 py-12 md:py-16 px-3 sm:px-4">
        <h2 className="md:text-4xl sm:text-3xl text-xl font-bold text-center md:text-left">
          Deteksi Cuaca dan Kalkulator Panen
        </h2>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Weather */}
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="md:text-2xl sm:text-xl text-lg font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                <Cloud className="text-primary" />
                Deteksi Cuaca
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Lokasi Anda
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama kota atau desa"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  onClick={handleLocationSearch}
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Mencari..." : "Cari Cuaca"}
                </button>

                {weather && (
                  <div className="mt-4 sm:mt-6 space-y-4 bg-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer size={20} />
                        <span className="text-sm text-muted-foreground">
                          Suhu
                        </span>
                      </div>
                      <span className="font-bold text-foreground">
                        {weather.temp}°C
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets size={20} />
                        <span className="text-sm text-muted-foreground">
                          Kelembapan
                        </span>
                      </div>
                      <span className="font-bold text-foreground">
                        {weather.humidity}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cloud size={20} />
                        <span className="text-sm text-muted-foreground">
                          Cuaca
                        </span>
                      </div>
                      <span className="font-bold text-foreground">
                        {weather.condition}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wind size={20} />
                        <span className="text-sm text-muted-foreground">
                          Angin
                        </span>
                      </div>
                      <span className="font-bold text-foreground">
                        {weather.windSpeed} km/h
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <CloudHail size={20} />
                        <span className="text-sm text-muted-foreground">
                          Curah Hujan
                        </span>
                      </div>
                      <span className="font-bold text-foreground">
                        {weather.rainfall} mm
                      </span>
                    </div>

                    <div className="mt-2 sm:mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                      <p className="text-sm text-foreground">
                        <strong>Rekomendasi:</strong> Kondisi cuaca cocok untuk
                        irigasi. Kelembapan optimal untuk pertumbuhan tanaman.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Panen Calculate */}
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="md:text-2xl sm:text-xl text-lg font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                <Calculator className="text-primary" />
                Kalkulator Estimasi Panen
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Jenis Tanaman
                  </label>
                  <select
                    value={harvestData.cropType}
                    onChange={(e) =>
                      setHarvestData((prev) => ({
                        ...prev,
                        cropType: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="padi">Padi</option>
                    <option value="jagung">Jagung</option>
                    <option value="kacang">Kacang Tanah</option>
                    <option value="cabai">Cabai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Tanggal Tanam
                  </label>
                  <input
                    type="date"
                    value={harvestData.plantingDate}
                    onChange={(e) =>
                      setHarvestData((prev) => ({
                        ...prev,
                        plantingDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Luas Lahan (Hektar)
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 2.5"
                    value={harvestData.landArea}
                    onChange={(e) =>
                      setHarvestData((prev) => ({
                        ...prev,
                        landArea: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Estimasi Hasil Panen
                  </label>
                  <input
                    type="text"
                    value={
                      harvestData.expectedYield
                        ? `${harvestData.expectedYield} ton`
                        : ""
                    }
                    disabled
                    className="w-full px-4 py-3 border border-border rounded-lg bg-muted text-foreground focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Harga Jual per Kg (Rp)
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 5.000"
                    value={harvestData.pricePerKg}
                    onChange={(e) =>
                      setHarvestData((prev) => ({
                        ...prev,
                        pricePerKg: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Total Harga Penjualan
                  </label>
                  <input
                    type="text"
                    value={
                      harvestData.totalSalesPrice
                        ? `Rp ${formatIDR(harvestData.totalSalesPrice)}`
                        : ""
                    }
                    disabled
                    className="w-full px-4 py-3 border border-border rounded-lg bg-muted text-foreground font-semibold"
                  />
                </div>
              </div>

              <button
                onClick={calculateHarvest}
                className="w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Hitung Estimasi Panen
              </button>

              {harvestData.expectedYield && (
                <div className="mt-6 space-y-3">
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm text-foreground">
                      <strong>Hasil Estimasi:</strong> Estimasi hasil panen{" "}
                      <span className="text-primary font-bold">
                        {harvestData.expectedYield} ton
                      </span>{" "}
                      untuk luas lahan {harvestData.landArea} hektar.
                    </p>
                  </div>

                  {harvestData.totalSalesPrice && (
                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                      <p className="text-sm text-foreground">
                        <strong>Total Harga Penjualan:</strong> Dengan harga
                        jual Rp {formatIDR(harvestData.pricePerKg)}/kg, total
                        pendapatan:{" "}
                        <span className="text-accent font-bold">
                          Rp {formatIDR(harvestData.totalSalesPrice)}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-30 h-30 sm:w-40 sm:h-40 absolute rounded-full bottom-6 sm:bottom-10 -left-25 sm:-left-12 z-10 bg-primary opacity-30 sm:opacity-40 pointer-events-none" />
    </div>
  );
};

export default CalculateSection;
