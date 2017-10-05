import { BundleProducer } from 'fuse-box/src/core/BundleProducer';
import { minify } from 'html-minifier';
import { readFileSync } from 'fs';
import { join } from 'path';
import hash = require('string-hash');
import jsdom = require('jsdom');
const { JSDOM } = jsdom

export interface WebIndexPluginOptions {
  // Defines the title of a document
  title?: string;

  // Defines a default address or a default target for all links on a page
  base?: string;

  // Defines a app root element in the body, typical for JS frameworks like Angular JS
  appElement?: { name: string, innerHTML: string };

  // Output file
  target?: string;

  minify?: boolean | Object;

  startingDocumentPath?: string;

  // bundled javascript to inject as script elements
  bundles: string[];

  asyncBundles?: boolean | Object;

  bundleOrdering?: { [key: string]: number };

  additionalDeps?: Dependency[];

  transformByQuery?: [{ query: string, transformer: (element: NodeListOf<Element>) => NodeListOf<Element>, execute: boolean }];

  postProcess?(html: string): string;
}

export class WebIndexPluginClass {
  public dependencies: ['jsdom', 'fs', 'string-hash', 'html-minifier'];

  constructor(public opts: WebIndexPluginOptions) {
    if (!opts.additionalDeps) this.opts.additionalDeps = [];
    if (!opts.bundles) this.opts.bundles = [];
  }

  producerEnd(producer: BundleProducer) {
    const baseDeps: Dependency[] = [
      {
        attributes: {
          href: this.opts.base || '/'
        },
        inHead: true,
        element: 'base',
        order: -100
      },
      {
        attributes: {
          charset: 'utf-8'
        },
        inHead: true,
        element: 'meta',
        order: -99
      }
    ]

    const appElement: Dependency = this.opts.appElement
      ? { element: this.opts.appElement.name, content: this.opts.appElement.innerHTML }
      : undefined as any;

    const deps = [appElement, ...producer.sortBundles()
      .filter(bundle => this.opts.bundles.some(b => b === bundle.name))
      .filter(bundle => bundle.context.output)
      .filter(bundle => bundle.context.output.lastPrimaryOutput)
      .map(bundle => {
        return {
          element: 'script',
          attributes: {
            src: bundle.context.output.folderFromBundleName
              ? `/${bundle.context.output.folderFromBundleName}/${bundle.context.output.lastPrimaryOutput.filename}`
              : `/${bundle.context.output.lastPrimaryOutput.filename}`,
            defer: true
          }
        } as Dependency;
      }), ...this.opts.additionalDeps as Dependency[], ...baseDeps]
      .filter(a => a);

    const depTransformer = new ConfigurationTransformer();

    const startingHtml = this.opts.startingDocumentPath
      ? readFileSync(join(producer.fuse.context.appRoot, this.opts.startingDocumentPath), 'utf-8')
      : undefined;

    let html = depTransformer.applyTransform(deps, startingHtml);

    if (this.opts.transformByQuery) {
      this.opts.transformByQuery.forEach(setting => {
        if (setting.execute) {
          const dom = new JSDOM(html);
          let items = dom.window.document.querySelectorAll(setting.query);

          items = setting.transformer(items);

          html = dom.serialize();
        }
      });
    }

    const finalHtml = typeof (this.opts.postProcess) === 'function'
      ? this.opts.postProcess(html)
      : html;

    producer.fuse.context.output.write(this.opts.target || 'index.html', finalHtml, true);
  }
}

export const WebIndexPlugin = (options: WebIndexPluginOptions = { bundles: [], additionalDeps: [] }) => new WebIndexPluginClass(options);

export interface Dependency {
  order?: number;
  inHead?: boolean;
  attributes?: { [key: string]: string | boolean };
  element: string;
  content?: string;
  shouldExecute?: (dep: Dependency) => boolean;
}

export interface IConfigurationTransformer {
  applyTransform(dependencies: Dependency[], document?: string): string;
}

export class ConfigurationTransformer implements IConfigurationTransformer {
  applyTransform(dependencies: Dependency[], document?: jsdom.JSDOM | string): string {
    if (!Array.isArray(dependencies)) throw new Error('dependencies must be an array');
    if (!dependencies) {
      return !document
        ? new JSDOM().serialize()
        : document instanceof jsdom.JSDOM
          ? document.serialize()
          : new JSDOM(document).serialize();
    }

    const doc = document
      ? document instanceof jsdom.JSDOM
        ? document
        : new JSDOM(minify(document, { collapseWhitespace: true }))
      : new JSDOM('<!DOCTYPE html><html lang="en"></html>');

    const existingElements = Array.from(new Set(Array.from(doc.window.document.querySelectorAll('script, link, meta, base')).map(a => hash(a.outerHTML))));

    const elements = dependencies.filter(dep =>
      typeof (dep.shouldExecute) === 'function'
        ? dep.shouldExecute(dep)
        : true
    ).map(dep => {
      const el = doc.window.document.createElement(dep.element) as HTMLElement;

      if (dep.content) el.innerHTML = dep.content;

      Object.keys(dep.attributes || {}).forEach(key => el.setAttribute(key, (dep.attributes as any)[key]))

      return {
        ...dep,
        el
      };
    }).filter(a => !existingElements.some(b => b === hash(a.el.outerHTML)))

    const headElements = elements.filter(a => a.inHead).sort((a, b) => (a.order as number) - (b.order as number)).map(a => a.el);
    const bodyElements = elements.filter(a => !a.inHead).sort((a, b) => (a.order as number) - (b.order as number)).map(a => a.el);

    headElements.forEach(el => doc.window.document.head.appendChild(el));
    bodyElements.forEach(el => doc.window.document.body.appendChild(el));

    const resultingHtml = doc.serialize();

    return resultingHtml;
  }
}