import Vue from 'vue'
import {find, findIndex, isEmpty} from 'lodash'
const state = {
    hasPhoneNum: null,
    typeCode: 0,
    confirmData:{}
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
            if(localStorage.getItem('typeCode')){
                state.typeCode = localStorage.getItem('typeCode')
            }else{
                state.typeCode = 0
            }
        }
        return state.typeCode
    },

    confirmData(){
        if (state.confirmData == {}) {
            
            state.confirmData =  JSON.parse(localStorage.getItem('confirmData'))
        }
        return state.confirmData
    }

}
export const actions = {
    setPhoneNum({ commit }, value) {
      
        commit('set_phoneNum', value)
    },
    // 设置媒体库
    setTypeCode({ commit }, value) {
      
        commit('set_type_code', value)
    },
    setConfirmData({commit},lists){
        console.log(lists)
        commit('set_comfirm',lists)
    }
}
export const mutations = {
    set_phoneNum(state, list) {
        state.hasPhoneNum = list

        localStorage.setItem('phone', state.hasPhoneNum)
    },
    // 设置媒体库
    set_type_code(state, value) {
  
        state.typeCode = value
        localStorage.setItem('typeCode', state.typeCode)
    },
    set_comfirm(state,value){
        console.log(value)
        state.confirmData = value

        localStorage.setItem('confirmData', JSON.stringify(state.confirmData))
    }


}

export default {
    state,
    getters,
    actions,
    mutations
}