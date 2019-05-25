import "vue-router/types";
import Vue, { ComponentOptions, PluginObject } from "vue/types";

import "./vue";

declare const queryNormalizerMixin: ComponentOptions<Vue>;
declare const QueryNormalizer: PluginObject<Vue>;

export default QueryNormalizer;
export { queryNormalizerMixin };

export {
  LocationValue,
  LocationValues,
  RouteValue,
  RouteValues,
  NormalizerValue,
  NormalizerValues,
  NormalizerOption,
  NormalizerOptions,
} from "./normalizer";
