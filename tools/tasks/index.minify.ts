import { Sparky } from 'fuse-box';
import { minify } from 'html-minifier';
import { BuildConfig } from '../config/build.config';

Sparky.task("index.minify", () => {
  if (!BuildConfig.minifyIndex) return;
  return Sparky.src("./dist/index.html").file("index.html", (file: any) => {
    file.read();
    file.setContent(minify(file.contents.toString('utf8'), {
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true
    }));
    file.save();
  });
});
