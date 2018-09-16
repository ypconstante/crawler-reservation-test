import fastify from 'fastify'
import {IncomingMessage, Server as HttpServer, ServerResponse} from 'http'

export type Server = fastify.FastifyInstance<HttpServer, IncomingMessage, ServerResponse>
