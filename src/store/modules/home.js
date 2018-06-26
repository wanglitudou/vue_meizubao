import Vue from 'vue'
const state = {
    hasPhoneNum: null
}
export const getters = {
    // hasPhoneNum: state => state.ctoList,
    hasPhoneNum() {
        if (!state.hasPhoneNum) {
            state.hasPhoneNum = localStorage.getItem('phone')
        }
        return state.hasPhoneNum
    }
}
export const actions = {
    setPhoneNum({ commit }, value) {
        console.log(value)
        commit('set_phoneNum', value)
    }
}
export const mutations = {
    set_phoneNum(state, list) {
        console.log(list)
        state.hasPhoneNum = list
        localStorage.setItem('hasPhone', 1)
        localStorage.setItem('phone', state.hasPhoneNum)
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}