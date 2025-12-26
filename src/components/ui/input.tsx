// src/components/ui/input.tsx (shadcn/ui compatible with Dynasty variants)
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <motion.div 
        className="relative"
        animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-marble-50/40">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-full border border-sovereign-gold-700/30 bg-obsidian-900/50 px-4 py-3 font-body text-sm text-marble-50 placeholder:text-marble-50/40 transition-all duration-300",
            "focus:outline-none focus:border-sovereign-gold-700 focus:bg-obsidian-900 focus:shadow-gold-glow",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-11",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </motion.div>
    )
  }
)

Input.displayName = "Input"

