import { QueryNormalizerMixin } from './mixin';

const QueryNormalizer = {
  install(Vue) {
    Vue.mixin(QueryNormalizerMixin);
  },
};

export default QueryNormalizer;

export { QueryNormalizerMixin };
