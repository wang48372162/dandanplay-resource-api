const axios = require('axios')
const cheerio = require('cheerio')
const dayjs = require('./Dayjs')

/**
 * @type {{ url: string, html: string }[]}
 */
const responseCache = []

/**
 * @param {string} url
 */
async function cheerioHttp(url) {
  let html = ''
  const cacheItem = responseCache.find(item => item.url === url)

  if (typeof cacheItem !== 'undefined') {
    html = cacheItem.html
  } else {
    const { data } = await axios.get(url)
    html = data
    responseCache.push({ url, html })
  }

  return cheerio.load(html)
}

/**
 * @param {(number|string)} [value]
 */
function queryPropToString(value) {
  if (typeof value === 'undefined') {
    value = ''
  } else if (typeof value === 'number') {
    value = value.toString()
  }

  return value
}

/**
 * @param {string} date
 */
function parseHumanDate(date) {
  if (date.indexOf('今天') === 0) {
    return dayjs(date, 'HH:mm', 'zh-cn')
  } else if (date.indexOf('昨天') === 0) {
    return dayjs(date, 'HH:mm', 'zh-cn').subtract(1, 'day')
  }

  return dayjs(date)
}

module.exports = {
  cheerioHttp,
  queryPropToString,
  parseHumanDate
}
