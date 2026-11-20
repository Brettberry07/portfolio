import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

// shadcn/ui button primitive, styled with the portfolio's scoped color tokens.
const buttonVariants = cva(
  "inline-flex min-h-11 w-fit items-center justify-center gap-2.5 rounded-sm px-4 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-(--folio-green) text-(--folio-cream) hover:bg-(--folio-green-hover)",
        outline: "border border-(--folio-rule-strong) text-(--folio-ink) hover:border-(--folio-green) hover:bg-(--folio-paper-light)",
        ghost: "text-(--folio-ink) hover:bg-(--folio-paper-light)",
      },
      size: {
        default: "min-h-12 px-5",
        compact: "min-h-11 px-3.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  asChild, variant, size, className, ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Element = asChild ? Slot : "button";
  return <Element data-slot="button" data-variant={variant ?? "default"} className={twMerge(clsx(buttonVariants({ variant, size }), className))} {...props} />;
}
