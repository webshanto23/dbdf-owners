import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionTitle({ title, subtitle, align = "center", className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16", align === "center" && "text-center", align === "left" && "text-left", className)}
    >
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={cn("mt-8 h-px w-24 bg-accent-gold/50", align === "center" && "mx-auto", align === "left" && "ml-0")} />
    </motion.div>
  );
}
