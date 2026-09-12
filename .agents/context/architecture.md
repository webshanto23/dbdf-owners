# Existing architecture

## Purpose and evidence

The implementation is the public website of the Diplomatic Bond and Duty Free Shop Owners Association of Bangladesh (DBDFSOAB). It presents association information, committee members, member companies, activities, a gallery, document listings, and contact details. The README's shopping/travel description and orange/black theme do not describe the implemented app. No shopping, travel service, member account, admin panel, backend, database, authentication, or CMS implementation was found.

Sources: [package.json](../../package.json), [App.tsx](../../src/App.tsx), [main.tsx](../../src/main.tsx), [MainLayout.tsx](../../src/layouts/MainLayout.tsx), and [siteData.json](../../public/data/siteData.json).

Declared dependency families are React 19, React Router DOM 7, Framer Motion 12, Lucide React, Radix packages, class-variance-authority, clsx, and tailwind-merge. Tooling is Vite 8, TypeScript 6, Tailwind CSS 4 with its Vite plugin, and Oxlint. Exact declared ranges and resolved versions belong to package.json and package-lock.json respectively. Old React Router v5 type packages are also declared; do not alter dependencies during unrelated work.

## Runtime flow

`index.html` -> `src/main.tsx` -> StrictMode/BrowserRouter -> App -> useSiteData/useSEO -> MainLayout -> Routes/pages.

- `useSiteData` fetches `/data/siteData.json`, maintains data/loading/error locally, and returns refreshData. App calls it once at its top level and passes sections as typed page props. It checks HTTP status but has no runtime schema validation. Initial fetch uses an isMounted guard; no request cache or global state store exists.
- App displays LoadingScreen or a full-page data-load error before rendering routes.
- `useSEO` updates title, description, canonical, selected Open Graph tags, and Organization JSON-LD in the DOM. The base URL is hardcoded to `https://dbdfsoab.org`; this is not evidence of actual hosting ownership/configuration. Route titles/descriptions use the same association content.
- MainLayout supplies fixed Navbar, a main region, Footer, and BackToTop. Pages themselves also render main elements. It accepts children and has an Outlet fallback; the current App uses children rather than nested layout routes.
- main.tsx adds a fixed grain overlay. Routes are eagerly imported. No server rendering or route-level lazy loading is implemented.

## Routes and interactions

| Path | Page | Current behavior |
| --- | --- | --- |
| / | Home | Hero, welcome, about preview, objectives, statistics, committee/activity/gallery previews, CTA, contact preview |
| /about | About | History timeline, mission, vision, objectives, core values, hardcoded secretary message |
| /committee | Committee | Maps supplied committee members into CommitteeCard |
| /members | Members | Maps supplied companies into MemberCard |
| /activities | Activities | Local category filter, ActivityCard grid |
| /gallery | Gallery | Category filter, Radix Dialog lightbox, previous/next and keyboard handlers |
| /documents | Documents | Case-insensitive title/description search plus category filter, View/Download links |
| /contact | Contact | Office details, embedded map, social links, presentational message form |
| * | NotFound | 404 display and home link |

There are no detail routes for members or activities. Membership CTAs lead to contact. The contact form has no onSubmit/action endpoint for message delivery. These are current boundaries, not permission to implement services.

## Folder and component map

- `src/pages/`: PascalCase route modules. Home owns many local section functions; seven inner pages define their own PageBanner.
- `src/layouts/`: MainLayout.
- `src/components/layout/`: navbar, footer, back-to-top, shared page-banner, breadcrumb, scroll-to-top. ScrollToTop is defined but not mounted in the current entry/layout.
- `src/components/common/`: activity-card, committee-card, member-card, download-card, contact-card, message-card, statistic-card, section-title, cta-section, social-links, loading-screen, empty-state.
- `src/components/ui/`: accordion, alert, avatar, badge, breadcrumb, button, card, dialog, dropdown-menu, hover-card, input, navigation-menu, scroll-area, separator, sheet, skeleton, tooltip. Inspect each local implementation; not every component uses the corresponding installed Radix package.
- `src/components/home/hero-section.tsx`: separate reusable hero; current Home uses its own local HeroSection.
- `src/hooks/`: useSiteData and useSEO.
- `src/types/index.ts`: site/content interfaces.
- `src/lib/utils.ts`: cn; `src/utils/index.ts`: formatting, scroll, debounce, slug helpers.
- `public/`: static JSON and public images/SVG assets; `src/assets/`: hero.png.

Search usage before choosing or extending a component. Existing duplicates and unused exports are not authorization to consolidate or delete them.
