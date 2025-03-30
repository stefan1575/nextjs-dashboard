import { cn } from "@/shared/lib/utils";

type AuthFooterProps = {
  className?: string;
};

export function AuthFooter({ className }: AuthFooterProps) {
  return (
    <div
      className={cn(
        "text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4",
        className,
      )}
    >
      By using this website you agree to our <a href="#">Terms of Service</a>{" "}
      and <a href="#">Privacy Policy</a>.
    </div>
  );
}
