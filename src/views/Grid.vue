<template>
    <div class="container content">
        <div v-if="grid">
            <h1>
                Турнирная сетка #{{ this.$route.params.id }}
            </h1>
            <div class="grid d-flex mt-3">
                <template v-if="grid.stages">
                    <template v-for="stage in grid.stages">
                        <div class="stage d-flex flex-column" :key="stage.id">
                            <div class="stage-details">
                                STAGE #{{ stage.id }}
                            </div>
                            <template v-if="stage==grid.stages[0]">
                                <template v-for="round in stage.teams.length/2">

                                    <ul class="match" :key="round">
                                        <li @mouseenter="addChooseBtn"
                                            @mouseleave="removeChooseBtn"
                                            class="team">
                                            {{ stage.teams[2 * round - 2].name }}
                                            <span class="choose">
                                                <b-icon-arrow-right/>
                                            </span>
                                        </li>
                                        <li @mouseenter="addChooseBtn"
                                            @mouseleave="removeChooseBtn"
                                            class="team">
                                            {{ stage.teams[2 * round - 1].name }}
                                            <span class="choose">
                                                <b-icon-arrow-right/>
                                            </span>
                                        </li>
                                    </ul>
                                </template>
                            </template>
                            <template v-else>
                                <div class="round">
                                    <template v-for="round in grid.quantity/(stage.id*2)/2">
                                        <ul class="match" :key="round">
                                            <li @mouseenter="addChooseBtn"
                                                @mouseleave="removeChooseBtn"
                                                class="team">
                                                <!--                                            {{ stage.teams[2 * round - 2].name }}-->
                                                <span class="choose">
                                                    <b-icon-arrow-right/>
                                                </span>
                                            </li>
                                            <li @mouseenter="addChooseBtn"
                                                @mouseleave="removeChooseBtn"
                                                class="team">
                                                <!--                                            {{ stage.teams[2 * round - 1].name }}-->
                                                <span class="choose">
                                                    <b-icon-arrow-right class="choose_icon"/>
                                                </span>
                                            </li>
                                        </ul>
                                    </template>
                                </div>
                            </template>
                        </div>
                    </template>
                </template>
            </div>
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
    data() {
        return {
            grid: {}
        }
    },
    computed: {},
    methods: {
        ...mapGetters(['getAllGrids', 'getGridById']),
        addChooseBtn(event){
            // console.log(event)
            let el = event.target
            let choose = event.target.lastElementChild
            choose.style.opacity = '1'
            el.classList.add('chosen')

        },
        removeChooseBtn(event){
            let el = event.target
            let choose = event.target.lastElementChild
            choose.style.opacity = '0'
            el.classList.remove('chosen')
        }
    },
    beforeMount() {
        if (this.$store.getters.getGridById(this.$route.params.id)) {
            this.grid = this.$store.getters.getGridById(this.$route.params.id)
        }
    },
}
</script>

<style scoped>
.choose{
    position: absolute;
    right: 5px;
    opacity: 0;
}
.chosen{
    background-color: lightgreen !important;
}
.round{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
}
.content {
    padding: 20px;
    background-color: rgba(225, 225, 225, 0.9);
}

.stage {
    margin: 0 2.5% 0 0;
}

.stage-details {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 13px;
    color: #2C7399;
    text-transform: uppercase;
    text-align: center;
    height: 40px;
}

.match {
    margin: 0;
    width: 100%;
    padding: 10px 0;
    height: 60px;
}

.team {
    width: 150px;
    background-color: #fff;
    opacity: 1;
    padding: 0 5px;
    margin: 3px 0;
    height: 25px;
    line-height: 25px;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
}

.team__name {
    margin: 0px;
}

.clr_even {
    width: 100px;
    height: 20px;
    border-right: 2px solid teal;
}

.clr_odd {
    width: 100px;
    height: 20px;
    /*border-right: 2px solid teal;*/
}

.stage-clr {
    width: 10px;
}
</style>