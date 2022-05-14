<template>
    <div>
        <h1>Composition Api</h1>
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
       
        <my-input v-model="searchQuery" placeholder="Поиск..."/>
        <div class="app_btns">
            <my-button>Создать пост</my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog 
            v-model:show="dialogVisible"
        >
            <post-form />
        </my-dialog>
        <post-list 
            v-if="!isPostsLoading" 
            :posts='sortedAndSearchedPosts'
        />
        <div v-else class="posts_loading">Идёт загрузка постов...</div>
        <div class="page__wrapper">
            <div 
                v-for="pageNumber in totalPages" 
                :key="pageNumber" class="page" 
                :class="{'current-page' : page.value === pageNumber}"
                @click="changePage(pageNumber)"
            >
                {{pageNumber}}
            </div>
        </div>
    </div>
</template>

<script>
import PostList from "../components/PostList.vue"
import PostForm from "../components/PostForm.vue"
import {usePosts} from '../hooks/usePosts'
import {useSortedPosts} from '../hooks/useSortedPosts'
import {useSortedAndSearchedPosts} from '../hooks/useSortedAndSearchedPosts'
import { ref } from "vue"
export default {
    components: {
    PostList,
    PostForm,
},
    data() {  
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'id', name: 'По порядку'},
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'}          
            ]
        }
    },
    setup(props) {
        const page = ref(1)
        const changePage = (pageNumber) => {page.value = pageNumber}
        const {posts,totalPages,isPostsLoading} = usePosts(10, page.value)
        const {selectedSort, sortedPosts} = useSortedPosts(posts)
        const {searchQuery,sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
        return {
            changePage,
            page,
            posts,
            totalPages,
            isPostsLoading,
            selectedSort,
            sortedPosts,
            searchQuery,
            sortedAndSearchedPosts
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