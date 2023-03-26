<template>
  <h1>Пост №{{ articleId }}</h1>
</template>

<script setup>
  const route = useRoute()
  const articleId = route.params.id
</script>

<style scoped>

</style>
