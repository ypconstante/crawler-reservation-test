import chokidar from 'chokidar'
import {log} from '../../core/log'
import {Server} from '../api'

let timeoutId: NodeJS.Timer = null
let serverPromise: Promise<Server> = null

export function startServerWithReload() {
  const watcher = chokidar.watch('./out/dist')

  watcher.on('ready', () => {
    log.info('Starting server with reload')

    serverPromise = startServer()

    watcher.on('all', scheduleResetServer)
  })
}

function startServer(): Promise<Server> {
  return require('./startServer').startServer()
}


function scheduleResetServer() {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(resetServer, 50)

  function resetServer(): void {
    log.info('Reseting server')
    serverPromise.then(
      server => server.close(
        () => {
          clearAppCache()
          serverPromise = startServer()
        },
      ),
    )
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
    return /[\/\\]out[\/\\]dist[\/\\]/.test(path)
  }

}
