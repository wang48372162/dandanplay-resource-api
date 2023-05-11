import express from 'express'
import c from 'picocolors'
import { axiosConfig } from './config'
import ProviderFactory from './provider-factory'
import { print, parseAxiosProxy } from './utils'

const app: express.Application = express()

export interface ApiOptions {
  provider: string
  port: number
  debug: boolean
  proxy?: string
  proxyUsername?: string
  proxyPassword?: string
  proxyHttps: boolean
}

export function api(options: ApiOptions) {
  const {
    provider,
    port,
    debug,
    proxy,
    proxyUsername,
    proxyPassword,
    proxyHttps,
  } = options

  const Provider = ProviderFactory.make(provider)

  Provider.setAxiosConfig(axiosConfig)
  Provider.setDebug(debug)
  Provider.setProxy(parseAxiosProxy(
    proxy, proxyUsername, proxyPassword, proxyHttps
  ))

  app.get('/', (req, res) => {
    print(req.path, 'Hello World')

    res.json({ Hello: 'World' })
  })

  app.get('/subgroup', async (req, res) => {
    const Subgroups = await Provider.getSubgroups()

    print(req.path, debug ? Subgroups : undefined)

    res.json({ Subgroups })
  })

  app.get('/type', async (req, res) => {
    const Types = await Provider.getTypes()

    print(req.path, debug ? Types : undefined)

    res.json({ Types })
  })

  app.get('/list', async (req, res) => {
    if (typeof req.query.keyword !== 'string') {
      res.sendStatus(404)
      return
    }

    const query = {
      keyword: req.query.keyword,
      subgroup: req.query.subgroup as string | undefined,
      type: req.query.type as string | undefined,
      r: req.query.r as string | undefined,
    }

    const provider = Provider.withList(query)

    const HasMore = await provider.getHasMore()
    const Resources = await provider.getResources()

    const queryString = Object
      .entries(query)
      .reduce((str, [key, value]) =>
        `${str}${str ? '&' : ''}${value ? `${key}=${decodeURIComponent(value)}` : ''}`
      , '')
    const url = `${req.path}?${queryString}`
    print(
      url,
      `HasMore: ${HasMore}`,
      debug ? Resources : undefined,
    )

    res.json({ HasMore, Resources })
  })

  app.listen(port, () => {
    console.log(`${c.blue('DanDanPlay Resource API')} listening at ${c.cyan(`http://localhost:${port}`)}`)
  })
}
