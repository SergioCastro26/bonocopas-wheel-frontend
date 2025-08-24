import { _ as __nuxt_component_0 } from './nuxt-link-Cs5tgPcn.mjs';
import { ref, computed, mergeProps, withCtx, createBlock, createTextVNode, openBlock, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "history",
  __ssrInlineRender: true,
  setup(__props) {
    const { $api } = useNuxtApp();
    useAuth();
    const spins = ref([]);
    const pagination = ref({});
    const isLoading = ref(true);
    const isClaimingPrize = ref(null);
    const claimedCount = computed(() => spins.value.filter((spin) => spin.claimed).length);
    const pendingCount = computed(() => spins.value.filter((spin) => !spin.claimed).length);
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" }, _attrs))}><div class="flex items-center justify-between mb-8"><div><h1 class="text-3xl font-bold text-gray-900 dark:text-white"> \u{1F4DC} Historial de Premios </h1><p class="mt-2 text-gray-600 dark:text-gray-400"> Revisa todos los premios que has ganado </p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/wheel",
        class: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Volver a la Ruleta `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 mr-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                })
              ])),
              createTextVNode(" Volver a la Ruleta ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(isLoading)) {
        _push(`<div class="flex justify-center items-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>`);
      } else if (!unref(spins).length) {
        _push(`<div class="text-center py-12"><div class="mx-auto h-24 w-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4"><svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2"> No hay premios a\xFAn </h3><p class="text-gray-500 dark:text-gray-400 mb-6"> \xA1Ve a la ruleta y gira para ganar tu primer premio! </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/wheel",
          class: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
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
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"> Total de Giros </dt><dd class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(pagination).totalSpins)}</dd></dl></div></div></div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"> Premios Reclamados </dt><dd class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(claimedCount))}</dd></dl></div></div></div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"> Pendientes </dt><dd class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(pendingCount))}</dd></dl></div></div></div></div></div><div class="grid gap-6"><!--[-->`);
        ssrRenderList(unref(spins), (spin) => {
          _push(`<div class="${ssrRenderClass([spin.claimed ? "border-green-400" : "border-yellow-400", "bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4"])}"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="flex-shrink-0"><div class="${ssrRenderClass([spin.claimed ? "bg-green-500" : "bg-yellow-500", "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"])}">${ssrInterpolate(spin.claimed ? "\u2713" : "\u23F3")}</div></div><div><h3 class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(spin.prize.name)}</h3>`);
          if (spin.prize.description) {
            _push(`<p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(spin.prize.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="text-xs text-gray-400 dark:text-gray-500 mt-1">${ssrInterpolate(formatDate(spin.date))}</p></div></div><div class="flex items-center space-x-2"><span class="${ssrRenderClass([spin.claimed ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}">${ssrInterpolate(spin.claimed ? "Reclamado" : "Pendiente")}</span>`);
          if (!spin.claimed) {
            _push(`<button${ssrIncludeBooleanAttr(unref(isClaimingPrize) === spin.id) ? " disabled" : ""} class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200">`);
            if (unref(isClaimingPrize) !== spin.id) {
              _push(`<span>Reclamar</span>`);
            } else {
              _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> ... </span>`);
            }
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (unref(pagination).totalPages > 1) {
          _push(`<div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-lg"><div class="flex flex-1 justify-between sm:hidden"><button${ssrIncludeBooleanAttr(!unref(pagination).hasPrevPage) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"> Anterior </button><button${ssrIncludeBooleanAttr(!unref(pagination).hasNextPage) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"> Siguiente </button></div><div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"><div><p class="text-sm text-gray-700 dark:text-gray-300"> Mostrando <span class="font-medium">${ssrInterpolate((unref(pagination).currentPage - 1) * 10 + 1)}</span> a <span class="font-medium">${ssrInterpolate(Math.min(unref(pagination).currentPage * 10, unref(pagination).totalSpins))}</span> de <span class="font-medium">${ssrInterpolate(unref(pagination).totalSpins)}</span> resultados </p></div><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"><button${ssrIncludeBooleanAttr(!unref(pagination).hasPrevPage) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></button><span class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">${ssrInterpolate(unref(pagination).currentPage)} / ${ssrInterpolate(unref(pagination).totalPages)}</span><button${ssrIncludeBooleanAttr(!unref(pagination).hasNextPage) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></button></nav></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/history.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=history-d57wN1b3.mjs.map
