<template>
  <form>
    <div class="mb-3" v-if="about"><label for="mainHeader">Заголовок статьи</label>
      <input autocomplete="off"
            id="mainHeader"
             placeholder="Пустой заголовок"
             type="text"
             v-model="editingArticle.header"></div>
    <div class="mb-3" v-if="editingArticle.paragraphs" v-for="(input, index) in editingArticle.paragraphs">
      <div class="edit__header"><h2 :class="!input.header && 'gray'"><label :for="`header${index}`">{{input.header ? input.header : "(Параграф без заголовка)"}}</label></h2>
        <input autocomplete="off"
          :id="`header${index}`"
               placeholder="Пустой заголовок"
               type="text"
               v-model="input.header">
        </div>
      <label class="inputLabel stacked" data-value="">
        <textarea wrap="hard" v-model="input.text" oninput="this.parentNode.dataset.value = this.value"
                  class="editInput" placeholder="Текст параграфа"></textarea>
      </label>
      <div class="btn btn-secondary uploadImageButton" ref="dropzone">Загрузить изображение</div>
      <div class="btn btn-danger" @click="()=>deleteParagraph(input.id)">Удалить параграф</div>

    </div>
    <div class="mb-3">
      <button type="button" class="btn btn-secondary" @click.prevent="addParagraph">Добавить параграф</button>
      <button type="submit" class="btn btn-primary" @click.prevent="editArticle">ОК</button>
      <button type="button" class="btn btn-danger" @click.prevent="cancelEditing">Отмена</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: "EditArticle",
    props: {
      article: {
        type: Object,
        required: true
      },
      about: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      editingArticle: {
        header: null,
        paragraphs: null
      }
    }),
    methods: {
      cancelEditing() {
        this.editingArticle = null
        this.$emit('apply')
      },
      editArticle() {
        let updatedParagraphs = this.editingArticle.paragraphs.map(input => {
          return {...input, text: input.text};
        })
        this.$emit('apply', {...this.editingArticle, paragraphs: updatedParagraphs})
      },
      deleteParagraph(id) {
        this.editingArticle.paragraphs = this.editingArticle.paragraphs.filter(input => input.id !== id)
      },
      addParagraph() {
        //this.aboutInputs.push({id: Date.now(), header: "", text: "", picture: ""})
        this.editingArticle.paragraphs.push({id: Date.now(), header: "", text: "", picture: ""})
      },
      handleFileUpload() {
        //this.abouts.picture = this.$refs.file.files[0];
      },

    },
    beforeMount() {
      this.editingArticle = {...this.article, paragraphs: [...this.article.paragraphs]}
    }
  }
</script>

<style scoped lang="scss">
  .inputLabel {
    display: grid;
    vertical-align: top;
    align-items: center;
    position: relative;
    border: solid 1px;
    padding: 0.25em 0.5em;
    border-radius: 10px;

    &.stacked {
      padding: 0.5em;
      align-items: stretch;

      &::after,
      input,
      textarea {
        grid-area: 2 / 1;
      }
    }

    &::after,
    input,
    textarea {
      width: auto;
      min-width: 1em;
      grid-area: 1 / 2;
      font: inherit;
      padding: 0.25em;
      margin: 0;
      resize: none;
      background: none;
      appearance: none;
      border: none;
      white-space: pre-wrap;
    }

    span {
      padding: 0.25em;
    }

    &::after {
      content: attr(data-value) " ";
      visibility: hidden;
      white-space: pre-wrap;
    }

    &:focus-within {

      textarea:focus,
      input:focus {
        outline: none;
      }
    }
  }

  .inputLabel {
    > span {
      text-transform: uppercase;
      font-size: 0.8em;
      font-weight: bold;
    }
  }

  .edit__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    &>h2{
      margin-bottom: 0;
      &>label{
        margin-bottom: 0;
      }
    }
  }

  .edit__header input {
    width: 40%;
  }

  .gray {
    color: gray;
  }
</style>
