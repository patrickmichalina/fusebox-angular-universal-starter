import { Sparky } from 'fuse-box'
import { SparkyFile } from 'fuse-box/src/sparky/SparkyFile'
import { minify } from 'html-minifier'
import { BUILD_CONFIG, taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), () => {
  new Promise((resolve, reject) => {
    if (!BUILD_CONFIG.minifyIndex) resolve()

    return Sparky.src('./dist/index.html').file('index.html', (file: SparkyFile) => {
      file.read()
      file.setContent(minify(file.contents.toString(), {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true
      }))
      file.save()
      resolve()
    })
  })
})
