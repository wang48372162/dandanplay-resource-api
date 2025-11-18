import { cac } from 'cac'
import { api } from './api'
import { provider, port } from './config'
import { version } from '../package.json'

const cli = cac('dandanplay-resource-api')

cli
  .command('')
  .option('--provider <provider>', 'Resource provider to use for fetching content', { default: provider })
  .option('-p, --port <port>', 'Port number for the server to listen on', { default: port })
  .option('--debug', 'Enable debug logging for troubleshooting', { default: false })
  .option('--proxy <proxy>', 'Proxy server address (format: host:port)')
  .option('--proxy-username <proxyUsername>', 'Username for proxy authentication')
  .option('--proxy-password <proxyPassword>', 'Password for proxy authentication')
  .option('--proxy-https', 'Use HTTPS protocol for proxy connection', { default: false })
  .action(options => {
    api(options)
  })

cli.help()
cli.version(version)
cli.parse()
