import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  showText?: boolean
  text?: string
  size?: "sm" | "md" | "lg"
  href?: string
  className?: string
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
}

export function Logo({ 
  showText = true, 
  text = "White Coat Capital",
  size = "md",
  href,
  className = ""
}: LogoProps) {
  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <Image
          src="/logo.png"
          alt="White Coat Capital Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={`font-semibold ${size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-lg"}`}>
          {text}
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}

