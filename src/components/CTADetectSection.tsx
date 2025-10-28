"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CTADetectSection = () => {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* background elemen lama tetap */}
      <div className="w-30 h-30 sm:w-40 sm:h-40 absolute rounded-full -top-4 sm:top-0 -right-20 sm:-right-12 z-10 bg-primary opacity-30 sm:opacity-40 pointer-events-none" />

      <div className="md:absolute left-0 right-0 z-20 flex flex-col items-center justify-center gap-6 py-20 md:py-32 px-4 text-center">
        <h2 className="md:text-5xl sm:text-4xl text-3xl font-bold text-foreground max-w-2xl leading-tight">
          Dapatkan Layanan Terbaik untuk Tanamanmu
        </h2>
        <p className="text-muted-foreground max-w-xl text-base sm:text-lg">
          Gunakan sistem deteksi penyakit dan analisis AI lainnya dari kami untuk memaksimalkan hasil pertanianmu.
        </p>

        <Link
          href="/deteksi"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Mulai Deteksi Sekarang
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* elemen dekorasi bawah tetap */}
      <div className="w-30 h-30 sm:w-40 sm:h-40 absolute rounded-full bottom-6 sm:bottom-10 -left-25 sm:-left-12 z-10 bg-primary opacity-30 sm:opacity-40 pointer-events-none" />
    </div>
  );
};

export default CTADetectSection;
