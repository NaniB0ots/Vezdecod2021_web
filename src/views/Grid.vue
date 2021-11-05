<template>
    <div class="container content">
        <div v-if="grid">
            <h1>
                Турнирная сетка #{{ this.$route.params.id }}
                <copy-url/>
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
                                            @click="chooseTeam"
                                            class="team"
                                            :stage="`${stage.id}`"
                                            :data-value="`${stage.teams[2 * round - 2].name}`"
                                        >
                                            {{ stage.teams[2 * round - 2].name }}
                                            <span class="choose">
                                                <b-icon-arrow-right/>
                                            </span>
                                        </li>
                                        <li @mouseenter="addChooseBtn"
                                            @mouseleave="removeChooseBtn"
                                            @click="chooseTeam"
                                            class="team"
                                            :stage="`${stage.id}`"
                                            :data-value="`${stage.teams[2 * round - 1].name}`"
                                        >
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
                                    <template v-for="round in parseInt(grid.quantity/(stage.id*2)/2)">
                                        <ul class="match" :key="round">
                                            <li @mouseenter="addChooseBtn"
                                                @mouseleave="removeChooseBtn"
                                                class="team"
                                                @click="chooseTeam"
                                                :stage="`${stage.id}`"
                                                :data-value="`${!!stage.teams[2 * round - 2]?stage.teams[2 * round - 2].name:''}`"
                                            >
                                                <template v-if="!!stage.teams[2 * round - 2]">
                                                    {{ stage.teams[2 * round - 2].name }}
                                                </template>
                                                <span class="choose">
                                                    <b-icon-arrow-right/>
                                                </span>
                                            </li>
                                            <li @mouseenter="addChooseBtn"
                                                @mouseleave="removeChooseBtn"
                                                class="team"
                                                @click="chooseTeam"
                                                :stage="`${stage.id}`"
                                                :data-value="`${!!stage.teams[2 * round - 1]?stage.teams[2 * round - 1].name:''}`"
                                            >
                                                <template v-if="!!stage.teams[2 * round - 1]">
                                                    {{ stage.teams[2 * round - 1].name }}
                                                </template>
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
                    <div class="stage d-flex flex-column">
                        <div class="stage-details">
                            CHAMPION!
                        </div>
                        <div class="round">
                            <ul class="match">
                                <template v-if="!!grid.champ.name">
                                    <li class="team champ"
                                    >
                                        {{ grid.champ.name }}
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="team"
                                    >

                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div v-else>
            <h1>Данной турнирной сетки не существует!</h1>
        </div>

    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import CopyUrl from "@/components/UI/CopyUrl";

export default {
    name: "Grid",
    components: {CopyUrl},
    data() {
        return {
            grid: {}
        }
    },
    computed: {
        ...mapGetters(['getAllGrids', 'getGridById', 'getGrid']),
    },
    methods: {
        ...mapMutations(['updateGridByTeam', 'setCurrGridById']),
        addChooseBtn(event) {
            let el = event.target
            let choose = event.target.lastElementChild
            choose.style.opacity = '1'
            el.classList.add('chosen')

        },
        removeChooseBtn(event) {
            let el = event.target
            let choose = event.target.lastElementChild
            choose.style.opacity = '0'
            el.classList.remove('chosen')
        },
        chooseTeam(event) {
            let cur_stage = parseInt(event.target.getAttribute('stage'))
            let team_name = event.target.getAttribute('data-value')


            if (team_name != '') {
                let team = this.grid.stages[cur_stage].teams.find(t => {
                    return t.name === team_name
                })
                let wonteam = JSON.parse(JSON.stringify(team))
                wonteam.id = parseInt(team.id / 2)
                this.updateGridByTeam({stage: cur_stage + 1, team: wonteam})
                this.grid = this.getGrid
            }

        }
    },
    beforeMount() {
        if (this.$store.getters.getGridById(this.$route.params.id)) {
            let id = this.$route.params.id
            this.setCurrGridById({id})
            this.grid = this.getGrid
        }
    },
}
</script>

<style scoped>
.choose {
    position: absolute;
    right: 5px;
    opacity: 0;
}

.chosen {
    background-color: lightgreen !important;
}
.champ {
    background-color: lightgreen !important;
}
.round {
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
    /*height: 60px;*/
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