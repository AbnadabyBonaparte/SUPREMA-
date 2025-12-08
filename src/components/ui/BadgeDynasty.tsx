// src/components/ui/BadgeDynasty.tsx

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 font-body text-xs font-normal transition-all duration-300",
  {
    variants: {
      variant: {
        gold: "bg-liquid-gold/10 text-sovereign-gold-700 border-sovereign-gold-700/30",
        obsidian: "bg-obsidian-900 text-marble-50 border-sovereign-gold-700/20",
        success: "bg-emerald-noir-500/10 text-emerald-noir-600 border-emerald-noir-600/30",
        warning: "bg-rose-bronze-500/10 text-rose-bronze-600 border-rose-bronze-600/30",
        destructive: "bg-ruby-700/10 text-ruby-600 border-ruby-600/30",
      },
    },
    defaultVariants: {
      variant: "gold",
    },
  }
)

export interface BadgeDynastyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function BadgeDynasty({ className, variant, ...props }: BadgeDynastyProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
