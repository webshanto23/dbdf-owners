import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { MemberCompany } from "@/types";

interface MemberCardProps {
  member: MemberCompany;
  className?: string;
}

export function MemberCard({ member, className }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="h-full border-none shadow-lg bg-bg-surface border border-accent-gold/10 group hover:border-accent-gold/30 hover:translateY-[-6px] hover:shadow-accent-gold/10 transition-all duration-500">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-bg-primary border border-accent-gold/10 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-accent-gold/30 transition-colors duration-500">
              {member.logo ? (
                <img src={member.logo} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-accent-gold">
                  {member.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-text-primary mb-1 group-hover:text-accent-gold transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-text-muted text-sm">Rep: {member.representative}</p>
            </div>
          </div>
          <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
            {member.description}
          </p>
          <div className="space-y-2 text-sm text-text-muted mb-6">
            <p className="flex items-start gap-2">
              <span className="font-medium text-text-primary shrink-0">Address:</span>
              <span>{member.address}</span>
            </p>
            {member.phone && (
              <p className="flex items-center gap-2">
                <span className="font-medium text-text-primary">Phone:</span>
                <a href={`tel:${member.phone}`} className="hover:text-accent-gold transition-colors">
                  {member.phone}
                </a>
              </p>
            )}
            {member.email && (
              <p className="flex items-center gap-2">
                <span className="font-medium text-text-primary">Email:</span>
                <a href={`mailto:${member.email}`} className="hover:text-accent-gold transition-colors">
                  {member.email}
                </a>
              </p>
            )}
          </div>
          {member.website && (
            <Button variant="outline" size="sm" asChild className="w-full border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold">
              <a href={member.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
