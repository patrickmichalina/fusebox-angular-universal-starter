import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import './operators'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { AppBrowserModule } from './app/app.browser.module'

enableProdMode()

platformBrowserDynamic().bootstrapModule(AppBrowserModule)
  .then(() => {
    registerServiceWorker('ngsw-worker')
  })

function registerServiceWorker(swName: string) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(`/${swName}.js`)
      .then(reg => {
        console.log('[App] Successful service worker registration', reg)
      })
      .catch(err =>
        console.error('[App] Service worker registration failed', err)
      )
  } else {
    console.error('[App] Service Worker API is not supported in current browser')
  }
}
