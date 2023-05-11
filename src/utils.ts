import axios, { AxiosProxyConfig, AxiosRequestConfig } from 'axios'
import { load } from 'cheerio'
import c from 'picocolors'
import dayjs from './dayjs'

interface CheerioHttpOptions {
  axiosConfig?: AxiosRequestConfig
  debug?: boolean
}

export function print(...messages: any[]) {
  console.log(c.green(`[${new Date().toLocaleString()}]`), ...messages.filter(v => v))
}

export async function cheerioHttp(url: string, options: CheerioHttpOptions = {}) {
  const {
    axiosConfig,
    debug = false,
  } = options

  let html = ''

  try {
    const { data } = await axios.get<string>(url, axiosConfig)
    html = data

    if (debug) print(c.blue('HTML content:'), html)
  } catch (error) {
    console.error(error)
  }

  return load(html)
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
