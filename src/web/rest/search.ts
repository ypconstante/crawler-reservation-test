import {Server} from '../api'
import {extractOmnibeesReservationData} from '../../core/crawler/impl/OmnibeesReservationCrawler'
import {Filter} from '../../core/crawler/filter'

export function register(server: Server) {
  server.get('/buscar', async (request) => {
    return await extractOmnibeesReservationData(request.query as Filter)
  })
}
