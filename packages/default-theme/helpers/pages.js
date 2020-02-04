/**
 * Global routes' map
 */
const pagesMap = {
  'checkout': 'checkout',
  'account': 'account',
  'login': 'login'
}

/**
 * Get the route's path for given page name
 * @param {string} pageName
 * @returns {string|null}
 */
export function getPagePath(pageName) {
  return pagesMap[pageName] ? `/${pagesMap[pageName]}` : null;
}