# Build and deployment facts

Sources: [package.json](../../package.json), [vite.config.ts](../../vite.config.ts), [index.html](../../index.html), [.gitignore](../../.gitignore), and TypeScript configuration files.

| Script | Current definition |
| --- | --- |
| dev | vite |
| build | tsc -b && vite build |
| lint | oxlint |
| preview | vite preview |

These are documentation, not authorization to run npm. There is no start or test script. README's npm start instruction is stale. No automated test suite or CI workflow was found in the inspected source/configuration inventory.

Vite config uses React and Tailwind plugins and resolves @ to src. No custom base path, server/proxy settings, deployment provider, or backend configuration is defined there. Build output is dist under current defaults; dist, dist-ssr, node_modules, logs, and *.local are ignored. Root TypeScript config references app/node configs; their incremental metadata targets node_modules/.tmp.

App uses BrowserRouter, root-relative static URLs, and a hardcoded canonical domain. Production route fallback handling, actual hosting provider, deployment commands, environment variables, credentials, domain configuration, and server infrastructure are undocumented in this checkout. Do not infer them from a commit title, a canonical URL, or an ignored dist directory. Direct nested-route loading needs to be considered in an explicitly requested deployment task, but no server rewrite is configured here.

Do not deploy or alter server/infrastructure settings automatically. First inspect any configuration added since this snapshot, identify the intended destination and the smallest change, and obtain explicit authorization for deployment/configuration work and exact npm commands. No production-readiness claim follows from these source observations.
