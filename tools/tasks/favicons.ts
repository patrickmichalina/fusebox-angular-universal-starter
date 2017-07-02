import { Sparky } from 'fuse-box';
import { writeFile, readFile } from 'fs';
import { sync as mkdirp } from 'mkdirp';
import { config } from '../config';
const favicons = require('favicons');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

Sparky.task("favicons", () => {
  return new Promise((resolve, reject) => {
    favicons(config.server.faviconSource, {
      path: '/assets/favicons',
      appDescription: config.description
    }, (error: any, response: any) => {
      if (error) {
        console.log(error.status);
        console.log(error.name);
        console.log(error.message);
        return;
      }

      const htmlHeadBlock = (<string[]>response.html).reduce((prev, curr) => {
        return `${prev}\n${curr}`;
      });

      mkdirp(`./${config.outputDir}/assets/favicons`);

      var imagePromises = (<{ name: string, contents: Buffer }[]>response.images).map(image =>
        new Promise((resolve, reject) => {
          return writeFile(`./${config.outputDir}/assets/favicons/${image.name}`, image.contents, (err: any) => {
            if (err) reject(err);
            return resolve(image.contents);
          })
        }));
      var filePromises = (<{ name: string, contents: string }[]>response.files).map(file =>
        new Promise((resolve, reject) => {
          writeFile(`./dist/${file.name}`, file.contents, (err: any) => {
            if (err) reject(err);
            return resolve(file.contents);
          })
        }));

      return Promise.all<any>([...imagePromises, ...filePromises]).then(() => {
        const filePath = `./${config.outputDir}/index.html`;
        readFile(filePath, 'utf-8', (err, data) => {
          if (err) return reject(err);
          const dom = new JSDOM(data);
          (<HTMLHeadElement>dom.window.document.head).innerHTML = dom.window.document.head.innerHTML + '\n' + htmlHeadBlock;
          writeFile(filePath, dom.serialize(), 'utf-8', (err) => {
            if (err) return reject(err);
            return resolve();
          })
        });
      });
    });
  });
});




