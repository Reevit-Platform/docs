import Link from "next/link"
import Image from "next/image"

interface CombinedLogoProps {
  className?: string
}

export function CombinedLogo({ className = "" }: CombinedLogoProps) {
  return (
    <div className={`flex items-center gap-1 font-normal ${className}`}>
      <Link href="/" className="relative">
        <Image
          src="/images/logos/logo-black.png"
          alt="reevit"
          width={100}
          height={100}
          className="dark:hidden"
          priority
        />
        <Image
          src="/images/logos/logo-white.png"
          alt="reevit"
          width={100}
          height={100}
          className="hidden dark:block"
          priority
        />
      </Link>
    </div>
  )
}