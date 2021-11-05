<template>
    <b-button variant="light" v-b-modal="'create-grid'">
        <slot>

        </slot>
        <b-modal
            id="create-grid"
            ref="modal"
            size="lg"
            title="Создать турнирную сетку"
            ok-title="Отправить"
            cancel-title="Отмена"
            scrollable
            @ok="handleOK"


        >
            <b-form-group label="Кол-во команд" label-for="teams_quantity">
                <b-form-select label-field="Кол-во команд" id="teams_quantity" v-model="quantity_selected"
                               :options="quantity_options" class="mb-3">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Тип сетки" label-for="teams_quantity">
                <b-form-select label-field="Кол-во команд" id="teams_quantity" v-model="type_selected"
                               :options="type_options" class="mb-3">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Тип жеребьевки" label-for="teams_quantity">
                <b-form-select id="teams_quantity" v-model="draw_selected"
                               :options="draw_options" class="mb-3">
                </b-form-select>
                <template v-if="draw_selected==null">
                    <span> Команды будут расположены в сетке попарно!</span>
                </template>
            </b-form-group>

            <!--            <template #prepend>-->
            <!--                <b-input-group-text >Username</b-input-group-text>-->
            <!--            </template>-->
            <template v-if="draw_selected==null">
                <b-form-group :label="`Команда № ${n}`"
                              v-for="n in this.quantity_options.find(o => o.value==quantity_selected).text"
                              :key="n"
                              invalid-feedback="Заполните обязательные поля!"
                >
                    <b-form-input placeholder="Введите название..."
                                  id="teams_quantity"
                                  v-model="teams[n]" class="mb-3" required>
                    </b-form-input>
                </b-form-group>
            </template>
            <template v-else>
                <b-form-group
                    v-for="n in this.quantity_options.find(o => o.value==quantity_selected).text"
                    :key="n"
                    invalid-feedback="Заполните обязательные поля!"
                >
                    <b-input-group :prepend="`Команда № ${n}`" class="mb-2">
                        <b-form-input placeholder="Название..."
                                      v-model="teams[n]"
                                      class="mb-3"
                                      required
                        >
                        </b-form-input>
                        <b-form-input placeholder="Рейтинг..."
                                      v-model="ranks[n]"
                                      class="mb-3"
                                      required
                        >
                        </b-form-input>
                    </b-input-group>
                </b-form-group>
            </template>

        </b-modal>
    </b-button>

</template>

<script>
export default {
    name: "MyButton",
    data() {
        return {
            id: 'id',
            quantity_selected: null,
            quantity_options: [
                {value: null, text: 8},
                {value: 1, text: 16},
                // { value: 2, text: 32}
            ],
            type_selected: null,
            type_options: [
                {value: null, text: 'Олимпийская'},
                {value: 2, text: 'После двух поражений', disabled: true}
            ],
            draw_selected: null,
            draw_options: [
                {value: null, text: 'Вручную'},
                {value: 1, text: 'Посевом'}
            ],
            teams: [],
            ranks: [],

        }
    },
    methods: {
        checkFormValidity() {

            let valid = true

            for (let i = 1; i < parseInt(this.quantity_options.find(o => o.value == this.quantity_selected).text) + 1; i++) {
                if (!this.teams[i]) {
                    valid = false
                }
                if (this.draw_selected == 1) {
                    if (!this.teams[i]) {
                        valid = false
                    }
                }

            }
            return valid
        },

        handleOK(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.createGrid()
        },
        createGrid() {
            if (!this.checkFormValidity()) {
                alert('Добавьте команды в пустые поля!!!')
                return
            }
            this.id = Date.now()

            //поле teams
            let teams = []
            let teams_temp = []
            if (this.draw_selected === 1) {
                teams = this.teams
                const res = teams.reduce((acc, cur, idx) => {
                    console.log(idx)
                    acc[idx - 1] = {
                        id: idx - 1,
                        rank: this.ranks[idx],
                        name: cur
                    }
                    return acc
                }, {})
                for (let [key, value] of Object.entries(res)) {
                    teams[key] = value
                }
                teams.pop()
                teams.sort((a, b) => a.rank > b.rank ? -1 : 1)

                // for (let i = 0; i < teams.length; i++) {
                //     console.log(i)
                //     console.log(teams[i])
                //     if (i%2==0){
                //         teams_temp[i] = teams[i]
                //         console.log('Первые')
                //         console.log(teams[i])
                //     } else {
                //         console.log('Вторые')
                //         console.log(teams[i])
                //         // teams_temp[teams.length-i] = teams_temp[i]
                //     }
                // }
                switch (this.quantity_options.find(o => o.value === this.quantity_selected).text) {
                    case(8):
                        teams_temp[0] = teams[0]
                        teams_temp[1] = teams[2]
                        teams_temp[2] = teams[4]
                        teams_temp[3] = teams[6]
                        teams_temp[4] = teams[7]
                        teams_temp[5] = teams[5]
                        teams_temp[6] = teams[3]
                        teams_temp[7] = teams[1]
                        break
                    case (16):
                        teams_temp[0] = teams[0]
                        teams_temp[1] = teams[2]
                        teams_temp[2] = teams[4]
                        teams_temp[3] = teams[6]
                        teams_temp[4] = teams[8]
                        teams_temp[5] = teams[10]
                        teams_temp[6] = teams[12]
                        teams_temp[7] = teams[14]
                        teams_temp[8] = teams[15]
                        teams_temp[9] = teams[13]
                        teams_temp[10] = teams[11]
                        teams_temp[11] = teams[9]
                        teams_temp[12] = teams[7]
                        teams_temp[13] = teams[5]
                        teams_temp[14] = teams[3]
                        teams_temp[15] = teams[1]
                        break
                }
                teams = teams_temp
            } else {
                teams = this.teams.filter(item => {
                    return item ? item : false
                }).map((item, idx) => {
                    return {
                        id: idx,
                        name: item,
                        players: []
                    }
                })
            }

            // console.log(teams)

            // Поле stages
            let stages_count
            let stages = new Array()
            switch (this.quantity_options.find(o => o.value === this.quantity_selected).text) {
                case(8):
                    stages_count = 3
                    break
                case (16):
                    stages_count = 4
                    break
                case (32):
                    stages_count = 5
                    break
            }
            for (let i = 0; i < stages_count; i++) {
                if (i == 0) {
                    stages[i] = {
                        id: i,
                        teams: teams
                    }
                    continue
                }
                stages[i] = {
                    id: i,
                    teams: []
                }
            }

            //итоговая сетка
            let grid = {
                id: this.id,
                quantity: this.quantity_options.find(o => o.value === this.quantity_selected).text,
                type: this.type_options.find(o => o.value === this.type_selected).text,
                draw_type: this.draw_options.find(o => o.value === this.draw_selected).text,
                stages: stages,
                champ: {}
            }
            this.teams = []
            this.ranks = []

            this.$emit('createGrid', grid)
            this.$router.push(`Grid/${this.id}`)
        },
    }
}
</script>

<style scoped>

</style>