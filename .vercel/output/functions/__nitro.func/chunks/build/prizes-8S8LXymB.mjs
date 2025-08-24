import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { u as useNuxtApp } from './server.mjs';
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
  __name: "prizes",
  __ssrInlineRender: true,
  setup(__props) {
    const { $api } = useNuxtApp();
    const prizes = ref([]);
    const isLoading = ref(true);
    const showModal = ref(false);
    const isEditing = ref(false);
    const isSaving = ref(false);
    const currentPrize = ref({
      name: "",
      description: "",
      probability: 0,
      stock: 0,
      isActive: true
    });
    const activePrizes = computed(() => prizes.value.filter((p) => p.isActive).length);
    const totalStock = computed(() => prizes.value.reduce((sum, p) => sum + p.stock, 0));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" }, _attrs))}><div class="flex items-center justify-between mb-8"><div><h1 class="text-3xl font-bold text-gray-900 dark:text-white"> \u{1F3C6} Gesti\xF3n de Premios </h1><p class="mt-2 text-gray-600 dark:text-gray-400"> Administra los premios de la ruleta </p></div><button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Nuevo Premio </button></div>`);
      if (unref(isLoading)) {
        _push(`<div class="flex justify-center items-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>`);
      } else {
        _push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"> Total Premios </dt><dd class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(prizes).length)}</dd></dl></div></div></div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"> Premios Activos </dt><dd class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(activePrizes))}</dd></dl></div></div></div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"> Stock Total </dt><dd class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(totalStock))}</dd></dl></div></div></div></div></div><div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md"><div class="px-4 py-5 sm:p-6"><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"><thead class="bg-gray-50 dark:bg-gray-700"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"> Premio </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"> Probabilidad </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"> Stock </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"> Estado </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"> Acciones </th></tr></thead><tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"><!--[-->`);
        ssrRenderList(unref(prizes), (prize) => {
          _push(`<tr><td class="px-6 py-4 whitespace-nowrap"><div><div class="text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(prize.name)}</div>`);
          if (prize.description) {
            _push(`<div class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(prize.description)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div class="text-sm text-gray-900 dark:text-white">${ssrInterpolate(prize.probability)}%</div><div class="ml-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div class="bg-blue-600 h-2 rounded-full" style="${ssrRenderStyle({ width: `${Math.min(prize.probability, 100)}%` })}"></div></div></div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${ssrInterpolate(prize.stock)}</td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([prize.isActive ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}">${ssrInterpolate(prize.isActive ? "Activo" : "Inactivo")}</span></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-4"> Editar </button><button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"> Eliminar </button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div></div></div>`);
      }
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"><div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div><div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"><div><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">${ssrInterpolate(unref(isEditing) ? "Editar Premio" : "Crear Nuevo Premio")}</h3><form class="space-y-4"><div><label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Nombre del Premio </label><input id="name"${ssrRenderAttr("value", unref(currentPrize).name)} type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"></div><div><label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Descripci\xF3n (opcional) </label><textarea id="description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm">${ssrInterpolate(unref(currentPrize).description)}</textarea></div><div class="grid grid-cols-2 gap-4"><div><label for="probability" class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Probabilidad (%) </label><input id="probability"${ssrRenderAttr("value", unref(currentPrize).probability)} type="number" min="0" max="100" step="0.1" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"></div><div><label for="stock" class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Stock </label><input id="stock"${ssrRenderAttr("value", unref(currentPrize).stock)} type="number" min="0" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"></div></div><div class="flex items-center"><input id="isActive"${ssrIncludeBooleanAttr(Array.isArray(unref(currentPrize).isActive) ? ssrLooseContain(unref(currentPrize).isActive, null) : unref(currentPrize).isActive) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><label for="isActive" class="ml-2 block text-sm text-gray-900 dark:text-white"> Premio activo </label></div><div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"><button type="submit"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm disabled:opacity-50">`);
        if (!unref(isSaving)) {
          _push(`<span>${ssrInterpolate(unref(isEditing) ? "Actualizar" : "Crear")}</span>`);
        } else {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> ${ssrInterpolate(unref(isEditing) ? "Actualizando..." : "Creando...")}</span>`);
        }
        _push(`</button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"> Cancelar </button></div></form></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/prizes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=prizes-8S8LXymB.mjs.map
