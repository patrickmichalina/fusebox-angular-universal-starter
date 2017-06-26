const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export const insertExternalStylesheet = function (file: any, hrefs: string[]) {
  const dom = new JSDOM(file);

  const _hrefs = Array.isArray(hrefs)
    ? hrefs
    : [hrefs];

  _hrefs.map(href => {
    let link = dom.window.document.createElement('link')
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    return link;
  }).forEach(element => dom.window.document.head.appendChild(element));

  return dom.serialize();
};
