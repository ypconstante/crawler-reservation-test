import {startServer} from './web/server/startServer'
import {startServerWithReload} from './web/server/startServerWithReload'

const watchMode = process.argv.indexOf('-w') >= 0

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

if (watchMode) {
  startServerWithReload()
} else {
  startServer()
}
