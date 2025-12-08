// src/components/ui/TextareaDynasty.tsx (IMPORT CORRIGIDO)

import * as React from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "./textarea"  // Importa do textarea base (agora restaurado)

export interface TextareaDynastyProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextareaDynasty = React.forwardRef<HTMLTextAreaElement, TextareaDynastyProps>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        className={cn(
          "min-h-32 w-full rounded-xl border-sovereign-gold-700/30 bg-obsidian-900/50 px-6 py-4 text-marble-50 placeholder:text-marble-50/40",
          "focus:border-sovereign-gold-700 focus:shadow-gold-glow focus:outline-none transition-all duration-300",
          "resize-none font-body text-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextareaDynasty.displayName = "TextareaDynasty"

export { TextareaDynasty }
