import fastify from 'fastify'
import {Server} from '../api'
import {registerSearch} from '../rest/search'
import {log} from '../../core/log'

export async function startServer() {
  const server: Server = fastify({
    logger: log,
  })

  registerSearch(server)

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
