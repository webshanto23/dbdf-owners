import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

export function CTASection({ title, description, buttonText, buttonLink, className }: CTASectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("", className)}
    >
      <div className="bg-primary text-white rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-50" />
        <div className="relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-primary-200 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>
          <Button asChild variant="gold" size="xl">
            <a href={buttonLink}>{buttonText}</a>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
