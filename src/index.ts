/* tslint:disable:no-shadowed-variable */
import Vue, { PluginObject } from "vue";

import { queryNormalizerMixin } from "./mixin";

const QueryNormalizer: PluginObject<Vue> = {
  install(Vue) {
    Vue.mixin(queryNormalizerMixin);
  },
};

export default QueryNormalizer;
export { queryNormalizerMixin };
