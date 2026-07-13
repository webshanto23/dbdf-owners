import { motion } from "framer-motion";
import { ContactCard } from "@/components/common/contact-card";
import { SocialLinks } from "@/components/common/social-links";
import { Button } from "@/components/ui/button";
import type { ContactPage } from "@/types";

interface ContactProps {
  contact: ContactPage;
}

export function Contact({ contact }: ContactProps) {
  return (
    <main>
      <PageBanner title={contact.title} subtitle={contact.subtitle} />
      <section className="py-24 bg-bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
        <div className="container-custom relative">
          <ContactCard
            title={contact.office.name}
            address={`${contact.office.address}, ${contact.office.city}, ${contact.office.country}`}
            phone={contact.office.phone}
            email={contact.office.email}
            officeHours={contact.office.officeHours}
            mapEmbed={contact.mapEmbed}
          />
          <div className="mt-16 text-center">
            <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">Connect With Us</h3>
            <p className="text-text-muted mb-6">Follow us on social media for the latest updates</p>
            <SocialLinks links={contact.social} className="justify-center" />
          </div>
          <div className="mt-16 bg-bg-surface rounded-3xl p-8 md:p-12 border border-accent-gold/10">
            <h3 className="font-serif text-2xl font-bold text-text-primary mb-6 text-center">Send Us a Message</h3>
            <form className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-accent-gold/20 bg-bg-primary text-text-primary focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-accent-gold/20 bg-bg-primary text-text-primary focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-accent-gold/20 bg-bg-primary text-text-primary focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-accent-gold/20 bg-bg-primary text-text-primary focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all resize-none" placeholder="Your message..." />
              </div>
              <Button type="submit" variant="gold" size="lg" className="w-full">Send Message</Button>
            </form>
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
