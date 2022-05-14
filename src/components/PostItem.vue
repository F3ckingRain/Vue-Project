<template>
    <div class="post">
        <div>
            <div><h3>{{post.id}}.</h3></div>
            <div><strong>Название:</strong> {{post.title}}</div>
            <div><strong>Описание:</strong> {{post.body}}</div>
        </div>
        <div class="post__btns">
            <my-button @click = "$router.push(`/post/${post.id}`)">Открыть</my-button>
            <strong>|</strong>
            <my-button @click = "$emit('remove', post)">Удалить</my-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        },
    },
    methods: {
       
    }
}
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
}
</style>