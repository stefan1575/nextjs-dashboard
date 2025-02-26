import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export function NavNotification() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full bg-muted hover:border-2 hover:border-sidebar-ring/30 cursor-pointer"
    >
      <Bell />
    </Button>
  )
}