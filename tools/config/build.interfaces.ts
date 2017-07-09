import jsdom = require("jsdom");

export enum DependencyType {
  Stylesheet,
  Script,
  Meta
}

export enum SourceType {
  RelativeLink,
  ExternalLink,
  NPM,
  Inline
}

export interface Dependency {
  source?: {
    link: string,
    type: SourceType;
  };
  type: DependencyType;
  order?: number;
  attributes?: any;

  /* 
   * is true, place dependency in the <head> of the document,
   * otherwise it will be placed in the <body>
   */
  preloaded?: boolean;
  id?: string;
  shouldExecute?: (dep: Dependency) => boolean;
}

export interface BuildConfiguration {
  dependencies: Dependency[];
  baseHref: string;
  faviconSource: string;
  outputDir: string;
  sourceDir: string;
  prodOutDir: string;
  assetParentDir: string;
  minifyIndex: boolean;
}

export interface IConfigurationTransformer {
  apply(dependencies: Dependency[], document?: string): jsdom.JSDOM;
}
