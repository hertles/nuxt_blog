<template>
  <div>
    <EditArticle v-if="editing" :article="article" :about="true" @apply="editAboutApply"/>
    <FullArticle v-else v-bind:article="article"></FullArticle>
    <div v-if="!editing" class="btn btn-secondary" @click="setEditing">Изменить</div>
  </div>
</template>

<script>

  export default {
    name: "about",
    data: () => ({
      editing: false,
      article: {
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
      },

    }),
    methods: {
      setEditing() {
        this.editing = true
      },
      editAboutApply(updatedArticle) {
        if (updatedArticle) {
          this.article = {...updatedArticle, paragraphs: [...updatedArticle.paragraphs]}
        }
        console.log(this.article.header)
        this.editing = false
      }
    }
  }
</script>

<style lang="scss" scoped>


</style>
