import { writeFileSync } from 'fs'
import { resolve } from 'path'

export const genKeystore = (path: string) => {
  // tslint:disable-next-line:no-require-imports
  const { createKeyStore } = require('oidc-provider')
  const keystore = createKeyStore()

  Promise.all([
    keystore.generate('RSA', 2048),
    keystore.generate('EC', 'P-256'),
    keystore.generate('EC', 'P-384'),
    keystore.generate('EC', 'P-521')
  ]).then(() => {
    writeFileSync(resolve(path), JSON.stringify(keystore.toJSON(true), undefined, 2))
  })
}
