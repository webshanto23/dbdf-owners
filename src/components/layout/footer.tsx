import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { SocialLinks } from "@/components/common/social-links";
import type { FooterData } from "@/types";

interface FooterProps {
  footer: FooterData;
  navLinks: { label: string; href: string }[];
}

export function Footer({ footer, navLinks }: FooterProps) {
  return (
    <footer className="bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-bg-surface to-bg-primary" />
      <div className="container-custom relative">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">DBDFSOAB</h3>
            <p className="text-text-muted max-w-md leading-relaxed">
              {footer.description}
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {footer.links[0]?.items.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-text-muted hover:text-accent-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-text-primary">Resources</h4>
            <ul className="space-y-3">
              {footer.links[1]?.items.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-text-muted hover:text-accent-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-accent-gold/10" />
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              {footer.copyright}
            </p>
            <div className="flex items-center gap-4">
              {navLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-text-muted hover:text-accent-gold text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
