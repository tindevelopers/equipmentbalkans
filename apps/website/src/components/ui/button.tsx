import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary — Industrial Orange
        default:
          "bg-primary text-primary-foreground hover:bg-[hsl(30_91%_49%)] active:bg-[hsl(22_97%_41%)] hover:scale-[1.01]",
        // Bid Now — orange→gold gradient with live glow
        bid: "bg-gradient-to-br from-[hsl(22_97%_46%)] to-[hsl(38_96%_50%)] text-[hsl(0_0%_5%)] font-bold uppercase tracking-wide hover:scale-[1.02] shadow-[0_0_20px_rgba(232,93,4,0.4)]",
        // Outline — silver border, white text
        outline:
          "border border-[hsl(0_0%_78%)] bg-transparent text-foreground hover:border-primary hover:text-primary",
        // Ghost — for nav links etc.
        ghost:
          "bg-transparent text-muted-foreground hover:text-primary hover:bg-transparent",
        // Destructive — Rust
        destructive:
          "bg-destructive text-foreground hover:bg-destructive/90",
        // Secondary — Carbon Light surface
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[hsl(0_0%_29%)]",
        // Link
        link: "text-[hsl(30_91%_49%)] underline-offset-4 hover:text-[hsl(38_96%_50%)] hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5 rounded-[var(--radius)]",
        sm: "h-8 px-4 py-2 text-xs rounded-[var(--radius)]",
        lg: "h-12 px-7 py-3.5 text-base rounded-[var(--radius)]",
        icon: "size-10 rounded-[var(--radius)]",
        full: "h-12 w-full px-7 py-3.5 text-base rounded-[var(--radius)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
