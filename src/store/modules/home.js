import Vue from 'vue'
const state = {
    hasPhoneNum: null,
    typeCode: '',
}
export const getters = {
    // hasPhoneNum: state => state.ctoList,
    hasPhoneNum() {
        if (!state.hasPhoneNum) {
            state.hasPhoneNum = localStorage.getItem('phone')
        }
        return state.hasPhoneNum
    },
    typeCode() {
        if (!state.typeCode) {
            state.typeCode = localStorage.getItem('typeCode')
        }
        return state.typeCode
    }
}
export const actions = {
    setPhoneNum({ commit }, value) {
      
        commit('set_phoneNum', value)
    },
    setTypeCode({ commit }, value) {
      
        commit('set_type_code', value)
    }
}
export const mutations = {
    set_phoneNum(state, list) {
        state.hasPhoneNum = list

        localStorage.setItem('phone', state.hasPhoneNum)
    },
    set_type_code(state, value) {
  
        state.typeCode = value

        localStorage.setItem('typeCode', state.typeCode)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}