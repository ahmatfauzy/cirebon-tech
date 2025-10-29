"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, GraduationCap } from "lucide-react";
import { articlesData } from "@/lib/articles-data";

export default function EdukasiPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Mapping kategori filter
  const categoryMap: Record<string, (cat: string) => boolean> = {
    Semua: () => true,
    Artikel: (cat) => cat !== "Panduan Teknis",
    "Panduan Teknis": (cat) => cat === "Panduan Teknis",
  };

  const categories = ["Semua", "Artikel", "Panduan Teknis"];

  const filteredArticles = articlesData.filter((article) => {
    const matchCategory = categoryMap[selectedCategory](article.category);
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
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Category Badge */}
                      {/* <div className="absolute flex items-center gap-2 top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        <Icon size={15} />
                        {article.category}
                      </div> */}
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Pertanyaan Umum
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Kolom Kiri */}
            <div className="space-y-4">
              {[
                {
                  q: "Apa itu AgroWin?",
                  a: "AgroWin adalah aplikasi berbasis AI yang membantu petani dan masyarakat umum dalam mengelola pertanian secara cerdas. Aplikasi ini menyediakan fitur deteksi penyakit tanaman lewat gambar, prediksi waktu tanam optimal berbasis data cuaca real-time dan sistem Fuzzy Logic, serta kalkulator hasil panen.",
                },
                {
                  q: "Apakah AgroWin berbayar?",
                  a: "Tidak. Semua fitur AgroWin dapat digunakan secara gratis oleh siapa pun. Tujuan utama kami adalah mendukung pertanian berkelanjutan melalui teknologi yang mudah diakses.",
                },
                {
                  q: "Bagaimana cara kerja deteksi penyakit tanaman?",
                  a: "Cukup unggah foto daun atau bagian tanaman yang terinfeksi. Sistem AI kami akan menganalisis gambar tersebut dan memberikan hasil deteksi beserta saran penanganannya berdasarkan basis data penyakit tanaman.",
                },
                {
                  q: "Apa fungsi sistem Fuzzy Logic di AgroWin?",
                  a: "Fuzzy Logic digunakan untuk menentukan waktu tanam terbaik berdasarkan data cuaca real-time, seperti suhu, curah hujan, dan kelembapan. Hasilnya membantu petani menanam di waktu paling ideal agar hasil panen optimal.",
                },
                {
                  q: "Apakah saya perlu memiliki keahlian teknis untuk menggunakan AgroWin?",
                  a: "Tidak sama sekali. AgroWin dirancang agar mudah digunakan oleh siapa pun, termasuk petani tradisional. Antarmuka sederhana dan panduan penggunaan tersedia di dalam aplikasi.",
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

            {/* Kolom Kanan */}
            <div className="space-y-4">
              {[
                {
                  q: "Bagaimana cara menggunakan kalkulator panen?",
                  a: "Anda hanya perlu memasukkan jenis tanaman, luas lahan, dan estimasi produktivitas. AgroWin akan menghitung estimasi hasil panen dan potensi keuntungan berdasarkan harga pasar terkini.",
                },
                {
                  q: "Dari mana data cuaca dan iklim diperoleh?",
                  a: "AgroWin mengambil data cuaca real-time dari API terpercaya seperti OpenWeatherMap untuk memastikan hasil analisis dan prediksi yang akurat.",
                },
                {
                  q: "Apakah data pengguna aman?",
                  a: "Ya. Kami menjaga privasi pengguna dengan sistem enkripsi dan tidak membagikan data pribadi kepada pihak ketiga. Semua data hanya digunakan untuk meningkatkan akurasi layanan.",
                },
                {
                  q: "Bagaimana sistem dari AgroWin?",
                  a: "AgroWin menggunakan dataset dalam pengembangan model AI untuk memberikan hasil yang akurat. Dan juga menggunakan metode terbaik seperti Fuzzy Logic dan algoritma machine learning lainnya untuk memberikan hasil yang akurat.",
                },
                {
                  q: "Bagaimana jika saya menemukan bug atau ingin memberi saran?",
                  a: "Kami sangat terbuka terhadap masukan! Anda dapat mengirim laporan melalui menu 'Hubungi Kami' di aplikasi atau melalui email resmi AgroWin.",
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
        </div>
      </section>
    </div>
  );
}
