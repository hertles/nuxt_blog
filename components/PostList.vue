<template>
  <div class="post-list">
<!--    <form class="post-list__form" @change="changeCategory">
      <v-text-field
          class="post-list__search-field"
          max-width="80%"
          v-model="searchString"
          label="Начните искать..."
      />
      <v-select
          class="post-list__select-category-field"
          max-width="20%"
          v-model="category"
          :items="categories"
          item-title="name"
          item-value="id"
          label="Категории"
      />
    </form>-->
    <DataLoadingWrapper
        :loading="postsStore.loading"
        :error="postsStore.error"
        :none="postsStore.posts.length===0"
        noneMessage="Постов не найдено"
    >
      <PostPreview
          v-for="post in postsStore.posts"
          :post="post"
      />
    </DataLoadingWrapper>
  </div>
</template>

<script setup>
import {usePostsStore} from "../store";

const router = useRouter()
const route = useRoute()

const postsStore = usePostsStore()

/*const {pending} = useLazyAsyncData('posts', async () => {
  const response = await fetch(`/api/posts?search=${searchString.value}&category=${category.value}`)
  const newPosts = await response.json()
  postsStore.loadPosts(newPosts)
})*/




</script>

<style scoped lang="scss">
.post-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
