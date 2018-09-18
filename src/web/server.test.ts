import {noop} from 'lodash'
import {Server} from './api'
import {createServer} from './server'
import {ValidationError} from '../core/ValidationError'

let server: Server

beforeEach(() => {
  server = createServer()
})

afterEach(() => {
  // FIXME fastify typings are declaring callback as mandatory
  server.close(noop)
})

describe('error handling', () => {
  test('server error request', async () => {
    const url = '/server-error'
    const errorMessage = 'a server error'

    server.get(url, async () => {
      throw new Error(errorMessage)
    })

    const response = await server.inject({
      method: 'GET',
      url: url,
    })

    expect(response.statusCode).toBe(500)
    expect(response.payload).toEqual(errorMessage)
  })

  test('validation error', async () => {
    const url = '/validation-error'
    const errorMessages = ['a validation error', 'another validation error']

    server.get(url, async () => {
      throw new ValidationError(errorMessages)
    })

    const response = await server.inject({
      method: 'GET',
      url: url,
    })

    expect(response.statusCode).toBe(422)
    expect(JSON.parse(response.payload)).toEqual(errorMessages)
  })

})
