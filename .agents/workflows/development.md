# Focused development workflows

All workflows are subordinate to [AGENTS.md](../../AGENTS.md) and [change safety](../rules/change-safety.md). None grants npm, dependency, git mutation, build/test, or deployment permission.

## Feature or behavior change

1. Read the user's request, inspect git status and the relevant route/component/data path, and search existing helpers/components before proposing new code.
2. Briefly explain the existing pattern and smallest affected file set. Ask if a requirement needs a new dependency, architectural departure, or new UI pattern not already authorized.
3. Extend the current props/hooks/types/components only as needed. Keep unrelated behavior, files, and architecture intact. Do not add a backend for a frontend-only request.
4. Review the diff for scope, imports, data/prop consistency, and accidental deletions. Do not execute verification commands without explicit permission. Report appropriate manual commands and any checks not performed.

## UI update

Inspect the current UI and its rendering source. Read design-system.md and the target's existing classes, variants, breakpoints, motion, and image treatment. Compare similarly named shared and page-local components before choosing reuse: the active Home is not built from the separate shared hero/statistic/CTA components. Extend suitable existing components and preserve responsive behavior. Do not start npm dev/preview without exact-command authorization. If no browser preview is available, report that limitation rather than claim visual validation.

## Content update

Inspect the JSON section, TypeScript interface, and consuming page. Search for duplicated homepage previews, contact/social copies, and hardcoded About text. Preserve ids, types, category values, array order, and route targets. Use supplied business facts; ask about conflicts or unknown values. Review JSON syntax and references without running npm. Do not introduce a CMS or normalize unrelated data.

## Image/document update

Locate the actual source URL/import and file first. Inspect existing assets and the requested replacement; preserve crop, alt/caption intent, and existing directory conventions. Public URLs begin at /, not /public/. Check related previews and metadata only where the requested asset is used. Do not assume the untracked root PDF is already published or invent missing official documents. Do not delete old assets unless explicitly required. Report any unavailable preview or unverified mapping.

## Deployment request

Read deployment.md and inspect current repository configuration. Establish the intended provider/destination if unknown. Prepare only the requested local changes; do not invent a server or provider setup. Explain required configuration/architecture changes and ask for missing authorization. Provide manual build instructions unless that exact command is explicitly authorized. Never treat deployment as an automatic final step, and never automatically commit or push.
