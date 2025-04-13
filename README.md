# Tie Dye Spiral Coloring App

This app is a tool to visualize how applying dye to a folded spiral shirt will result using colors from dye manufacturers. It is currently deployed [here](https://schwalbs.github.io/spiral-coloring/).

Color manufacturers currently supported:

- [Dharma trading company](https://www.dharmatrading.com/dyes/dharma-fiber-reactive-procion-dyes.html)

## Development

This project is built with [react](https://react.dev/), [vite](https://vite.dev/), and TypeScript.

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

# build dye manufactures data under public/colors-compiled.json
# each manufacturer can be built with build:colors:<manufacturer>
npm run build:colors
```

## Future improvements

- [ ] Add support for other dye manufacturers
  - [ ] [Pro Chem and Dye](https://prochemicalanddye.com/)
  - [ ] [Jacquard](https://www.jacquardproducts.com/procion-mx)
  - [ ] [Custom Colors](https://customcoloursinc.storenvy.com/)
  - [ ] [Happy Cat Dyes](https://www.happycattiedye.com/shop/category/dyes)
  - [ ] [Grateful Dyes](https://www.grateful-dyes.com/fabric-dyes/)
- [ ] Collapsable manufacturer sections
- [ ] Additional controls
  - [ ] Spiral direction
  - [ ] Reset shirt
  - [ ] Erase single color
  - [ ] Color blend amount
- [ ] Blending between colors in spiral
- [ ] Filters for colors
  - [ ] Color group (red, pink, green, blue, purple, yellow, orange, neutrals, brown)
  - [ ] Manufacturer
- [ ] Background or texture to folded shirt
- [ ] Export options
  - [ ] Spiraled shirt image download
  - [ ] PDF or image with color swatch
- [ ] Color swatch section for shirt
- [ ] Shareable URL
- [ ] Active color indicator
- [ ] Tech improvements
  - [ ] Infer hex color from dye image
  - [ ] Move vite allowed hosts to .env
  - [ ] Commit linter
