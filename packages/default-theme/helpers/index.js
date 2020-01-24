import dayjs from 'dayjs'
import currency from 'currency.js'

const formatPrice = (
  price,
  options = {
    pattern: `# !`,
    separator: ` `,
    decimal: `,`,
    symbol: `€`,
    formatWithSymbol: true
  }
) => currency(price, options).format()
const formatDate = (date, format = `DD-MM-YYYY H:i:s`) =>
  dayjs(date).format(format)

export default {
  formatPrice,
  formatDate
}
