import hash = require("string-hash");
import { minify } from "html-minifier";
import { Dependency, IConfigurationTransformer, DependencyType, SourceType } from './build.interfaces';
import jsdom = require("jsdom");
const { JSDOM } = jsdom;

export class ConfigurationTransformer implements IConfigurationTransformer {
  apply(dependencies: Dependency[], document?: jsdom.JSDOM | string): jsdom.JSDOM {
    if (!Array.isArray(dependencies)) throw new Error('dependencies must be an array');
    if (!dependencies) {
      return !document
        ? new JSDOM()
        : document instanceof jsdom.JSDOM
          ? document
          : new JSDOM(document);
    }

    const doc = document
      ? document instanceof jsdom.JSDOM
        ? document
        : new JSDOM(minify(document, { collapseWhitespace: true }))
      : new JSDOM();

    const existingElements = Array.from(new Set(Array.from(doc.window.document.querySelectorAll('script, link')).map(a => hash(a.outerHTML))));

    const elements = dependencies.filter(dep => {
      if (dep.shouldExecute && typeof (dep.shouldExecute) === 'function')
        return dep.shouldExecute(dep);
      return true;
    }).map(dep => {
      let el: HTMLElement;

      switch (dep.type) {
        case DependencyType.Script:
          if (!dep.source) throw new Error();
          el = doc.window.document.createElement('script');
          el.setAttribute('type', 'text/javascript');
          switch (dep.source.type) {
            case SourceType.Inline:
              el.textContent = dep.source.link;
              break;
            default:
              el.setAttribute('src', dep.source.link);
          }
          break;
        case DependencyType.Stylesheet:
          if (!dep.source) throw new Error();
          el = doc.window.document.createElement('link');
          el.setAttribute('rel', 'stylesheet');
          el.setAttribute('href', dep.source.link);
          break;
        case DependencyType.Meta:
          el = doc.window.document.createElement('meta');
          break;
        default:
          throw new Error('Unsupported type');
      }

      if (dep.id) el.setAttribute('id', dep.id);

      Object.keys(dep.attributes || {}).forEach(key => {
        el.setAttribute(key, dep.attributes[key]);
      });

      return {
        ...dep,
        el
      };
    }).filter(a => !existingElements.some(b => b === hash(a.el.outerHTML)));

    const headElements = elements.filter(a => a.preloaded).sort((a, b) => (<number>a.order) - (<number>b.order)).map(a => a.el);
    const bodyElements = elements.filter(a => !a.preloaded).sort((a, b) => (<number>a.order) - (<number>b.order)).map(a => a.el);

    headElements.forEach(el => doc.window.document.head.appendChild(el));
    bodyElements.forEach(el => doc.window.document.body.appendChild(el));

    return doc;
  }
}