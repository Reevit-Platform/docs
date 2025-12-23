"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

interface CombinedLogoProps {
  className?: string
}

export function CombinedLogo({ className = "" }: CombinedLogoProps) {
  const { theme } = useTheme()
  return (
    <div className={`flex items-center gap-1 font-normal ${className}`}>
      <Link href="/" className="relative">
        <Image src={theme === "dark" ? "/images/logos/logo-white.png" : "/images/logos/logo-black.png"} alt="reevit" width={100} height={100} />
      </Link>
    </div>
  )
}