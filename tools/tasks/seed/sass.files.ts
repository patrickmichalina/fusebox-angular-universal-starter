import { sync as glob } from 'glob'
import { Sparky } from 'fuse-box'
import { SparkyFile } from 'fuse-box/src/sparky/SparkyFile'
import { readFileSync } from 'fs'
import { taskName } from '../../config/build.config'
import { ConfigurationTransformer, Dependency } from '../../plugins/web-index'
// tslint:disable-next-line:no-require-imports
import hash = require('string-hash')

Sparky.task(taskName(__filename), () => {
  const css = glob('./dist/css/**/*.css').map(a => {
    return {
      hash: hash(readFileSync(a).toString()),
      name: a.replace('./dist', '')
    }
  })

  return Sparky.src('./dist/index.html').file('index.html', (file: SparkyFile) => {
    file.read()

    const transformer = new ConfigurationTransformer()
    const deps: Dependency[] = css.map(c => {
      return {
        inHead: true,
        order: 1,
        element: 'link',
        attributes: {
          rel: 'stylesheet',
          href: `${c.name}`
        }
      } as Dependency
    })

    const html = transformer.applyTransform(deps, file.contents.toString())
    file.setContent(html)
    file.save()
  })
})
