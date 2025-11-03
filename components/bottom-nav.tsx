"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Activity, Users, User2 } from "lucide-react"

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: Activity },
  { href: "/community", label: "Community", icon: Users },
  { href: "/profile", label: "Profile", icon: User2 },
]

export function BottomNav() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <ul className="grid grid-cols-4 h-16 items-center">
          {items.map(({ href, label, icon: Icon }) => (
            <li key={href} className="h-full">
              <Link
                href={href}
                className="h-full w-full flex flex-col items-center justify-center gap-1 text-xs"
                aria-label={label}
              >
                <Icon
                  className={`${
                    isActive(href) ? "text-primary" : "text-muted-foreground"
                  } h-5 w-5`}
                />
                <span
                  className={`${
                    isActive(href) ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}


