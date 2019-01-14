/**
 * Augment the typings of Vue.js
 */

import Vue from "vue/types/vue";

export interface QueryOption <T> {
    type: (value: QueryItem) => T;
    default: () => T | T;
    in?: (value: QueryItem) => T;
    out?: (value: T) => QueryItem;
}

export interface QueryOptions {
    [key: string]: QueryOption<any>;
}

export type QueryParam = any;

export interface QueryParams {
    [key: string]: QueryParam;
}

export type QueryItem = string | string[];

export interface Query {
    [key: string]: QueryItem;
}

declare module "vue/types/vue" {
    interface Vue {
        readonly $query: QueryParams;
        $queryGet: (patch: QueryParams) => Query;
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        query?: QueryOptions;
        queryReady?: () => void;
    }
}
