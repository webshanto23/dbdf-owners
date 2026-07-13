import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Building2, Calendar, CalendarDays, Users } from "lucide-react";

const iconComponents: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-8 w-8 text-primary" />,
  Calendar: <Calendar className="h-8 w-8 text-primary" />,
  CalendarDays: <CalendarDays className="h-8 w-8 text-primary" />,
  Users: <Users className="h-8 w-8 text-primary" />,
};

interface StatisticCardProps {
  label: string;
  value: string;
  icon: string;
  className?: string;
}

export function StatisticCard({ label, value, icon, className }: StatisticCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
        <CardContent className="flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {iconComponents[icon] || <BarChart3 className="h-8 w-8 text-primary" />}
          </div>
          <h3 className="font-serif text-4xl font-bold text-primary mb-2">{value}</h3>
          <p className="text-neutral-600 font-medium">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
