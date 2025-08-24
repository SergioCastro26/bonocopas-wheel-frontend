import { u as useNuxtApp, n as navigateTo } from './server.mjs';
import { ref, computed, readonly } from 'vue';

const useAuth = () => {
  const { $api } = useNuxtApp();
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => {
    var _a;
    return ((_a = user.value) == null ? void 0 : _a.role) === "admin";
  });
  const isLoading = ref(false);
  const login = async (email) => {
    var _a, _b;
    try {
      isLoading.value = true;
      const response = await $api.post("/auth/login", { email }, {
        withCredentials: true
      });
      user.value = response.data.user;
      return { success: true, user: response.data.user };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Login failed"
      };
    } finally {
      isLoading.value = false;
    }
  };
  const logout = async () => {
    try {
      await $api.post("/auth/logout", {}, {
        withCredentials: true
      });
      user.value = null;
      await navigateTo("/login");
    } catch (error) {
      console.error("Logout error:", error);
      user.value = null;
      await navigateTo("/login");
    }
  };
  const checkAuth = async () => {
    try {
      const response = await $api.get("/auth/me", {
        withCredentials: true
      });
      user.value = response.data.user;
      return true;
    } catch (error) {
      user.value = null;
      return false;
    }
  };
  return {
    user: readonly(user),
    isLoggedIn,
    isAdmin,
    isLoading: readonly(isLoading),
    login,
    logout,
    checkAuth
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-C8pkQ0uR.mjs.map
