import fastify from 'fastify'
import {Server as HttpServer, IncomingMessage, ServerResponse} from 'http'

export type Server = fastify.FastifyInstance<HttpServer, IncomingMessage, ServerResponse>
