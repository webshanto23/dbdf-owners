import { cn } from "@/lib/utils";
import type { SocialLinks } from "@/types";

interface SocialLinksProps {
  links?: SocialLinks;
  className?: string;
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  const socialData = [
    { name: "Facebook", href: links?.facebook, color: "hover:text-[#1877F2]", label: "FB" },
    { name: "LinkedIn", href: links?.linkedin, color: "hover:text-[#0A66C2]", label: "LI" },
    { name: "Instagram", href: links?.instagram, color: "hover:text-[#E4405F]", label: "IG" },
    { name: "YouTube", href: links?.youtube, color: "hover:text-[#FF0000]", label: "YT" },
    { name: "WhatsApp", href: links?.whatsapp, color: "hover:text-[#25D366]", label: "WA" },
  ];

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {socialData.map((social) => (
        social.href && (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={cn(
              "text-neutral-400 transition-colors rounded-full w-10 h-10 flex items-center justify-center border border-neutral-200 hover:border-current",
              social.color
            )}
          >
            <span className="text-xs font-bold">{social.label}</span>
          </a>
        )
      ))}
    </div>
  );
}
