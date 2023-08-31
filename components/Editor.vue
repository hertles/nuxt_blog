<template>

  <article v-if="contentEditor">
    <div v-if="previewShowing" class="editor__preview">
      <v-alert title="Предпросмотр нового поста" type="info"/>
      <FullPost :post="post"/>
      <div class="editor__preview-buttons">
        <v-btn @click="togglePreviewShowing">
          Редактировать
        </v-btn>
        <v-btn @click="createPost">
          Создать пост
        </v-btn>
      </div>
    </div>
    <v-form v-else class="editor__form" v-model="validPost">
      <h2>Заголовок поста</h2>
      <v-text-field :rules="rules" v-model="title" variant="outlined"/>
      <h2>Описание поста</h2>
      <v-textarea :rules="rules" v-model="annotation" variant="outlined"/>
      <h2>Текст поста</h2>
      <input ref="fileInput" type="file" style="display: none" @change="formatting.addImage">
      <div class="editor__buttons">
        <v-btn
            @click="formatting.openImageDialog"
            variant="elevated"
            :elevation="inputStyles.elevation"
            :density="inputStyles.density"
        >
          Добавить фото
        </v-btn>
        <v-btn
            @click="formatting.toggleSubHeader"
            :variant="subHeader ? 'tonal' : 'elevated'"
            :elevation="inputStyles.elevation"
            :density="inputStyles.density"
        >
          Подзаголовок
        </v-btn>
        <v-btn
            @click="formatting.setParagraph"
            :variant="paragraph ? 'tonal' : 'elevated'"
            :elevation="inputStyles.elevation"
            :density="inputStyles.density"
        >
          Обычный
        </v-btn>
        <v-btn
            @click="formatting.toggleBold"
            :variant="bold ? 'tonal' : 'elevated'"
            :elevation="inputStyles.elevation"
            :density="inputStyles.density"
        >
          Жирный
        </v-btn>
        <v-btn
            @click="formatting.toggleItalic"
            :variant="italic ? 'tonal' : 'elevated'"
            :elevation="inputStyles.elevation"
            :density="inputStyles.density"
        >
          Курсив
        </v-btn>
        <v-btn
            @click="formatting.toggleStrike"
            :variant="strike ? 'tonal' : 'elevated'"
            :elevation="inputStyles.elevation"
            :density="inputStyles.density"
        >
          Зачёркнутый
        </v-btn>
        <v-btn
            @click="formatting.setAlign('left')"
            :variant="align === 'left' ? 'tonal' : 'elevated'"
            :elevation="inputStyles.elevation"
            :density="inputStyles.density"
        >
          Слева
        </v-btn>
        <v-btn
            @click="formatting.setAlign('center')"
            :variant="align === 'center' ? 'tonal' : 'elevated'"
            :elevation="inputStyles.elevation"
            :density="inputStyles.density"
        >
          По центру
        </v-btn>
        <v-btn
            @click="formatting.setAlign('right')"
            :variant="align === 'right' ? 'tonal' : 'elevated'"
            :elevation="inputStyles.elevation"
            :density="inputStyles.density"
        >
          Справа
        </v-btn>
      </div>
      <editor-content :editor="contentEditor"/>
      <h2>Категории поста</h2>
      <div class="editor__category-select">
        <v-select
            v-model="postCategories"
            variant="outlined"
            :items="postsStore.categories.slice(1)"
            name="name"
            item-title="name"
            item-value="id"
            chips
            placeholder="Без категорий"
            multiple
            closable-chips
        >
          <template v-slot:append-item>
            <v-form class="editor__category-create" v-model="validCategory">
              <v-text-field
                  class="v-select__slot"
                  variant="outlined"
                  density="compact"
                  v-model="newCategory"
                  :rules="rules"
                  label="Новая категория"
                  :focused="newCategory === null"
              />
              <v-btn
                  icon="$plus"
                  variant="outlined"
                  type="submit"
                  @click.prevent="createCategory"
              />
            </v-form>
          </template>
        </v-select>
      </div>
      <v-btn type="submit" @click.prevent="togglePreviewShowing">
        Предпросмотр
      </v-btn>
      <v-btn type="submit" @click.prevent="createPost">
        Создать пост
      </v-btn>
    </v-form>
  </article>
</template>

<script setup>
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import {Editor, EditorContent} from '@tiptap/vue-3'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import {usePostsStore} from "../store";

const config = useRuntimeConfig()

const router = useRouter()

const postsStore = usePostsStore()

const previewShowing = ref(false)

