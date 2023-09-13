import { defineStore } from "pinia";
import { IMainState, ILoginState, IHomeState } from './type'
import { accountLoginRequest } from '@/service/login'
import { gethomeInitDataRequest, getPieChartDataRequest, getTrendChartDataRequest } from '@/service/home'
import { IAccount } from "@/service/login/type";

export const useMainStore = defineStore('mainStore', {
  state: (): IMainState => {
    return {
      isAsideExpand: true,
      tagsData: ['首页']
    }
  },
  getters: {

  },
  actions: {

  },
  persist: {
    storage: window.sessionStorage, // 存储位置修改为 sessionStorage
  },
})

export const useLoginStore = defineStore('loginStore', {
  state: (): ILoginState => {
    return {
      token: ''
    }
  },
  getters: {

  },
  actions: {
    async accountLoginAction(payload: IAccount):Promise<boolean> {
      try {
        const res = await accountLoginRequest(payload)
        // 拿到token
        this.token = res.token
        return res.isOk
      } catch (error) {
        console.log(error)
        return false
      }
    }
  },
  persist: {
    key: 'token',
    paths: ['token']
  },
})

export const useHomeStore = defineStore('homeStore', {
  state: ():IHomeState => {
    return {
      initData: [],
      pieChartData:[],
      trendChartData:{
        date:[],
        value:[]
      },
    }
  },
  getters: {

  },
  actions: {
    async getHomeInitData() {
      try {
        const res = await gethomeInitDataRequest()
        this.initData = res.data
      } catch (error){
        console.log(error)
      }
    },
    async getPieChartData() {
      try {
        const res = await getPieChartDataRequest()
        this.pieChartData = res.data
      } catch (error) {
        console.log(error)
      }
    },
    async getTrendChartData() {
      try {
        const res = await getTrendChartDataRequest()
        this.trendChartData = res.data
        console.log(this.trendChartData);
      } catch (error) {
        console.log(error)
      }
    }
  }
})