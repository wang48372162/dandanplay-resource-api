import axios from 'axios'
import cheerio from 'cheerio'
import dayjs from './Dayjs'

const responseCache: Array<{ url: string, html: string }> = []

export async function cheerioHttp(url: string) {
  let html: string = ''
  const cacheItem = responseCache.find(item => item.url === url)

  if (typeof cacheItem !== 'undefined') {
    html = cacheItem.html
  } else {
    const { data }: { data: string } = await axios.get(url)
    html = data
    responseCache.push({ url, html })
  }

  return cheerio.load(html)
}

export function queryPropToString(value?: number | string): string {
  if (typeof value === 'undefined') {
    value = ''
  } else if (typeof value === 'number') {
    value = value.toString()
  }

  return value
}

export function parseHumanDate(date: string) {
  if (date.indexOf('今天') === 0) {
    return dayjs(date, 'HH:mm', 'zh-cn')
  } else if (date.indexOf('昨天') === 0) {
    return dayjs(date, 'HH:mm', 'zh-cn').subtract(1, 'day')
  }

  return dayjs(date)
}
