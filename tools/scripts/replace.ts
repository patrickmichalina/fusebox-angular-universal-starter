const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export const replace = function (file: any, key: string, replace: string) {
  const dom = new JSDOM(file);

  dom.window.document.querySelectorAll('[data-build-replace]').forEach((thing: any) => {
    const split = thing.getAttribute('data-build-replace').split(':');
    if (key === split[0]) {
      thing[split[1]] = replace;
      thing.removeAttribute('data-build-replace')
    }
  });

  return dom.serialize();
}

export const replaceByQuery = function (file: any, query: string, key: string, replace: string) {
  const dom = new JSDOM(file);

  dom.window.document.querySelectorAll(query).forEach((thing: any) => {
    thing[key] = replace;
  });

  return dom.serialize();
}

export const prefixByQuery = function (file: any, query: string, key: string, prefix: string) {
  const dom = new JSDOM(file);

  dom.window.document.querySelectorAll(query).forEach((thing: any) => {
    if (!(thing[key] as string).includes('https') || !(thing[key] as string).includes('http')) {
      thing[key] = `${prefix}${thing[key]}`;
    }
  });

  return dom.serialize();
}

