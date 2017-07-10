import { Dependency, DependencyType, SourceType, BuildConfiguration } from './build.interfaces';

export const BuildConfig: BuildConfiguration = {
  baseHref: "/",
  faviconSource: './src/client/assets/favicon.png',
  outputDir: "dist",
  sourceDir: "src",
  prodOutDir: "./dist/prod",
  assetParentDir: "src/client",
  minifyIndex: true,
  dependencies: [
    {
      type: DependencyType.Stylesheet,
      order: 1,
      preloaded: true,
      source: {
        type: SourceType.ExternalLink,
        link: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      }
    },
    {
      type: DependencyType.Meta,
      order: 2,
      preloaded: true,
      attributes: {
        name: 'google-site-verification',
        content: process.env.GA_VERIFICATION_CODE
      },
      shouldExecute: (dep: Dependency) => process.env.GA_TRACKING_ID && process.env.GA_VERIFICATION_CODE,
    },
    {
      type: DependencyType.Script,
      order: 3,
      preloaded: false,
      source: {
        type: SourceType.Inline,
        link: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga('create', '${process.env.GA_TRACKING_ID}', 'auto');`
      },
      shouldExecute: (dep: Dependency) => process.env.GA_TRACKING_ID && process.env.GA_VERIFICATION_CODE,
    },
    {
      type: DependencyType.Script,
      order: 4,
      preloaded: false,
      source: {
        type: SourceType.ExternalLink,
        link: `https://www.google-analytics.com/analytics.js`
      },
      shouldExecute: (dep: Dependency) => process.env.GA_TRACKING_ID && process.env.GA_VERIFICATION_CODE,
      attributes: {
        async: true
      }
    }
  ]
}