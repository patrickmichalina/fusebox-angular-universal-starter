import { Sparky } from 'fuse-box'
import { readFile, writeFile } from 'fs'
import { sync as mkdirp } from 'mkdirp'
import { BUILD_CONFIG, ENV_CONFIG_INSTANCE, taskName } from '../../config/build.config'

// tslint:disable:no-require-imports
const favicons = require('favicons') // https://www.npmjs.com/package/favicons
const jsdom = require('jsdom')
const { JSDOM } = jsdom

Sparky.task(taskName(__filename), () => {
  return new Promise((resolve, reject) => {
    const config = JSON.parse(ENV_CONFIG_INSTANCE.angularAppConfig)
    favicons(BUILD_CONFIG.faviconSource, {
      path: '/assets/favicons',
      appDescription: config.description,
      appName: config.name,
      background: '#1976d2',
      theme_color: '#1976d2',
      start_url: '',
      short_name: 'Angular Universal',
      lang: 'en'
    }, (error: any, response: any) => {
      if (error) {
        // tslint:disable:no-console
        console.log(error.status)
        console.log(error.name)
        console.log(error.message)
        return
      }

      const htmlHeadBlock = (response.html as Array<string>).reduce((prev, curr) => {
        return `${prev}\n${curr}`
      })

      mkdirp(`./${BUILD_CONFIG.outputDir}/assets/favicons`)

      const imagePromises = (response.images as Array<{ name: string, contents: Buffer }>).map(image =>
        new Promise((resolve1, reject1) => {
          return writeFile(`./${BUILD_CONFIG.outputDir}/assets/favicons/${image.name}`, image.contents, (err: any) => {
            if (err) reject1(err)

            return resolve1(image.contents)
          })
        }))

      const filePromises = (response.files as Array<{ name: string, contents: string }>).map(file =>
        new Promise((resolve2, reject2) => {
          writeFile(`./${BUILD_CONFIG.outputDir}/assets/favicons/${file.name}`, file.contents, (err: any) => {
            if (err) reject2(err)

            return resolve2(file.contents)
          })
        }))

      return Promise.all<any>([...imagePromises, ...filePromises]).then(() => {
        const filePath = `./${BUILD_CONFIG.outputDir}/index.html`
        readFile(filePath, 'utf-8', (err, data) => {
          if (err) return reject(err)
          const dom = new JSDOM(data);
          (dom.window.document.head as HTMLHeadElement).innerHTML = `${dom.window.document.head.innerHTML}\n${htmlHeadBlock}`
          writeFile(filePath, dom.serialize(), { encoding: 'utf-8' }, writeErr => {
            if (writeErr) return reject(writeErr)

            return resolve()
          })
        })
      })
    })
  })
})
