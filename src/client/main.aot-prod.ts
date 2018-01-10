import './polyfills'

import { enableProdMode } from '@angular/core'
import { platformBrowser } from '@angular/platform-browser'
import { AppBrowserModuleNgFactory } from './.aot/src/client/app/app.browser.module.ngfactory'

enableProdMode()

platformBrowser().bootstrapModuleFactory(AppBrowserModuleNgFactory)
