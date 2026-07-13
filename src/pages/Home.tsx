import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HomePage } from "@/types";

interface HomeProps {
  home: HomePage;
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

function HeroSection({ title, subtitle, description, image, ctaText, ctaLink }: HomePage["hero"]) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="Hero Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/95 via-bg-primary/80 to-bg-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
      </div>

      <div className="absolute top-20 left-20 w-96 h-96 bg-accent-gold/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent-gold/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 container-custom py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-5 py-2 bg-accent-gold/10 text-accent-gold-soft text-sm font-medium rounded-full mb-8 border border-accent-gold/20 backdrop-blur-sm">
              {subtitle}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              {title.split(" ").slice(0, 5).join(" ")}
              <br />
              <span className="text-accent-gold">{title.split(" ").slice(5).join(" ") || title.split(" ").slice(0, 3).join(" ")}</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="xl" variant="gold">
                <Link to={ctaLink}>
                  {ctaText}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-accent-gold/50">
                <Link to="/about">Discover More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function WelcomeMessageSection({ message }: { message: HomePage["welcomeMessage"] }) {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-10 tracking-tight">
            {message.title}
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-accent-gold/30 font-serif">"</div>
            <p className="text-text-muted text-xl leading-relaxed mb-12 relative z-10">
              {message.content}
            </p>
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-lg" />
              <img src={message.authorImage} alt={message.authorName} className="relative w-16 h-16 rounded-full object-cover ring-2 ring-accent-gold/30" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-text-primary text-lg">{message.authorName}</p>
              <p className="text-text-muted text-sm">{message.authorPosition}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutPreviewSection({ preview }: { preview: HomePage["aboutPreview"] }) {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-8 tracking-tight">
              {preview.title}
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              {preview.content}
            </p>
            <Button asChild variant="outline" className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold">
              <Link to={preview.linkHref}>
                {preview.linkText}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-accent-gold/10 shadow-2xl">
              <img src={preview.image} alt="About Preview" className="w-full h-[400px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent-gold/10 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ObjectivesSection({ objectives }: { objectives: HomePage["objectives"] }) {
  return (
    <section className="py-24 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-surface" />
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">Our Objectives</h2>
          <div className="h-px w-24 bg-accent-gold/50 mx-auto" />
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {objectives.map((obj, index) => (
            <motion.div
              key={obj.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-center p-8 rounded-2xl border border-accent-gold/10 hover:border-accent-gold/30 hover:bg-accent-gold/5 transition-all duration-500 bg-bg-primary/50 backdrop-blur-sm h-full group">
                <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-gold/20 transition-colors duration-500">
                  <span className="text-xl text-accent-gold">
                    {obj.icon === "Scale" && "⚖️"}
                    {obj.icon === "Users" && "👥"}
                    {obj.icon === "ShieldCheck" && "🛡️"}
                    {obj.icon === "TrendingUp" && "📈"}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-text-primary mb-3">{obj.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{obj.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatisticsSection({ statistics }: { statistics: HomePage["statistics"] }) {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
      <div className="container-custom relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center relative group"
            >
              {index < statistics.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-accent-gold/20 to-transparent" />
              )}
              <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-gold/20 transition-colors duration-500">
                <span className="text-2xl">
                  {stat.icon === "Building2" && "🏢"}
                  {stat.icon === "Calendar" && "📅"}
                  {stat.icon === "CalendarDays" && "📆"}
                  {stat.icon === "Users" && "👥"}
                </span>
              </div>
              <h3 className="font-serif text-5xl md:text-6xl font-bold text-accent-gold mb-3 tracking-tight">{stat.value}</h3>
              <p className="text-text-muted text-sm uppercase tracking-widest font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommitteePreviewSection({ committee }: { committee: HomePage["executiveCommitteePreview"] }) {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
      <div className="container-custom relative">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">{committee.title}</h2>
          <div className="h-px w-24 bg-accent-gold/50 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {committee.members.map((member) => (
            <div key={member.id} className="group relative">
              <div className="absolute -inset-px bg-gradient-to-b from-accent-gold/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-bg-surface rounded-3xl p-8 text-center border border-accent-gold/10 group-hover:border-accent-gold/30 transition-all duration-500 h-full">
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-xl group-hover:bg-accent-gold/30 transition-colors duration-500" />
                  <img src={member.photo} alt={member.name} className="relative w-32 h-32 rounded-full object-cover mx-auto ring-2 ring-accent-gold/20 group-hover:ring-accent-gold/40 transition-all duration-500" />
                </div>
                <h3 className="font-serif text-xl font-bold text-text-primary mb-2">{member.name}</h3>
                <p className="text-accent-gold font-semibold text-sm mb-2">{member.position}</p>
                <p className="text-text-muted text-sm">{member.company}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button asChild variant="outline" size="lg" className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold">
            <Link to={committee.viewAllLink}>View All Committee Members</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ActivitiesPreviewSection({ activities }: { activities: HomePage["activitiesPreview"] }) {
  return (
    <section className="py-24 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-surface" />
      <div className="container-custom relative">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">{activities.title}</h2>
          <div className="h-px w-24 bg-accent-gold/50 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {activities.activities.map((activity) => (
            <div key={activity.id} className="group relative">
              <div className="absolute -inset-px bg-gradient-to-b from-accent-gold/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-bg-primary rounded-3xl overflow-hidden border border-accent-gold/10 group-hover:border-accent-gold/30 transition-all duration-500">
                {activity.images.length > 0 && (
                  <div className="relative h-56 overflow-hidden">
                    <img src={activity.images[0]} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-gold transition-colors duration-300">{activity.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-6">{activity.description}</p>
                  <div className="flex items-center justify-between text-xs text-text-muted uppercase tracking-wider">
                    <span>{activity.date}</span>
                    <span>{activity.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button asChild variant="outline" size="lg" className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold">
            <Link to={activities.viewAllLink}>View All Activities</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function GalleryPreviewSection({ gallery }: { gallery: HomePage["galleryPreview"] }) {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
      <div className="container-custom relative">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">{gallery.title}</h2>
          <div className="h-px w-24 bg-accent-gold/50 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.images.slice(0, 4).map((image) => (
            <div key={image.id} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer border border-accent-gold/10 hover:border-accent-gold/30 transition-all duration-500">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <span className="text-text-primary font-medium text-sm">{image.caption}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button asChild variant="outline" size="lg" className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold">
            <Link to={gallery.viewAllLink}>View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CTASection({ section }: { section: HomePage["cta"] }) {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[120px]" />
      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 tracking-tight">{section.title}</h2>
          <div className="h-px w-24 bg-accent-gold/50 mx-auto mb-8" />
          <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">{section.description}</p>
          <Button asChild variant="gold" size="xl" className="px-12 py-6 text-lg">
            <Link to={section.buttonLink}>{section.buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ContactPreviewSection({ contact }: { contact: HomePage["contactPreview"] }) {
  return (
    <section className="py-24 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-surface" />
      <div className="container-custom relative">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">{contact.title}</h2>
          <div className="h-px w-24 bg-accent-gold/50 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute -inset-px bg-gradient-to-b from-accent-gold/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-bg-primary rounded-3xl p-8 text-center border border-accent-gold/10 group-hover:border-accent-gold/30 transition-all duration-500">
              <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-gold/20 transition-colors duration-500">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-text-primary mb-3">Office Address</h3>
              <p className="text-text-muted text-sm leading-relaxed">{contact.address}</p>
            </div>
          </div>
          <div className="group relative">
            <div className="absolute -inset-px bg-gradient-to-b from-accent-gold/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-bg-primary rounded-3xl p-8 text-center border border-accent-gold/10 group-hover:border-accent-gold/30 transition-all duration-500">
              <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-gold/20 transition-colors duration-500">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-text-primary mb-3">Phone</h3>
              <a href={`tel:${contact.phone}`} className="text-accent-gold text-sm hover:text-accent-gold-soft transition-colors">
                {contact.phone}
              </a>
            </div>
          </div>
          <div className="group relative">
            <div className="absolute -inset-px bg-gradient-to-b from-accent-gold/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-bg-primary rounded-3xl p-8 text-center border border-accent-gold/10 group-hover:border-accent-gold/30 transition-all duration-500">
              <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-gold/20 transition-colors duration-500">
                <span className="text-2xl">✉️</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-text-primary mb-3">Email</h3>
              <a href={`mailto:${contact.email}`} className="text-accent-gold text-sm hover:text-accent-gold-soft transition-colors">
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
