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
