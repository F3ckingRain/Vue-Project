<template>
    <div>
        <h1>Страница с постами</h1>
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
            <my-button 
                @click = "showDialog"
            >
                Создать пост
            </my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog 
            v-model:show="dialogVisible"
        >
            <post-form 
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
</template>

<script>
import PostList from "../components/PostList.vue"
import PostForm from "../components/PostForm.vue"
import axios from 'axios'
export default {
    components: {
    PostList,
    PostForm,
},
    data() {  
        return {
          posts: [],
          dialogVisible: false,
          isPostsLoading: false,
          searchQuery: '',
          selectedSort: '', 
          page:1,
          limit:10,
          totalPages: 0,
          sortOptions: [
              {value: 'id', name: 'По порядку'},
              {value: 'title', name: 'По названию'},
              {value: 'body', name: 'По описанию'}          
            ]
        }
    },
    methods: {
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
            this.page = pageNumber
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(Number(response.headers['x-total-count']) / this.limit)
                this.posts = response.data 
            } catch(e) {
                alert('Ошибка при загрузке постов')
            } finally {
                this.isPostsLoading = false
            }
        }      
    },
    mounted() {
        this.fetchPosts()
    },
    /*watch: {
        selectedSort(newValue: 'title' | "body") {
            newValue === 'title' 
            ? this.posts.sort((a,b) => {return a.title?.localeCompare(b.title)})
            : this.posts.sort((a,b) => {return a.body?.localeCompare(b.body)})
        },
    },*/
    watch: {
        page() {
            this.fetchPosts()
        }
    },
    computed: {
        sortedPosts() {
            if (this.selectedSort === 'title') {
                return [...this.posts].sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLocaleLowerCase()))
            } else if (this.selectedSort === 'body') {
                return [...this.posts].sort((a,b) => a.body.toLocaleLowerCase().localeCompare(b.body.toLocaleLowerCase()))
            }
            return this.posts
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
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