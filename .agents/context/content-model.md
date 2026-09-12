# Content and assets

Sources: [siteData.json](../../public/data/siteData.json), [types/index.ts](../../src/types/index.ts), [useSiteData.ts](../../src/hooks/useSiteData.ts), [About.tsx](../../src/pages/About.tsx).

## Data contract

Top-level SiteData keys: association, navigation, home, about, committee, members, activities, gallery, documents, contact, footer, social.

- association: name/shortName, tagline/description, established/registrationNumber, logo/favicon.
- navigation: label/href and optional children. The navbar supports nested entries; preserve supplied routes.
- home: hero, welcomeMessage, aboutPreview, objectives, statistics, executiveCommitteePreview, activitiesPreview, galleryPreview, cta, contactPreview.
- about: history with timeline, mission, vision, objectives, coreValues. SecretaryMessage is hardcoded in About.tsx, outside this contract.
- committee: title/subtitle and CommitteeMember entries (string id, name, position, company, photo, biography, optional email/phone, numeric order).
- members: title/subtitle and MemberCompany entries (string id, name, logo, representative, address, description, optional website/phone/email, numeric order).
- activities: title/subtitle and Activity entries (string id, title, description, date string, location, images array, category, featured boolean).
- gallery: title/subtitle, categories, and GalleryImage entries (id, src, alt, caption, category, numeric width/height).
- documents: title/subtitle and Document entries (id, title, description, fileUrl, fileType, fileSize string, category, icon). FileType currently allows pdf/doc/xls/image; DownloadCard additionally has docx/xlsx icon entries but these are not in the type union.
- contact: title/subtitle, office fields, mapEmbed URL, social. SocialLinks allows optional facebook/twitter/linkedin/instagram/youtube/whatsapp. Its rendering component currently omits twitter.
- footer: description, titled link groups with label/href items, copyright. Footer renders the first two groups with hardcoded headings.

JSON is fetched at runtime with no schema validation; TypeScript interfaces alone do not validate it. Preserve property names, value shapes, ids, route targets, and category matching. Pages currently map committee/member arrays directly; the order fields are not used to sort them. Statistics and fileSize are supplied strings, not calculated totals/sizes.

## Duplication and content ownership

Homepage previews duplicate committee/activity/gallery records and contact information. Objectives appear on Home and About; contact.social and root social overlap. Updating a full-page record does not update its preview automatically. Check all relevant copies and ask when supplied content conflicts; do not normalize the model without authorization.

The recent commit subject `deploy: no real Data`, repeated Unsplash imagery, and patterned contact values indicate content needs owner verification. Do not invent real members, biographies, statistics, dates, office details, or claims. External URLs and content accuracy were not independently verified.

## Asset map and existing gaps

Public assets present: favicon.svg, icons.svg, images/dbdfsoab-logo.jpg, images/dbdfsoab-logo-new.png, images/hero/hero-image.jpeg, and data/siteData.json. src/assets/hero.png also exists. Public files use root-relative URLs; many JSON image values use an external Unsplash URL. Inspect actual consumers before replacing either form.

- index.html and association.favicon reference `/favicon.ico`, which is absent. index.html's `/images/hero/hero-bg.jpg` Open Graph image is absent.
- About's secretary message references `/images/committee/secretary.jpg`, which is absent.
- All six document entries reference `/documents/*.pdf`; no public/documents files were present at inspection.
- `DBDF Membership Application Form English.pdf` exists as an untracked root file. It is not wired to the document listing. Its contents were not examined for this memory task; do not claim a mapping has been verified or move it without a requested change.

Preserve existing files and external links unless the task requires editing them. Confirm asset existence and intended mapping through local inspection; missing resources are observations, not instructions to create replacements.
