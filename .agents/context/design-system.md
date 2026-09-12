# Existing UI and styling

Sources: [index.css](../../src/index.css), [Home.tsx](../../src/pages/Home.tsx), [button.tsx](../../src/components/ui/button.tsx), [navbar.tsx](../../src/components/layout/navbar.tsx), and the component being edited.

## Tokens and typography

Tailwind v4 is imported in src/index.css and configured with CSS @theme plus @layer rules, and @tailwindcss/vite in vite.config.ts. No tailwind.config or shadcn components.json exists in the inspected repository. Do not introduce a generator configuration or regenerate UI components.

| Theme token | Existing value |
| --- | --- |
| bg-primary | #020617 |
| bg-surface | #0B1D2A |
| accent-gold | #C8A96A |
| accent-gold-soft | #D4B87E |
| text-primary | #F9FAFB |
| text-muted | #9CA3AF |

Additional primary (blue), secondary (gold), and neutral palettes remain defined. Base :root also has HSL variables such as --background, --foreground, --border, and --ring. Some UI primitives use semantic utility names beyond the explicit @theme mappings; do not assume every primitive token has been visually verified or globally rewrite the theme.

Inter is the sans family and Playfair Display the serif family; index.html loads Google Fonts. Main headings generally use font-serif, bold weight, and tight tracking. Body copy generally uses text-text-muted with relaxed leading. Reuse these existing choices; README branding is inconsistent with source.

## Layout and component patterns

- `.container-custom` starts with an 80rem maximum and 1rem horizontal padding; padding becomes 1.5rem at 640px and 2rem at 1024px. At 1280px the maximum is 90rem with 5rem padding.
- Common section spacing is py-20, py-24, and md:py-28. Card gaps commonly use gap-6 or gap-8; card padding p-6 or p-8, sometimes md:p-12.
- Dark surface cards use gold borders at low opacity, rounded-xl/2xl/3xl, subtle gradients, shadows, and hover border changes. Home's local cardBase uses hover:-translate-y-1. Some shared cards contain `hover:translateY-[-6px]`; do not treat that spelling as a validated reusable utility.
- Button variants: default, destructive, outline, secondary, ghost, link, gold. Sizes: default, sm, lg, xl, icon. Button's asChild composes links. Badge offers default, secondary, outline, destructive, gold.
- Responsive grids expand through sm/md/lg/xl according to page needs. Gallery expands from one to four columns; committee uses up to four, member/activity/document grids up to three.
- Navbar is fixed, 5rem high, with a translucent background after scroll. Desktop navigation appears at lg; smaller screens use Sheet. The mobile sheet uses a white background and dark link colors.
- Gallery thumbnails use square crops and object-cover; lightbox uses object-contain and max-h-[80vh]. Member portraits use rounded crops/avatars. Follow the actual target component's image proportions.

## Motion and reuse caveats

Framer Motion commonly fades elements in with a small y offset, whileInView and viewport once, and durations around 0.3-0.6 seconds. Home adds viewport margins and small index delays. Existing hover transitions adjust borders, shadows, or image scale. BackToTop uses AnimatePresence; main.tsx mounts a pointer-events-none grain overlay. No central reduced-motion policy is implemented.

The active homepage uses local sections instead of several similarly named shared components. The shared hero/page-banner/statistic-card and some other helpers retain lighter/older styling. Reuse must preserve the current target page's appearance, not automatically substitute a different existing component. Inspect both implementation and current UI before UI changes; this memory task did not perform a browser visual review. Ask before introducing a genuinely new pattern.
