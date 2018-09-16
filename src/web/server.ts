import fastify from 'fastify'
import {Server} from './api'
import {closeLogger, log} from '../core/log'
import 'source-map-support/register'

let server: Server = null

export async function startServer() {
  server = createServer()

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

export function createServer() {
  const server = fastify({
    logger: log,
  })

  require('./rest/search').register(server)

  return server
}

export function stopServer() {
  closeLogger()
  return new Promise(resolve => {
    server.close(
      () => resolve(),
    )
  })
}

