# Tie Dye Spiral Coloring App

This app is a tool to visualize how applying dye to a folded spiral shirt will result using colors from dye manufacturers. It is currently deployed [here](https://schwalbs.github.io/spiral-coloring/).

Color manufacturers currently supported:

- [Dharma trading company](https://www.dharmatrading.com/dyes/dharma-fiber-reactive-procion-dyes.html)
- [Jacquard](https://www.jacquardproducts.com/procion-mx)
- [Pro Chem and Dye](https://prochemicalanddye.com/pro-mx-fiber-reactive-dyes/)

## Development

This project is built with [react](https://react.dev/), [vite](https://vite.dev/), TypeScript, and the [Bulma CSS framework](https://bulma.io/).
Other core libraries:

- [node-html-parser](https://www.npmjs.com/package/node-html-parser) to parse dye manufacturer pages
- [color-sorter](https://www.npmjs.com/package/color-sorter) to sort dye coolors by color
- [canvas](https://www.npmjs.com/package/canvas) to reduce an image to a hex value
  - you may need to install libraries for this to work, refer to the [docs](https://github.com/Automattic/node-canvas?tab=readme-ov-file#compiling)
- [Material Design Icons](https://pictogrammers.com/library/mdi/) for icons

### Commands

```bash
# start dev server
npm run dev

# built prod files under dist/
npm run build

# serve prod files
npm run preview

# build and deploy to github pages
npm run deploy

# build dye manufactures data under ./public/colors-compiled.json
# each manufacturer can be built with colors:<manufacturer>
npm run colors
```

### Adding a new dye manufacturer

Each manufacturer needs a custom builder under `./scripts` due to no standardization in hosting.
Dharma is chill and has some JSON files we can request, but others require page scrapers.
Each manufacturer script should export a single async function that returns an object matching to `Company` in `./src/types/colors.ts`.
Refer to `./src/types/colors.ts` for expected formats.

`./scripts/build-colors.js` is the single entrypoint and can filter based on args passed.

1. Create a `.js` under `./scripts/manufacturer-color-builders` exporting a single async function that returns a `Company`
2. Update the deault export in `./scripts/manufacturer-color-builders/index.js` to map to the new builder

## Future improvements

- [ ] Add support for other dye manufacturers
  - [ ] [Custom Colors](https://customcoloursinc.storenvy.com/)
  - [ ] [Happy Cat Dyes](https://www.happycattiedye.com/shop/category/dyes)
  - [ ] [Grateful Dyes](https://www.grateful-dyes.com/fabric-dyes/)
- [x] ~~Collapsable manufacturer sections~~
- [ ] Additional controls
  - [x] ~~Spiral direction~~
  - [x] Reset shirt
  - [ ] Erase single color
  - [ ] Color blend amount
  - [ ] Dye intensity
- [ ] Blending between colors in spiral
- [ ] Filters for colors
  - [ ] Color group (red, pink, green, blue, purple, yellow, orange, neutrals, brown)
  - [ ] Manufacturer
- [ ] Background or texture to folded shirt
- [ ] Export options
  - [ ] Spiraled shirt image download
  - [ ] PDF or image with color swatch
- [ ] Color swatch section for shirt
- [ ] Sharing
  - [x] ~~Via URL~~
  - [ ] Via code and import
- [ ] Active color indicator
- [ ] Tech improvements
  - [x] ~~Infer hex color from dye image~~
  - [x] ~~Move vite allowed hosts to .env~~
  - [ ] Commit linter
  - [ ] Error boundaries
  - [ ] Better error handling when building colors
  - [ ] Workers for each manufacturer builder
  - [ ] Dye manufacturer JSON validation
  - [ ] Replace bulma with bootstrap
