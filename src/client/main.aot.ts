import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import './operators'

import { platformBrowser } from '@angular/platform-browser'
import { AppBrowserModuleNgFactory } from './.aot/src/client/app/app.browser.module.ngfactory'

platformBrowser().bootstrapModuleFactory(AppBrowserModuleNgFactory)
