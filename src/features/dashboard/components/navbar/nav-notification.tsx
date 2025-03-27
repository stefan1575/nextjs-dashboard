import { Button } from "@/shared/components/ui/button";
import { Bell } from "lucide-react";

export function NavNotification() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="bg-muted dark:hover:bg-muted size-8 cursor-pointer rounded-full hover:border-2"
    >
      <Bell />
    </Button>
  );
}
