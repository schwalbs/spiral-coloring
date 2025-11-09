# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Build production files (runs TypeScript build + vite build)
npm run preview                # Serve production build locally
npm run lint                   # Run ESLint with auto-fix

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

- **Component Architecture**:
  - `App.tsx` - Main layout with folded shirt diagram, result shirt, and controls
  - `Shirt/` - SVG-based shirt rendering with spiral path generation
  - `Companies/` - Dye manufacturer selection and color blocks
  - `DyePlacementDiagram/` - Interactive folded shirt visualization
  - `SpiralControls/` - Spiral configuration controls

### Key Technical Components

**Spiral Generation** (`src/components/Shirt/buildSpiralPaths.ts`):

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

- **Bootstrap CSS Framework** for layout and components
- **CSS Modules** for component-specific styling
- **Material Design Icons** via `@mdi/react`
- **PWA Support** with Vite PWA plugin

### Adding New Dye Manufacturers

1. Create builder function in `scripts/manufacturer-color-buliders/[name].js`
2. Export async function returning `Company` type (see `src/types/colors.ts`)
3. Add to default export in `scripts/manufacturer-color-buliders/index.js`
4. Builder should handle web scraping/API calls and return standardized color data

### Development Notes

- Canvas package may require system libraries for image processing
- Uses Husky for pre-commit hooks with lint-staged
- ESLint configured for React + TypeScript with React Hooks rules
- TypeScript strict mode enabled
- Bootstrap 5 classes used throughout components for responsive layout and styling
