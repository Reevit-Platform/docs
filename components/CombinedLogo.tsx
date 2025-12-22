import { LogoIcon as OpenFrontIcon } from "./LogoIcon-openfront"
import { LogoIcon as OpenShipIcon } from "./LogoIcon"
import { OpensupportLogoIcon as OpenSupportIcon } from "./OpensupportLogoIcon"
import Link from "next/link"
import Image from "next/image"

interface CombinedLogoProps {
  className?: string
}

export function CombinedLogo({ className = "" }: CombinedLogoProps) {
  return (
    <div className={`flex items-center gap-1 font-normal ${className}`}>
      <Link href="/" className="relative">
        <Image src="/images/logos/logo-white.png" alt="reevit" width={100} height={100} />
      </Link>
    </div>
  )
}