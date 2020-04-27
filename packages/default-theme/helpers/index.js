import dayjs from 'dayjs'
import currency from 'currency.js'
// TODO: move it to useContext composable or somewhere else to get always current currency symbol and separator
const formatPrice = (
  price,
  options = {
    pattern: `# !`,
    separator: ` `,
    decimal: `,`,
    symbol: `€`,
    formatWithSymbol: true,
  }
) => currency(price, options).format()

const defaultFormatPriceOptions = {
  pattern: `# !`,
  separator: ` `,
  decimal: `,`,
  symbol: `€`,
  formatWithSymbol: true,
}

export function formatPrice(price, options) {
  return currency(
    price,
    Object.assign(defaultFormatPriceOptions, options)
  ).format()
}

const formatDate = (date, format = `DD-MM-YYYY H:m:s`) =>
  dayjs(date).format(format)

const getCategoryRoutePath = (category) => `/${category?.route?.path}`

export default {
  formatPrice,
  formatDate,
  getCategoryRoutePath,
}
