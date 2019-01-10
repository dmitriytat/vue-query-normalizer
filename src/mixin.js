/* eslint-disable no-underscore-dangle,no-restricted-syntax */
/* eslint-disable no-param-reassign,func-names,import/prefer-default-export */

import Vue from 'vue';

/**
 * Is patch has new values
 * @param {{string: *}} options - query options
 * @param {{string: *}} patch - query patch
 * @param {{string: *}} query - $route.query
 * @return {boolean}
 */
function isEqual(options, patch, query) {
  return Object.keys(options).every(key => String(patch[key]) === String(query[key]));
}

/**
 * Do logic
 * @param {{string: *}} options - query options
 * @param {{string: *}} query - $route.query
 * @param {boolean} check - initial check
 */
function proceedQuery(options = {}, query = {}, check = false) {
  const _query = Object.entries(options).reduce((q, [key, params]) => {
    const rawValue = query[key];
    let value;

    if (typeof rawValue === 'undefined') {
      value = params.default;
    } else if (typeof params.in === 'function') {
      value = params.in.call(this, rawValue);
    } else if (typeof params.type !== 'undefined') {
      value = params.type(rawValue);
    }

    if (typeof params.type !== 'undefined') {
      if (!(Object(value) instanceof params.type)) {
        // eslint-disable-next-line no-console
        console.warn('Query type error: ', key, value);
      }
    }

    q[key] = value;

    return q;
  }, {});

  this._query = _query;

  if (check) {
    const newQuery = this.$queryGet(_query);
    const isEquivalent = isEqual(options, newQuery, this.$route.query);

    if (!isEquivalent) {
      this.$router.replace({ query: newQuery });

      return;
    }
  }

  const { queryReady } = this.$options;

  if (typeof queryReady === 'function') {
    queryReady.call(this);
  }
}

const QueryNormalizerMixin = {
  beforeCreate() {
    const options = this.$options.query;

    if (options) {
      Vue.util.defineReactive(this, '_query', {});

      Object.defineProperty(this, '$query', {
        get() {
          return this._query;
        },
      });
    }
  },

  created() {
    const options = this.$options.query;

    if (options) {
      proceedQuery.call(this, options, this.$route.query, true);
    }
  },

  watch: {
    '$route.query': function (query) {
      const options = this.$options.query;

      if (options) {
        proceedQuery.call(this, options, query);
      }
    },
  },

  methods: {
    $queryGet(patch = {}) {
      const options = this.$options.query;

      if (!options) {
        return {};
      }

      const values = {
        ...this.$query,
        ...patch,
      };

      const oldQuery = { ...this.$route.query };

      return Object.entries(options)
        .reduce((query, [key, params]) => {
          if (values[key] === params.default) {
            delete query[key];
            return query;
          }

          let value;

          if (typeof params.out === 'function') {
            value = params.out.call(this, values[key]);
          } else {
            value = values[key];
          }

          if (value !== null && value !== false && value !== undefined) {
            query[key] = String(value);
          } else {
            delete query[key];
          }

          return query;
        },
        oldQuery);
    },
  },
};

export { QueryNormalizerMixin };
