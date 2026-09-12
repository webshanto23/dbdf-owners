# Membership application: simplest workflow TODO

## Scope and development rules

This checklist defines the selected workflow; the implementation status below records current progress. Unchecked items remain to be confirmed or verified. Follow [AGENTS.md](../AGENTS.md), [.agents/README.md](../.agents/README.md), and the existing change-safety rules. Reuse the current React/Vite architecture, components, styling, types, and utilities; preserve unrelated functionality and files.

Selected baseline: **browser-only form completion, exact-template PDF generation, and applicant-controlled email sending**. The authority keeps received applications in Gmail and handles follow-up manually.

Do not add Express, a database, login, an admin dashboard, SMTP credentials, Gmail API/OAuth, Google Drive integration, server-side storage, or application-status tracking. Automatic emailing needs a separately authorized endpoint/service and is outside this baseline.

No dependency changes, package installation, npm commands, build/lint/test execution, commits, pushes, deployment, or server changes are authorized by this checklist. Obtain explicit approval for needed dependencies and exact commands. Provide manual verification instructions instead of automatically running commands.

## Applicant workflow

1. Click an existing membership / Become a Member button to open the application form.
2. Complete the applicant fields and review the information.
3. Click **Generate PDF** to create the completed original-layout PDF locally.
4. View it in a new browser tab, with an explicit **Download PDF** fallback.
5. Click **Open Gmail to Send** or **Use another email app** to open a prepared draft.
6. Manually attach the downloaded PDF and required supporting documents, then send.
7. The authority receives the application and continues correspondence in Gmail.

Display: "Your PDF is ready. Attach it to your email and send it to complete your application."

Never display "Application submitted successfully" merely because the PDF or composer opened. Ordinary compose links cannot attach a browser-generated PDF or confirm delivery. The website does not automatically archive applications in Gmail or Drive.

## TODO 1: Inspect and confirm requirements

- [ ] Read the current membership CTA consumers, App routes, Documents page, siteData.json, and existing layout/Input/Button components before editing.
- [ ] Inspect every page of `DBDF Membership Application Form English.pdf` visually and extract its fields. The inspected source has three pages, no interactive form fields, and dimensions approximately 595.44 x 841.68 PDF points; recheck the source before implementation.
- [ ] Confirm the actual authority recipient email; do not assume placeholder contact data is correct. Keep this public address in the existing content configuration, with no credentials.
- [ ] Confirm required/optional fields, membership category choices, signature/seal policy, and supporting-document requirements. Do not invent association rules from numbered blanks.
- [ ] Use **`pdf-lib`** as the selected PDF generation/modification library. This library choice is confirmed by the user; package installation and npm commands still require explicit authorization under the command policy.
- [ ] Load the original template with `PDFDocument.load`, overlay text using `drawText`, embed approved photographs/signature images using `embedJpg` or `embedPng`, and save the completed bytes as an `application/pdf` Blob for preview/download. The current template has no fillable fields, so do not assume existing AcroForm fields can be populated.
- [ ] Use existing React components for the input form and the browser PDF viewer for the new-tab preview. Do not add `@react-pdf/renderer`, `react-pdf`, or `jsPDF` for this workflow; recreating the document or adding an embedded viewer is unnecessary.

## TODO 2: Preserve the exact PDF template

- [ ] Preserve the root source PDF unchanged. During implementation, copy it to an appropriate public document path for browser loading and blank-template download; do not move/delete the original.
- [ ] Use the original PDF pages as the underlying template and overlay values at measured coordinates. Do not approximate the form with HTML screenshots, browser print styles, or a newly drawn imitation.
- [ ] Retain all three pages, dimensions, logos, printed wording, colors, rules, page numbers, photograph frame, authority sections, and existing "PROPOSED" branding unless explicitly instructed otherwise.
- [ ] Create a field-to-page/coordinate mapping with bounding boxes, font choices, and overflow handling. Preserve readable text. Validate overlong input rather than silently clipping, overlapping labels, shrinking to unreadable sizes, or adding pages.
- [ ] Map Part 2 company/owner details, addresses, personal/contact information, license numbers/dates, payment references, document checklist, and applicant dates.
- [ ] Map Part 3 representative details, membership category, TIN, photograph, certification date, and any approved signature inputs.
- [ ] Leave Parts 1, 4, and 5 authority-only. Do not invent form numbers, membership numbers, signatures, seals, approvals, certificates, or verified payment status.
- [ ] Resolve signature handling before implementing it: leave spaces for print/sign, or accept approved signature/seal image uploads. Never represent typed names or pasted images as verified digital signatures.
- [ ] Supporting documents remain separate email attachments. Do not append pages to the three-page form or collect documents the website does not process.
- [ ] Confirm supported input languages. Do not promise correct Bangla/complex-script output without suitable font/shaping support and visual verification.

