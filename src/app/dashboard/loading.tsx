export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-0">
      <div className="grid animate-pulse auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/30 aspect-video rounded-xl" />
        <div className="bg-muted/30 aspect-video rounded-xl" />
        <div className="bg-muted/30 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/30 min-h-[100vh] flex-1 animate-pulse rounded-xl md:min-h-min" />
    </div>
  );
}
