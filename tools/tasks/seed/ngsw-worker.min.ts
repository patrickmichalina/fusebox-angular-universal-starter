import { Sparky } from 'fuse-box';
import { SparkyFile } from 'fuse-box/src/sparky/SparkyFile';
import { taskName } from '../../config/build.config';
const UglifyJS = require("uglify-es");

Sparky.task(taskName(__filename), () => {
  return Sparky.src(['./dist/ngsw-worker.js']).file('ngsw-worker.js', (file: SparkyFile) => {
    file.read()
    const result = UglifyJS.minify(file.contents.toString())
    file.setContent(result.code);
    file.save();
  })
})

