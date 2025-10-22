"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import { LogoIcon } from "../logo"
import { UserButton } from "./user-button"
import { authClient } from "@/lib/auth-client";
import { Search } from "lucide-react"


export function Header() {
    const { data: session, isPending } = authClient.useSession();
    const isAuthenticated = !!session?.user && !isPending;

    return (
        <header className="sticky top-0 z-50 w-full bg-background ">
            <div className="mx-auto max-w-6xl px-6 py-4">
                <div className="flex items-center justify-between w-full gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <LogoIcon className="w-6 h-6 " />
                            <span className="font-bold text-primary text-2xl">INIT</span>
                        </Link>
                    </div>

                    {/* Action */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/"
                                >
                                    <Button
                                        variant="outline"
                                    >
                                        <Search />
                                        Test
                                    </Button>
                                </Link>
                                <UserButton />
                            </>

                        ) : (
                            <Link
                                href="/login"
                            >
                                <Button
                                    variant="outline"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header >
    )
}

