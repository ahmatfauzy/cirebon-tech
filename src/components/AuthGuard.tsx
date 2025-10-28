"use client";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = useSession();

  // Masih loading
  if (session === undefined) return null;

  // Belum login
  if (!session) {
    router.replace("/login");
    return null;
  }

  // Sudah login
  return <>{children}</>;
}
