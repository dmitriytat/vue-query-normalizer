/**
 * Augment the typings of Vue.js
 */

import Vue from "vue";
import {Dictionary, QueryOptions, QueryParams} from "./index";

declare module "vue/types/vue" {

    interface Vue {
        $query: QueryParams;
        $queryGet: (patch: QueryParams) => Dictionary<string | string[]>;
    }
}

declare module "vue/types/options" {

    interface ComponentOptions<V extends Vue> {
        query?: QueryOptions;
        queryReady?: () => void;
    }
}
