/* tslint:disable:interface-name */
import { Vue } from "vue/types/vue";
import { LocationValues, NormalizerOptions, NormalizerValues } from "./normalizer";

declare module "vue/types/vue" {
    interface Vue {
        _query: NormalizerValues;
        readonly $query: NormalizerValues;
        $queryGet: (patch: NormalizerValues) => LocationValues;
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        query?: NormalizerOptions;
        queryReady?: () => void;
        queryHideDefaults?: boolean;
    }
}
