import { n as executeAsync } from '../_/nitro.mjs';
import { d as defineNuxtRouteMiddleware, n as navigateTo, c as createError } from './server.mjs';
import { u as useAuth } from './useAuth-C8pkQ0uR.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const admin = defineNuxtRouteMiddleware(async (to, from) => {
  var _a;
  let __temp, __restore;
  const { user, checkAuth } = useAuth();
  if (!user.value) {
    const isAuthenticated = ([__temp, __restore] = executeAsync(() => checkAuth()), __temp = await __temp, __restore(), __temp);
    if (!isAuthenticated) {
      return navigateTo("/login");
    }
  }
  if (((_a = user.value) == null ? void 0 : _a.role) !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Access denied. Admin privileges required."
    });
  }
});

export { admin as default };
//# sourceMappingURL=admin-D0jPtTM8.mjs.map
