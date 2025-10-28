"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, FileText, Search, Clock, GraduationCap } from "lucide-react";

type Article = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: "Artikel" | "Panduan Teknis";
  icon: typeof FileText;
  duration: string;
  date: string;
  image: string; // <- pakai string path dari /public
  content: string;
};

export default function EdukasiPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const articles: Article[] = [
    {
      id: 2,
      slug: "crop-health-monitoring",
      title: "Monitoring Kesehatan Tanaman Secara Real-time",
      description:
        "Panduan menggunakan platform untuk mendeteksi penyakit tanaman sejak dini dengan analitik visual.",
      category: "Artikel",
      icon: FileText,
      duration: "8 menit baca",
      date: "12 Okt 2024",
      image: "/weather-prediction.jpg",
      content:
        "Deteksi dini penyakit tanaman adalah kunci untuk menjaga produktivitas lahan...",
    },
    {
      id: 3,
      slug: "predictive-analytics-ai",
      title: "Memahami Predictive Analytics dengan AI",
      description:
        "Bagaimana teknologi AI membantu memprediksi hasil panen dan memberikan rekomendasi optimal.",
      category: "Panduan Teknis",
      icon: BookOpen,
      duration: "15 menit",
      date: "10 Okt 2024",
      image: "/weather-prediction.jpg",
      content:
        "Predictive analytics menggunakan machine learning untuk menganalisis pola pertumbuhan tanaman...",
    },
    {
      id: 5,
      slug: "water-efficiency-optimization",
      title: "Optimasi Penggunaan Air untuk Efisiensi Biaya",
      description:
        "Strategi menggunakan data untuk mengurangi biaya air sambil meningkatkan produktivitas lahan.",
      category: "Artikel",
      icon: FileText,
      duration: "10 menit baca",
      date: "05 Okt 2024",
      image: "/weather-prediction.jpg",
      content:
        "Efisiensi penggunaan air adalah prioritas utama dalam pertanian modern...",
    },
    {
      id: 6,
      slug: "soil-analysis-guide",
      title: "Analisis Tanah Menggunakan Platform AgroTech",
      description:
        "Panduan lengkap menganalisis kualitas tanah dan mendapatkan rekomendasi pemupukan yang tepat.",
      category: "Panduan Teknis",
      icon: BookOpen,
      duration: "14 menit",
      date: "03 Okt 2024",
      image: "/weather-prediction.jpg",
      content:
        "Analisis tanah yang akurat adalah fondasi dari pertanian yang produktif...",
    },
    {
      id: 8,
      slug: "weather-prediction-planning",
      title: "Perencanaan Tanam Berdasarkan Prediksi Cuaca",
      description:
        "Gunakan data cuaca untuk merencanakan waktu tanam dan panen yang optimal.",
      category: "Artikel",
      icon: FileText,
      duration: "9 menit baca",
      date: "28 Sep 2024",
      image: "/weather-prediction.jpg",
      content:
        "Prediksi cuaca yang akurat membantu petani membuat keputusan yang lebih baik...",
    },
    {
      id: 9,
      slug: "fertilizer-management",
      title: "Manajemen Pupuk yang Efisien dan Berkelanjutan",
      description:
        "Strategi pemupukan yang tepat untuk meningkatkan hasil panen sambil menjaga lingkungan.",
      category: "Panduan Teknis",
      icon: BookOpen,
      duration: "13 menit",
      date: "25 Sep 2024",
      image: "/weather-prediction.jpg",
      content:
        "Pemupukan yang tepat adalah kunci untuk mendapatkan hasil panen maksimal...",
    },
    {
      id: 11,
      slug: "crop-rotation-planning",
      title: "Perencanaan Rotasi Tanaman yang Optimal",
      description:
        "Panduan merencanakan rotasi tanaman untuk menjaga kesuburan tanah dan produktivitas jangka panjang.",
      category: "Artikel",
      icon: FileText,
      duration: "11 menit baca",
      date: "20 Sep 2024",
      image: "/weather-prediction.jpg",
      content:
        "Rotasi tanaman yang tepat dapat meningkatkan kesuburan tanah secara alami...",
    },
    {
      id: 12,
      slug: "harvest-estimation-guide",
      title: "Estimasi Hasil Panen dan Perencanaan Penjualan",
      description:
        "Gunakan kalkulator estimasi panen untuk merencanakan strategi penjualan yang menguntungkan.",
      category: "Panduan Teknis",
      icon: BookOpen,
      duration: "12 menit",
      date: "18 Sep 2024",
      image: "/weather-prediction.jpg",
      content:
        "Estimasi panen yang akurat membantu petani merencanakan keuangan dengan lebih baik...",
    },
  ];

  const categories = ["Semua", "Artikel", "Panduan Teknis"];

  const filteredArticles = articles.filter((article) => {
    const matchCategory =
      selectedCategory === "Semua" || article.category === selectedCategory;
    const matchSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex sm:flex-row flex-col-reverse items-center justify-center md:gap-40 sm:gap-20 gap-4 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16 md:py-24 md:px-6 sm:px-10 px-5">
        <div>
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Edukasi AgroWin
          </h1>
          <p className="md:text-lg text-sm opacity-90 max-w-2xl">
            Tingkatkan pengetahuan Anda tentang pertanian modern dengan
            tutorial, artikel, dan panduan teknis dari para ahli.
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-foreground/60"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari artikel, tutorial, atau panduan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:border-primary-foreground/40 transition-colors"
            />
          </div>
        </div>

        <div>
          <GraduationCap className="size-52" />
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Filter Kategori
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-foreground hover:bg-muted/80 border border-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const Icon = article.icon;
              return (
                <Link
                  key={article.id}
                  href={`/edukasi/${article.slug}`}
                  className="group"
                >
                  <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:border-primary/50">
                    {/* Image */}
                    <div className="relative overflow-hidden h-48 bg-muted">
                      <Image
                        width={500}
                        height={500}
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Category Badge */}
                      <div className="absolute flex items-center gap-2 top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        <Icon size={15} />
                        {article.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {article.description}
                      </p>

                      {/* Meta Info */}
                      <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock size={14} />
                            <span>{article.duration}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {article.date}
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                        Baca Selengkapnya →
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Tidak ada artikel yang sesuai dengan pencarian Anda.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Pertanyaan Umum
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Apakah saya perlu keahlian teknis untuk menggunakan AgroTech?",
                a: "Tidak, AgroTech dirancang untuk semua level pengguna. Kami menyediakan tutorial lengkap dan dukungan pelanggan 24/7.",
              },
              {
                q: "Berapa biaya untuk menggunakan semua fitur?",
                a: "AgroTech menawarkan paket gratis untuk pemula dan paket premium dengan fitur lengkap mulai dari Rp 99.000/bulan.",
              },
              {
                q: "Bagaimana cara mengintegrasikan dengan sistem yang sudah ada?",
                a: "Kami mendukung integrasi dengan berbagai sistem. Lihat panduan integrasi di bagian Edukasi atau hubungi tim support kami.",
              },
              {
                q: "Apakah data saya aman?",
                a: "Ya, semua data Anda dienkripsi dan disimpan di server aman dengan backup otomatis setiap hari.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-card border border-border rounded-lg p-6 cursor-pointer group"
              >
                <summary className="font-semibold text-foreground flex items-center justify-between">
                  {faq.q}
                  <span className="text-primary group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="text-muted-foreground mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
