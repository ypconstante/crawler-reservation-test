import fastify, {FastifyReply, FastifyRequest} from 'fastify'
import {Server} from './api'
import {closeLogger, log} from '../core/log'
import 'source-map-support/register'
import {IncomingMessage, ServerResponse} from 'http'
import {ValidationError} from '../core/ValidationError'

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
  server.setErrorHandler(errorHandler)

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

function errorHandler(error: Error, request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
  if (error instanceof ValidationError) {
    debugger
    reply
      .code(422)
      .send(error.errors)
  } else {
    reply
      .code(500)
      .send(error.message)
  }
}
