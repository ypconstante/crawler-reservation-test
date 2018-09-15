import {Server} from '../api'

export function registerSearch(server: Server) {
  server.get('/buscar', async () => {
    return {url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
  })
}
