import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import 'dayjs/locale/zh-cn.js'

dayjs.extend(customParseFormat)
dayjs.locale('zh-cn')

export default dayjs
