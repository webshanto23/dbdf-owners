import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";
import type { CommitteeMember } from "@/types";

interface CommitteeCardProps {
  member: CommitteeMember;
  className?: string;
}

export function CommitteeCard({ member, className }: CommitteeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="h-full border-none shadow-lg bg-bg-surface border border-accent-gold/10 group hover:border-accent-gold/30 hover:translateY-[-6px] transition-all duration-500">
        <CardContent className="flex flex-col items-center text-center p-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Avatar className="w-32 h-32 ring-2 ring-accent-gold/20 group-hover:ring-accent-gold/40 transition-all duration-500 relative z-10">
              <AvatarImage src={member.photo} alt={member.name} />
              <AvatarFallback className="text-2xl font-bold bg-bg-primary text-accent-gold">
                {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <h3 className="font-serif text-xl font-bold text-text-primary mb-1">
            {member.name}
          </h3>
          <p className="text-accent-gold font-semibold text-sm mb-1">{member.position}</p>
          <p className="text-text-muted text-sm mb-4">{member.company}</p>
          <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-6">
            {member.biography}
          </p>
          <div className="flex items-center gap-3">
            {member.email && (
              <a href={`mailto:${member.email}`} className="text-text-muted hover:text-accent-gold transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`} className="text-text-muted hover:text-accent-gold transition-colors">
                <Phone className="h-4 w-4" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
