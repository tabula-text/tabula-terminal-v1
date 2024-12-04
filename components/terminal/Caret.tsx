import { cn } from "@/lib/utils";

interface CaretProps {
  visible: boolean;
  className?: string;
}

export function Caret({ visible, className }: CaretProps) {
  return (
    <div
      className={cn(
        "absolute inset-y-0 w-[0.6em] bg-green-500",
        "animate-blink",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}