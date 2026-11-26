# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Build production files (runs TypeScript build + vite build)
npm run preview                # Serve production build locally
npm run lint                   # Run oxlint with auto-fix
npm run depcruise              # Check layer boundaries (dependency-cruiser)

# Dye manufacturer data
npm run colors                 # Build all manufacturer color data
npm run colors:dharma          # Build only Dharma colors
npm run colors:pro-chem        # Build only Pro Chem colors

# Deployment
npm run deploy                 # Build and deploy to GitHub Pages
npm run predeploy              # Build PWA assets, production files, and colors concurrently
```

## Architecture Overview

This is a React + TypeScript + Vite app for visualizing tie-dye spiral patterns using real dye manufacturer color data.

### Core Application Structure

- **React Context Pattern**: Central state management via `AppStateContext` handles:
  - Selected colors and dye style (liquid/ice)
  - Shirt configuration (spirals count, direction)
  - Spiral color assignments

- **Layers** (enforced by dependency-cruiser; a layer imports only layers below it): app → features → shared/ui → utils → context → types. `shared/ui` may import only `shared/ui` and `types`. A feature never imports another feature.
  - `src/App.tsx`, `src/main.tsx` - App layer: entry point and page layout using `AppLayout`
  - `src/features/Shirt/` - SVG-based shirt rendering with spiral path generation
  - `src/features/Companies/` - Dye manufacturer selection and color blocks
  - `src/features/DyePlacementDiagram/` - Interactive folded shirt visualization
  - `src/features/SpiralControls/` - Spiral configuration controls
  - `src/features/Options/` - Shirt and dye options
  - `src/shared/ui/` - Shared presentational pieces (`AppLayout`, `ColorSwatch`, `SwatchGrid`, `DiagramSection`, company-header surface) and the CSS entry `theme.css`

### Key Technical Components

**Spiral Generation** (`src/features/Shirt/buildSpiralPaths.ts`):

- Generates logarithmic spiral SVG paths
- Supports clockwise/counterclockwise direction
- Creates both outline paths and fill paths for color application

**Color Data Pipeline** (`scripts/build-colors.js`):

- Fetches and processes manufacturer color data
- Each manufacturer has custom scraper in `scripts/manufacturer-color-buliders/`
- Outputs to `public/colors-compiled.json`
- Colors sorted using `color-sorter` library

**State Persistence**:

- URL-based state sharing via `utils/url.ts`
- Allows copying/loading pattern configurations

### Styling & UI

- **Friggle design system** (`@schwalbs/friggle-components`, `@schwalbs/friggle-recipes`) for components; follow the `design-system:guide` skill when writing UI
- **Glass theme** from `@schwalbs/friggle-themes`, selected with `data-style="glass"` on `<html>` in `index.html`. There is no `data-theme`, so light and dark follow `prefers-color-scheme`. Font is Inter via `@fontsource-variable/inter`
- **Tailwind v4** with the CSS entry `src/shared/ui/theme.css`: imports Tailwind first, then `@schwalbs/friggle-themes` once; also holds the base `block-size: 100%` for `html`/`body`/`#root`, `AppLayout`'s `@utility`, and `@utility grid-cols-auto-fit`
- **Feature code** may use only layout classes in `className` (enforced by oxlint); styling goes in `shared/ui` components. No arbitrary values (`[...]`)
- **Icons** via `lucide-react`
- **PWA Support** with Vite PWA plugin

### Deviations from the design-system guide

These are approved; do not "fix" them:

1. No `AppShellLayout` and no page `Container`. The app is one screen with no routes or navigation, so the `shared/ui` `AppLayout` component replaces them.
2. `AppLayout` keeps full-height scroll regions for the controls and companies columns instead of letting the document scroll (the guide's document-scroll rule).
3. `SwatchGrid` uses hand-written `grid grid-cols-3 gap-2` plus the `grid-cols-auto-fit` `@utility` instead of friggle `Grid`, because `Grid` is one column below `md`.
4. No `PageHeader` `h1`. Company names stay `<h3>` with `Heading level={3}` styling (`text-lg`).

### Adding New Dye Manufacturers

1. Create builder function in `scripts/manufacturer-color-buliders/[name].js`
2. Export async function returning `Company` type (see `src/types/colors.ts`)
3. Add to default export in `scripts/manufacturer-color-buliders/index.js`
4. Builder should handle web scraping/API calls and return standardized color data

### Development Notes

- Canvas package may require system libraries for image processing
- Uses Husky for pre-commit hooks with lint-staged
- Linting uses oxlint (`.oxlintrc.json`); lint-staged runs oxlint then prettier
- `@schwalbs` packages come from GitHub Packages; see the README "Installing" section for the token setup
- TypeScript strict mode enabled
