import yargs from 'yargs'
import { api } from './Api'
import { provider, port } from './Config'

export function run(processArgv: string[]) {
  const argv = yargs(processArgv.slice(2))
    .option('provider', {
      alias: 'r',
      default: provider,
      describe: 'set provider',
      type: 'string'
    })
    .option('port', {
      alias: 'p',
      default: port,
      describe: 'set the server listening port number',
      type: 'number'
    })
    .option('proxy', {
      alias: 'x',
      describe: 'set proxy host, ex: "localhost:8585"',
      type: 'string'
    })
    .option('proxyUsername', {
      describe: 'set proxy authencation username',
      type: 'string'
    })
    .option('proxyPassword', {
      describe: 'set proxy authencation password',
      type: 'string'
    })
    .option('proxyHttps', {
      default: false,
      describe: 'set proxy prototal is HTTPS',
      type: 'boolean'
    })
    .help()
    .alias('h', 'help')
    .argv

  api({
    provider: argv.provider,
    port: argv.port,
    proxy: argv.proxy,
    proxyUsername: argv.proxyUsername,
    proxyPassword: argv.proxyPassword,
    proxyHttps: argv.proxyHttps
  })
}
