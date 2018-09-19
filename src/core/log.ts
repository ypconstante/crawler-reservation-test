import pino, {Logger} from 'pino'

const pretty = pino.pretty()
startLogger()

export const log: Logger = pino(
  {
    base: null,
  },
  pretty,
)

export function startLogger() {
  pretty.pipe(process.stdout)
}

export function closeLogger() {
  pretty.unpipe(process.stdout)
}

