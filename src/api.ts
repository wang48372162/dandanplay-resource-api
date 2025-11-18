import { H3, HTTPError, serve } from 'h3'
import c from 'picocolors'
import { axiosConfig } from './config'
import { createProvider } from './createProvider'
import { print, parseAxiosProxy } from './utils'

export interface ApiOptions {
  provider: string
  port: number
  debug?: boolean
  proxy?: string
  proxyUsername?: string
  proxyPassword?: string
  proxyHttps?: boolean
}

export async function api(options: ApiOptions) {
  const {
    provider: providerId,
    port,
    debug = false,
    proxy,
    proxyUsername,
    proxyPassword,
    proxyHttps,
  } = options

  const provider = createProvider(providerId)

  provider.setAxiosConfig(axiosConfig)
  provider.setDebug(debug)
  provider.setProxy(parseAxiosProxy(proxy, proxyUsername, proxyPassword, proxyHttps))

  const app = new H3()

  app.get('/', () => 'DanDanPlay Resource API')

  app.get('/subgroup', async event => {
    const Subgroups = await provider.getSubgroups()

    print(event.url.pathname, debug ? Subgroups : undefined)

    return { Subgroups }
  })

  app.get('/type', async event => {
    const Types = await provider.getTypes()

    print(event.url.pathname, debug ? Types : undefined)

    return { Types }
  })

  app.get('/list', async event => {
    const query = {
      keyword: event.url.searchParams.get('keyword') as string,
      subgroup: event.url.searchParams.get('subgroup'),
      type: event.url.searchParams.get('type'),
      r: event.url.searchParams.get('r'),
    }

    if (!query.keyword) {
      throw HTTPError.status(400, 'bad request', {
        message: 'missing keyword parameter',
      })
    }

    provider.withListQuery(query)

    const HasMore = await provider.getHasMore()
    const Resources = await provider.getResources()

    const queryString = Object
      .entries(query)
      .filter(([_, value]) => !!value)
      .map(([key, value]) => `${key}=${decodeURIComponent(value || '')}`)
      .join('&')

    const url = `${event.url.pathname}?${queryString}`
    print(url, `HasMore: ${HasMore}`, debug ? Resources : undefined)

    return { HasMore, Resources }
  })

  const server = serve(app, {
    port,
    silent: true,
  })

  await server.ready()

  console.log(`${c.blue('DanDanPlay Resource API')} listening at ${c.cyan(`http://localhost:${port}`)}`)
}
