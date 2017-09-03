import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import './operators'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppBrowserModule } from './app/app.browser.module'

platformBrowserDynamic().bootstrapModule(AppBrowserModule)
