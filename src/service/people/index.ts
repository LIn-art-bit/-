import testRequest from '@/service'
import { IQueryPeopleData, IPeopleData, IEditPeopleData } from './type'

export function getNewList(data: any) {
  return testRequest.post({
    url: "/news/list",
    data
  })
}
export function getfilterList(data: any) {
  return testRequest.post({
    url: "/news/filters",
    data
  })
}

export function editPeopleData(data: IEditPeopleData) {
  return testRequest.post({
    url: "/people/editUser",
    data,
  })
}

export function deletePeopleData(data: { id: string }) {
  return testRequest.post({
    url: "/people/deleteUser",
    data
  })
}
export function addPeopleData(data: IPeopleData) {
  return testRequest.post({
    url: "/people/addUser",
    data
  })
}