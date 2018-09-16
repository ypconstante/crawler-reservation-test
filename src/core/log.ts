import pino, {Logger} from 'pino'

const pretty = pino.pretty()
pretty.pipe(process.stdout)

export const log: Logger = pino(
  {
    base: null,
  },
  pretty,
)

export function closeLogger() {
  pretty.unpipe(process.stdout)
}

