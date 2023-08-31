<template>
  <v-list rounded="lg" v-if="$route.path.includes('admin')">
    <v-list-item @click="$router.push('/admin')">
      <v-list-item-title>
        Мои посты
      </v-list-item-title>
    </v-list-item>
    <v-divider class="my-2"></v-divider>
    <v-list-item @click="$router.push('/')">
      <v-list-item-title>
        Выйти
      </v-list-item-title>
    </v-list-item>
  </v-list>
  <v-list rounded="lg" v-else>
    <v-list-item
        v-for="category in postsStore.categories"
        :key="category.id"
        @click="()=>searchCategory(category.id)"
    >
      <v-list-item-title>
        {{ category.name }}
      </v-list-item-title>
    </v-list-item>

    <v-divider class="my-2"></v-divider>

    <v-list-item
        link
        color="grey-lighten-4"
    >
      <v-list-item-title>
        Обо мне
      </v-list-item-title>
    </v-list-item>
    <v-list-item
        link
        color="grey-lighten-4"
    >
      <v-list-item-title>
        Контакты
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import {usePostsStore} from "../store";

const postsStore = usePostsStore()
const router = useRouter()
const route = useRoute()

const admin = ref(false)

watch(route, route => {
  admin.value = route.path.includes("admin")
})
const searchCategory = (id) => {
  postsStore.setCategory(id)
  postsStore.setSearch("")
  router.push("/")
}
</script>

<style scoped>

</style>
