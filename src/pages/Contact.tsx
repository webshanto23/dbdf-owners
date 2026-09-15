import { useState, type FormEvent } from "react";
import { buildGmailHref, buildMailtoHref } from "@/lib/emailDraft";
import { motion } from "framer-motion";
import { ContactCard } from "@/components/common/contact-card";
import { SocialLinks } from "@/components/common/social-links";
import { Button } from "@/components/ui/button";
import type { ContactPage } from "@/types";

interface ContactProps {
  contact: ContactPage;
  recipientEmail: string;
}

export function Contact({ contact, recipientEmail }: ContactProps) {
  const recipient = recipientEmail.trim();
  const [draftMessage, setDraftMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!recipient) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    for (const key of ["name", "email", "subject", "message"]) {
      const field = form.elements.namedItem(key);
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.setCustomValidity(field.value.trim() ? "" : "Please complete this field.");
      }
    }
    if (!form.reportValidity()) return;

    const body = `Name: ${name}\nReply email: ${email}\n\n${message}`;
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const useOtherApp = submitter instanceof HTMLButtonElement && submitter.value === "other";
    if (useOtherApp) {
      window.location.href = buildMailtoHref(recipient, subject, body);
      setDraftMessage("Continue in your email app and click Send. If no app opens, use the Gmail option. This website cannot confirm delivery.");
      return;
    }

    const composer = window.open("", "_blank");
    if (!composer) {
      setDraftMessage("Your browser blocked the email window. Allow pop-ups and try again, or use another email app.");
      return;
    }
    composer.opener = null;
    composer.location.href = buildGmailHref(recipient, subject, body);
    setDraftMessage("Gmail opened. Sign in if needed, review the draft, and click Send. This website cannot confirm delivery.");
  }

  function handleInput(event: FormEvent<HTMLFormElement>) {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      field.setCustomValidity("");
    }
    setDraftMessage("");
  }

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
            <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit} onInput={handleInput}>
              <p className="text-sm text-text-muted">Open a prepared email draft, then click Send in your email app. Your message is not sent automatically.</p>
              {recipient ? <p className="text-sm text-text-muted break-words">Recipient: <span className="text-text-primary">{recipient}</span></p> : <p role="status" className="text-sm text-text-muted">The authority email is not configured yet. Email drafts are unavailable.</p>}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                  <input id="contact-name" name="name" autoComplete="name" required maxLength={150} type="text" className="w-full px-4 py-3 rounded-lg border border-accent-gold/20 bg-bg-primary text-text-primary focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-text-primary mb-2">Email</label>
                  <input id="contact-email" name="email" autoComplete="email" required maxLength={254} type="email" className="w-full px-4 py-3 rounded-lg border border-accent-gold/20 bg-bg-primary text-text-primary focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-text-primary mb-2">Subject</label>
                <input id="contact-subject" name="subject" required maxLength={200} type="text" className="w-full px-4 py-3 rounded-lg border border-accent-gold/20 bg-bg-primary text-text-primary focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" placeholder="How can we help?" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-text-primary mb-2">Message</label>
                <textarea id="contact-message" name="message" required maxLength={5000} rows={5} className="w-full px-4 py-3 rounded-lg border border-accent-gold/20 bg-bg-primary text-text-primary focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all resize-none" placeholder="Your message..." />
              </div>
              <div className="space-y-3">
                <Button type="submit" name="emailClient" value="gmail" variant="gold" size="lg" className="w-full" disabled={!recipient}>Open Gmail to Send</Button>
                <Button type="submit" name="emailClient" value="other" variant="outline" size="lg" className="w-full border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold" disabled={!recipient}>Use another email app</Button>
              </div>
              {draftMessage && <p role="status" className="text-sm text-text-muted">{draftMessage}</p>}
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
