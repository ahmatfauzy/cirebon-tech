import Link from "next/link";
import { Sprout } from "lucide-react";

type Footer = {
  title: string;
  links: {
    name: string;
    href?: string;
  }[];
};

const sections: Footer[] = [
  {
    title: "Navigasi",
    links: [
      { name: "Beranda", href: "/" },
      { name: "Edukasi", href: "/edukasi" },
      { name: "Deteksi Penyakit", href: "#" },
    ],
  },
  {
    title: "Kontak",
    links: [
      { name: "Email", href: "#" },
      { name: "Phone", href: "#" },
      { name: "Account", href: "#" },
    ],
  },
  {
    title: "Sosial Media",
    links: [
      { name: "Facebook", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "WhatsApp", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="container mx-auto py-5">
      <div className="space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-1 text-primary">
              <Sprout />
              <span className="text-xl font-bold">AgroWin</span>
            </Link>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Aplikasi Pertanian Cerdas Berbasis Kecerdasan Buatan Untuk Membantu Petani Menanam Tanaman Dengan Efisien Dan Menguntungkan
            </p>
          </div>

          {/* Footer Sections */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            {sections.map((section, idx) => (
              <div key={idx}>
                <p className="font-medium text-foreground">{section.title}</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t-2 flex items-center justify-center">
          <p className="text-lg text-muted-foreground mt-3">
            &copy; 2025. AgroWin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
