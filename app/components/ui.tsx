import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Renders a transparent PNG/SVG as a silhouette in the current text color. */
export function Tint({
  src,
  className,
  label,
}: {
  src: string;
  className?: string;
  label?: string;
}) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("mask-tint block", className)}
      style={{ "--mask": `url("${src}")` } as CSSProperties}
    />
  );
}

/** Heading where the first letter is a large flourish script and the rest is condensed caps. */
export function InitialTitle({
  initial,
  rest,
  className,
  initialClassName,
  as: Tag = "h2",
}: {
  initial: string;
  rest: string;
  className?: string;
  initialClassName?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag className={cn("flex items-end justify-center leading-none", className)}>
      <span
        className={cn(
          "font-script relative z-10 -mr-[0.12em] text-[1.9em] leading-[0.6]",
          initialClassName
        )}
      >
        {initial}
      </span>
      <span className="font-display">{rest}</span>
    </Tag>
  );
}

/**
 * Photo as a CSS background over a solid fill, so slots whose image hasn't been added yet
 * still hold their shape instead of showing a broken-image icon.
 */
export function BackdropPhoto({
  src,
  className,
  position = "center",
  label,
  children,
}: {
  src: string;
  className?: string;
  position?: string;
  label?: string;
  children?: ReactNode;
}) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      className={cn("bg-olive/80 bg-cover bg-no-repeat", className)}
      style={{ backgroundImage: `url("${src}")`, backgroundPosition: position }}
    >
      {children}
    </div>
  );
}
