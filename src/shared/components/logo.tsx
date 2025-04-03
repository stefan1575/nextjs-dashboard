import { cn } from "@/shared/lib/utils";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex cursor-pointer items-center gap-2 font-medium",
        className,
      )}
    >
      <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <GalleryVerticalEnd className="size-4" />
      </div>
      Acme Inc.
    </Link>
  );
}
