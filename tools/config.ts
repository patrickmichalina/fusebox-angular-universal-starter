export const config = {
  title: 'Fusebox Angular Universal Starter',
  name: 'Fusebox Angular Universal Starter',
  description: 'Seed application for Angular Universal projects',
  outputDir: "dist",
  sourceDir: "src",
  prodOutDir: "./dist/prod",
  assetParentDir: "src/client",
  baseHref: "/",
  stylesheets: [
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  ],
  server: {
    port: 8083,
    faviconSource: './src/client/assets/favicon.png'
  }
}