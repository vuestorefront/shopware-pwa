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
    formatWithSymbol: true
  }
) => currency(price, options).format()
const formatDate = (date, format = `DD-MM-YYYY H:m:s`) =>
  dayjs(date).format(format)

const setContentOrder = content => {
  const newContent = JSON.parse(JSON.stringify(content))
  const slotsArr = []
  newContent.slots.forEach(slot => {
    switch (slot.slot) {
      case 'left':
        slotsArr[0] = slot
        break
      case 'right':
        slotsArr[2] = slot
        break
      default:
        slotsArr[1] = slot
    }
  })
  newContent.slots = slotsArr
  return newContent
}

export default {
  formatPrice,
  formatDate,
  setContentOrder
}
