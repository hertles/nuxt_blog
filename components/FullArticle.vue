<template>
  <div class="mb-4">
    <h1 class="mb-3">{{article.header}}</h1>
    <div class="mb-3 article" v-for="paragraph in article.paragraphs" :key="paragraph.id"><h2 class="article__header">{{paragraph.header}}</h2>
      <div class="article__body">{{paragraph.text}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FullArticle",
    props: {
      article: {
        type: Object,
        required: true
      }
    },

    data: () => ({

    }),
    methods: {

    },
    mounted() {
      console.log(this.article.article)
    }
  }
</script>

<style scoped>
  .article__body{
    white-space: pre-line;
  }
</style>
