import {startServer} from './web/server'

if (!env.watchMode) {
  startServer()
}

export {startServer, stopServer} from './web/server'
