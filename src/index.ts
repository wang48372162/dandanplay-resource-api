import yargs from 'yargs'
import { api } from './api'
import { provider, port } from './config'

export async function run(processArgv: string[]) {
  const argv = await yargs(processArgv.slice(2))
    .option('provider', {
      alias: 'r',
      default: provider,
      describe: 'set provider',
      type: 'string',
    })
    .option('port', {
      alias: 'p',
      default: port,
      describe: 'set the server listening port number',
      type: 'number',
    })
    .option('debug', {
      alias: 'd',
      default: false,
      describe: 'print debug logs',
      type: 'boolean',
    })
    .option('proxy', {
      alias: 'x',
      describe: 'set proxy host, ex: "localhost:8585"',
      type: 'string',
    })
    .option('proxyUsername', {
      describe: 'set proxy authencation username',
      type: 'string',
    })
    .option('proxyPassword', {
      describe: 'set proxy authencation password',
      type: 'string',
    })
    .option('proxyHttps', {
      default: false,
      describe: 'set proxy prototal is HTTPS',
      type: 'boolean',
    })
    .help()
    .alias('v', 'version')
    .alias('h', 'help')
    .argv

  api({
    provider: argv.provider,
    port: argv.port,
    debug: argv.debug,
    proxy: argv.proxy,
    proxyUsername: argv.proxyUsername,
    proxyPassword: argv.proxyPassword,
    proxyHttps: argv.proxyHttps,
  })
}
