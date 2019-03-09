save = {
    name: '',
    balance: 0,
    buildings: {
        bldg_1: 0,
        bldg_2: 0
    }
}
Object.assign(save['buildings'], {bldg_3: 0})
console.log(save);