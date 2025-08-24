import { _ as _sfc_main$1, a as _sfc_main$2 } from './PrizeModal-R_dhemha.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Cs5tgPcn.mjs';
import { ref, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-C8pkQ0uR.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {
  __name: "wheel",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const showPrizeModal = ref(false);
    const wonSpin = ref(null);
    const onPrizeWon = (spin) => {
      wonSpin.value = spin;
      showPrizeModal.value = true;
    };
    const closePrizeModal = () => {
      showPrizeModal.value = false;
      wonSpin.value = null;
    };
    const onPrizeClaimed = (spin) => {
      console.log("Prize claimed:", spin);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_WheelSpinner = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_PrizeModal = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" }, _attrs))}><div class="text-center mb-12"><h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"> \u{1F3AF} Ruleta de Premios </h1><p class="text-xl text-gray-600 dark:text-gray-300 mb-8"> \xA1Gira la ruleta y gana incre\xEDbles premios! </p>`);
      if (unref(user)) {
        _push(`<div class="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-8"><svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg><span class="text-sm font-medium">${ssrInterpolate(unref(user).email)}</span><button class="ml-4 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"> Salir </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex justify-center mb-12">`);
      _push(ssrRenderComponent(_component_WheelSpinner, { onPrizeWon }, null, _parent));
      _push(`</div><div class="flex justify-center space-x-4 mb-12">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/history",
        class: "inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Ver Historial `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 mr-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                })
              ])),
              createTextVNode(" Ver Historial ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Actualizar </button></div>`);
      _push(ssrRenderComponent(_component_PrizeModal, {
        "is-open": unref(showPrizeModal),
        spin: unref(wonSpin),
        onClose: closePrizeModal,
        onPrizeClaimed
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wheel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=wheel-gVJ4koaM.mjs.map
