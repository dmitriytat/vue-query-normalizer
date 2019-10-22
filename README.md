# Vue Query Normalizer

[![npm version](https://badge.fury.io/js/vue-query-normalizer.svg)](https://www.npmjs.com/package/vue-query-normalizer)
[![Build Status](https://travis-ci.com/dmitriytat/vue-query-normalizer.svg?branch=master)](https://travis-ci.com/dmitriytat/vue-query-normalizer)
[![Coverage Status](https://coveralls.io/repos/github/dmitriytat/vue-query-normalizer/badge.svg?branch=master)](https://coveralls.io/github/dmitriytat/vue-query-normalizer?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/dmitriytat/vue-query-normalizer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/dmitriytat/vue-query-normalizer?targetFile=package.json)

Demo: [https://codesandbox.io/s/xrjwl8n8ro](https://codesandbox.io/s/xrjwl8n8ro)

### Usage

Mixin for component

```vue
<template>
  <div>
    <RouterLink :to="{ query: $queryGet({ page: $query.page - 1}) }">Prev</RouterLink>
    <span class="current">{ $query.page }</span>
    <RouterLink :to="{ query: $queryGet({ page: $query.page + 1 }) }">Next</RouterLink>
  </div>
</template>

<script>
import { queryNormalizerMixin } from 'vue-query-normalizer';

export default {
  name: 'Page',

  data() {
    return {
      isLoading: false,
      today: new Date(),
    };
  },

  mixins: [
    queryNormalizerMixin,
  ],

  // describe $query params
  query: {
    page: {
      type: Number,
      default: 1, // default value is hidden from url
      /**
      * Convert $route.query param to $query param
      * @param {string} value
      * @return {number}
      */
      in(value) {
        const page = parseInt(value, 10);

        return page > 0 ? page : 1;
      },

      /**
      * Convert $query param to $route.query param
      * @param {number} page
      * @return {string}
      */
      out(page) {
        return page.toString();
      },
    },
    date: {
      type: Date,
      default() {
        return this.today;
      }
    },
    sort: {
      type: String,
      default: 'price',
    }
  },

  // load data after query proceed
  queryReady() {
    const params = {
      page: this.$query.page, // use this.$query
      sort: this.$query.sort,
      date: this.$query.date,
      limit: 10,
    };

    this.isLoading = true;
    api.loadData(params)
      .finally(() => {
        this.isLoading = false;
      })
  },
};
</script>

```

Or plugin

```js
import QueryNormalizer from 'vue-query-normalizer';

Vue.use(QueryNormalizer);
```

### Settings

`queryHideDefaults: true`

You can hide or show default query params by option of plugin or component.

```js
Vue.use(QueryNormalizer, { queryHideDefaults: false });
```

or if you use mixin

```js
export default {
  name: 'Page',

  mixins: [
    queryNormalizerMixin,
  ],
  
  queryHideDefaults: false,
}
```

### Special cases

If you need to use something more particular, like an array in query string (for example), you should write extra code. 
You should firstly write custom comparator for default value and customize your input and output.

`?filters=foo,bar`

```js
{
    query: {
      filters: {
        type: Array,
        default: () => ['all'],
        in: value => (value ? value.split(',') : ['all']),
        out: value => (value ? value.join(',') : undefined),
        compare: (value, defaultValue) => {
            return value.length === defaultValue.length && value.every(item => defaultValue.includes(item));
        },
      },
    },
}
```

After that you can use it.

```js
{
  queryReady() {
    console.log(this.$query.filters); // ["foo", "bar"]
  }
}
```
