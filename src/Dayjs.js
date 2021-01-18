const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
require('dayjs/locale/zh-cn')

dayjs.extend(customParseFormat)
dayjs.locale('zh-cn')

module.exports = dayjs
