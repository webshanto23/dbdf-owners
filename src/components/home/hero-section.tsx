import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
}

export function HeroSection({ title, subtitle, description, image, ctaText, ctaLink, className }: HeroSectionProps) {
  return (
    <section className={cn("relative min-h-[80vh] flex items-center overflow-hidden", className)}>
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>
      <div className="relative z-10 container-custom py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-6 border border-secondary/30">
              {subtitle}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-primary-100 text-lg md:text-xl leading-relaxed mb-8">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="xl" variant="gold">
                <Link to={ctaLink}>
                  {ctaText}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/about">Discover More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
