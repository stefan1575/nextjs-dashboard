export function DashboardSkeleton() {
  return (
    <>
      <div className="grid animate-pulse auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video animate-pulse rounded-xl" />
        <div className="bg-muted/50 aspect-video animate-pulse rounded-xl" />
        <div className="bg-muted/50 aspect-video animate-pulse rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 animate-pulse rounded-xl md:min-h-min" />
    </>
  );
}
