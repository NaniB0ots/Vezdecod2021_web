<template>
<!--    <router-link :to="">-->
        <b-button :href="'Grid/'+this.id" @click="createGrid">
            <slot>
            </slot>
        </b-button>
<!--    </router-link>-->
</template>

<script>
export default {
    name: "MyButton",
    data() {
        return {
            id: ''
        }
    },
    methods: {
        createGrid() {
            this.id = Date.now()
            this.$emit('createGrid', this.id)
        }
    }
}
</script>

<style scoped>

</style>