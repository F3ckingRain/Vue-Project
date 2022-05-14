import axios from "axios";

export const PostModule = {
    state:() => ({
        posts:[],
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page:1,
        limit:10,
        totalPages:0,
        sortOptions: [
            {value: 'id', name: 'По порядку'},
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'}
        ]
    })
    , 
    mutations: {
        setPosts(state,posts) {
            state.posts = posts
        },
        setLoading(state,bool) {
            state.isPostsLoading = bool
        },
        setSelectedSort(state,sort) {
            state.selectedSort = sort
        },
        setSearchQuery(state,query) {
            state.searchQuery = query
        },
        setPage(state,page) {
            state.page = page
        },
        setTotalPages(state,pages) {
            state.totalPages = pages
        },
    },
    getters: {
        sortedPosts(state) {
            if (state.selectedSort === 'title') {
                return [...state.posts].sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLocaleLowerCase()))
            } else if (state.selectedSort === 'body') {
                return [...state.posts].sort((a,b) => a.body.toLocaleLowerCase().localeCompare(b.body.toLocaleLowerCase()))
            }
            return [...state.posts].sort((a,b) => a.id - b.id)
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(state.searchQuery.toLocaleLowerCase()))
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true) 
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(Number(response.headers['x-total-count']) / state.limit)) 
                commit('setPosts', response.data)
            } catch(e) {
                alert(e)
            } finally {
               commit('setLoading', false)
            }
        }
    },
    namespaced: true
}