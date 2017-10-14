import { Sparky } from 'fuse-box'
import { isBuildServer, isProdBuild, taskName } from '../../config/build.config'
import { renderSync } from 'node-sass'
import { unlinkSync, writeFileSync } from 'fs'
import { sync as mkdirp } from 'mkdirp'
import { sync as glob } from 'glob'
// tslint:disable-next-line:no-require-imports
import hash = require('string-hash')
// import { ConfigurationTransformer } from '../../plugins/web-index';

Sparky.task(taskName(__filename), () => {
  let src
  mkdirp('./dist/css')

  const sass = () => {
    const result = renderSync({
      file: './src/client/styles/main.scss',
      outputStyle: 'compressed'
    })
    const hashed = hash(result.css.toString())

    return {
      css: result.css,
      hashed
    }
  }

  const process = () => {
    const _sass = sass()
    const name = 'main.css'

    glob('./dist/css/main-*').forEach(file => unlinkSync(file))
    writeFileSync(`./dist/css/${name}`, _sass.css)

    // const indexPath = './dist/index.html'
    // const index = readFileSync(indexPath)
    // const transformer = new ConfigurationTransformer();
    // const html = transformer.applyTransform([{
    //   inHead: true,
    //   order: 1,
    //   element: 'link',
    //   attributes: {
    //     id: 'primary-styles',
    //     rel: 'stylesheet',
    //     href: `/css/${name}`
    //   }
    // }], index.toString());
    // writeFileSync(indexPath, html);
  }

  src = isProdBuild || isBuildServer
    ? Sparky.src('src/client/styles/**/**/*.scss').file('main.scss', () => process())
    : Sparky.watch('src/client/styles/**/**/*.scss').file('main.scss', () => process())

  return src
})
