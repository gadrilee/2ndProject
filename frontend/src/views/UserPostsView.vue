<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePostsStore } from "@/stores/posts";
import { useAuthStore } from "@/stores/auth";

import PageTitle from "@/components/PageTitle.vue";
import DataTable from "@/components/DataTable.vue";
import Modal from "@/components/Modal.vue";
import StateBadge from "@/components/StateBadge.vue";
import PostForm from "@/components/PostForm.vue";

const authStore = useAuthStore();
const postsStore = usePostsStore();
const { posts, loading, error } = storeToRefs(postsStore);

const isModalOpen = ref(false);
const selectedPost = ref(null);

function openCreateModal() {
    selectedPost.value = null;
    isModalOpen.value = true;
}

function openEditModal(post) {
    selectedPost.value = { ...post };
    isModalOpen.value = true;
}

async function handleDelete(id) {
    if (!confirm("¿Deseas eliminar esta publicación?")) return;
    try {
        await postsStore.deletePost(id);
    } catch (err) {
        alert(err.message);
    }
}

onMounted(() => {
    postsStore.fetchPosts();
});
</script>

<template>
    <div class="mx-auto max-w-6xl p-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <PageTitle title="Mis publicaciones" subtitle="Gestión de artículos para hacer trueque." />
            <button @click="openCreateModal" class="btn btn-primary shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Nueva publicación
            </button>
        </div>

        <DataTable :items="posts" :loading="loading" :error="error" :colspan="5"
            empty-message="No hay productos publicados.">
            <template #header>
                <th class="w-16">ID</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th class="text-center w-32">Acciones</th>
            </template>

            <tr v-for="post in posts" :key="post.id" class="hover">
                <td class="font-mono text-xs opacity-70">#{{ post.id }}</td>
                <td class="font-semibold text-base-content">{{ post.title }}</td>
                <td>
                    <span class="badge badge-outline badge-sm">{{ post.type }}</span>
                </td>
                <td>
                    <StateBadge :state="post.state" />
                </td>
                <td class="text-center">
                    <div v-if="!post.userId || post.userId === authStore.user?.id" class="inline-flex gap-2">
                        <button @click="openEditModal(post)" class="btn btn-square btn-ghost btn-sm text-info"
                            title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button @click="handleDelete(post.id)" class="btn btn-square btn-ghost btn-sm text-error"
                            title="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                    <span v-else class="text-xs opacity-50 italic">Solo lectura</span>
                </td>
            </tr>
        </DataTable>

        <Modal v-model="isModalOpen" :title="selectedPost ? 'Editar publicación' : 'Nueva publicación'">
            <PostForm :post="selectedPost" @saved="isModalOpen = false" @cancel="isModalOpen = false" />
        </Modal>
    </div>
</template>