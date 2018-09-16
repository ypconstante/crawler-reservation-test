import fastify from 'fastify'
import {Server} from './api'
import {log} from '../core/log'

let timeoutId: NodeJS.Timer = null
let server: Server = null

export async function startServer() {
  server = fastify({
    logger: log,
  })

  require('./rest/search').register(server)

  try {
    const port = 3000
    await server.listen(port)
    return server
  } catch (err) {
    log.error(err)
    process.exit(1)
    throw err
  }
}

export function resetServer() {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(doResetServer, 50)

  function doResetServer(): void {
    if (server == null) {
      startServer()
    } else {
      log.info('Reseting server')
      server.close(
        () => {
          clearAppCache()
          startServer()
        },
      )
    }
  }

  function clearAppCache() {
    Object.keys(require.cache)
      .filter(shouldBeClearedFromCache)
      .forEach((path) => delete require.cache[path])
  }

  function shouldBeClearedFromCache(path: string) {
    return !isLogFile(path) && isAppFile(path)
  }

  function isLogFile(path: string) {
    return /[\/\\]core[\/\\]log.js$/.test(path)
  }

  function isAppFile(path: string) {
    return !/node_modules/.test(path)
  }
}
