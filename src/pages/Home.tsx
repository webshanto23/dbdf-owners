import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Scale,
  Users,
  ShieldCheck,
  TrendingUp,
  Building2,
  Calendar,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HomePage } from "@/types";

interface HomeProps {
  home: HomePage;
}

const iconMap: Record<string, LucideIcon> = {
  Scale,
  Users,
  ShieldCheck,
  TrendingUp,
  Building2,
  Calendar,
  CalendarDays,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = iconMap[name] ?? ShieldCheck;
  return <Cmp className={className} strokeWidth={1.75} />;
}

export function Home({ home }: HomeProps) {
  return (
    <main>
      <HeroSection {...home.hero} />
      <WelcomeMessageSection message={home.welcomeMessage} />
      <AboutPreviewSection preview={home.aboutPreview} />
      <ObjectivesSection objectives={home.objectives} />
      <StatisticsSection statistics={home.statistics} />
      <CommitteePreviewSection committee={home.executiveCommitteePreview} />
      <ActivitiesPreviewSection activities={home.activitiesPreview} />
      <GalleryPreviewSection gallery={home.galleryPreview} />
      <CTASection section={home.cta} />
      <ContactPreviewSection contact={home.contactPreview} />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared building blocks — establish a consistent design system             */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={isCenter ? "text-center max-w-2xl mx-auto mb-14 md:mb-20" : "max-w-2xl mb-14 md:mb-20"}
    >
      {eyebrow && (
        <span className="inline-block text-accent-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-text-primary leading-[1.15] tracking-tight text-balance">
        {title}
      </h2>
      <div className={`h-px w-16 bg-accent-gold/60 mt-6 ${isCenter ? "mx-auto" : ""}`} />
    </motion.div>
  );
}

const cardBase =
  "relative h-full rounded-2xl border border-accent-gold/10 bg-bg-surface/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/30 hover:shadow-2xl hover:shadow-black/40";

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

function HeroSection({ title, subtitle, description, image, ctaText, ctaLink }: HomePage["hero"]) {
  const words = title.split(" ");
  const lead = words.slice(0, 5).join(" ");
  const highlight = words.slice(5).join(" ");

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/90 to-bg-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/40" />
      </div>

      <div className="relative z-10 container-custom py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-gold/10 text-accent-gold-soft text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-8 border border-accent-gold/25 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              {subtitle}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.08] tracking-tight text-balance">
              {lead}
              {highlight && (
                <>
                  {" "}
                  <span className="text-accent-gold">{highlight}</span>
                </>
              )}
            </h1>
            <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="xl" variant="gold">
                <Link to={ctaLink}>
                  {ctaText}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-accent-gold/50"
              >
                <Link to="/about">Discover More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Welcome message                                                            */
/* -------------------------------------------------------------------------- */

function WelcomeMessageSection({ message }: { message: HomePage["welcomeMessage"] }) {
  return (
    <section className="py-20 md:py-28 bg-bg-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-8 tracking-tight text-balance">
            {message.title}
          </h2>
          <Quote className="h-10 w-10 text-accent-gold/40 mx-auto mb-6" strokeWidth={1.5} />
          <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-10 text-pretty">
            {message.content}
          </p>
          <div className="flex items-center justify-center gap-4">
            <img
              src={message.authorImage}
              alt={message.authorName}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-accent-gold/30"
            />
            <div className="text-left">
              <p className="font-semibold text-text-primary">{message.authorName}</p>
              <p className="text-text-muted text-sm">{message.authorPosition}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  About preview                                                              */
/* -------------------------------------------------------------------------- */

function AboutPreviewSection({ preview }: { preview: HomePage["aboutPreview"] }) {
  return (
    <section className="py-20 md:py-28 bg-bg-surface">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-accent-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              About Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-6 tracking-tight text-balance">
              {preview.title}
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-8 text-pretty">
              {preview.content}
            </p>
            <Button
              asChild
              variant="outline"
              className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold"
            >
              <Link to={preview.linkHref}>
                {preview.linkText}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-accent-gold/10 shadow-2xl shadow-black/40">
              <img src={preview.image} alt="" className="w-full h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Objectives                                                                 */
/* -------------------------------------------------------------------------- */

function ObjectivesSection({ objectives }: { objectives: HomePage["objectives"] }) {
  return (
    <section className="py-20 md:py-28 bg-bg-primary">
      <div className="container-custom">
        <SectionHeader eyebrow="What We Stand For" title="Our Objectives" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {objectives.map((obj, index) => (
            <motion.div
              key={obj.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className={`${cardBase} p-8 text-center`}>
                <div className="w-14 h-14 rounded-xl bg-accent-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-gold/20 transition-colors duration-300">
                  <Icon name={obj.icon} className="h-6 w-6 text-accent-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-text-primary mb-3">{obj.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{obj.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Statistics                                                                 */
/* -------------------------------------------------------------------------- */

function StatisticsSection({ statistics }: { statistics: HomePage["statistics"] }) {
  return (
    <section className="py-20 md:py-24 bg-bg-surface border-y border-accent-gold/10">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-center relative"
            >
              {index < statistics.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-gradient-to-b from-transparent via-accent-gold/20 to-transparent" />
              )}
              <div className="w-14 h-14 rounded-xl bg-accent-gold/10 flex items-center justify-center mx-auto mb-5">
                <Icon name={stat.icon} className="h-6 w-6 text-accent-gold" />
              </div>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-accent-gold mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-text-muted text-xs md:text-sm uppercase tracking-[0.15em] font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Committee preview                                                          */
/* -------------------------------------------------------------------------- */

function CommitteePreviewSection({ committee }: { committee: HomePage["executiveCommitteePreview"] }) {
  return (
    <section className="py-20 md:py-28 bg-bg-primary">
      <div className="container-custom">
        <SectionHeader eyebrow="Leadership" title={committee.title} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {committee.members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className={`${cardBase} p-8 text-center`}>
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="relative w-28 h-28 rounded-full object-cover mx-auto ring-2 ring-accent-gold/20 group-hover:ring-accent-gold/50 transition-all duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-text-primary mb-1">{member.name}</h3>
                <p className="text-accent-gold font-semibold text-sm mb-1">{member.position}</p>
                <p className="text-text-muted text-sm">{member.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-14">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold"
          >
            <Link to={committee.viewAllLink}>View All Committee Members</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Activities preview                                                         */
/* -------------------------------------------------------------------------- */

function ActivitiesPreviewSection({ activities }: { activities: HomePage["activitiesPreview"] }) {
  return (
    <section className="py-20 md:py-28 bg-bg-surface">
      <div className="container-custom">
        <SectionHeader eyebrow="Our Work" title={activities.title} />
        <div className="grid md:grid-cols-2 gap-8">
          {activities.activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className={`${cardBase} overflow-hidden`}>
                {activity.images.length > 0 && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={activity.images[0]}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/20 to-transparent" />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-gold transition-colors duration-300">
                    {activity.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-6">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-6 text-xs text-text-muted uppercase tracking-wider border-t border-accent-gold/10 pt-5">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-accent-gold/70" strokeWidth={2} />
                      {activity.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-accent-gold/70" strokeWidth={2} />
                      {activity.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-14">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold"
          >
            <Link to={activities.viewAllLink}>View All Activities</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gallery preview                                                            */
/* -------------------------------------------------------------------------- */

function GalleryPreviewSection({ gallery }: { gallery: HomePage["galleryPreview"] }) {
  return (
    <section className="py-20 md:py-28 bg-bg-primary">
      <div className="container-custom">
        <SectionHeader eyebrow="Moments" title={gallery.title} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.images.slice(0, 4).map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer border border-accent-gold/10 hover:border-accent-gold/30 transition-all duration-500"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-text-primary font-medium text-sm">{image.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-14">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold"
          >
            <Link to={gallery.viewAllLink}>View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CTA                                                                        */
/* -------------------------------------------------------------------------- */

function CTASection({ section }: { section: HomePage["cta"] }) {
  return (
    <section className="py-20 md:py-28 bg-bg-surface relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[120px]" />
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto rounded-3xl border border-accent-gold/15 bg-bg-primary/60 backdrop-blur-sm px-8 py-16 md:px-16 md:py-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 tracking-tight text-balance">
            {section.title}
          </h2>
          <div className="h-px w-16 bg-accent-gold/60 mx-auto mb-6" />
          <p className="text-text-muted text-lg leading-relaxed mb-10 max-w-2xl mx-auto text-pretty">
            {section.description}
          </p>
          <Button asChild variant="gold" size="xl" className="px-10">
            <Link to={section.buttonLink}>
              {section.buttonText}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact preview                                                            */
/* -------------------------------------------------------------------------- */

function ContactPreviewSection({ contact }: { contact: HomePage["contactPreview"] }) {
  const items = [
    { icon: MapPin, title: "Office Address", value: contact.address, href: null },
    { icon: Phone, title: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    { icon: Mail, title: "Email", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <section className="py-20 md:py-28 bg-bg-primary">
      <div className="container-custom">
        <SectionHeader eyebrow="Get In Touch" title={contact.title} />
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group"
              >
                <div className={`${cardBase} p-8 text-center`}>
                  <div className="w-14 h-14 rounded-xl bg-accent-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-gold/20 transition-colors duration-300">
                    <ItemIcon className="h-6 w-6 text-accent-gold" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-text-primary mb-3">{item.title}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-accent-gold text-sm hover:text-accent-gold-soft transition-colors break-words"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-text-muted text-sm leading-relaxed">{item.value}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
