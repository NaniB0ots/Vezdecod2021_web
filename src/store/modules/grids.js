
export default {
    state: {
        grid: {},
        allGrids: [],
    },
    getters: {
        getAllGrids: state => state.allGrids,
        getGrid: state => state.grid,
        getGridById: (state) => (id) => {
            let grid = state.allGrids.find(grid =>
                grid.id == id)
            return grid
        }
    },
    mutations: {
        setCurrGridById(state, {id}) {
            let cur_grid = state.allGrids.find(grid =>
                grid.id == id)
            state.grid = cur_grid
        },
        updateGridByTeam(state, {stage, team}){
            let grid_idx = state.allGrids.indexOf(state.grid)

            let old_grid = state.grid

            let new_grid = JSON.parse(JSON.stringify(old_grid))
            new_grid.stages[stage].teams[team.id] = team

            state.grid = new_grid
            state.allGrids[grid_idx] = new_grid
        },
        pushGrid(state, {grid}) {
            console.log(grid)
            state.allGrids.push(grid)
        }
    },
    actions: {}
}