import {defineStore} from "pinia";
export const usePostsStore = defineStore("postsStore", () => {
    const posts = ref([])
    const categories = ref([])
    const category = ref(0)
    const searchString = ref("")
    const loading = ref(false)
    const error = ref(null)

    const setCategory = cat => {
        category.value = cat;
    };

    const setSearch = search => {
        searchString.value = search;
    };

    const setCategories = newCategories => {
        categories.value = newCategories;
    };

    const setPosts = newPosts => {
        posts.value = newPosts;
    };

    const setLoading = status => {
        loading.value = status;
    };

    const setError = status => {
        error.value = status;
    };

    return {posts, category,categories,searchString,setPosts,setCategories,setError,setLoading,setSearch,setCategory}
})
