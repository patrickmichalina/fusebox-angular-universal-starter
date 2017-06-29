import { sync as glob } from 'glob';
import { Sparky } from 'fuse-box';
import { insertExternalStylesheet } from '../scripts/insert-stylesheet';

Sparky.task("sass.files", () => {
  const css = glob('./dist/css/**/*.css').map((a: string) => a.replace('./dist', ''));
  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();
    file.setContent(insertExternalStylesheet(file.contents, css));
    file.save();
  });
});
