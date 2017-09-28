import { Server } from 'http'
import { Server as wsServer } from 'ws'

export const useWebSockets = (server: Server): wsServer => {
  const wss = new wsServer({ server })

  // function heartbeat() {
  //   // tslint:disable:no-invalid-this
  //   console.log(heartbeat, this.isAlive)
  //   this.isAlive = true
  //   console.log(heartbeat, this.isAlive)
  // }

  wss.on('connection', (ws, req) => {
    // ws.isAlive = true
    // ws.on('pong', heartbeat)
    ws.on('message', message => {
      if (message && typeof message === 'string') {
        try {
          ws.send(JSON.stringify({ ...JSON.parse(message), server: 'Relayed from' }))
        } catch (err) {
          ws.send('an error occurred in the ws channel')
        }
      }
    })
  })

  // setInterval(() => {
  //   wss.clients.forEach(ws => {
  //     // if (ws.isAlive === false) return ws.terminate()
  //     ws.isAlive = false
  //     ws.ping('', false, true)
  //   })
  // }, 1000)
  return wss
}
