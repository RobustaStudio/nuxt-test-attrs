"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const composition_api_1 = require("@nuxtjs/composition-api");
exports.default = composition_api_1.defineNuxtModule(function stripTestAttrs() {
    const { options } = this;
    const moduleOptions = options.stripTestAttrs || {};
    if (moduleOptions.strip === undefined && options.dev) {
        return;
    }
    if (!moduleOptions.strip) {
        return;
    }
    if (!options.build.loaders) {
        options.build.loaders = {};
    }
    if (!options.build.loaders.vue) {
        options.build.loaders.vue = {};
    }
    const vueLoader = options.build.loaders.vue;
    if (!vueLoader.compilerOptions) {
        vueLoader.compilerOptions = {};
    }
    const compilerOptions = vueLoader.compilerOptions;
    if (!compilerOptions.modules) {
        compilerOptions.modules = [];
    }
    const modules = compilerOptions.modules;
    modules.push(stripModule(moduleOptions));
});
function stripModule({ attrs }) {
    let testAttrs = attrs || [];
    return {
        preTransformNode(astEl) {
            const { attrsMap, attrsList } = astEl;
            testAttrs.forEach((attr) => {
                const dAttr = `data-${attr}`;
                const dAttrBound = `v-bind:data-${attr}`;
                const dAttrBoundShortHand = `:data-${attr}`;
                if (attrsMap[dAttr]) {
                    delete attrsMap[dAttr];
                    const index = attrsList.findIndex((x) => x.name === dAttr);
                    attrsList.splice(index, 1);
                }
                else if (attrsMap[dAttrBound]) {
                    delete attrsMap[dAttrBound];
                    const index = attrsList.findIndex((x) => x.name === dAttrBound);
                    attrsList.splice(index, 1);
                }
                else if (attrsMap[dAttrBoundShortHand]) {
                    delete attrsMap[dAttrBoundShortHand];
                    const index = attrsList.findIndex((x) => x.name === dAttrBoundShortHand);
                    attrsList.splice(index, 1);
                }
            });
            return astEl;
        },
    };
}
//# sourceMappingURL=index.js.map