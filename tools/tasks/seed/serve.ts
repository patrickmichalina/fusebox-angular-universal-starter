import { Sparky } from 'fuse-box'
import { taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), [
  'clean',
  'mk-dist',
  'index.copy',
  'favicons',
  'fonts',
  'changelog',
  'web',
  'assets',
  'sass',
  'build.universal',
  'ngsw',
  'banner'
], () => undefined)
