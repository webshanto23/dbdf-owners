import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { SiteData } from "@/types";

export function useSEO(data: SiteData | null) {
  const location = useLocation();

  useEffect(() => {
    if (!data) return;

    const baseUrl = "https://dbdfsoab.org";
    const canonicalUrl = `${baseUrl}${location.pathname}`;

    document.title = data.association.name;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", data.association.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", data.association.name);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", data.association.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", canonicalUrl);

    const jsonLd = document.getElementById("json-ld");
    if (jsonLd) {
      jsonLd.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": data.association.name,
        "description": data.association.description,
        "url": baseUrl,
        "logo": data.association.logo,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": data.contact.office.phone,
          "contactType": "customer service",
        },
        "sameAs": [
          data.social.facebook,
          data.social.twitter,
          data.social.linkedin,
          data.social.instagram,
          data.social.youtube,
        ].filter(Boolean),
      });
    }
  }, [data, location.pathname]);
}
