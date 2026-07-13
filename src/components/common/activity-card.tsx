import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/utils";
import type { Activity } from "@/types";

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

export function ActivityCard({ activity, className }: ActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="h-full border-none shadow-lg bg-bg-surface border border-accent-gold/10 group hover:border-accent-gold/30 hover:translateY-[-6px] transition-all duration-500 overflow-hidden">
        {activity.images.length > 0 && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={activity.images[0]}
              alt={activity.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge variant="gold">{activity.category}</Badge>
            </div>
          </div>
        )}
        <CardContent className="p-8">
          <h3 className="font-serif text-xl font-bold text-text-primary mb-3 group-hover:text-accent-gold transition-colors duration-300">
            {activity.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(activity.date)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {activity.location}
            </span>
          </div>
          <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
            {activity.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
