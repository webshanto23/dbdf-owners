# Current work: repository development memory

Date: 2026-09-12.

Request: follow .codex/instructions.md by analyzing local source and creating a durable development contract; do not implement a feature or alter application functionality.

Delivered structure: root AGENTS.md, .agents/README.md, four context references (architecture, design-system, content-model, deployment), coding conventions, change-safety rules, combined development workflows, and this task record. Related topics are combined to avoid repetitive files.

Evidence reviewed: entry/routing/layout, pages, hooks/types/helpers, common and UI components, CSS, JSON content, asset inventory, package and lockfile presence, Vite/TypeScript/Oxlint configuration, README, original .codex instructions, git status and recent commit subjects. No external research was used. No browser visual review or PDF-content inspection was performed for this task.

This task changes documentation only. No npm command, build, lint, test, commit, push, deployment, application-code edit, or dependency edit was performed during this memory task. An earlier exploration task in this conversation ran build and lint before the owner supplied these restrictions; those earlier results are not fresh verification for this task and do not grant future command permission.

## Observations, not authorized implementation work

- Contact form lacks message submission integration; membership CTAs lead to contact.
- Six linked document PDFs, favicon.ico, the Open Graph hero image, and About's secretary image are missing from public assets.
- Footer supplies no social links to SocialLinks. ScrollToTop exists but is not mounted.
- Gallery thumbnails lack keyboard activation; custom lightbox icon buttons lack accessible labels and no DialogTitle is supplied. Contact labels lack input associations. MainLayout and pages both contain main landmarks.
- README feature/theme/start-command descriptions disagree with source.
- JSON has no runtime validation; previews/contact/social data are duplicated; content authenticity needs owner confirmation.
- Home/local/shared component implementations differ; do not consolidate without a task requiring it.
- Hosting/server route fallback, production deployment setup, content ownership process, and a test workflow are undocumented.

Preserve pre-existing untracked .codex/instructions.md and the root membership PDF. No follow-up fixes are implicitly authorized by this record. Future tasks should update this record's status as appropriate without presenting old verification as current.

## Membership workflow update

The observations above describe the earlier memory task, not the current membership implementation. `/apply` now provides local PDF generation, download, and manual email handoff. The user confirmed corrected PDF output. The temporary recipient is `web.shanto23@gmail.com`, configured only in `public/data/siteData.json` under `membershipApplication.recipientEmail`; replace it with the authority address before deployment. Email actions open prepared drafts and require manual attachments and sending. No submission database, automatic email, delivery confirmation, or server changes were added. This update was reviewed in source; no build/lint/test or real email sending was performed.
