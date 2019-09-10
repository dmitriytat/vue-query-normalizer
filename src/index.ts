/* tslint:disable:no-shadowed-variable */
import Vue, { PluginObject } from "vue";

import {NormalizerSettings} from "../types/normalizer";
import {createQueryNormalizerMixin, queryNormalizerMixin} from "./mixin";

const QueryNormalizer: PluginObject<Vue> = {
  install(Vue, settings: any) {
    Vue.mixin(createQueryNormalizerMixin(settings as NormalizerSettings));
  },
};

export default QueryNormalizer;
export { queryNormalizerMixin };
