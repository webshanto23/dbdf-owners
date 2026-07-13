import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MessageCardProps {
  title: string;
  content: string;
  authorName: string;
  authorPosition: string;
  authorImage: string;
  className?: string;
}

export function MessageCard({ title, content, authorName, authorPosition, authorImage, className }: MessageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("", className)}
    >
      <Card className="border-none shadow-lg bg-bg-surface border border-accent-gold/10 max-w-4xl mx-auto">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-xl" />
              <Avatar className="w-24 h-24 ring-2 ring-accent-gold/30 relative z-10">
                <AvatarImage src={authorImage} alt={authorName} />
                <AvatarFallback className="text-2xl font-bold bg-bg-primary text-accent-gold">
                  {authorName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
                {title}
              </h3>
              <blockquote className="text-text-muted text-lg leading-relaxed mb-6 italic">
                &ldquo;{content}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-text-primary">{authorName}</p>
                <p className="text-text-muted text-sm">{authorPosition}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
