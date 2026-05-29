import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Matches Section 5.4 of the EB Visual Design System exactly
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] border font-sans",
  {
    variants: {
      variant: {
        "not-inspected":
          "bg-[hsl(0_0%_25%)] text-[hsl(0_0%_54%)] border-transparent",
        "pending-inspection":
          "bg-[hsla(43,72%,66%,0.15)] text-[hsl(43_72%_66%)] border-[hsl(43_72%_66%)]",
        inspected:
          "bg-[hsla(152,40%,30%,0.15)] text-[hsl(152_40%_30%)] border-[hsl(152_40%_30%)]",
        certified:
          "bg-[hsla(38,96%,50%,0.15)] text-[hsl(38_96%_50%)] border-[hsl(38_96%_50%)] font-semibold",
        live: "bg-[hsla(0,72%,51%,0.15)] text-[hsl(0_72%_51%)] border-[hsl(0_72%_51%)]",
        ended:
          "bg-[hsl(0_0%_10%)] text-[hsl(0_0%_54%)] border-[hsl(0_0%_25%)]",
        default:
          "bg-[hsl(0_0%_25%)] text-[hsl(0_0%_78%)] border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Animated pulse dot for LIVE badge
const PulseDot = () => (
  <span className="relative flex size-2 shrink-0">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(0_72%_51%)] opacity-75" />
    <span className="relative inline-flex rounded-full size-2 bg-[hsl(0_72%_51%)]" />
  </span>
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {variant === "live" && <PulseDot />}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
