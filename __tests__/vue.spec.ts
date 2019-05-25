/* tslint:disable:object-literal-sort-keys no-empty no-console */
import Vue from "vue";
import VueRouter from "vue-router";

import QueryNormalizer from "../src/index";

const routes = [
  { path: "/" },
];

const router = new VueRouter({
  routes,
});

Vue.use(QueryNormalizer);

describe("Vue query normalizer", () => {
  it("Should create vue with plugin", () => {
    const root = document.createElement("div");

    new Vue({
      router,
    }).$mount(root);
  });
});
