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

export const insertBodyScripts = function (file: any, hrefs: string[]) {
  const dom = new JSDOM(file);

  const _hrefs = Array.isArray(hrefs)
    ? hrefs
    : [hrefs];

  _hrefs.map(href => {
    let link = dom.window.document.createElement('script')
    link.setAttribute('type', 'text/javascript');
    link.setAttribute('src', href);
    return link;
  }).forEach(element => dom.window.document.body.appendChild(element));

  return dom.serialize();
};

export const insertTitle = function (file: any, title: string) {
  const dom = new JSDOM(file);

  const titleElement = dom.window.document.createElement('title') as HTMLElement;
  titleElement.textContent = title;
  dom.window.document.head.appendChild(titleElement);

  return dom.serialize();
};

export const insertFavicon = function (file: any, href: string) {
  const dom = new JSDOM(file);

  const elm = dom.window.document.createElement('link') as HTMLLinkElement;
  elm.setAttribute('rel', 'icon');
  elm.setAttribute('type', 'image/ico');
  elm.href = href;
  dom.window.document.head.appendChild(elm);

  return dom.serialize();
};

export const insertBase = function (file: any, href: string) {
  const dom = new JSDOM(file);

  const elm = dom.window.document.createElement('base') as HTMLBaseElement;
  elm.href = href;
  dom.window.document.head.appendChild(elm);

  return dom.serialize();
};

export const insertGoogleAnalytics = function (file: any, trackingId: string, verificationCode: string) {
  const dom = new JSDOM(file);

  const metaElement = dom.window.document.createElement('meta') as HTMLMetaElement;
  metaElement.setAttribute('name', 'google-site-verification');
  metaElement.setAttribute('content', verificationCode);

  const script1Element = dom.window.document.createElement('script') as HTMLScriptElement;
  script1Element.textContent =
    `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga('create', '${trackingId}', 'auto');`;

  const script2Element = dom.window.document.createElement('script') as HTMLScriptElement;
  script2Element.setAttribute('async', '');
  script2Element.setAttribute('src', 'https://www.google-analytics.com/analytics.js');

  dom.window.document.head.appendChild(metaElement);
  dom.window.document.body.appendChild(script1Element);
  dom.window.document.body.appendChild(script2Element);

  return dom.serialize();
};
