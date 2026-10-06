import { defineStore } from "pinia";
import { computed, ref } from "vue";

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore("auth", () => {
    const token = ref(localStorage.getItem("token"));
    const user = ref(
        JSON.parse(localStorage.getItem("user")) || null,
    );

    const isAuthenticated = computed(() => !!token.value);

    async function register(credentials) {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || data.error || "Error al registrar la cuenta",
            );
        }

        return data;
    }

    async function login(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || data.error || "Error al iniciar sesión",
            );
        }

        token.value = data.token;
        user.value = data.user;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        return data;
    }

    function logout() {
        token.value = null;
        user.value = null;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    async function getProfile() {
        const response = await fetch(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            logout();
            throw new Error(data.message || data.error || "Sesión inválida");
        }

        user.value = data.user;
        localStorage.setItem("user", JSON.stringify(data.user));

        return data.user;
    }

    return {
        token,
        user,
        isAuthenticated,
        register,
        login,
        logout,
        getProfile,
    };
});
