import express from 'express'
import { axiosConfig } from './config'
import ProviderFactory from './provider-factory'
import { parseAxiosProxy } from './utils'

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
    res.json({ Hello: 'World' })
  })

  app.get('/subgroup', async (req, res) => {
    res.json({
      Subgroups: await Provider.getSubgroups()
    })
  })

  app.get('/type', async (req, res) => {
    res.json({
      Types: await Provider.getTypes()
    })
  })

  app.get('/list', async (req, res) => {
    if (typeof req.query.keyword !== 'string') {
      res.sendStatus(404)
      return
    }

    const provider = Provider.withList({
      keyword: req.query.keyword,
      subgroup: req.query.subgroup as string | undefined,
      type: req.query.type as string | undefined,
      r: req.query.r as string | undefined
    })

    res.json({
      HasMore: await provider.getHasMore(),
      Resources: await provider.getResources()
    })
  })

  app.listen(port, () => {
    console.log(`DanDanPlay Resource API listening at http://localhost:${port}`)
  })
}
