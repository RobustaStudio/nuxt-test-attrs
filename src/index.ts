import { defineNuxtModule } from '@nuxtjs/composition-api';

interface StripTestAttrsOptions {
  strip: boolean;
  attrs: string[];
}

export default defineNuxtModule(function stripTestAttrs() {
  const { options } = this;
  const moduleOptions: Partial<StripTestAttrsOptions> =
    options.stripTestAttrs || {};

  // In dev mode, don't generate unless specified
  if (moduleOptions.strip === undefined && options.dev) {
    return;
  }

  // stripping is disabled specifically
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
  modules.push(stripModule(moduleOptions) as any);
});

// https://github.com/LinusBorg/vue-cli-plugin-test-attrs/blob/develop/lib/index.js
function stripModule({ attrs }: Partial<StripTestAttrsOptions>) {
  let testAttrs = attrs || [];
  return {
    preTransformNode(astEl: any) {
      const { attrsMap, attrsList } = astEl;
      testAttrs.forEach((attr) => {
        const dAttr = `data-${attr}`;
        const dAttrBound = `v-bind:data-${attr}`;
        const dAttrBoundShortHand = `:data-${attr}`;
        if (attrsMap[dAttr]) {
          delete attrsMap[dAttr];
          const index = attrsList.findIndex((x: any) => x.name === dAttr);
          attrsList.splice(index, 1);
        } else if (attrsMap[dAttrBound]) {
          delete attrsMap[dAttrBound];
          const index = attrsList.findIndex((x: any) => x.name === dAttrBound);
          attrsList.splice(index, 1);
        } else if (attrsMap[dAttrBoundShortHand]) {
          delete attrsMap[dAttrBoundShortHand];
          const index = attrsList.findIndex(
            (x: any) => x.name === dAttrBoundShortHand
          );
          attrsList.splice(index, 1);
        }
      });
      return astEl;
    },
  };
}
