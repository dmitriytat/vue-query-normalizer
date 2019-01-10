/* eslint-disable import/prefer-default-export */

/**
 * Is patch has new values
 * @param {{string: *}} options - query options
 * @param {{string: *}} patch - query patch
 * @param {{string: *}} query - $route.query
 * @return {boolean}
 */
export function isEqual(options, patch, query) {
  return Object.keys(options).every(key => String(patch[key]) === String(query[key]));
}
