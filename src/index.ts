import express from 'express'
import { port } from './Config'
import ProviderFactory from './ProviderFactory'

const app: express.Application = express()

!(async function () {
  const Provider = await ProviderFactory.make()

  app.get('/', (req, res) => {
    res.json({ Hello: 'World' })
  })

  app.get('/subgroup', async (req, res) => {
    res.json({
      Subgroups: await Provider.getSubgroup()
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

    const provider = Provider.withList(
      req.query.keyword,
      req.query.subgroup as string | undefined,
      req.query.type as string | undefined,
      req.query.r as string | undefined
    )

    res.json({
      HasMore: await provider.getHasMore(),
      Resources: await provider.getResources()
    })
  })

  app.listen(port, () => {
    console.log(`DanDanPlay Resource API listening at http://localhost:${port}`)
  })
})()
