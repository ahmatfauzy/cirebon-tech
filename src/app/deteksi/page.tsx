"use client";

import React, { useState } from "react";
import {
  Cloud,
  Droplets,
  Thermometer,
  Wind,
  MapPin,
  Calculator,
  CloudHail,
  ScanSearch,
  AlertCircle,
  Upload,
} from "lucide-react";
import Image from "next/image";

type WeatherData = {
  temp: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
};

type Disease = {
  id: number;
  name: string;
  symptoms: string;
  severity: "Tinggi" | "Sedang" | "Rendah" | string;
  treatment: string;
  prevention: string;
};

type CropKey = "padi" | "jagung" | "cabai";

type DiseaseState = {
  image: File | null;
  imagePreview: string | null;
  cropType: CropKey;
  location: string;
  detectionResult: Disease | null;
  isDetecting: boolean;
};

type HarvestState = {
  cropType: string;
  plantingDate: string;
  landArea: string;
  expectedYield: string;
  pricePerKg: string;
  totalSalesPrice: string;
};

type PlantingState = {
  region: "jawa-tengah" | "jawa-barat" | "jawa-timur";
  season: "musim-hujan" | "musim-kemarau";
  soilType: "lempung" | "pasir" | "gambut";
};

export default function DeteksiPage() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const [diseaseData, setDiseaseData] = useState<DiseaseState>({
    image: null,
    imagePreview: null,
    cropType: "padi",
    location: "",
    detectionResult: null,
    isDetecting: false,
  });

  // Harvest Calculator State
  const [harvestData, setHarvestData] = useState<HarvestState>({
    cropType: "padi",
    plantingDate: "",
    landArea: "",
    expectedYield: "",
    pricePerKg: "",
    totalSalesPrice: "",
  });

  // Planting Recommendation State
  const [plantingData, setPlantingData] = useState<PlantingState>({
    region: "jawa-tengah",
    season: "musim-hujan",
    soilType: "lempung",
  });

  const mockWeatherData: WeatherData = {
    temp: 28,
    humidity: 75,
    rainfall: 45,
    windSpeed: 12,
    condition: "Berawan",
  };

  const diseaseDatabase: Record<CropKey, Disease[]> = {
    padi: [
      {
        id: 1,
        name: "Blas Daun",
        symptoms: "Bintik coklat dengan tepi abu-abu pada daun",
        severity: "Tinggi",
        treatment: "Gunakan fungisida berbahan aktif Triazol atau Strobilurin",
        prevention: "Jaga kelembaban, hindari genangan air berlebih",
      },
      {
        id: 2,
        name: "Hawar Daun Bakteri",
        symptoms: "Garis kuning pada tepi daun, meluas ke tengah",
        severity: "Sedang",
        treatment: "Aplikasi bakterisida, buang daun yang terinfeksi",
        prevention: "Gunakan benih sehat, rotasi tanaman",
      },
      {
        id: 3,
        name: "Tungro",
        symptoms: "Daun menguning, tanaman kerdil, produksi menurun",
        severity: "Tinggi",
        treatment:
          "Tidak ada obat, lakukan penyemprotan insektisida untuk vektor",
        prevention: "Gunakan varietas tahan, kontrol wereng",
      },
    ],
    jagung: [
      {
        id: 1,
        name: "Bulai",
        symptoms: "Garis putih pada daun, tanaman kerdil",
        severity: "Tinggi",
        treatment: "Gunakan varietas tahan, tidak ada obat kimia",
        prevention: "Pilih benih berkualitas, kontrol vektor",
      },
      {
        id: 2,
        name: "Bercak Daun Bipolaris",
        symptoms: "Bercak coklat oval pada daun dengan halo kuning",
        severity: "Sedang",
        treatment: "Aplikasi fungisida, buang bagian yang terinfeksi",
        prevention: "Jaga sanitasi lahan, rotasi tanaman",
      },
    ],
    cabai: [
      {
        id: 1,
        name: "Antraknosa",
        symptoms: "Bintik hitam dengan lingkaran kuning pada buah dan daun",
        severity: "Tinggi",
        treatment: "Gunakan fungisida berbahan aktif Benomil atau Karbendazim",
        prevention: "Hindari kelembaban tinggi, jaga drainase",
      },
      {
        id: 2,
        name: "Layu Fusarium",
        symptoms: "Tanaman layu, daun menguning, akar membusuk",
        severity: "Tinggi",
        treatment: "Tidak ada obat, cabut tanaman yang terinfeksi",
        prevention: "Gunakan lahan baru, sterilisasi media tanam",
      },
    ],
  };

  const handleLocationSearch = async () => {
    if (!location.trim()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWeather(mockWeatherData);
      setLoading(false);
    }, 1000);
  };

  const calculateHarvest = () => {
    if (!harvestData.plantingDate || !harvestData.landArea) {
      alert("Silakan isi semua field");
      return;
    }

    const plantingDateObj = new Date(harvestData.plantingDate);
    const harvestDate = new Date(plantingDateObj);
    harvestDate.setDate(harvestDate.getDate() + 120); // siklus 120 hari (contoh)

    const estimatedYield = (
      Number.parseFloat(harvestData.landArea || "0") * 5
    ).toFixed(2); // 5 ton/ha (contoh)

    let totalPrice = "";
    if (harvestData.pricePerKg) {
      const yieldInKg = Number.parseFloat(estimatedYield) * 1000; // ton -> kg
      const total = (
        yieldInKg * Number.parseFloat(harvestData.pricePerKg)
      ).toFixed(0);
      totalPrice = total;
    }

    setHarvestData((prev) => ({
      ...prev,
      expectedYield: estimatedYield,
      totalSalesPrice: totalPrice,
    }));
  };

  const plantingRecommendations = {
    "jawa-tengah": {
      "musim-hujan": {
        crops: ["Padi", "Jagung", "Kacang Tanah"],
        bestMonth: "Oktober - November",
      },
      "musim-kemarau": {
        crops: ["Jagung", "Kacang Hijau", "Bawang Merah"],
        bestMonth: "Mei - Juni",
      },
    },
    "jawa-barat": {
      "musim-hujan": {
        crops: ["Padi", "Cabai", "Tomat"],
        bestMonth: "September - Oktober",
      },
      "musim-kemarau": {
        crops: ["Jagung", "Bawang Merah", "Cabai"],
        bestMonth: "April - Mei",
      },
    },
    "jawa-timur": {
      "musim-hujan": {
        crops: ["Padi", "Tembakau", "Kacang Tanah"],
        bestMonth: "November - Desember",
      },
      "musim-kemarau": {
        crops: ["Jagung", "Kacang Hijau", "Bawang Merah"],
        bestMonth: "Juni - Juli",
      },
    },
  } as const;

  const currentRecommendation =
    plantingRecommendations[plantingData.region]?.[plantingData.season] || null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setDiseaseData((prev) => ({
        ...prev,
        image: file,
        imagePreview: typeof reader.result === "string" ? reader.result : null,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDetectDisease = () => {
    if (!diseaseData.imagePreview || !diseaseData.cropType) {
      alert("Silakan upload gambar dan pilih jenis tanaman");
      return;
    }

    setDiseaseData((prev) => ({ ...prev, isDetecting: true }));

    // Simulasi proses deteksi (2 detik)
    setTimeout(() => {
      const diseases = diseaseDatabase[diseaseData.cropType] || [];
      const randomDisease =
        diseases[Math.floor(Math.random() * diseases.length)] || null;

      setDiseaseData((prev) => ({
        ...prev,
        detectionResult: randomDisease,
        isDetecting: false,
      }));
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="flex sm:flex-row flex-col-reverse items-center justify-center md:gap-40 sm:gap-20 gap-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
        <div className="lg:px-2 md:px-5 sm:px-10 px-5">
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Deteksi & Kalkulator Pertanian
          </h1>
          <p className="md:text-lg text-sm opacity-90 max-w-2xl">
            Deteksi cuaca lokal, hitung estimasi panen, dan dapatkan rekomendasi
            tanam yang optimal untuk lahan Anda.
          </p>
        </div>
        <div>
          <ScanSearch className="size-52" />
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Weather Detection */}
            <div className="col-span-1 lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 h-full">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Cloud className="text-primary" />
                  Deteksi Cuaca
                </h2>

                <div className="space-y-4">
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
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <button
                    onClick={handleLocationSearch}
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? "Mencari..." : "Cari Cuaca"}
                  </button>

                  {weather && (
                    <div className="mt-6 space-y-4 bg-muted p-4 rounded-lg">
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
                            Kelembaban
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

                      <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <p className="text-sm text-foreground">
                          <strong>Rekomendasi:</strong> Kondisi cuaca cocok
                          untuk irigasi. Kelembaban optimal untuk pertumbuhan
                          tanaman.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Planting Recommendation */}
            <div className="col-span-1 bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Rekomendasi Tanam Optimal
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Wilayah
                  </label>
                  <select
                    value={plantingData.region}
                    onChange={(e) =>
                      setPlantingData((prev) => ({
                        ...prev,
                        region: e.target.value as PlantingState["region"],
                      }))
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="jawa-tengah">Jawa Tengah</option>
                    <option value="jawa-barat">Jawa Barat</option>
                    <option value="jawa-timur">Jawa Timur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Musim
                  </label>
                  <select
                    value={plantingData.season}
                    onChange={(e) =>
                      setPlantingData((prev) => ({
                        ...prev,
                        season: e.target.value as PlantingState["season"],
                      }))
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="musim-hujan">Musim Hujan</option>
                    <option value="musim-kemarau">Musim Kemarau</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Jenis Tanah
                  </label>
                  <select
                    value={plantingData.soilType}
                    onChange={(e) =>
                      setPlantingData((prev) => ({
                        ...prev,
                        soilType: e.target.value as PlantingState["soilType"],
                      }))
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="lempung">Lempung</option>
                    <option value="pasir">Pasir</option>
                    <option value="gambut">Gambut</option>
                  </select>
                </div>
              </div>

              {currentRecommendation && (
                <div className="space-y-4">
                  <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                    <p className="text-sm text-foreground mb-2">
                      <strong>Waktu Tanam Terbaik:</strong>{" "}
                      {currentRecommendation.bestMonth}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Berdasarkan pola cuaca dan musim di wilayah Anda.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">
                      Tanaman yang Direkomendasikan:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {currentRecommendation.crops.map((crop, index) => (
                        <div
                          key={index}
                          className="p-3 bg-muted rounded-lg border border-border"
                        >
                          <p className="font-medium text-foreground">{crop}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Cocok untuk musim ini
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm text-foreground">
                      <strong>Tips:</strong> Pastikan lahan sudah disiapkan 2
                      minggu sebelum waktu tanam optimal. Gunakan benih
                      berkualitas dan lakukan pengairan yang cukup.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Disease Detection */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <AlertCircle className="text-accent" />
                Pendeteksi Penyakit Tanaman
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Jenis Tanaman
                  </label>
                  <select
                    value={diseaseData.cropType}
                    onChange={(e) =>
                      setDiseaseData((prev) => ({
                        ...prev,
                        cropType: e.target.value as CropKey,
                      }))
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="padi">Padi</option>
                    <option value="jagung">Jagung</option>
                    <option value="cabai">Cabai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Lokasi Lahan
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan lokasi lahan"
                    value={diseaseData.location}
                    onChange={(e) =>
                      setDiseaseData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Upload Foto Tanaman
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="disease-image-input"
                  />
                  <label
                    htmlFor="disease-image-input"
                    className="cursor-pointer"
                  >
                    <Upload
                      className="mx-auto mb-2 text-muted-foreground"
                      size={32}
                    />
                    <p className="text-sm font-medium text-foreground">
                      Klik untuk upload atau drag & drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, GIF (Max 5MB)
                    </p>
                  </label>
                </div>

                {diseaseData.imagePreview && (
                  <div className="mt-4">
                    <Image
                      width={500}
                      height={500}
                      src={diseaseData.imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-border"
                    />
                    <button
                      onClick={() =>
                        setDiseaseData((prev) => ({
                          ...prev,
                          image: null,
                          imagePreview: null,
                          detectionResult: null,
                        }))
                      }
                      className="mt-2 text-sm text-accent hover:underline"
                    >
                      Ganti Gambar
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleDetectDisease}
                disabled={!diseaseData.imagePreview || diseaseData.isDetecting}
                className="w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {diseaseData.isDetecting ? "Mendeteksi..." : "Deteksi Penyakit"}
              </button>

              {diseaseData.detectionResult && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className="text-accent flex-shrink-0 mt-1"
                        size={20}
                      />
                      <div>
                        <h3 className="font-bold text-foreground">
                          {diseaseData.detectionResult.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {diseaseData.detectionResult.symptoms}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        TINGKAT KEPARAHAN
                      </p>
                      <p className="font-bold text-foreground">
                        {diseaseData.detectionResult.severity}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        LOKASI LAHAN
                      </p>
                      <p className="font-bold text-foreground">
                        {diseaseData.location || "Tidak diisi"}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-xs font-semibold text-primary mb-2">
                      PENANGANAN
                    </p>
                    <p className="text-sm text-foreground">
                      {diseaseData.detectionResult.treatment}
                    </p>
                  </div>

                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-xs font-semibold text-green-700 mb-2">
                      PENCEGAHAN
                    </p>
                    <p className="text-sm text-foreground">
                      {diseaseData.detectionResult.prevention}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Harvest Calculator */}
            <div className=" space-y-8">
              <div className="col-span-2 bg-card border border-border rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Calculator className="text-primary" />
                  Kalkulator Estimasi Panen
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-foreground focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Harga Jual per Kg (Rp)
                    </label>
                    <input
                      type="number"
                      placeholder="Contoh: 5000"
                      value={harvestData.pricePerKg}
                      onChange={(e) =>
                        setHarvestData((prev) => ({
                          ...prev,
                          pricePerKg: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                          ? `Rp ${Number(
                              harvestData.totalSalesPrice
                            ).toLocaleString("id-ID")}`
                          : ""
                      }
                      disabled
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-foreground focus:outline-none font-semibold"
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
                        <strong>Hasil Estimasi:</strong> Berdasarkan data Anda,
                        estimasi hasil panen adalah{" "}
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
                          jual Rp{" "}
                          {Number(harvestData.pricePerKg).toLocaleString(
                            "id-ID"
                          )}
                          /kg, total pendapatan penjualan Anda adalah{" "}
                          <span className="text-accent font-bold">
                            Rp{" "}
                            {Number(harvestData.totalSalesPrice).toLocaleString(
                              "id-ID"
                            )}
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
      </section>
    </div>
  );
}
