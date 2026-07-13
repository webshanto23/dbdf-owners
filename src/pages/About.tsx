import { motion } from "framer-motion";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCard } from "@/components/common/message-card";
import type { AboutPage } from "@/types";

interface AboutProps {
  about: AboutPage;
}

export function About({ about }: AboutProps) {
  return (
    <main>
      <PageBanner title="About Us" subtitle="Learn about our history, mission, and vision" />
      <HistorySection history={about.history} />
      <MissionSection mission={about.mission} />
      <VisionSection vision={about.vision} />
      <ObjectivesSection objectives={about.objectives} />
      <CoreValuesSection values={about.coreValues} />
      <SecretaryMessage />
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

function HistorySection({ history }: { history: AboutPage["history"] }) {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
      <div className="container-custom relative">
        <SectionTitle title={history.title} subtitle={history.content} />
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-gold/30 via-accent-gold/20 to-transparent -translate-x-1/2" />
          <div className="space-y-16">
            {history.timeline.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-center"
              >
                <div className="hidden md:block w-1/2 md:pr-16 md:text-right">
                  <Card className="border-none shadow-lg bg-bg-surface border border-accent-gold/10">
                    <CardContent className="p-8">
                      <span className="text-accent-gold font-bold text-lg font-serif">{event.year}</span>
                      <h3 className="font-serif text-2xl font-bold text-text-primary mt-2 mb-3">{event.title}</h3>
                      <p className="text-text-muted leading-relaxed">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-gold border-4 border-bg-primary shadow-lg shadow-accent-gold/20 z-10" />
                <div className="md:hidden pl-16">
                  <Card className="border-none shadow-lg bg-bg-surface border border-accent-gold/10">
                    <CardContent className="p-6">
                      <span className="text-accent-gold font-bold text-lg font-serif">{event.year}</span>
                      <h3 className="font-serif text-xl font-bold text-text-primary mt-2 mb-2">{event.title}</h3>
                      <p className="text-text-muted leading-relaxed text-sm">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:block w-1/2 md:pl-16" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionSection({ mission }: { mission: AboutPage["mission"] }) {
  return (
    <section className="py-24 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-surface" />
      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title={mission.title} />
          <p className="text-text-muted text-xl leading-relaxed font-light">{mission.content}</p>
        </div>
      </div>
    </section>
  );
}

function VisionSection({ vision }: { vision: AboutPage["vision"] }) {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title={vision.title} />
          <p className="text-text-muted text-xl leading-relaxed font-light">{vision.content}</p>
        </div>
      </div>
    </section>
  );
}

function ObjectivesSection({ objectives }: { objectives: AboutPage["objectives"] }) {
  return (
    <section className="py-24 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-surface" />
      <div className="container-custom relative">
        <SectionTitle title="Our Objectives" subtitle="Key goals that guide our association's work" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((obj, index) => (
            <motion.div
              key={obj.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg bg-bg-primary border border-accent-gold/10 hover:border-accent-gold/30 transition-all duration-500 group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mb-6 group-hover:bg-accent-gold/20 transition-colors duration-500">
                    <span className="text-xl text-accent-gold">
                      {obj.icon === "Scale" && "⚖️"}
                      {obj.icon === "HandHeart" && "🤝"}
                      {obj.icon === "Award" && "🏆"}
                      {obj.icon === "GraduationCap" && "🎓"}
                      {obj.icon === "Network" && "🔗"}
                      {obj.icon === "Globe" && "🌍"}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-text-primary mb-3">{obj.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{obj.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreValuesSection({ values }: { values: AboutPage["coreValues"] }) {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
      <div className="container-custom relative">
        <SectionTitle title="Our Core Values" subtitle="The principles that guide everything we do" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg bg-bg-surface border border-accent-gold/10 hover:border-accent-gold/30 transition-all duration-500 group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mb-6 group-hover:bg-accent-gold/20 transition-colors duration-500">
                    <span className="text-xl text-accent-gold">
                      {value.icon === "ShieldCheck" && "🛡️"}
                      {value.icon === "Trophy" && "🏆"}
                      {value.icon === "Users" && "👥"}
                      {value.icon === "Eye" && "👁️"}
                      {value.icon === "Lightbulb" && "💡"}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-text-primary mb-3">{value.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecretaryMessage() {
  return (
    <section className="py-24 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-surface" />
      <div className="container-custom relative">
        <MessageCard
          title="Secretary's Message"
          content="As the General Secretary, I am committed to ensuring that our association operates with transparency, efficiency, and dedication to our members. We are here to serve, advocate, and build a stronger community for all bond and duty-free shop owners in Bangladesh."
          authorName="Fatima Akter"
          authorPosition="General Secretary, DBDFSOAB"
          authorImage="/images/committee/secretary.jpg"
        />
      </div>
    </section>
  );
}
