<template>
  <div>
    <h1 class="mb-3">Зенковъ</h1>
    <div v-for="article in articles"><ArticlePreview :article="article" :key="article.id"/></div>
  </div>
</template>

<script>
  import ArticlePreview from "../components/ArticlePreview";
  import {LoremIpsum} from "lorem-ipsum";
  export default {
    name: 'IndexPage',
    components: {
      ArticlePreview,
    },
    data: () => ({
      articles: [],
      /*articles: [{
        id: 0,
        header: "Статья",
        paragraphs: [
          {
            header: 'Параграф 1',
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores consequuntur, dicta dolorum est ex hic libero minus molestiae, nisi officia placeat quae saepe sequi sit velit veritatis vero voluptatibus!"
          },
          {
            header: 'Параграф 2',
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid architecto, aut dolore dolores ea eum hic illo, iste magnam nostrum, odio officiis omnis repellat saepe sequi unde voluptates voluptatum. Accusantium aut distinctio, doloremque enim illo iure labore repellat repellendus."
          },
          {
            header: 'Параграф 3',
            text: "Lorem ipsum dolor sit amet, dicta dolorum est ex hic libero minus molestiae, nisi officia placeat quae saepe sequi sit velit veritatis vero voluptatibus!"
          },
          {
            header: 'Параграф 4',
            text: "Lorem ipsum dolor sit amet, est ex hic libero minus molestiae, nisi officia placeat quae saepe sequi sit velit veritatis vero voluptatibus!"
          },
          {
            header: 'Параграф 5',
            text: "adipisicing elit. Alias, dicta dolorum est ex hic libero minus molestiae, nisi officia placeat quae saepe sequi sit velit veritatis vero voluptatibus!"
          },
          {
            header: 'Параграф 6',
            text: "dolor sit amet, consectetur  est ex hic libero minus molestiae, nisi officia placeat quae saepe sequi sit velit veritatis vero voluptatibus!"
          }]
      }]*/
    }),
    created() {
      const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4
        },
        wordsPerSentence: {
          max: 20,
          min: 10
        }
      });
      for (let ii=0; ii<50; ii++){
        this.articles.push({id: Date.now(), header: lorem.generateWords(3), paragraphs: [{id: Date.now(), header: "Параграф", text: lorem.generateSentences(3)}]})
      }
    }
  }
</script>

<style lang="scss">
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  h2 {
    font-size: 20px;
  }
  body {

  }
  input[type="text"], textarea {
    border-radius: 10px;
  }

/*  input[type="text"] {
    outline: 1px solid black;
    padding: 10px;
  }

  input[type="text"], textarea:active {
    outline: none;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    text-decoration: none;
    color: black;
  }*/

  .btn {
    padding: 10px;
    border-radius: 10px;
    min-width: 100px;
  }
</style>
