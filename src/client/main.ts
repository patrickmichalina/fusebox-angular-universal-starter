import './polyfills'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppBrowserModule } from './app/app.browser.module'

platformBrowserDynamic().bootstrapModule(AppBrowserModule)
