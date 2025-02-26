export default async function DashboardSkeleton() {
  return (
    <>
      <div className="animate-pulse grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="animate-pulse aspect-video rounded-xl bg-muted/50" />
        <div className="animate-pulse aspect-video rounded-xl bg-muted/50" />
        <div className="animate-pulse aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="animate-pulse min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </>
  )
}
