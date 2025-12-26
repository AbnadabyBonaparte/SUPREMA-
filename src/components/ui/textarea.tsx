// src/components/ui/textarea.tsx (RESTAURAÇÃO DO COMPONENTE BASE SHADCN/UI)

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "min-h-32 w-full rounded-xl border-sovereign-gold-700/30 bg-obsidian-900/50 px-6 py-4 text-marble-50 placeholder:text-marble-50/40",
          "focus:border-sovereign-gold-700 focus:shadow-gold-glow focus:outline-none transition-all duration-300",
          "resize-none font-body text-lg",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
