import Main from '../pages/Main.vue'
import PostPage from '../pages/PostPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import OpenedPost from '../pages/OpenedPost.vue'
import PostPageWithStore from '../pages/PostPageWithStore.vue'
import PostPageCompositionApi from '../pages/PostPageWithCompositionApi.vue'
import {createRouter, createWebHistory} from 'vue-router'


const routes = [
    {
        path:'/',
        component: Main
    },
    {
        path:'/posts',
        component: PostPage
    },
    {
        path:'/about',
        component: AboutPage
    },
    {
        path: '/post/:id',
        component: OpenedPost
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    {
        path: '/composition',
        component: PostPageCompositionApi
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router