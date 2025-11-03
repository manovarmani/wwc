import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  href?: string
  className?: string
}

const sizeConfig = {
  sm: { height: 24, width: 105 },   // 24 * 4.36 ≈ 105
  md: { height: 32, width: 140 },   // 32 * 4.36 ≈ 140
  lg: { height: 48, width: 209 },   // 48 * 4.36 ≈ 209
}

export function Logo({ 
  size = "md",
  href,
  className = ""
}: LogoProps) {
  const { width, height } = sizeConfig[size]

  const logoContent = (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/whitecoatcapital_jul27_color-1.png"
        alt="White Coat Capital Logo"
        width={width}
        height={height}
        className="object-contain flex-shrink-0"
        priority
      />
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

