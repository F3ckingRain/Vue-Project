<template>
    <div class="opened-post">
        <h1>Страница поста № {{ $route.params.id }}</h1>
        <div >
            <h2>Тема: {{ post.title }}</h2>
            <div class ="post-body">
                <h3>Описание:</h3>
                <h4>{{ post.body }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
    export default {
        data() {
            return {
                post: {id: 0, title: '', body: ''},
            }
        },
        methods: {
            async fetchPost() {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
                this.post = response.data
            } catch(e) {
                alert(e)
            }
        }
        },
        mounted() {
            this.fetchPost()
        }
    }
</script>

<style scoped>
.opened-post {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
}
.post-body {
    width: 100%;
    height: 75vh;
    padding: 10px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
}
.opened-post h2 {
    padding: 5px;
    margin-left: -5px;
}
.post-body h4 {
    position: relative;
    margin-left: 0;
    margin-top: 30px;
}
</style>