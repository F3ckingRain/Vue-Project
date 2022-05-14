import { computed, ref } from "vue";

export function useSortedPosts(posts) {
    const selectedSort = ref('')
    const sortedPosts = computed(() => {
        if (selectedSort.value === 'title') {
            return [...posts.value].sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLocaleLowerCase()))
        } else if (selectedSort.value === 'body') {
            return [...posts.value].sort((a,b) => a.body.toLocaleLowerCase().localeCompare(b.body.toLocaleLowerCase()))
        }
        return [...posts.value].sort((a,b) => a.id - b.id)
    })
    return {
        selectedSort, sortedPosts
    }
}