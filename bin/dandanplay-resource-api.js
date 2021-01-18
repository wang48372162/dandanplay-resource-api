#! /usr/bin/env node

const { api, config } = require('../src/index.js')

const argv = require('yargs/yargs')(process.argv.slice(2))
  .option('port', {
    alias: 'p',
    default: config.port,
    describe: 'set the server listening port number',
    type: 'number'
  })
  .help()
  .alias('h', 'help')
  .argv

api(argv.port)
