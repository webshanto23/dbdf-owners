# Existing coding conventions

- Pages/layouts are PascalCase .tsx files; components use kebab-case filenames and PascalCase symbols. Hooks use use-prefixed camelCase names. types and utils use index.ts. Follow neighboring files rather than renaming the tree.
- Function components, typed props interfaces, named exports, and import type are common. App is default-exported. UI primitives mix React.forwardRef and React.ComponentProps patterns; preserve each local API.
- Imports commonly use @/ for src modules, configured in both Vite and tsconfig.app.json. main.tsx uses relative imports. Do not add a new alias system.
- Quote/semicolon styles vary: most page/common files use double quotes and semicolons, while some config/entry files use single quotes and UI wrappers omit semicolons. Match the edited file; no formatter configuration was found.
- Local useState/useEffect and props are the existing state model. Category filters use arrays, Set, filter, and map. No global store or query library exists. Extend the existing hooks rather than adding parallel data-fetch layers.
- Reuse cn from src/lib/utils.ts for class composition (clsx + tailwind-merge). Check src/utils/index.ts for formatDate, formatFileSize, getFileExtension, scrollToTop, debounce, and slugify before adding helpers. Inspect their actual signatures/behavior rather than assuming suitability.
- Internal route navigation typically uses React Router Link. Existing Button asChild supports links without nesting a button. External links commonly use target=_blank and rel=noopener noreferrer; phone/email use tel/mailto.
- Styling is mainly Tailwind utilities with className extension points, global CSS tokens, and existing Button variants. Do not add an independent stylesheet/design system or install a component generator.
- Icon maps in Home and common components map data strings to imported Lucide icons. Their supported names differ; inspect the exact consumer. Some About icons use inline text/emoji mappings.
- TypeScript configs set noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch, erasableSyntaxOnly, and skipLibCheck. They do not enable strict. Do not describe the project as strict-mode TypeScript or change compiler policy incidentally.
- Oxlint config enables react/typescript/oxc plugins with rules-of-hooks as error and only-export-components as warning. Tool config is evidence, not permission to execute lint.

Search src/components/ui, common, layout, home, and the target page's local functions before creating a component. Several existing components are unused or visually different from their active counterparts. Extend an appropriate component when possible; avoid duplicate implementations, unnecessary abstraction, and unrelated consolidation.
