// src/components/ui/CardDynasty.tsx

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardDynastyProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export const CardDynasty = React.forwardRef<HTMLDivElement, CardDynastyProps>(
  ({ className, hoverable = true, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-2xl border border-sovereign-gold-700/20 bg-obsidian-900/50 backdrop-blur-sm text-marble-50 shadow-obsidian-lift overflow-hidden",
        hoverable && "hover:border-sovereign-gold-700/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]",
        className
      )}
      whileHover={hoverable ? { y: -5, transition: { duration: 0.3 } } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
)

CardDynasty.displayName = "CardDynasty"

export const CardDynastyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 border-b border-sovereign-gold-700/10", className)}
    {...props}
  />
))
CardDynastyHeader.displayName = "CardDynastyHeader"

export const CardDynastyTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-2xl font-normal leading-none tracking-tight", className)}
    {...props}
  />
))
CardDynastyTitle.displayName = "CardDynastyTitle"

export const CardDynastyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-body text-sm text-marble-50/60", className)}
    {...props}
  />
))
CardDynastyDescription.displayName = "CardDynastyDescription"

export const CardDynastyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardDynastyContent.displayName = "CardDynastyContent"

export const CardDynastyFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardDynastyFooter.displayName = "CardDynastyFooter"
