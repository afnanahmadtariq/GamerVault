"use client"

import type React from "react"
import { cn } from "@/lib/utils"

// Container component for consistent page padding
export function Container({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full px-4 md:px-6 lg:px-8 mx-auto max-w-7xl", className)} {...props}>
      {children}
    </div>
  )
}

// Section component for consistent vertical spacing
export function Section({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("py-6 md:py-8 lg:py-10", className)} {...props}>
      {children}
    </section>
  )
}

// Grid component for consistent grid layouts
export function Grid({
  children,
  className,
  cols = 1,
  gap = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: "none" | "small" | "default" | "large"
}) {
  const gapClasses = {
    none: "gap-0",
    small: "gap-2",
    default: "gap-4 md:gap-6",
    large: "gap-6 md:gap-8",
  }

  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  }

  return (
    <div className={cn("grid", colClasses[cols], gapClasses[gap], className)} {...props}>
      {children}
    </div>
  )
}

// Card component for consistent card styling
export function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// CardHeader component
export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 md:p-6 flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  )
}

// CardTitle component
export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
      {children}
    </h3>
  )
}

// CardDescription component
export function CardDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}

// CardContent component
export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 md:p-6 pt-0", className)} {...props}>
      {children}
    </div>
  )
}

// CardFooter component
export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 md:p-6 flex items-center", className)} {...props}>
      {children}
    </div>
  )
}

// Flex component for consistent flex layouts
export function Flex({
  children,
  className,
  direction = "row",
  align = "start",
  justify = "start",
  gap = "default",
  wrap = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  direction?: "row" | "col"
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  gap?: "none" | "small" | "default" | "large"
  wrap?: boolean
}) {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col",
  }

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  }

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  }

  const gapClasses = {
    none: "gap-0",
    small: "gap-2",
    default: "gap-4",
    large: "gap-6",
  }

  return (
    <div
      className={cn(
        "flex",
        directionClasses[direction],
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        wrap && "flex-wrap",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Spacer component for adding vertical space
export function Spacer({
  size = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "small" | "default" | "large" | "xlarge"
}) {
  const sizeClasses = {
    small: "h-2",
    default: "h-4 md:h-6",
    large: "h-6 md:h-8",
    xlarge: "h-8 md:h-12",
  }

  return <div className={cn(sizeClasses[size], className)} {...props} />
}
