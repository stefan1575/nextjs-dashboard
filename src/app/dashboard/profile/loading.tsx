import { Skeleton } from "@/shared/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-0">
      <Skeleton className="bg-muted/30 rounded-xl p-20" />
      <Skeleton className="bg-muted/30 rounded-xl p-20" />
      <Skeleton className="bg-muted/30 rounded-xl p-20" />
    </div>
  );
}
