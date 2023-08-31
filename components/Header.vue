<template>
  <v-app-bar class="header">
    <v-container class="header__container">
      <v-btn v-if="$route.path.includes('admin')" @click="router.push('/admin')" id="logo">
        <h1>Админ панель</h1>
      </v-btn>
      <v-btn v-else @click="router.push('/')" id="logo">
        <h1>Блог</h1>
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
        <v-btn
            class="search-form__search-button"
            elevation="1"
            density="compact"
            variant="elevated"
            @click="$route.path.includes('admin') ? router.push('/admin') : router.push('/')"
        >
          <img :src="magnify" alt="Поиск" >
        </v-btn>
      </form>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import {usePostsStore} from "../store";
import magnify from '../assets/images/magnify.svg'

const router = useRouter()
const route = useRoute()

const postsStore = usePostsStore()
</script>

<style scoped lang="scss">
.header {
  &__container {
    display: flex;
    align-items: center;
    padding: 0 !important;
  }
}

.search-form {
  display: flex;
  width: 50%;
  padding-top: 20px;
  gap: 20px;

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

  &__search-button {
    height: 40px;
    width: 40px;

    & img {
      width: 25px;
    }
  }
}
</style>
