import * as React from "react"

import { cn } from "@/lib/utils"

function Badge({ className, variant = "default", ...props }: React.ComponentProps<"span"> & { variant?: "default" | "secondary" | "outline" | "destructive" | "gold" }) {
  const variants = {
    default: "border-transparent bg-accent-gold text-bg-primary",
    secondary: "border-transparent bg-accent-gold/20 text-accent-gold",
    destructive: "border-transparent bg-destructive text-white",
    outline: "text-foreground border border-accent-gold/30 text-accent-gold",
    gold: "border-transparent bg-accent-gold text-bg-primary",
  }

  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:shrink-0 transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
