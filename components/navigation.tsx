"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo href="/" />
        <div className="flex items-center gap-4">
          <Link
            href="/physician"
            className={`text-sm transition ${isActive("/physician") ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`}
          >
            Physicians
          </Link>
          <Link
            href="/investor"
            className={`text-sm transition ${isActive("/investor") ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`}
          >
            Investors
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
