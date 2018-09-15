import pino, {Logger} from 'pino'

export const log: Logger = pino({
  base: null,
  prettyPrint: true,
})
