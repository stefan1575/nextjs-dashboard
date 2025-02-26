"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

export function NavPath() {
  const pathname = usePathname()

  // Remove leading slash and split into segments
  const segments = pathname?.split('/').filter(Boolean) || []

  const renderBreadcrumbs = () => {
    // If we're at the root level (e.g., /dashboard)
    if (segments.length === 1) {
      return (
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbPage >{segments[0].charAt(0).toUpperCase() + segments[0].slice(1)}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    }

    // If we're in a nested route (e.g., /dashboard/table)
    return segments.map((segment, index) => {
      const isLast = index === segments.length - 1
      const href = `/${segments.slice(0, index + 1).join('/')}`
      const label = segment.charAt(0).toUpperCase() + segment.slice(1)

      return (
        <Fragment key={segment}>
          <BreadcrumbItem className="hidden md:block">
            {isLast ? (
              <BreadcrumbPage >{label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
        </Fragment>
      )
    })
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {renderBreadcrumbs()}
      </BreadcrumbList>
    </Breadcrumb>
  )
}