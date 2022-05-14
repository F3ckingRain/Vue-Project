<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>
.btn {
    border: 1px solid teal;
    color: teal;
    background: none;
    padding: 10px 15px;
    font-size: 14px;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>