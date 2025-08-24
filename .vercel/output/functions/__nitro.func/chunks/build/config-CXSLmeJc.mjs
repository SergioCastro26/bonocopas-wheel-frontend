import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
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
  __name: "config",
  __ssrInlineRender: true,
  setup(__props) {
    const { $api } = useNuxtApp();
    const config = ref({
      isActive: true,
      maxSpinsPerDay: 3,
      wheelSettings: {
        spinDuration: 3e3,
        colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]
      }
    });
    const isLoading = ref(true);
    const isSaving = ref(false);
    const showSuccess = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" }, _attrs))}><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900 dark:text-white"> \u2699\uFE0F Configuraci\xF3n de la Ruleta </h1><p class="mt-2 text-gray-600 dark:text-gray-400"> Gestiona la configuraci\xF3n general del sistema </p></div>`);
      if (unref(isLoading)) {
        _push(`<div class="flex justify-center items-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>`);
      } else {
        _push(`<div class="space-y-8"><div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4"> Estado de la Ruleta </h3><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(unref(config).isActive ? "La ruleta est\xE1 actualmente activa" : "La ruleta est\xE1 actualmente desactivada")}</p><p class="text-xs text-gray-500 dark:text-gray-500 mt-1"> Los usuarios ${ssrInterpolate(unref(config).isActive ? "pueden" : "no pueden")} girar la ruleta </p></div><button${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="${ssrRenderClass([unref(config).isActive ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700", "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"])}"><span class="${ssrRenderClass([unref(config).isActive ? "translate-x-5" : "translate-x-0", "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"])}"></span></button></div></div><div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4"> Configuraci\xF3n de Giros </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="maxSpinsPerDay" class="block text-sm font-medium text-gray-700 dark:text-gray-300"> M\xE1ximo de giros por d\xEDa </label><input id="maxSpinsPerDay"${ssrRenderAttr("value", unref(config).maxSpinsPerDay)} type="number" min="1" max="10" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"><p class="mt-1 text-xs text-gray-500 dark:text-gray-400"> N\xFAmero m\xE1ximo de giros que un usuario puede hacer por d\xEDa </p></div><div><label for="spinDuration" class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Duraci\xF3n del giro (ms) </label><input id="spinDuration"${ssrRenderAttr("value", unref(config).wheelSettings.spinDuration)} type="number" min="1000" max="10000" step="500" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"><p class="mt-1 text-xs text-gray-500 dark:text-gray-400"> Tiempo en milisegundos que dura la animaci\xF3n del giro </p></div></div></div><div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4"> Colores de la Ruleta </h3><div class="grid grid-cols-3 md:grid-cols-6 gap-4"><!--[-->`);
        ssrRenderList(unref(config).wheelSettings.colors, (color, index) => {
          _push(`<div class="flex flex-col items-center"><input${ssrRenderAttr("value", unref(config).wheelSettings.colors[index])} type="color" class="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"><span class="mt-2 text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(index + 1)}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="flex justify-end"><button${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">`);
        if (!unref(isSaving)) {
          _push(`<span>\u{1F4BE} Guardar Configuraci\xF3n</span>`);
        } else {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Guardando... </span>`);
        }
        _push(`</button></div>`);
        if (unref(showSuccess)) {
          _push(`<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-green-700 dark:text-green-400"> Configuraci\xF3n guardada exitosamente </p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(error)) {
          _push(`<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700 dark:text-red-400">${ssrInterpolate(unref(error))}</p></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/config.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=config-CXSLmeJc.mjs.map
