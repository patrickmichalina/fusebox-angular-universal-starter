import { Sparky } from 'fuse-box';
import { readFile, writeFile } from 'fs';
import { sync as mkdirp } from 'mkdirp';
import { BUILD_CONFIG } from '../config/build.config';
import { ENV_CONFIG_INSTANCE } from '../tasks/_global';

const favicons = require('favicons');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

Sparky.task('favicons', () => {
  return new Promise((resolve, reject) => {
    favicons(BUILD_CONFIG.faviconSource, {
      path: '/assets/favicons',
      appDescription: ENV_CONFIG_INSTANCE.description,
      appName: ENV_CONFIG_INSTANCE.name
    }, (error: any, response: any) => {
      if (error) {
        // tslint:disable:no-console
        console.log(error.status);
        console.log(error.name);
        console.log(error.message);

        return;
      }

      const htmlHeadBlock = (response.html as Array<string>).reduce((prev, curr) => {
        return `${prev}\n${curr}`;
      });

      mkdirp(`./${BUILD_CONFIG.outputDir}/assets/favicons`);

      const imagePromises = (response.images as Array<{ name: string, contents: Buffer }>).map(image =>
        new Promise((resolve, reject) => {
          return writeFile(`./${BUILD_CONFIG.outputDir}/assets/favicons/${image.name}`, image.contents, (err: any) => {
            if (err) reject(err);

            return resolve(image.contents);
          });
        }));

      const filePromises = (response.files as Array<{ name: string, contents: string }>).map(file =>
        new Promise((resolve, reject) => {
          writeFile(`./dist/${file.name}`, file.contents, (err: any) => {
            if (err) reject(err);

            return resolve(file.contents);
          });
        }));

      return Promise.all<any>([...imagePromises, ...filePromises]).then(() => {
        const filePath = `./${BUILD_CONFIG.outputDir}/index.html`;
        readFile(filePath, 'utf-8', (err, data) => {
          if (err) return reject(err);
          const dom = new JSDOM(data);
          (dom.window.document.head as HTMLHeadElement).innerHTML = `${dom.window.document.head.innerHTML}\n${htmlHeadBlock}`;
          writeFile(filePath, dom.serialize(), { encoding: 'utf-8' }, writeErr => {
            if (writeErr) return reject(writeErr);

            return resolve();
          });
        });
      });
    });
  });
});
