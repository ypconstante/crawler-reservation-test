import {Configuration, DefinePlugin} from 'webpack'
import path from 'path'
import {watchMode} from './scripts/build-arguments'

const cwd = __dirname
const dist = path.join(cwd, 'out', 'dist')

const config: Configuration = {
  entry: './src/index.ts',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  target: 'node',
  devtool: 'inline-source-map',
  output: {
    filename: 'index.js',
    path: dist,
    publicPath: '/',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      env: {
        watchMode: watchMode,
      },
    }),
  ],
}

export default config
