<template>
    <div class="grid">
        <div v-if="this.$store.getters.getGridById(this.$route.params.id)">
            <h1>Турнирная сетка #{{this.$route.params.id}}</h1>
        </div>
        <div v-else>
            <h1>Данной турнирной сетки не существует!</h1>
        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: "Grid",
    computed: {
    },
    methods: {
        ...mapGetters(['getAllGrids', 'getGridById'])
    },
    mounted() {
    },
}
</script>

<style scoped>

</style>