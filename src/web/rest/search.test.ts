import {noop} from 'lodash'
import {Server} from '../api'
import {createServer} from '../server'
import {DateTime} from "luxon"
import {extractOmnibeesReservationData} from '../../core/crawler/impl/OmnibeesReservationCrawler'
import {ReservationData} from '../../core/crawler/ReservationData'

let server: Server

beforeEach(() => {
  server = createServer()
})

afterEach(() => {
  // FIXME fastify typings are declaring callback as mandatory
  server.close(noop)
})

test.skip('GET /buscar', async () => {
  const year = DateTime.local().year + 1

  const response = await server.inject({
    method: 'GET',
    url: `/buscar?dataCheckIn=${year}-06-01&dataCheckOut=${year}-06-02`,
  })

  expect(response.statusCode).toBe(200)

  const data: ReservationData[] = JSON.parse(response.payload)

  expect(data.length).toBeGreaterThan(0)

  data.forEach(item => {
    expect(item.nome).toBeDefined()
    expect(item.descricao).toBeDefined()
    expect(item.preco).toBeDefined()
    expect(item.imagens.length).toBeGreaterThan(0)

    item.imagens.forEach(imagem => expect(imagem).toBeDefined())
  })
}, 30000)

