import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full",
  {
    variants: {
      size: {
        default: "h-3",
        sm: "h-2",
        lg: "h-4",
        xl: "h-6",
      },
      variant: {
        default: "bg-secondary",
        muted: "bg-muted",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

const indicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-500 ease-out",
  {
    variants: {
      color: {
        default: "bg-primary",
        success: "gradient-success",
        accent: "gradient-accent",
        primary: "gradient-primary",
        warning: "bg-warning",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indicatorColor?: VariantProps<typeof indicatorVariants>["color"];
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, variant, indicatorColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ size, variant }), className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(indicatorVariants({ color: indicatorColor }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
