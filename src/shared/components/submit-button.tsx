import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

interface SubmitButtonProps {
  isLoading: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export function SubmitButton({
  isLoading,
  onClick,
  className,
  children,
}: SubmitButtonProps) {
  return isLoading ? (
    <Button disabled>
      <Loader2 className="mr-2 animate-spin" />
      Loading...
    </Button>
  ) : (
    <Button onClick={onClick} disabled={isLoading} className={className}>
      {children}
    </Button>
  );
}
