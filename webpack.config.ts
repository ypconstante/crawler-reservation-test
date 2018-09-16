import {Configuration} from 'webpack'
import path from 'path'

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
    publicPath: '/'
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
  plugins: [],
}

export default config
