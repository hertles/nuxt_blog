<template>
  <v-card
      @click="$router.push('post/'+post.id)"
      class="post-preview"
      variant="tonal"
      elevation="4"
      border="3px"
      width="100%"
      :title="post.title"
      :subtitle="date"
      :text="post.annotation"
  >
    <template v-slot:actions>
      <div class="post-preview__categories">
        <v-btn
            variant="plain"
            v-for="category in post.categories"
            class="post-preview__category"
            @click.stop="()=>postsStore.setCategory(category.category.id)"
        >
          <div class="curly-brace left-brace">{</div>
          {{category.category.name}}
          <div class="curly-brace right-brace">}</div>
        </v-btn>
      </div>
    </template>

  </v-card>
</template>

<script setup>
import moment from 'moment'
import {usePostsStore} from "../store";
const props = defineProps({
  post: {
    type: Object,
    required: true,
  }
})
const postsStore = usePostsStore()
const date = moment(props.post.date).format('DD.MM.YYYY')
const router = useRouter()

</script>

<style scoped lang="scss">
.post-preview {
  &:hover {
    background-color: #eeeeee;
  }

  &__categories {
    display: flex;
    width: 100%;
  }

  &__category {
    margin-bottom: 10px;

    &:hover {
      .curly-brace {
        opacity: 1;
      }
      .left-brace {
        transform: translate(-3px,-2px);
      }
      .right-brace {
        transform: translate(3px,-2px);
      }
    }
  }
}

.curly-brace {
  transition: 0.3s;
  font-size: 20px;
  transform: translate(0,-2px);
  opacity: 0;
}


</style>
