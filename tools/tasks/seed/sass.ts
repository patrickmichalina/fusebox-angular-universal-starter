// tslint:disable:no-require-imports
import { Sparky } from 'fuse-box'
import { isBuildServer, isProdBuild, taskName } from '../../config/build.config'
import { renderSync } from 'node-sass'
import { unlinkSync, writeFileSync, readFileSync } from 'fs'
import { sync as mkdirp } from 'mkdirp'
import { sync as glob } from 'glob'
import { ConfigurationTransformer } from '../../plugins/web-index'
import * as cleanCss from 'clean-css'
import hash = require('string-hash')

Sparky.task(taskName(__filename), () => {
  let src
  mkdirp('./dist/css')

  const sass = () => {
    const result = renderSync({
      file: './src/client/styles/main.scss',
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
    
    const indexPath = './dist/index.html'
    const index = readFileSync(indexPath)
    const transformer = new ConfigurationTransformer();
    const html = transformer.applyTransform([{
      inHead: true,
      order: 1,
      element: 'style',
      content: new cleanCss({}).minify(_sass.css.toString()).styles,
      attributes: {
        id: 'primary-styles'
      }
    }], index.toString());
    writeFileSync(indexPath, html);
  }

  src = isProdBuild || isBuildServer
    ? Sparky.src('src/client/styles/**/**/*.scss').file('main.scss', process)
    : Sparky.watch('src/client/styles/**/**/*.scss').file('main.scss', process)

  return src
})
