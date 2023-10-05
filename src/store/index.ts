import { defineStore } from "pinia";
import { IMainState, ILoginState, IHomeState, IPeopleState } from './type'
import { accountLoginRequest } from '@/service/login'
import { gethomeInitDataRequest, getPieChartDataRequest, getTrendChartDataRequest } from '@/service/home'
import { getPeopleData, deletePeopleData, addPeopleData, editPeopleData } from "@/service/people"
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
  state: (): IPeopleState => {
    return {
      peopleList: [],
      total: 0
    }
  },
  getters: {

  },
  actions: {
    async getPeopleDataAction(pageSize: number, currentPage: number, id: string, username: string, name: string, status: string, role: string) {
      try {
        const res = await getPeopleData({ pageSize, currentPage, id, username, name, status, role })
        this.peopleList = res.data
        this.total = res.total
      } catch (error) {
        console.log(error)
      }
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