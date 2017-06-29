import { Sparky } from 'fuse-box';
import { insertBodyScripts } from '../scripts/insert-stylesheet';
import { sync as glob } from 'glob';

Sparky.task("js.files", () => {
  const js = glob('./dist/js/**/*.js').map((a: string) => a.replace('./dist', ''));

  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();
    file.setContent(insertBodyScripts(file.contents, js));
    file.save();
  });
});
