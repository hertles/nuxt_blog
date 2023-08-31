<template>
  <div class="post-list">
    <DataLoadingWrapper
        :loading="postsStore.loading"
        :error="postsStore.error"
        :none="!postsStore.posts"
        noneMessage="Постов по данному запросу не найдено"
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

const postsStore = usePostsStore()
onMounted(()=> {
  console.log(postsStore.posts)
})

</script>

<style scoped lang="scss">
.post-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
