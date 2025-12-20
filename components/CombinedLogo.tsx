import { LogoIcon as OpenFrontIcon } from "./LogoIcon-openfront"
import { LogoIcon as OpenShipIcon } from "./LogoIcon"
import { OpensupportLogoIcon as OpenSupportIcon } from "./OpensupportLogoIcon"

interface CombinedLogoProps {
  className?: string
}

export function CombinedLogo({ className = "" }: CombinedLogoProps) {
  return (
    <div className={`flex items-center gap-1 font-normal ${className}`}>
      reevit
    </div>
  )
}