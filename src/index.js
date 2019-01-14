import { queryNormalizerMixin } from './mixin';

const QueryNormalizer = {
  install(Vue) {
    Vue.mixin(queryNormalizerMixin);
  },
};

export default QueryNormalizer;

export { queryNormalizerMixin };
