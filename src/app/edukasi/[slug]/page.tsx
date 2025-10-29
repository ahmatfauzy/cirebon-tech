"use client";

import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { articlesData } from "@/lib/articles-data";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const article = articlesData.find((a) => a.slug === slug);

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
            {/* <div className="flex w-fit items-center gap-2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              {Icon ? <Icon className="size-4" /> : null}
              {article.category}
            </div> */}
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
                    '<h2 class="text-3xl font-bold text-foreground mt-10 mb-4 pb-3 border-b-2 border-primary/30">'
                  )
                  .replace(
                    /<h3>/g,
                    '<h3 class="text-xl font-bold text-foreground mt-6 mb-3">'
                  )
                  .replace(
                    /<p>/g,
                    '<p class="text-muted-foreground leading-relaxed text-base">'
                  )
                  .replace(
                    /<ul>/g,
                    '<ul class="space-y-3 text-muted-foreground ml-2">'
                  )
                  .replace(
                    /<li>/g,
                    '<li class="flex gap-3 items-start"><span class="text-primary font-bold mt-1 flex-shrink-0">•</span><span class="flex-1">'
                  )
                  .replace(/<\/li>/g, "</span></li>")
                  .replace(
                    /<ol>/g,
                    '<ol class="space-y-3 text-muted-foreground ml-2 counter-reset: list-counter">'
                  )
                  .replace(
                    /<li>/g,
                    '<li class="flex gap-3 items-start"><span class="text-primary font-bold bg-primary/10 px-2.5 py-1 rounded min-w-fit flex-shrink-0">1.</span><span class="flex-1 pt-0.5">'
                  )
                  .replace(/<\/li>/g, "</span></li>"),
              }}
            />
          </div>

         
        </div>
      </section>
    </div>
  );
}
