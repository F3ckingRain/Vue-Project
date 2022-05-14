<template>
    <div>
        <div>
            <h1>Vuex Store</h1>
            <div class ='page__wrapper_m'>     
                <div 
                    v-for="pageNumber in totalPages" 
                    :key="pageNumber" class="page-m" 
                    :class="{'current-page' : page === pageNumber}"
                    @click="changePage(pageNumber)"
                >
                    {{pageNumber}}
                </div>
            </div>
            <my-input 
                :model-value="searchQuery" 
                @update:model-value="setSearchQuery"
                placeholder="Поиск..."
            />
            <div class="app_btns">
                <my-button 
                    @click = "showDialog"
                >
                    Создать пост
                </my-button>
                <my-select 
                    :model-value="selectedSort"
                    @update:model-value = "setSelectedSort"
                    :options="sortOptions"
                />
            </div>
            <my-dialog v-model:show="dialogVisible">
                <post-form 
                :totalPages="totalPages"
                @update:totalPages = 'setTotalPages'
                @create='createPost'
            />
            </my-dialog>
            <post-list 
                v-if="!isPostsLoading" 
                :posts='sortedAndSearchedPosts'
                @remove = "removePost"
            />
            <div v-else class="posts_loading">Идёт загрузка постов...</div>
            <div class="page__wrapper">
                <div 
                    v-for="pageNumber in totalPages" 
                    :key="pageNumber" class="page" 
                    :class="{'current-page' : page === pageNumber}"
                    @click="changePage(pageNumber)"
                >
                    {{pageNumber}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations} from "vuex"
import PostList from "@/components/PostList.vue"
import PostForm from "@/components/PostForm.vue"
    export default { 
        components: {
            PostList,
            PostForm,
        },
        data() {
            return {
                dialogVisible: false,
            }
        },
        methods: {
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery',
                setSelectedSort: 'post/setSelectedSort'
            }),
            ...mapActions({
                fetchPosts: 'post/fetchPosts'
            }),
            createPost(post) {
                if(post.title === '' || post.body === '') return 
                else { 
                    this.posts.push(post) 
                    this.dialogVisible = false
                }
            },
            removePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showDialog() {
                this.dialogVisible = true
            },
            changePage(pageNumber) {
                this.setPage(pageNumber)
            },
        },
        mounted() {
            this.fetchPosts()
        },
        computed: {
            ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page:state => state.post.page,
            limit:state => state.post.limit,
            totalPages:state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions,
            }),
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            })
        },
        watch: {
            page() {
                this.fetchPosts()
            }
        }
    }
</script>

<style scoped>
.posts_loading {
    font-size: 26px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.app_btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top:15px ;
    align-items: center;
    justify-content: center;
}

.page__wrapper_m {
    width: 200px;
    height: 30px;
    display: flex;
    margin-top:5px ;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-left: auto;
}
.page-m {
    height: 25px;
    width: 20px;
    text-align: center;
    margin-left: 3px;
    border: 1px solid teal;
    padding-top: 3px;
    background: none;
    color: rgb(61, 2, 2);
}
.page {
    margin: 5px;
    border: 1px solid teal;
    padding: 10px;
}

.current-page {
    border: 2px solid rgb(27, 56, 63);
}
</style>