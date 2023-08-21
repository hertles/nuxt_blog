<template>
  <div v-if="loading" class="data-loading-wrapper">Загрузка...</div>
  <div v-else-if="error" class="data-loading-wrapper">Ошибка загрузки данных</div>
  <div v-else-if="none" class="data-loading-wrapper">{{ noneMessage }}</div>
  <slot v-else/>
</template>
<script setup>
  const props = defineProps({
    loading: Boolean,
    error: Object,
    none: Boolean,
    noneMessage: String
  })
</script>
<style scoped lang="scss">
.data-loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