const formPost = () => {
  post.value = {
    title: title.value,
    annotation: annotation.value,
    content: contentEditor.value.getHTML(),
    contentText: contentEditor.value.getText(),
    date: new Date(),
    categories: postCategories.value,
  }
}
const togglePreviewShowing = () => {
  if (validPost.value === true) {
    formPost()
    previewShowing.value = !previewShowing.value
  }
}


const rules = [
  value => !!value || 'Поле обязательно для заполнения'
]
const validPost = ref(false)

const createPost = async () => {
  if (validPost.value === true) {
    formPost()
    await useLazyAsyncData('post', () => $fetch('/api/posts', {
      method: 'POST',
      body: {...post.value}
    }))
    refreshNuxtData('posts')
    router.push("/admin")
  }
}

const post = ref(null)

const title = ref(null)
const annotation = ref(null)
const contentEditor = ref(null)
const postCategories = ref(null)

const validCategory = ref(false)
const newCategory = ref(null)

const fileInput = ref(null)

const {data: categories} = await useLazyAsyncData('categories', () => $fetch('/api/categories'))
postsStore.setCategories(categories.value)

const createCategory = async () => {
  if (validCategory) {
    await useLazyAsyncData('category', () => $fetch('/api/categories',
        {
          method: "POST",
          body: {
            category: newCategory.value
          }
        }))
    refreshNuxtData('categories')
    newCategory.value = null
  }
}

const inputStyles = {
  variant: "tonal",
  elevation: 3,
  density: "compact"
}

const formatting = {
  openImageDialog: () => {
    fileInput.value.click()
  },
  addImage: async (event) => {
    const selectedPhoto = event.target.files[0]
    if (selectedPhoto) {
      const formData = new FormData();
      formData.append('photo', selectedPhoto);
      const {data: photo} = await useLazyAsyncData(`posts/new/photos`, () => $fetch('/api/photos/add', {
        method: 'POST',
        body: formData
      }))
      if (photo.value) {
        console.log(config.public, photo)
        contentEditor.value.chain().focus().setImage({src: config.public.baseURL + '/' + photo.value[0]}).run()
      }
    }
  },
  toggleSubHeader: () => {
    contentEditor.value.chain().focus().toggleHeading({level: 2}).run()
  },
  setParagraph: () => {
    contentEditor.value.chain().focus().setParagraph().run()
  },
  toggleBold: () => {
    contentEditor.value.chain().focus().toggleBold().run()
  },
  toggleItalic: () => {
    contentEditor.value.chain().focus().toggleItalic().run()
  },
  toggleStrike: () => {
    contentEditor.value.chain().focus().toggleStrike().run()
  },
  setAlign: (align) => {
    contentEditor.value.chain().focus().setTextAlign(align).run()
  }

}

onMounted(() => {
  contentEditor.value = new Editor({
    content: '<p></p>',
    extensions: [
      Document,
      Text,
      Image.configure({
        HTMLAttributes: {
          class: 'post__image'
        }
      }),
      Dropcursor,
      Paragraph,
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Typography
    ],
  })
})

const subHeader = computed(() => (contentEditor.value.isActive('heading', {level: 2})))
const paragraph = computed(() => (contentEditor.value.isActive('paragraph')))
const bold = computed(() => (contentEditor.value.isActive('bold')))
const italic = computed(() => (contentEditor.value.isActive('italic')))
const strike = computed(() => (contentEditor.value.isActive('strike')))
const align = computed(() => {
  if (contentEditor.value.isActive({textAlign: 'left'}))
    return 'left'
  if (contentEditor.value.isActive({textAlign: 'center'}))
    return 'center'
  if (contentEditor.value.isActive({textAlign: 'right'}))
    return 'right'
})

onBeforeUnmount(() => {
  contentEditor.value.destroy()
})

watch(categories, cat => {
  postsStore.setCategories(cat)
})
</script>

<style lang="scss">
.editor {
  &__preview {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__preview-buttons {
    display: flex;
    gap: 10px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__category-create {
    & .v-text-field {
      transform: translate(0, 5%);
    }

    padding: 5px 20px;
    display: flex;
    gap: 20px;
  }

  &__buttons {
    .v-btn {
      margin: 10px 10px 0 0;
    }
  }
}

.tiptap {
  border: 1px solid gray;
  padding: 20px;
  border-radius: 5px;


  img {
    max-width: 70%;
    height: auto;
    margin: 5px 0;

    &.ProseMirror-selectednode {
      outline: 3px solid #68CEF8;
    }
  }
}

.content {
  padding: 1rem 0 0;

  h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #333;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color: #e9ecef;
    color: #495057;
  }
}
</style>
