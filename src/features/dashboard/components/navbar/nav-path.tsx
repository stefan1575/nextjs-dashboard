"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function NavPath() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {segments.map((segment, index) => {
          // Create the path for this segment
          const path = `/${segments.slice(0, index + 1).join("/")}`;

          // Capitalize the first letter of the segment for display
          const displayName =
            segment.charAt(0).toUpperCase() + segment.slice(1);

          // Check if this is the last segment
          const isLastSegment = index === segments.length - 1;

          if (isLastSegment) {
            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbPage>{displayName}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return (
            <Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={path}>{displayName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
