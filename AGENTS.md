# Project development contract

Read this file before working in this repository. The owner's [original instructions](.codex/instructions.md) define this contract. Read [.agents/README.md](.agents/README.md), the [safety rules](.agents/rules/change-safety.md), and the context relevant to the task before editing.

## Source of truth and scope

- Use the existing source, configuration, assets, types, data, and documentation as evidence. Document unknowns instead of inventing architecture or functionality. Where README claims disagree with source, describe the implemented source accurately.
- First inspect the requested change and existing implementation. Search for reusable components, helpers, utilities, hooks, types, layouts, and content before creating anything. Briefly explain the relevant existing pattern and smallest affected file set, then implement only the requested change.
- Reuse and, where appropriate, extend existing code. Preserve the React/Vite frontend architecture, functionality, and current UI unless the user explicitly requests a change.
- Prefer simple, readable TypeScript/React and focused changes. No speculative abstractions, state management, utility layers, unrelated refactors, or unrequested file deletion.
- Reuse spacing, typography, colors, borders, shadows, radii, motion, and responsive patterns from the relevant current UI. Do not independently introduce a new UI style, arbitrary colors/effects, animations, or extra pages/components. If existing UI cannot satisfy a requirement, explain the missing pattern and ask before introducing it.

## Command and change restrictions

- **No npm command is authorized by default.** Run only an exact npm command explicitly authorized by the user. This includes install, build, lint, test, audit, update, dev, and preview. Do not automatically run npm to verify work or assume readiness to build/test. Do not substitute another package manager or direct executable to bypass this restriction.
- When verification is useful, report `Manual verification: run \`<command>\`` instead of executing it. No build, lint, or test execution without explicit authorization. Check which scripts actually exist before recommending them.
- Never install packages, modify package.json dependencies, or introduce a framework/library/tool without explicit instruction or approval.
- Do not introduce backend, database, authentication, or CMS functionality unless explicitly requested; these do not exist in the current project. Explain and obtain approval for architectural changes before proceeding.
- Do not change deployment/server configuration or infrastructure, or deploy automatically. Explicit authorization is required.
- Git status/diff/history inspection is allowed. Never commit, push, force-push, alter remotes, or delete branches without explicit user instruction. Workflow wording alone is not authorization; these are not normal completion steps.
- If a task requires an unauthorized dependency, architectural change, npm command, build/lint/test, commit/push, or deployment, explain the specific need and ask. Honor explicit authorization already given in the task; do not repeatedly request it.

## Completion

Report changed files, preserved behavior, verification actually performed, suggested manual commands if needed, and remaining unknowns. Do not claim checks that were not run. Keep relevant memory accurate when an authorized change alters a documented fact; do not silently expand scope to resolve known gaps.
