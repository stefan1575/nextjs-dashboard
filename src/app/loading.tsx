import { Spinner } from "@/shared/components/ui/spinner";

export default function Loading() {
  return (
    <div className="bg-background fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Spinner type="bars" className="size-20" />
        <p className="text-muted-foreground text-base">Loading...</p>
      </div>
    </div>
  );
}
