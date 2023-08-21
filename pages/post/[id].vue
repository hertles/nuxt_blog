<template>
  <div>
    <DataLoadingWrapper :error="error" :loading="pending" :none="!post" none-message="Пост не найден">
      <article class="post">
        <h1>{{ post.title }}</h1>
        <time class="post__date">{{ moment(post.date).format('DD.MM.YYYY hh:mm') }}</time>
        <p>{{ post.annotation }}</p>
        <p>{{ post.content }}</p>
      </article>
    </DataLoadingWrapper>
  </div>
</template>

<script setup>
import moment from "moment";

const route = useRoute()
const postId = route.params.id
const {data: post, error, pending} = await useLazyAsyncData("post",
    () => $fetch(`/api/posts/${postId}`)
)
</script>

<style scoped lang="scss">
.post {
  &__date {
    color: #999;
    font-size: 14px;
  }
}
</style>
