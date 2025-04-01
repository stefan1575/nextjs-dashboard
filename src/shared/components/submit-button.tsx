import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

interface SubmitButtonProps extends React.ComponentProps<"button"> {
  isLoading: boolean;
}

export function SubmitButton({
  isLoading,
  children,
  ...props
}: SubmitButtonProps) {
  return isLoading ? (
    <Button disabled>
      <Loader2 className="mr-2 animate-spin" />
      Loading...
    </Button>
  ) : (
    <Button disabled={isLoading} {...props}>
      {children}
    </Button>
  );
}
