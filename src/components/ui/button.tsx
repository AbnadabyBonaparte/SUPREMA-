// src/components/ui/button.tsx (shadcn/ui compatible with Dynasty variants)
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading text-sm font-normal transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sovereign-gold-700 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-liquid-gold text-obsidian-950 shadow-gold-glow hover:shadow-[0_0_40px_rgba(181,83,9,0.6)] hover:scale-105",
        gold: "bg-liquid-gold text-obsidian-950 shadow-gold-glow hover:shadow-[0_0_40px_rgba(181,83,9,0.6)] hover:scale-105",
        obsidian: "bg-obsidian-900 text-marble-50 border border-sovereign-gold-700/30 hover:bg-obsidian-800 hover:border-sovereign-gold-700/60",
        ghost: "text-marble-50 hover:bg-obsidian-900/50 hover:text-sovereign-gold-700",
        outline: "border-2 border-sovereign-gold-700 text-sovereign-gold-700 hover:bg-sovereign-gold-700 hover:text-obsidian-950",
        destructive: "bg-ruby-700 text-marble-50 hover:bg-ruby-600 shadow-[0_0_20px_rgba(127,29,29,0.4)]",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        whileHover={{ scale: variant === 'ghost' ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = "Button"
