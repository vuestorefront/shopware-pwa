import dayjs from 'dayjs'
import currency from 'currency.js'
// TODO: move it to useContext composable or somewhere else to get always current currency symbol and separator
const formatPrice = (
  price,
  options = {
    pattern: `# !`,
    separator: ` `,
    decimal: `,`,
    symbol: `PLN`,
    formatWithSymbol: true,
  }
) => currency(price, options).format()
const formatDate = (date, format = `DD-MM-YYYY HH:mm:ss`) =>
  dayjs(date).format(format)

const getCategoryRoutePath = (category) => `/${category?.route?.path}`

export default {
  formatPrice,
  formatDate,
  getCategoryRoutePath,
}
