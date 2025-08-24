import { _ as __nuxt_component_0 } from './nuxt-link-Cs5tgPcn.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, createTextVNode, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import QRCodeVue3 from 'qrcode-vue3';
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

const _sfc_main$1 = {
  __name: "QRGenerator",
  __ssrInlineRender: true,
  setup(__props) {
    const showQR = ref(false);
    ref(null);
    const notification = ref({
      show: false,
      message: ""
    });
    const { $config } = useNuxtApp();
    const qrUrl = computed(() => {
      return "https://bonocopas.com/play";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6" }, _attrs))}><div class="flex items-center justify-between mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Generar C\xF3digo QR</h3><button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"> \u{1F517} Generar QR </button></div>`);
      if (unref(showQR)) {
        _push(`<div class="space-y-4"><div class="flex justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="bg-white p-4 rounded-lg shadow-sm">`);
        _push(ssrRenderComponent(unref(QRCodeVue3), {
          width: 200,
          height: 200,
          value: unref(qrUrl),
          qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "H" },
          imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
          dotsOptions: {
            type: "rounded",
            color: "#1f2937"
          },
          backgroundOptions: { color: "#ffffff" },
          cornersSquareOptions: { type: "extra-rounded", color: "#1f2937" },
          cornersDotOptions: { type: "dot", color: "#1f2937" }
        }, null, _parent));
        _push(`</div></div><div class="text-center space-y-2"><p class="text-sm text-gray-600 dark:text-gray-300"> URL del QR: <span class="font-mono text-blue-600 dark:text-blue-400">${ssrInterpolate(unref(qrUrl))}</span></p><p class="text-xs text-gray-500 dark:text-gray-400"> Escanea este c\xF3digo para acceder directamente a la ruleta </p></div><div class="flex justify-center space-x-3"><button class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span>Descargar QR</span></button><button class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><span>Copiar URL</span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(notification).show) {
        _push(`<div class="fixed top-4 right-4 z-50 max-w-sm"><div class="p-4 rounded-lg shadow-lg border-l-4 bg-green-50 border-green-500 text-green-800 transform transition-all duration-300"><div class="flex items-start"><div class="flex-shrink-0"><span class="text-green-500 text-xl">\u2705</span></div><div class="ml-3 flex-1"><p class="font-medium">${ssrInterpolate(unref(notification).message)}</p></div><button class="ml-4 text-gray-400 hover:text-gray-600 transition-colors"> \u2715 </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QRGenerator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { $api } = useNuxtApp();
    const stats = ref({});
    const config = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_QRGenerator = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" }, _attrs))}><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900 dark:text-white"> \u{1F39B}\uFE0F Panel de Administraci\xF3n </h1><p class="mt-2 text-gray-600 dark:text-gray-400"> Gestiona la configuraci\xF3n, premios y usuarios de BonoCopas </p></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"> Total Usuarios </dt><dd class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(stats).totalUsers || 0)}</dd></dl></div></div></div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"> Premios Activos </dt><dd class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(stats).activePrizes || 0)}</dd></dl></div></div></div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"> Total Giros </dt><dd class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(stats).totalSpins || 0)}</dd></dl></div></div></div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><div class="${ssrRenderClass([((_a = unref(config)) == null ? void 0 : _a.isActive) ? "bg-green-400" : "bg-red-400", "h-6 w-6 rounded-full"])}"></div></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"> Estado Ruleta </dt><dd class="text-lg font-medium text-gray-900 dark:text-white">${ssrInterpolate(((_b = unref(config)) == null ? void 0 : _b.isActive) ? "Activa" : "Inactiva")}</dd></dl></div></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/config",
        class: "group relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><span class="rounded-lg inline-flex p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-4 ring-white dark:ring-gray-800"${_scopeId}><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></span></div><div class="mt-8"${_scopeId}><h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"${_scopeId}><span class="absolute inset-0" aria-hidden="true"${_scopeId}></span> Configuraci\xF3n </h3><p class="mt-2 text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Ajustar configuraci\xF3n de la ruleta </p></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", { class: "rounded-lg inline-flex p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-4 ring-white dark:ring-gray-800" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-6 w-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    }),
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    })
                  ]))
                ])
              ]),
              createVNode("div", { class: "mt-8" }, [
                createVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400" }, [
                  createVNode("span", {
                    class: "absolute inset-0",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Configuraci\xF3n ")
                ]),
                createVNode("p", { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, " Ajustar configuraci\xF3n de la ruleta ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/prizes",
        class: "group relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><span class="rounded-lg inline-flex p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 ring-4 ring-white dark:ring-gray-800"${_scopeId}><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"${_scopeId}></path></svg></span></div><div class="mt-8"${_scopeId}><h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400"${_scopeId}><span class="absolute inset-0" aria-hidden="true"${_scopeId}></span> Gestionar Premios </h3><p class="mt-2 text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Crear, editar y eliminar premios de la ruleta </p></div><span class="pointer-events-none absolute top-6 right-6 text-gray-300 dark:text-gray-600 group-hover:text-purple-400" aria-hidden="true"${_scopeId}><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"${_scopeId}></path></svg></span>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", { class: "rounded-lg inline-flex p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 ring-4 ring-white dark:ring-gray-800" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-6 w-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    })
                  ]))
                ])
              ]),
              createVNode("div", { class: "mt-8" }, [
                createVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400" }, [
                  createVNode("span", {
                    class: "absolute inset-0",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Gestionar Premios ")
                ]),
                createVNode("p", { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, " Crear, editar y eliminar premios de la ruleta ")
              ]),
              createVNode("span", {
                class: "pointer-events-none absolute top-6 right-6 text-gray-300 dark:text-gray-600 group-hover:text-purple-400",
                "aria-hidden": "true"
              }, [
                (openBlock(), createBlock("svg", {
                  class: "h-6 w-6",
                  fill: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", { d: "M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" })
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/users",
        class: "group relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><span class="rounded-lg inline-flex p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 ring-4 ring-white dark:ring-gray-800"${_scopeId}><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"${_scopeId}></path></svg></span></div><div class="mt-8"${_scopeId}><h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400"${_scopeId}><span class="absolute inset-0" aria-hidden="true"${_scopeId}></span> Gestionar Usuarios </h3><p class="mt-2 text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Ver usuarios y sus actividades </p></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", { class: "rounded-lg inline-flex p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 ring-4 ring-white dark:ring-gray-800" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-6 w-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    })
                  ]))
                ])
              ]),
              createVNode("div", { class: "mt-8" }, [
                createVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400" }, [
                  createVNode("span", {
                    class: "absolute inset-0",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Gestionar Usuarios ")
                ]),
                createVNode("p", { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, " Ver usuarios y sus actividades ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="group relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"><div><span class="rounded-lg inline-flex p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 ring-4 ring-white dark:ring-gray-800"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg></span></div><div class="mt-8"><h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400"> C\xF3digo QR </h3><p class="mt-2 text-sm text-gray-500 dark:text-gray-400"> Generar QR para acceso directo </p></div></div></div><div class="mt-8">`);
      _push(ssrRenderComponent(_component_QRGenerator, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CaeEKgmo.mjs.map
