import './polyfills'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { AppBrowserModule } from './app/app.browser.module'

enableProdMode()

platformBrowserDynamic().bootstrapModule(AppBrowserModule)
