<template>
  <section class="admin-panel">
      <v-btn
          variant="tonal"
          elevation="4"
          @click="$router.push('admin/posts/create')"
      >
        + Создать новый пост
      </v-btn>
      <DataLoadingWrapper
          :loading="postsStore.loading"
          :error="postsStore.error"
          :none="!postsStore.posts"
          noneMessage="Постов по данному запросу не найдено"
      >
        <PostPreviewAdmin
            v-for="post in postsStore.posts"
            :post="post"
        />
      </DataLoadingWrapper>
  </section>
</template>

<script setup>
import {usePostsStore} from "../../store";

const postsStore = usePostsStore()
</script>

<style scoped lang="scss">
.admin-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  &__header {
    display: block;
  }
}
</style>
