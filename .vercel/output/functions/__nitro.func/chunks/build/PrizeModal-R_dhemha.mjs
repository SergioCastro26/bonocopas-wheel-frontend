import { ref, computed, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderVNode, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useNuxtApp } from './server.mjs';

const _sfc_main$1 = {
  __name: "WheelSpinner",
  __ssrInlineRender: true,
  emits: ["prize-won"],
  setup(__props, { emit: __emit }) {
    const { $api } = useNuxtApp();
    const emit = __emit;
    const Roulette = ref(null);
    const wheel = ref(null);
    const isSpinning = ref(false);
    const canSpin = ref(true);
    const nextSpinTime = ref(null);
    const timeUntilNextSpin = ref("");
    const currentSpin = ref(null);
    const notification = ref({
      show: false,
      type: "info",
      // success, error, warning, info
      title: "",
      message: ""
    });
    const showNotification = (type, title, message = "") => {
      notification.value = {
        show: true,
        type,
        title,
        message
      };
      setTimeout(() => {
        hideNotification();
      }, 5e3);
    };
    const hideNotification = () => {
      notification.value.show = false;
    };
    const prizes = ref([
      { id: 1, name: "Premio 1", color: "#FF6B6B" },
      { id: 2, name: "Premio 2", color: "#4ECDC4" },
      { id: 3, name: "Premio 3", color: "#45B7D1" },
      { id: 4, name: "Premio 4", color: "#96CEB4" },
      { id: 5, name: "Premio 5", color: "#FFEAA7" },
      { id: 6, name: "Premio 6", color: "#DDA0DD" },
      { id: 7, name: "Premio 7", color: "#FF8A80" },
      { id: 8, name: "Premio 8", color: "#82B1FF" }
    ]);
    const rouletteItems = computed(() => {
      return prizes.value.map((prize, index) => ({
        id: prize.id,
        name: prize.name,
        htmlContent: prize.name,
        textColor: "black",
        background: prize.color
      }));
    });
    const onWheelStart = () => {
      console.log("Wheel started spinning");
      showNotification("info", "\u{1F3AF} Girando...", "La ruleta est\xE1 girando, \xA1buena suerte!");
    };
    const onWheelEnd = (result) => {
      var _a;
      console.log("Wheel stopped at:", result);
      isSpinning.value = false;
      if (currentSpin.value) {
        const prizeName = ((_a = currentSpin.value.prize) == null ? void 0 : _a.name) || "Premio desconocido";
        showNotification("success", "\u{1F389} \xA1Felicidades!", `Has ganado: ${prizeName}`);
        emit("prize-won", currentSpin.value);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center space-y-8" }, _attrs))}><div class="relative"><div class="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"><div class="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-600 filter drop-shadow-lg"></div></div>`);
      if (unref(Roulette)) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Roulette)), {
          ref_key: "wheel",
          ref: wheel,
          items: unref(rouletteItems),
          size: 400,
          duration: 3,
          "display-shadow": true,
          "display-border": true,
          "display-indicator": false,
          "centered-indicator": false,
          "base-display": true,
          "base-display-indicator": false,
          "base-display-shadow": true,
          "indicator-position": "top",
          easing: "ease",
          onWheelStart,
          onWheelEnd
        }, null), _parent);
      } else {
        _push(`<div class="w-96 h-96 rounded-full border-8 border-gray-300 animate-pulse flex items-center justify-center"><div class="text-gray-500">Cargando ruleta...</div></div>`);
      }
      _push(`</div><button${ssrIncludeBooleanAttr(unref(isSpinning) || !unref(canSpin)) ? " disabled" : ""} class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">`);
      if (!unref(isSpinning)) {
        _push(`<span>\u{1F3AF} \xA1Girar Ruleta!</span>`);
      } else {
        _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Girando... </span>`);
      }
      _push(`</button>`);
      if (unref(nextSpinTime)) {
        _push(`<div class="text-center"><p class="text-sm text-gray-600 dark:text-gray-400"> Pr\xF3ximo giro disponible en: ${ssrInterpolate(unref(timeUntilNextSpin))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(notification).show) {
        _push(`<div class="fixed top-4 right-4 z-50 max-w-sm"><div class="${ssrRenderClass([
          "p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300",
          unref(notification).type === "success" ? "bg-green-50 border-green-500 text-green-800" : "",
          unref(notification).type === "error" ? "bg-red-50 border-red-500 text-red-800" : "",
          unref(notification).type === "warning" ? "bg-yellow-50 border-yellow-500 text-yellow-800" : "",
          unref(notification).type === "info" ? "bg-blue-50 border-blue-500 text-blue-800" : ""
        ])}"><div class="flex items-start"><div class="flex-shrink-0">`);
        if (unref(notification).type === "success") {
          _push(`<span class="text-green-500 text-xl">\u2705</span>`);
        } else if (unref(notification).type === "error") {
          _push(`<span class="text-red-500 text-xl">\u274C</span>`);
        } else if (unref(notification).type === "warning") {
          _push(`<span class="text-yellow-500 text-xl">\u26A0\uFE0F</span>`);
        } else if (unref(notification).type === "info") {
          _push(`<span class="text-blue-500 text-xl">\u2139\uFE0F</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="ml-3 flex-1"><p class="font-medium">${ssrInterpolate(unref(notification).title)}</p>`);
        if (unref(notification).message) {
          _push(`<p class="mt-1 text-sm opacity-90">${ssrInterpolate(unref(notification).message)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="ml-4 text-gray-400 hover:text-gray-600 transition-colors"> \u2715 </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WheelSpinner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "PrizeModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    spin: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "prize-claimed"],
  setup(__props, { emit: __emit }) {
    const { $api } = useNuxtApp();
    const props = __props;
    const isClaimingPrize = ref(false);
    const prize = computed(() => {
      var _a;
      return (_a = props.spin) == null ? void 0 : _a.prize;
    });
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 z-50 overflow-y-auto",
          "aria-labelledby": "modal-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"><div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div><div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 animate-bounce-in"><div class="sm:flex sm:items-start"><div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 sm:mx-0 sm:h-10 sm:w-10"><svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title"> \u{1F389} \xA1Felicitaciones! </h3><div class="mt-2"><p class="text-sm text-gray-500 dark:text-gray-400"> Has ganado un premio incre\xEDble: </p><div class="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700"><h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${ssrInterpolate((_a = unref(prize)) == null ? void 0 : _a.name)}</h4>`);
        if ((_b = unref(prize)) == null ? void 0 : _b.description) {
          _push(`<p class="text-gray-600 dark:text-gray-300">${ssrInterpolate(unref(prize).description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mt-4 text-xs text-gray-500 dark:text-gray-400"><p>Fecha: ${ssrInterpolate(formatDate((_c = __props.spin) == null ? void 0 : _c.date))}</p><p>ID del giro: ${ssrInterpolate((_d = __props.spin) == null ? void 0 : _d.id)}</p></div></div></div></div><div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"><button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"${ssrIncludeBooleanAttr(unref(isClaimingPrize)) ? " disabled" : ""}>`);
        if (!unref(isClaimingPrize)) {
          _push(`<span>\u{1F381} Reclamar Premio</span>`);
        } else {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Reclamando... </span>`);
        }
        _push(`</button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"> Cerrar </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PrizeModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=PrizeModal-R_dhemha.mjs.map
