import './polyfills'

import { platformBrowser } from '@angular/platform-browser'
import { AppBrowserModuleNgFactory } from './.aot/src/client/app/app.browser.module.ngfactory'

platformBrowser().bootstrapModuleFactory(AppBrowserModuleNgFactory)
