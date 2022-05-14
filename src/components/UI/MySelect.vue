<template>
    <select v-model="modelValue" @change="changeOptions">
        <option disabled value="">Выберите из списка</option>
        <option 
            v-for="option in options" 
            :key="option.value"
            :value="option.value"
        >
            {{option.name}}
        </option>
    </select>
</template>

<script>
export default {
    name: 'my-select',
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeOptions(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style>
select {
    border: 1px solid teal;
    background: none;
    color: teal;
    font-size: 14px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>