import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-background fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-muted-foreground text-base">Loading...</p>
      </div>
    </div>
  );
}
