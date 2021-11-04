export default {
    state: {
        grid: {},
        allGrids: [],
    },
    getters: {
        getAllGrids: state => state.allGrids,
        // getGridById: (state, {id}) => {
        //     console.log(id)
        //     let currGrid = state.allGrids.find(e => e.id === id)
        //     return currGrid
        // }
    },
    mutations: {
        setCurrGridById(state, {id}) {
            let currGrid = state.allGrids.find(e => e.id === id)
            state.grid = currGrid
        },
        pushGrid(state, {grid}) {
            console.log(grid)
            state.allGrids.push(grid)
        }
    },
    actions: {}
}