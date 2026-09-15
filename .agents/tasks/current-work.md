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

## Application stepper and local draft update

Implemented the approved six-step application UI in `src/pages/Apply.tsx` and device draft handling in `src/hooks/useMembershipDraft.ts`. Reuses existing form groups, controls, validator, and original PDF generator. Per-step navigation retains in-tab state; final review has section Edit links. Opt-in localStorage saves text/checklist values and step for three days after the last change, with resume/start-over, clear, invalid/expired-record handling, and storage error messaging. Images/PDFs are not persisted. Expiry cleanup runs while the page is open or on its next load. No backend, dependency, server, email sending, or deployment changes. Build/lint and browser verification were not run under the repository command policy.

Screenshot follow-up: `/apply` now reserves `pt-20` for the fixed 80px navbar, and its date inputs use the native dark color scheme for calendar-icon contrast. Draft/PDF behavior is unchanged. Source review only; browser verification remains manual.

PDF section correction: merged the standalone Company and Owner steps into Applicant Company/Shop Information, retaining printed field order and all 44 text/date fields. Payment and supporting documents are labeled as Part 2 continuations; representative information is Part 3. The UI now has five steps. Draft record version 2 migrates original six-step positions while preserving answers and expiry. No PDF generation or coordinate changes. Source and scoped whitespace review only; no npm/build/lint/browser checks executed.

Approved page-2 signature uploads: the Documents step accepts optional Authorized Representative's Signature and Authority / Owner's Signature images alongside the existing photo and page-1 applicant signature. Each accepts PNG/JPG up to 2 MB, appears in Review, invalidates any previously generated PDF when changed, and is fitted above its corresponding Part 3 signature line. These are uploaded signature images, not verified digital signatures. All image files remain in memory and must be reselected after refresh; draft storage is unchanged. Page-3 association approvals and the separate page-1 director signature/seal remain blank.

Contact email handoff: `/contact` now receives `membershipApplication.recipientEmail` from App, sharing the configured authority recipient with `/apply`. Required name/email/subject/message fields open a Gmail draft or the configured email app, with visitor name and reply email included in the body. Draft-link encoding is shared in `src/lib/emailDraft.ts`. Input is retained, blocked Gmail windows get a fallback message, and a missing recipient disables draft actions. No automatic sending, delivery confirmation, backend, or contact-data persistence. ContactCard office information remains separately configured. Source and scoped whitespace review completed; no browser/email sending, npm, build, lint, or deployment commands were run.
