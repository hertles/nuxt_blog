<template>
  <DataLoadingWrapper :error="error" :loading="pending" :none="!post" none-message="Пост не найден">
    <FullPost :post="post"/>
  </DataLoadingWrapper>
</template>

<script setup>
const route = useRoute()
const postId = route.params.id
const {data: post, error, pending} = await useLazyAsyncData("post",
    () => $fetch(`/api/posts/${postId}`)
)
</script>

<style scoped lang="scss">

</style>
