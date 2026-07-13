import { motion } from "framer-motion";
import { MemberCard } from "@/components/common/member-card";
import type { MembersPage } from "@/types";

interface MembersProps {
  members: MembersPage;
}

export function Members({ members }: MembersProps) {
  return (
    <main>
      <PageBanner title={members.title} subtitle={members.subtitle} />
      <section className="py-24 bg-bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
        <div className="container-custom relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function PageBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative py-20 md:py-28 bg-bg-primary text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-surface to-bg-primary" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-transparent to-transparent" />
      <div className="relative z-10 container-custom text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          {title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
          {subtitle}
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
