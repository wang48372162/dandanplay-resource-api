import express from 'express'
import { axiosConfig } from './Config'
import ProviderFactory from './ProviderFactory'
import { parseAxiosProxy } from './Utils'

const app: express.Application = express()

export async function api({
  provider,
  port,
  proxy,
  proxyUsername,
  proxyPassword,
  proxyHttps
}: {
  provider: string,
  port: number,
  proxy?: string,
  proxyUsername?: string,
  proxyPassword?: string,
  proxyHttps: boolean
}) {
  const Provider = await ProviderFactory.make(provider)

  Provider.setAxiosConfig(axiosConfig)
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
