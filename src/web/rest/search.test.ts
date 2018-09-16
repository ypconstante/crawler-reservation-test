import {noop} from 'lodash'
import {Server} from '../api'
import {createServer} from '../server'

let server: Server

beforeEach(() => {
  server = createServer()
})

afterEach(() => {
  // FIXME fastify typings are declaring callback as mandatory
  server.close(noop)
})

test('GET /buscar', async () => {
  const response = await server.inject({
    method: 'GET',
    url: '/buscar',
  })

  expect(response.statusCode).toBe(200)
  expect(response.payload).toMatchSnapshot()
})
