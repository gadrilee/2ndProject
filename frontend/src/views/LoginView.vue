<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function handleLogin() {
    error.value = "";
    loading.value = true;

    try {
        await auth.login(
            email.value,
            password.value,
        );

        router.push({ name: "dashboard" });
    } catch (err) {
        error.value = err.message || "Credenciales inválidas";
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
        <div class="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
            <div class="card-body">

                <div class="text-center mb-4">
                    <h1 class="text-3xl font-extrabold text-primary">Trueque U</h1>
                    <h2 class="text-xl font-semibold mt-1">Iniciar Sesión</h2>
                </div>

                <div v-if="error" class="alert alert-error shadow-sm text-sm py-2 px-3 mb-2">

                    <span>{{ error }}</span>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4">

                    <div class="form-control">
                        <label class="label" for="email">
                            <span class="label-text font-medium">Correo electrónico</span>
                        </label>
                        <input v-model="email" id="email" type="email" placeholder="tu-correo@ejemplo.com"
                            class="input input-bordered w-full focus:input-primary" required />
                    </div>

                    <div class="form-control">
                        <div class="flex items-center justify-between">
                            <label class="label" for="password">
                                <span class="label-text font-medium">Contraseña</span>
                            </label>
                            <RouterLink to="/recover" class="text-xs link link-hover hover:text-primary">
                                ¿Olvidaste tu contraseña?
                            </RouterLink>
                        </div>
                        <input v-model="password" id="password" type="password" placeholder="••••••••"
                            class="input input-bordered w-full focus:input-primary" required />
                    </div>

                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-primary w-full shadow-md" :disabled="loading">
                            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                            {{ loading ? "Ingresando..." : "Ingresar" }}
                        </button>
                    </div>
                </form>

                <div class="divider text-sm my-4">O</div>

                <p class="text-center text-sm">
                    ¿No tienes una cuenta?
                    <RouterLink :to="{ name: 'register' }" class="link link-primary font-semibold">
                        Regístrate
                    </RouterLink>
                </p>

            </div>
        </div>
    </div>
</template>