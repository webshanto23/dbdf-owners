import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  title: string;
  address: string;
  phone: string;
  email: string;
  officeHours?: string;
  mapEmbed: string;
  className?: string;
}

export function ContactCard({ title, address, phone, email, officeHours, mapEmbed, className }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("", className)}
    >
      <Card className="border-none shadow-lg bg-bg-surface border border-accent-gold/10 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-8">{title}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-accent-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Address</p>
                    <p className="text-text-muted text-sm">{address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-accent-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Phone</p>
                    <a href={`tel:${phone}`} className="text-accent-gold text-sm hover:text-accent-gold-soft transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-accent-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Email</p>
                    <a href={`mailto:${email}`} className="text-accent-gold text-sm hover:text-accent-gold-soft transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
                {officeHours && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-accent-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">Office Hours</p>
                      <p className="text-text-muted text-sm">{officeHours}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="h-64 md:h-auto min-h-[300px] bg-bg-primary">
              <iframe
                src={mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
