"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  FileText,
  BookOpen,
} from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";

const articlesData = [
  {
    id: 2,
    slug: "crop-health-monitoring",
    title: "Monitoring Kesehatan Tanaman Secara Real-time",
    description:
      "Panduan menggunakan platform untuk mendeteksi penyakit tanaman sejak dini dengan analitik visual.",
    icon: FileText,
    category: "Artikel",
    duration: "8 menit baca",
    author: "Ir. Siti Nurhaliza",
    date: "12 Okt 2024",
    image: "/weather-prediction.jpg",
    content: `
      <h2>Pentingnya Monitoring Kesehatan Tanaman</h2>
      <p>Deteksi dini penyakit tanaman adalah kunci untuk menjaga produktivitas lahan. Dengan monitoring real-time, Anda dapat mengambil tindakan pencegahan sebelum penyakit menyebar.</p>

      <h2>Fitur Monitoring di AgroTech</h2>
      <p>Platform AgroTech menyediakan beberapa fitur monitoring:</p>
      <ul>
        <li>Analisis visual dengan AI</li>
        <li>Deteksi penyakit otomatis</li>
        <li>Alert real-time</li>
        <li>Rekomendasi penanganan</li>
      </ul>

      <h2>Cara Menggunakan Fitur Monitoring</h2>
      <p>Buka aplikasi AgroTech, pilih lahan Anda, dan sistem akan secara otomatis menganalisis kesehatan tanaman berdasarkan data sensor dan citra satelit.</p>
    `,
  },
  {
    id: 3,
    slug: "predictive-analytics-ai",
    title: "Memahami Predictive Analytics dengan AI",
    description:
      "Bagaimana teknologi AI membantu memprediksi hasil panen dan memberikan rekomendasi optimal.",
    icon: BookOpen,
    category: "Panduan Teknis",
    duration: "15 menit",
    author: "Prof. Ahmad Wijaya",
    date: "10 Okt 2024",
    image: "/weather-prediction.jpg",
    content: `
      <h2>Apa itu Predictive Analytics?</h2>
      <p>Predictive analytics menggunakan machine learning untuk menganalisis pola pertumbuhan tanaman dan memprediksi hasil panen dengan akurasi tinggi.</p>

      <h2>Bagaimana AI Bekerja</h2>
      <p>AI menganalisis data historis, kondisi cuaca, jenis tanah, dan faktor lainnya untuk membuat prediksi yang akurat tentang hasil panen Anda.</p>

      <h2>Manfaat Predictive Analytics</h2>
      <ul>
        <li>Prediksi hasil panen akurat</li>
        <li>Perencanaan yang lebih baik</li>
        <li>Optimasi penggunaan sumber daya</li>
        <li>Keputusan bisnis yang lebih cerdas</li>
      </ul>
    `,
  },

  {
    id: 5,
    slug: "water-efficiency-optimization",
    title: "Optimasi Penggunaan Air untuk Efisiensi Biaya",
    description:
      "Strategi menggunakan data untuk mengurangi biaya air sambil meningkatkan produktivitas lahan.",
    icon: FileText,
    category: "Artikel",
    duration: "10 menit baca",
    author: "Dr. Hendra Kusuma",
    date: "05 Okt 2024",
    image: "/weather-prediction.jpg",
    content: `
      <h2>Pentingnya Efisiensi Air</h2>
      <p>Efisiensi penggunaan air adalah prioritas utama dalam pertanian modern. Dengan strategi yang tepat, Anda dapat menghemat biaya sambil meningkatkan hasil panen.</p>

      <h2>Strategi Optimasi Air</h2>
      <ul>
        <li>Gunakan sensor kelembaban tanah</li>
        <li>Irigasi pada waktu yang tepat</li>
        <li>Monitor penggunaan air</li>
        <li>Sesuaikan dengan cuaca</li>
      </ul>

      <h2>Hasil yang Dapat Dicapai</h2>
      <p>Dengan optimasi yang tepat, Anda dapat menghemat hingga 30% biaya air sambil meningkatkan hasil panen hingga 20%.</p>
    `,
  },
  {
    id: 6,
    slug: "soil-analysis-guide",
    title: "Analisis Tanah Menggunakan Platform AgroTech",
    description:
      "Panduan lengkap menganalisis kualitas tanah dan mendapatkan rekomendasi pemupukan yang tepat.",
    icon: BookOpen,
    category: "Panduan Teknis",
    duration: "14 menit",
    author: "Ir. Bambang Sutrisno",
    date: "03 Okt 2024",
    image: "/weather-prediction.jpg",
    content: `
      <h2>Pentingnya Analisis Tanah</h2>
      <p>Analisis tanah yang akurat adalah fondasi dari pertanian yang produktif. Dengan mengetahui komposisi tanah, Anda dapat memberikan nutrisi yang tepat untuk tanaman.</p>

      <h2>Parameter Analisis Tanah</h2>
      <ul>
        <li>pH tanah</li>
        <li>Kandungan nitrogen</li>
        <li>Kandungan fosfor</li>
        <li>Kandungan kalium</li>
        <li>Tekstur tanah</li>
      </ul>

      <h2>Cara Melakukan Analisis</h2>
      <p>Gunakan fitur analisis tanah di AgroTech untuk mendapatkan rekomendasi pemupukan yang disesuaikan dengan kondisi tanah Anda.</p>
    `,
  },

  {
    id: 8,
    slug: "weather-prediction-planning",
    title: "Perencanaan Tanam Berdasarkan Prediksi Cuaca",
    description:
      "Gunakan data cuaca untuk merencanakan waktu tanam dan panen yang optimal.",
    icon: FileText,
    category: "Artikel",
    duration: "9 menit baca",
    author: "Meteorolog Agus Setiawan",
    date: "28 Sep 2024",
    image: "/weather-prediction.jpg",
    content: `
      <h2>Pentingnya Prediksi Cuaca</h2>
      <p>Prediksi cuaca yang akurat membantu petani membuat keputusan yang lebih baik tentang waktu tanam dan panen.</p>

      <h2>Faktor Cuaca yang Penting</h2>
      <ul>
        <li>Curah hujan</li>
        <li>Suhu udara</li>
        <li>Kelembaban</li>
        <li>Kecepatan angin</li>
      </ul>

      <h2>Cara Menggunakan Data Cuaca</h2>
      <p>Gunakan fitur deteksi cuaca di AgroTech untuk mendapatkan prediksi cuaca akurat dan rekomendasi waktu tanam yang optimal.</p>
    `,
  },
  {
    id: 9,
    slug: "fertilizer-management",
    title: "Manajemen Pupuk yang Efisien dan Berkelanjutan",
    description:
      "Strategi pemupukan yang tepat untuk meningkatkan hasil panen sambil menjaga lingkungan.",
    icon: BookOpen,
    category: "Panduan Teknis",
    duration: "13 menit",
    author: "Dr. Suryanto",
    date: "25 Sep 2024",
    image: "/weather-prediction.jpg",
    content: `
      <h2>Strategi Pemupukan yang Tepat</h2>
      <p>Pemupukan yang tepat adalah kunci untuk mendapatkan hasil panen maksimal sambil menjaga keberlanjutan lingkungan.</p>

      <h2>Jenis Pupuk</h2>
      <ul>
        <li>Pupuk organik</li>
        <li>Pupuk anorganik</li>
        <li>Pupuk hayati</li>
      </ul>

      <h2>Rekomendasi Pemupukan</h2>
      <p>Gunakan hasil analisis tanah untuk menentukan jenis dan jumlah pupuk yang tepat untuk lahan Anda.</p>
    `,
  },

  {
    id: 11,
    slug: "crop-rotation-planning",
    title: "Perencanaan Rotasi Tanaman yang Optimal",
    description:
      "Panduan merencanakan rotasi tanaman untuk menjaga kesuburan tanah dan produktivitas jangka panjang.",
    icon: FileText,
    category: "Artikel",
    duration: "11 menit baca",
    author: "Prof. Bambang Irawan",
    date: "20 Sep 2024",
    image: "/weather-prediction.jpg",
    content: `
      <h2>Manfaat Rotasi Tanaman</h2>
      <p>Rotasi tanaman yang tepat dapat meningkatkan kesuburan tanah secara alami dan mengurangi penggunaan pupuk kimia.</p>

      <h2>Prinsip Rotasi Tanaman</h2>
      <ul>
        <li>Ganti jenis tanaman setiap musim</li>
        <li>Gunakan tanaman legum untuk memperkaya nitrogen</li>
        <li>Hindari menanam tanaman sejenis berturut-turut</li>
      </ul>

      <h2>Contoh Pola Rotasi</h2>
      <p>Contoh pola rotasi: Padi → Kacang → Jagung → Padi. Pola ini membantu menjaga keseimbangan nutrisi tanah.</p>
    `,
  },
  {
    id: 12,
    slug: "harvest-estimation-guide",
    title: "Estimasi Hasil Panen dan Perencanaan Penjualan",
    description:
      "Gunakan kalkulator estimasi panen untuk merencanakan strategi penjualan yang menguntungkan.",
    icon: BookOpen,
    category: "Panduan Teknis",
    duration: "12 menit",
    author: "Ekonom Pertanian Siti Rahayu",
    date: "18 Sep 2024",
    image: "/weather-prediction.jpg",
    content: `
      <h2>Pentingnya Estimasi Panen</h2>
      <p>Estimasi panen yang akurat membantu petani merencanakan keuangan dengan lebih baik dan mengoptimalkan strategi penjualan.</p>

      <h2>Faktor yang Mempengaruhi Hasil Panen</h2>
      <ul>
        <li>Jenis tanaman</li>
        <li>Luas lahan</li>
        <li>Kondisi cuaca</li>
        <li>Kesehatan tanaman</li>
        <li>Manajemen lahan</li>
      </ul>

      <h2>Cara Menggunakan Kalkulator Panen</h2>
      <p>Gunakan fitur kalkulator estimasi panen di AgroTech untuk mendapatkan estimasi hasil panen dan perencanaan penjualan yang lebih akurat.</p>
    `,
  },
];

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const article = articlesData.find((a) => a.slug === slug);
  const Icon = article?.icon;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Artikel Tidak Ditemukan
            </h1>
            <Link
              href="/edukasi"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              Kembali ke Edukasi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/edukasi"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-6"
          >
            <ArrowLeft size={20} />
            Kembali ke Edukasi
          </Link>

          <div className="space-y-4">
            <div className="flex w-fit items-center gap-2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              {Icon ? <Icon className="size-4" /> : null}
              {article.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {article.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-muted py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Image
            width={500}
            height={500}
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none">
            <div
              className="text-foreground space-y-6"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(
                    /<h2>/g,
                    '<h2 class="text-2xl font-bold text-foreground mt-8 mb-4">'
                  )
                  .replace(
                    /<h3>/g,
                    '<h3 class="text-xl font-bold text-foreground mt-6 mb-3">'
                  )
                  .replace(
                    /<p>/g,
                    '<p class="text-muted-foreground leading-relaxed">'
                  )
                  .replace(
                    /<ul>/g,
                    '<ul class="list-disc list-inside space-y-2 text-muted-foreground">'
                  )
                  .replace(
                    /<ol>/g,
                    '<ol class="list-decimal list-inside space-y-2 text-muted-foreground">'
                  )
                  .replace(/<li>/g, '<li class="ml-4">'),
              }}
            />
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                Bagikan Artikel Ini
              </h3>
              <div className="flex gap-3">
                <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                  <Share2 size={20} className="text-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Artikel Terkait
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articlesData
                .filter(
                  (a) => a.id !== article.id && a.category === article.category
                )
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/edukasi/${relatedArticle.slug}`}
                    className="group"
                  >
                    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all">
                      <Image
                        width={500}
                        height={500}
                        src={relatedArticle.image || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          {relatedArticle.duration}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
