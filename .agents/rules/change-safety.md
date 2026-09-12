# Change safety

Owner policy source: [.codex/instructions.md](../../.codex/instructions.md). Root [AGENTS.md](../../AGENTS.md) is the main entry point.

1. Inspect the task, relevant source, existing reuse options, and git status first. Preserve unrelated work and untracked files. Explain the current pattern and smallest change before editing.
2. Use only repository evidence to describe architecture. Mark missing/unclear behavior as unknown. Do not invent APIs, conventions, services, assets, or business facts.
3. Reuse components/utilities/hooks/types/data/layouts and current design patterns. Preserve existing functionality unless explicitly asked to change it. Keep code simple and readable; no unrelated refactors, speculative layers, unnecessary state/hooks, or deletion unless explicitly required.
4. Never independently add UI styles, arbitrary colors/gradients/effects, unrelated animations, or unnecessary pages/components. If the current system lacks a needed pattern, explain and ask before introducing one.
5. Never install a package, change dependency declarations, or add a framework/library/tool without explicit authorization. Do not add backend/database/auth/CMS or change architecture without an explicit request and approval for the necessary departure.
6. No npm commands by default, including install/dev/preview/build/lint/test/audit/update. The user must explicitly authorize the exact command. Do not bypass this with npx, another package manager, or direct binaries. Do not assume build/test readiness. No automatic build/lint/test verification.
7. If useful, write `Manual verification: run \`npm run build\`` or `Manual verification: run \`npm run lint\`` in the handoff instead of executing. Recommend only applicable existing scripts; npm test does not currently exist. Docs-only work does not require npm verification.
8. No automatic deployment, infrastructure or server/deployment configuration changes. Ask for explicit authorization for the specific action if not already given.
9. Git inspection is allowed. No commit, push, force-push, remote changes, or branch deletion without explicit user instruction. Do not infer permission from a workflow or normal task completion.
10. If a needed step is outside authorized scope, identify it and ask. Explicit authorization already supplied remains valid; do not ask again for the same action. Never silently expand scope or treat an issue list as a work order.

After work, state exactly what changed and which checks were actually performed. If no commands were executed, say so for that task; do not erase or contradict earlier task history. Update only relevant memory facts when requested work changes them.
