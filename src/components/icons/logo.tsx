import { GalleryVerticalEnd } from "lucide-react";

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return <GalleryVerticalEnd className={className} />
}