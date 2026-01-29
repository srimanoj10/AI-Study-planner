import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border-2 border-current text-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        accent: "bg-accent text-accent-foreground",
        // Priority badges
        low: "bg-success/15 text-success border border-success/30",
        medium: "bg-warning/15 text-warning border border-warning/30",
        high: "bg-destructive/15 text-destructive border border-destructive/30",
        // Streak badge
        streak: "gradient-accent text-accent-foreground shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
