<template>
  <div class="article">
    <nuxt-link :to="`article/${article.id}`">
      <h2 class="mb-1">{{ article.header }}</h2>
      <div>{{ article.paragraphs[0].text.substr(0, 250) }}</div>
    </nuxt-link>
  </div>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
  }
})


</script>

<style scoped>
.article {
  margin-bottom: 10px;
  width: 50%;
}
</style>
