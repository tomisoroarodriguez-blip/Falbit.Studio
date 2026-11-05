import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold tracking-wide transition-[background,color,border-color,transform] duration-300 ease-premium active:scale-[0.98]";
const variants: Record<Variant, string> = {
  primary: "bg-champagne text-carbon hover:bg-champagne-soft",
  ghost: "border border-champagne/50 text-ivory hover:border-champagne hover:bg-champagne/10",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
