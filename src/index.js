/* eslint-disable no-underscore-dangle,no-restricted-syntax,no-param-reassign,func-names */

function isEqual(a, b) {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i += 1) {
    const key = aProps[i];
    if (String(a[key]) !== String(b[key])) {
      return false;
    }
  }

  return true;
}

const QueryNormalizer = {
  install(Vue) {
    Vue.mixin({
      created() {
        const queryOptions = this.$options.query;

        if (queryOptions) {
          this.$queryProceed(this.$route.query, queryOptions, true);
        }
      },

      watch: {
        '$route.query': function (query) {
          const queryOptions = this.$options.query;

          if (queryOptions) {
            this.$queryProceed(query, queryOptions);
          }
        },
      },
    });

    Vue.prototype.$queryGet = function (patch = {}) {
      const queryOptions = this.$options.query;

      if (!queryOptions) {
        return {};
      }

      const values = {
        ...this.$query,
        ...patch,
      };

      return Object.entries(queryOptions)
        .reduce((q, [key, params]) => {
          if (values[key] === params.default) {
            return q;
          }

          let value;

          if (typeof params.out === 'function') {
            value = params.out.call(this, values[key]);
          } else {
            value = values[key];
          }

          if (value !== null && value !== false && value !== undefined) {
            q[key] = String(value);
          }

          return q;
        },
        {});
    };

    Vue.prototype.$queryProceed = function (
      query = {},
      queryOptions = {},
      check = false,
    ) {
      const _query = Object.entries(queryOptions).reduce((q, [key, params]) => {
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
            console.warn('Query type error: ', key, value);
          }
        }

        q[key] = value;

        return q;
      }, {});

      this._query = _query;

      if (check) {
        const newQuery = this.$queryGet(_query);
        const isEquivalent = isEqual(this.$route.query, newQuery);

        if (!isEquivalent) {
          this.$router.replace({ query: newQuery });

          return;
        }
      }

      const { loadData } = this.$options;

      if (typeof loadData === 'function') {
        loadData.call(this);
      }
    };

    Object.defineProperty(Vue.prototype, '$query', {
      get() {
        return this._query;
      },
    });
  },
};

export default QueryNormalizer;
QueryNormalizer;
