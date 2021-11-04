<template>
    <div class="home">
        <my-button class="m-5"
                   @createGrid="createGrid"
        >
            Создать сетку
        </my-button>
    </div>
</template>

<script>
// @ is an alias to /src
import {mapMutations} from 'vuex'
import MyButton from "@/components/UI/MyButton";

export default {
    name: 'Home',
    components: {
        MyButton
    },
    methods: {
        ...mapMutations(['pushGrid']),
        createGrid(id) {
            let grid = {id:id}
            console.log(grid)
            this.pushGrid({grid})
        }
    }
}
</script>

<style>

.home {
    align-items: center;
    height: 800px;
}

</style>
