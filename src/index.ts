import yargs from 'yargs'
import { api } from './Api'
import { port } from './Config'

export function run(processArgv: string[]) {
  const argv = yargs(processArgv.slice(2))
    .option('port', {
      alias: 'p',
      default: port,
      describe: 'set the server listening port number',
      type: 'number'
    })
    .help()
    .alias('h', 'help')
    .argv

  api(argv.port)
}
