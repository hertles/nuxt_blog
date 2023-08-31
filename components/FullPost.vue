<template>
  <article v-if="post" class="post">
    <h1>{{ post.title }}</h1>
    <time class="post__date">{{ moment(post.date).format('DD.MM.YYYY HH:mm') }}</time>
    <p>{{ post.annotation }}</p>
    <p v-if="isServer">
      {{post.contentText}}
    </p>
    <client-only>
      <p v-html="post.content" class="post__content"/>
    </client-only>
  </article>
</template>

<script setup>
import moment from 'moment'

const props = defineProps({
  post: Object
})

const isServer = computed(()=>process.server)
</script>

<style lang="scss">
.post {
  &__date {
    color: #999;
    font-size: 14px;
  }

  &__image {
    margin: 10px 0;
    max-width: 100%;
  }
}
</style>
