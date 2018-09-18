import webpack, {Compiler, ProgressPlugin, Stats} from 'webpack'
import config from '../webpack.config'
import {watchMode} from './build-arguments'
import 'source-map-support/register'

const compiler = createCompiler()

if (watchMode) {
  compiler.watch({}, compilerCallback)

  compiler.hooks.done.tap(
    'WebpackInfo',
    createServerHandler(),
  )
} else {
  compiler.run(compilerCallback)
}

function createCompiler(): Compiler {
  const compiler = webpack(config)

  new ProgressPlugin().apply(compiler)

  return compiler
}

function compilerCallback(err: Error, stats: Stats) {
  if (!config.watch || err) {
    // Do not keep cache anymore
    if (compiler.inputFileSystem && compiler.inputFileSystem.purge) {
      compiler.inputFileSystem.purge()
    }
  }
  if (err) {
    console.error(err)
    process.exit(1)
  }

  if (!config.watch && stats.hasErrors()) {
    process.exitCode = 2
  }
}

function createServerHandler() {
  let resetPending = false
  let serverStopProvider = defaultGetServerStopper()

  return serverHandler

  function serverHandler() {
    if (resetPending) {
      return
    }
    resetPending = true
    serverStopProvider = new Promise((resolve, reject) => {
      stopServer()
        .then(() => {
          resetPending = false
          clearCache()
          const server = require('../out/dist')
          server.startServer()
          resolve(server.stopServer)
        })
        .catch(reject)
    })
  }

  function stopServer() {
    return serverStopProvider.then(stopServer => stopServer())
  }

  function defaultGetServerStopper() {
    return Promise.resolve(() => {
      return
    })
  }

  function clearCache() {
    Object.keys(require.cache)
      .filter(path => /[\/\\]out[\/\\]dist[\/\\]/.test(path))
      .forEach(path => delete require.cache[path])
  }
}
