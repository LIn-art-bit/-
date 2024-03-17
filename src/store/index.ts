import { defineStore } from "pinia";
import { IMainState, ILoginState, IHomeState, IPeopleState } from './type'
import { accountLoginRequest } from '@/service/login'
import { gethomeInitDataRequest, getPieChartDataRequest, getTrendChartDataRequest } from '@/service/home'
import { getNewList, getfilterList, deletePeopleData, addPeopleData, editPeopleData } from "@/service/people"
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
    async accountLoginAction(payload: IAccount): Promise<boolean> {
      try {
        const res = await accountLoginRequest(payload)
        return true
        // 拿到token
        // this.token = res.token
        // return res
      } catch (error) {
        return false
        // console.log(error)
        // return false
      }
    }
  },
  persist: {
    key: 'token',
    paths: ['token']
  },
})

export const useHomeStore = defineStore('homeStore', {
  state: (): IHomeState => {
    return {
      initData: [],
      pieChartData: [],
      trendChartData: {
        date: [],
        value: []
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
      } catch (error) {
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

export const usePeopleStore = defineStore('peopleStore', {
  state: (): any=> {
    return {
      newsList: [],
      total: 0,
      language: [],
      category: []
    }
  },
  getters: {

  },
  actions: {
    async getNewListAction(size: number, page: number, key: string, endDate: any, sinceDate: any, category: string, languageName: string) {
      try {
        const res = await getNewList({ size, page, key, endDate, sinceDate, category, languageName })
        this.newsList = res.hotels
        this.total = res.total
      } catch (error) {
        console.log(error)
      }
    },
    async getfilterListACtion(key:string) {
      const res = await getfilterList({key})
      this.language = res.language
      this.category = res.category
    },
    async deletePeopleDataAction(id: string) {
      try {
        const res = await deletePeopleData({ id })
        console.log(res);
      } catch (error) {
        console.log(error)
      }
    },
    async addPeopleDataAction(data: any) {
      const { username, name, status, role } = data
      try {
        const res = await addPeopleData({ username, name, status, role })
        console.log(res);
      } catch (error) {
        console.log(error)
      }
    },
    async editPeopleDataAction(data: any) {
      console.log(data);
      
      const { id, username, name, status, role } = data
      try {
        const res = await editPeopleData({id, username, name, status, role })
        console.log(res);
      } catch (error) {
        console.log(error)
      }
    },
  }
})