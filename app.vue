<template>
  <v-app id="inspire">
    <Header/>
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <NavBar/>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
                min-height="70vh"
                rounded="lg"
                class="container"
            >
              <NuxtPage/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer class="footer" app="app" elevation="2"/>
  </v-app>
</template>

<script setup>
import {usePostsStore} from "./store";
import {storeToRefs} from "pinia";

const postsStore = usePostsStore()
const {searchString, category} = storeToRefs(postsStore)

const {data: categories} = await useLazyAsyncData('categories', () => $fetch('/api/categories'))
const {
  data: posts,
  pending,
  error
} = await useLazyAsyncData('posts',
    () => $fetch('/api/posts', {
          method: 'GET',
          params: {
            search: searchString.value,
            category: category.value
          }
        }
    ), {watch: [searchString, category]})

postsStore.setPosts(posts.value)
postsStore.setCategories(categories.value)

watch(posts, pos => postsStore.setPosts(pos))
watch(categories, cat => postsStore.setCategories(cat))
watch(pending, pend => postsStore.setLoading(pend))
watch(error, err => postsStore.setError(err))
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  background-color: #fafafa;
}

.footer {
  background-image: url("/assets/images/uzor.png");
  background-size: 50px;
  background-repeat: repeat-x;
  position: fixed;
  height: 20px;
  width: 100vw;
  bottom: 0;
  left: 0;
  z-index: 0;
}

</style>
