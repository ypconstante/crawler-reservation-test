import webpack, {Compiler, ProgressPlugin, Stats} from 'webpack'
import config from '../webpack.config'
import {resetServer} from '../src/web/server'

const watchMode = process.argv.indexOf('-w') >= 0

const compiler = createCompiler()

if (watchMode) {
  compiler.watch({}, compilerCallback)

  compiler.hooks.done.tap(
    'WebpackInfo',
    resetServer,
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
