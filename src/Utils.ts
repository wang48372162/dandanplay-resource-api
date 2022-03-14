import axios, { AxiosProxyConfig, AxiosRequestConfig } from 'axios'
import cheerio from 'cheerio'
import dayjs from './Dayjs'

const responseCache: Array<{ url: string, html: string }> = []

export async function cheerioHttp(url: string, axiosConfig?: AxiosRequestConfig) {
  let html: string = ''
  const cacheItem = responseCache.find(item => item.url === url)

  if (typeof cacheItem !== 'undefined') {
    html = cacheItem.html
  } else {
    const { data }: { data: string } = await axios.get(url, axiosConfig)
    html = data
    responseCache.push({ url, html })
  }

  return cheerio.load(html)
}

export function parseAxiosProxy(
  host?: string,
  username?: string,
  password?: string,
  isHttps: boolean = false
): AxiosProxyConfig | undefined {
  if (typeof host === 'undefined') {
    return undefined
  }

  let port: number | string = 80
  let auth: { username: string, password: string } | undefined = undefined
  let protocol: 'https' | undefined = isHttps ? 'https' : undefined

  if (host.indexOf(':') !== -1) {
    [host, port] = host.split(':')
    port = parseInt(port)
  }

  if (typeof username === 'string' &&
      typeof password === 'string'
  ) {
    auth = { username, password }
  }

  return { host, port, auth, protocol }
}

export function encodeQueryProp(value?: number | string): string {
  if (typeof value === 'undefined') {
    value = ''
  } else if (typeof value === 'number') {
    value = value.toString()
  }

  return encodeURIComponent(value)
}

export function parseHumanDate(date: string) {
  if (date.indexOf('今天') === 0) {
    return dayjs(date, 'HH:mm', 'zh-cn')
  } else if (date.indexOf('昨天') === 0) {
    return dayjs(date, 'HH:mm', 'zh-cn').subtract(1, 'day')
  }

  return dayjs(date)
}
