import { defineStore } from "pinia";
import { mainState } from './type'


export const useMainStore = defineStore('mainStore', {
  state: (): mainState => {
    return {
      isAsideExpand: true
    }
  },
  getters: {

  },
  actions: {

  }
})