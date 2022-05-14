<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input
            v-focus
            v-model="post.title"
            type="text" 
            placeholder="Название"
        />
        <my-input
            v-model="post.body"
            type="text" 
            placeholder="Описание" 
        />
        <my-button @click="createPost">Создать</my-button>
    </form>
</template>

<script>

export default {
    data() {
        return {
            post: {
                id: 0,
                title: "",
                body: ""
            }
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now()
            this.$emit("create", this.post);
            this.post = {
                id: 0,
                title: "",
                body: ""
            };
        }
    }
}
</script>

<style scoped>
.btn {
    align-self: flex-end;
    margin-top: 15px;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
}
form {
    display: flex;
    flex-direction: column;
}

</style>