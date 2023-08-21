<template>
  <v-app id="inspire">
    <v-app-bar class="header">
      <v-container class="header__container">
        <v-btn @click="router.push('/')">
                    <h1>Зенковъ</h1>
<!--          <h1>Блог</h1>-->
        </v-btn>
        <v-spacer></v-spacer>
        <form class="search-form">
          <v-text-field
              class="search-form__search-field search-form__field"
              v-model="postsStore.searchString"
              label="Начните искать..."
              density="compact"
          />
          <v-select
              class="search-form__select-category-field search-form__field"
              v-model="postsStore.category"
              :items="postsStore.categories"
              item-title="name"
              item-value="id"
              density="compact"
          />
        </form>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                    v-for="category in postsStore.categories"
                    :key="category.id"
                    @click="()=>postsStore.setCategory(category.id)"
                >
                  <v-list-item-title>
                    {{category.name}}
                  </v-list-item-title>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                    link
                    color="grey-lighten-4"
                >
                  <v-list-item-title>
                    Обо мне
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                    link
                    color="grey-lighten-4"
                >
                  <v-list-item-title>
                    Контакты
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
                min-height="70vh"
                rounded="lg"
                class="container"
            >
              <NuxtPage/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import {usePostsStore} from "./store";
import {storeToRefs} from "pinia";

const router = useRouter()
const postsStore = usePostsStore()
const {searchString, category} = storeToRefs(postsStore)

const {data: categories} = await useLazyAsyncData('categories', () => $fetch('/api/categories'))
const {
  data: posts,
  pending,
  error
} = await useLazyAsyncData('posts',
    () => $fetch('/api/posts', {
          method: 'GET',
          params: {
            search: searchString.value,
            category: category.value
          }
        }
    ), {watch: [searchString, category]})

postsStore.setPosts(posts.value)
postsStore.setCategories(categories.value)

watch(posts, pos => postsStore.setPosts(pos))
watch(categories, cat => postsStore.setCategories(cat))
watch(category, cat => console.log(cat))
watch(pending, pend => postsStore.setLoading(pend))
watch(error, err => postsStore.setError(err))
</script>

<style scoped lang="scss">
.header {
  &__container {
    display: flex;
    align-items: center;
    padding: 0!important;
  }
}

.search-form {
  display: flex;
  width: 50%;
  padding-top: 20px;
  gap: 30px;

  &__field {
    overflow: hidden;
    white-space: nowrap;
  }

  &__search-field {
    width: 50%;
    max-height: 50%;
    overflow: hidden;
    white-space: nowrap;
  }

  &__select-category-field {
    width: 50%;
    max-height: 50%;
  }
}

.container {
  padding: 20px;
  background-color: #fafafa;
}

</style>
