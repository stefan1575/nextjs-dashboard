
/**
 * Intended to be used as a placeholder for a component that directly uses the dashboard layout.tsx  
 */
export function DashboardPlaceholder() {
  return (
    <>
      <div className="m-4 mb-0 grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="m-4 min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
    </>
  )
}