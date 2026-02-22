# Vue Path Reference

Use this path when the user requests Vue-based artifacts.

## Initialization

```bash
bash scripts/init-artifact.sh <project-name> --framework vue
# or
bash scripts/init-artifact-vue.sh <project-name>
```

## Includes

- Vue 3 + TypeScript + Vite (`vue-ts` template)
- Tailwind CSS 3.4.1
- Path alias `@/`
- Lightweight baseline without extra component framework dependencies

## Good Fit

- Requests explicitly calling for Vue or SFC patterns
- Fast iteration with smaller dependency footprint
- Projects that want full control over component architecture
