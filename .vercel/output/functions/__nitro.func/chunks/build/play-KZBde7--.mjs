import { _ as _sfc_main$1, a as _sfc_main$2 } from './PrizeModal-R_dhemha.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Cs5tgPcn.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './v3-nC4LB_95.mjs';
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
  __name: "play",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Jugar - BonoCopas Wheel",
      meta: [
        { name: "description", content: "Gira la ruleta de BonoCopas y gana incre\xEDbles premios. \xA1Entra y juega ahora!" }
      ]
    });
    const { user } = useAuth();
    const email = ref("");
    const isLoading = ref(false);
    const showPrizeModal = ref(false);
    const wonSpin = ref(null);
    const onPrizeWon = (spin) => {
      wonSpin.value = spin;
      showPrizeModal.value = true;
    };
    const onPrizeClaim = () => {
      showPrizeModal.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_WheelSpinner = _sfc_main$1;
      const _component_PrizeModal = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8" }, _attrs))}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-8"><h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2"> \u{1F3AF} BonoCopas Wheel </h1><p class="text-lg text-gray-600 dark:text-gray-300"> \xA1Gira la ruleta y gana incre\xEDbles premios! </p></div>`);
      if (!unref(user)) {
        _push(`<div class="max-w-md mx-auto"><div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center"> Iniciar Sesi\xF3n </h2><form class="space-y-4"><div><label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Email </label><input${ssrRenderAttr("value", unref(email))} type="email" id="email" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="tu@email.com"></div><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50">`);
        if (!unref(isLoading)) {
          _push(`<span>Entrar</span>`);
        } else {
          _push(`<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Entrando... </span>`);
        }
        _push(`</button></form></div></div>`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_WheelSpinner, { onPrizeWon }, null, _parent));
        if (unref(showPrizeModal)) {
          _push(ssrRenderComponent(_component_PrizeModal, {
            spin: unref(wonSpin),
            onClose: ($event) => showPrizeModal.value = false,
            onClaim: onPrizeClaim
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (unref(user)) {
        _push(`<div class="mt-8 text-center">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/history",
          class: "inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors mr-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u{1F4CB} Ver Historial `);
            } else {
              return [
                createTextVNode(" \u{1F4CB} Ver Historial ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"> \u{1F6AA} Salir </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/play.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=play-KZBde7--.mjs.map
