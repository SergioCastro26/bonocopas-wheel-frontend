import { _ as __nuxt_component_0 } from './nuxt-link-Cs5tgPcn.mjs';
import { ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useNuxtApp } from './server.mjs';
import { u as useAuth } from './useAuth-C8pkQ0uR.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { $api } = useNuxtApp();
    const { user, isAdmin } = useAuth();
    const apiStatus = ref("Checking API...");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" }, _attrs))}><div class="text-center mb-16"><h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"> \xA1Gira la Ruleta y <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Gana Premios! </span></h1><p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"> Participa en nuestra emocionante ruleta de premios. Cada giro es una nueva oportunidad de ganar incre\xEDbles recompensas. </p><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/wheel",
        class: "btn-primary text-lg px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u{1F3AF} Girar Ruleta `);
          } else {
            return [
              createTextVNode(" \u{1F3AF} Girar Ruleta ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/prizes",
        class: "btn-secondary text-lg px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u{1F3C6} Ver Premios `);
          } else {
            return [
              createTextVNode(" \u{1F3C6} Ver Premios ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"><div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"><div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path></svg></div><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">F\xE1cil de Usar</h3><p class="text-gray-600 dark:text-gray-300"> Solo haz clic y gira. Nuestra interfaz intuitiva hace que participar sea s\xFAper f\xE1cil. </p></div><div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"><div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Premios Reales</h3><p class="text-gray-600 dark:text-gray-300"> Todos nuestros premios son reales y se entregan a los ganadores de manera garantizada. </p></div><div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"><div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg></div><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Juego Justo</h3><p class="text-gray-600 dark:text-gray-300"> Nuestro sistema es completamente transparente y justo para todos los participantes. </p></div></div><div class="text-center"><div class="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full"><div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div><span class="text-sm font-medium">${ssrInterpolate(unref(apiStatus))}</span></div></div>`);
      if (unref(user)) {
        _push(`<div class="text-center"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4"> \xA1Bienvenido, ${ssrInterpolate(unref(user).email)}! </h2><div class="space-y-4">`);
        if (unref(isAdmin)) {
          _push(`<div class="mb-6">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin",
            class: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 shadow-lg"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` \u2699\uFE0F Panel de Administrador `);
              } else {
                return [
                  createTextVNode(" \u2699\uFE0F Panel de Administrador ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/wheel",
          class: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u{1F3AF} Ir a la Ruleta `);
            } else {
              return [
                createTextVNode(" \u{1F3AF} Ir a la Ruleta ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<br>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/history",
          class: "inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
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
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(user)) {
        _push(`<div class="text-center mt-8">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u{1F680} Comenzar a Jugar `);
            } else {
              return [
                createTextVNode(" \u{1F680} Comenzar a Jugar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-lDPq7MiT.mjs.map
