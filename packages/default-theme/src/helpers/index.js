import dayjs from "dayjs"
import { PAGE_SEARCH } from "./pages"

const defaultFormatPriceOptions = {
  pattern: `# !`,
  separator: ` `,
  decimal: `,`,
  symbol: `€`,
  formatWithSymbol: true,
}

export { formatPrice } from "@/helpers/formatPrice"

export const getSortingLabel = (sorting) => {
  if (!sorting || !sorting.field) {
    return ""
  }

  const ascLabel = "ascending"
  const descLabel = "descending"

  const label =
    sorting.order && (sorting.order === "desc" ? descLabel : ascLabel)
  return label ? `${sorting.field} ${label}` : sorting.field
}

/**
 * converts non-alphanumerical characters into dashes
 * used for parsing slot codes from names
 * @param {string} phrase
 */
export const simplifyString = (phrase) =>
  (typeof phrase === "string" && phrase.replace(/[^a-zA-Z0-9]+/g, "-")) ||
  phrase

export const formatDate = (date, format = `DD-MM-YYYY HH:mm:ss`) =>
  dayjs(date).format(format)

export const getSearchPageUrl = (searchTerm) =>
  `${PAGE_SEARCH}?query=${searchTerm}`
