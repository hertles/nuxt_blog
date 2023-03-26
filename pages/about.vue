<template>
  <div>
    <EditArticle v-if="editing" :article="article" :about="true" @apply="editAboutApply"/>
    <FullArticle v-else v-bind:article="article"></FullArticle>
    <div v-if="!editing" class="btn btn-secondary" @click="setEditing">Изменить</div>
  </div>
</template>

<script setup>
import FullArticle from '../components/FullArticle'
import EditArticle from '../components/EditArticle'
let editing = ref(false)
const setEditing = () => {
  editing.value = true
}

let article = reactive({
  header: "Обо мне",
  paragraphs: [
    {
      id: 0,
      header: "Заголовок параграфа 1",
      text: "Информация обо мне",
      picture: ""
    },
    {
      id: 1,
      header: "Заголовок параграфа 2",
      text: "Ещё информации",
      picture: ""
    }]
})
const editAboutApply = (updatedArticle) => {
  if (updatedArticle) {
    article.value = {...updatedArticle, paragraphs: [...updatedArticle.paragraphs]}
  }
  editing.value = false
}
</script>

<style lang="scss" scoped>


</style>
