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
            <b-form-group :label="`Команда № ${n}`"
                          label-for="teams_quantity"
                          v-for="n in this.quantity_options.find(o => o.value==quantity_selected).text"
                          :key="n"
                          invalid-feedback="Заполните обязательные поля!"
            >
                <b-form-input id="teams_quantity" v-model="teams[n]" class="mb-3" required>
                </b-form-input>
            </b-form-group>
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
                {value: 2, text: 'После двух поражений'}
            ],
            teams: []

        }
    },
    methods: {
        checkFormValidity() {

            let valid = true
            console.log(typeof this.quantity_options.find(o => o.value == this.quantity_selected).text)
            for (let i = 1; i < parseInt(this.quantity_options.find(o => o.value == this.quantity_selected).text) + 1; i++) {

                console.log({'number': i, 'team': this.teams[i]})
                if (!this.teams[i]) {
                    console.log(this.teams[i])
                    valid = false
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
            let teams = this.teams.filter(item => {
                return item ? item : false
            }).map((item, idx) => {
                return {
                    id: idx,
                    name: item,
                    players: []
                }
            })
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
            let grid = {
                id: this.id,
                quantity: this.quantity_options.find(o => o.value === this.quantity_selected).text,
                type: this.type_options.find(o => o.value === this.type_selected).text,
                stages: stages,
            }
            this.teams = []
            this.$emit('createGrid', grid)
            this.$router.push(`Grid/${this.id}`)
        },
    }
}
</script>

<style scoped>

</style>