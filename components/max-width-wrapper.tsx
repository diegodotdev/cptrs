import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        className,
        "w-full h-full max-w-screen-xl mx-auto px-4 lg:px-0"
      )}
    >
      {children}
    </div>
  );
}
