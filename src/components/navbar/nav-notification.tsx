import { Button } from "../ui/button";
import { Bell } from "lucide-react";

export function NavNotification() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full bg-muted dark:hover:bg-muted hover:border-2 cursor-pointer size-8"
    >
      <Bell />
    </Button>
  );
}