## TODO 3: Form and browser state

- [ ] Add the smallest dedicated form route (proposed `/apply`) inside the existing React Router/MainLayout structure. Reuse the established dark/gold UI and responsive patterns.
- [ ] Keep the screen form responsive and readable; only the generated PDF must match the paper layout exactly.
- [ ] Use typed local React state and existing composition patterns. Avoid new global state libraries or unnecessary abstraction.
- [ ] Keep unfinished personal data and approved photo/signature inputs in memory by default. Do not silently persist NID, dates of birth, addresses, or signatures to localStorage or transmit them to analytics/services.
- [ ] Explain that refreshing/leaving loses unfinished input. Preserve values after validation or generation errors so the applicant can correct and retry.
- [ ] Use associated labels, keyboard access, understandable errors, and a review step.
- [ ] Open a preview tab synchronously from the click before asynchronous generation, then navigate it to the PDF Blob URL. Handle popup blocking, generation errors, browser download-only behavior, and URL cleanup.
- [ ] Provide an explicit download action independent of the browser PDF toolbar.
- [ ] Invalidate/regenerate output after field edits. Preview and download must use the same current PDF bytes.
- [ ] Use a useful sanitized filename without NID or other sensitive identifiers. Do not present a locally generated reference as an official receipt.

## TODO 4: Email handoff and existing links

- [ ] Add **Open Gmail to Send**, **Use another email app** (mailto), and **Copy authority email address**, with clear attach-and-send instructions.
- [ ] Prefill the fixed recipient, an appropriate subject, and a short message with correctly encoded values. Do not embed NID, payment account details, or the entire application in compose-link query strings.
- [ ] Explain that applicants must attach the PDF and supporting documents themselves. Gmail may require sign-in; mailto uses their configured email client. Neither proves sending or receipt.
- [ ] Optionally offer **Share PDF** on devices supporting file sharing through navigator.canShare/navigator.share. Keep this optional, retain download/email fallback, and do not assume Gmail is available or a share result proves delivery.
- [ ] Point relevant existing membership CTAs to the form route without altering unrelated Contact navigation.
- [ ] Connect the Documents membership-form item to the actual blank PDF with accurate metadata. Leave unrelated missing documents outside scope.
- [ ] Do not promise automatic Google Drive saving, email delivery, review status, or tracking. Gmail labels and manual Drive filing remain authority-side activities.

## TODO 5: Verification and handoff

- [ ] Review the diff, affected imports, content links, and task scope without automatically running npm or tests.
- [ ] When runtime/PDF verification is authorized, compare all three generated pages against the original using clearly fictional sample information.
- [ ] Check long names/addresses, dates, dense page-1 fields, photo/signature placement, untouched authority blanks, readable fonts, and unchanged pagination. Do not claim exact layout has been verified without checking the rendered output.
- [ ] In an authorized preview environment, check validation, regeneration, preview/download, blocked popups, mobile and keyboard operation, and email fallbacks. Do not send real email as a check without explicit authorization.
- [ ] Check that sensitive information is not unintentionally persisted/transmitted and that no credentials exist in frontend files.
- [ ] Report files changed, checks actually performed, unresolved authority decisions, and manual commands if useful. Existing scripts include `npm run build` and `npm run lint`; do not execute either without exact-command authorization.
- [ ] Do not deploy or alter Webmin, Nginx, or DigitalOcean. This remains a static React deployment.

## Acceptance criteria

- The membership button opens the form; applicants can fill it and generate/download the original-layout three-page PDF.
- Values appear in the correct positions without altering original labels, branding, page boundaries, or authority-only sections.
- Preview and download contain the same reviewed data.
- Applicants can open a prepared email draft and are explicitly instructed to attach and send the PDF manually.
- The website makes no false receipt, delivery, approval, or Drive-archive claims.
- No backend, database, login, or email credentials are needed for this baseline.

## Current implementation status

- The `/apply` form generates and downloads the original three-page PDF locally using `pdf-lib`. The user confirmed the corrected PDF output looks correct.
- Gmail draft, default email app, and copy-address actions use `membershipApplication.recipientEmail` in `public/data/siteData.json`.
- The user authorized `web.shanto23@gmail.com` as the temporary recipient. **Before deployment, replace this value with the original authority Gmail address.** No email credentials are needed.
- Applicants download the PDF, open a prepared draft, manually attach the PDF and supporting documents, and send from their email account. Draft links contain only the recipient and generic subject/body.
- Form input stays in React memory; the website does not store submissions or confirm receipt. The authority keeps received attachments and manages follow-up in Gmail.
- This configuration update was reviewed in source. Build/lint, browser email-client checks, real sending, and deployment were not performed.
