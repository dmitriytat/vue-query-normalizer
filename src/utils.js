/* eslint-disable no-param-reassign */

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

/**
 * Check value type
 * @param {string} key
 * @param {{type: Function}} option
 * @param {*} value
 */
export function checkType(key, option, value) {
  const hasTypeAndValue = typeof option.type !== 'undefined' && typeof value !== 'undefined';

  if (hasTypeAndValue) {
    const isInstanceOfType = Object(value) instanceof option.type;

    if (!isInstanceOfType) {
      // eslint-disable-next-line no-console
      console.warn('Query type error: ', key, value);
    }
  }
}

/**
 * Get params
 * @param {{string: *}} options - query options
 * @param {{string: *}} query - $route.query
 * @returns {{string: *}} - $query params
 */
export function getQueryValues(options, query) {
  return Object.entries(options)
    .reduce((params, [key, option]) => {
      const rawValue = query[key];
      let value;

      if (typeof rawValue === 'undefined') {
        if (typeof option.default === 'function') {
          value = option.default.call(this);
        } else {
          value = option.default;
        }
      } else if (typeof option.in === 'function') {
        value = option.in.call(this, rawValue);
      } else if (typeof option.type !== 'undefined') {
        value = option.type(rawValue);
      }

      checkType(key, option, value);

      params[key] = value;

      return params;
    }, {});
}

/**
 * Get query
 * @param {{string: *}} options - query options
 * @param {{string: *}} params - $query params
 * @param {{string: *}} oldQuery - $route.query
 * @returns {{string: *}} - query for $router.replace()
 */
export function getQueryParams(options, params, oldQuery = {}) {
  return Object.entries(options)
    .reduce((query, [key, option]) => {
      const rawValue = params[key];

      if (rawValue === option.default) {
        // eslint-disable-next-line no-param-reassign
        delete query[key];
        return query;
      }

      let value;

      if (typeof option.out === 'function') {
        value = option.out.call(this, rawValue);
      } else {
        value = rawValue;
      }

      if (value === null || value === false || value === undefined) {
        delete query[key];
      } else {
        query[key] = String(value);
      }

      return query;
    },
    { ...oldQuery });
}
