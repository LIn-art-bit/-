import testRequest from '@/service'
import { IQueryPeopleData, IPeopleData, IEditPeopleData } from './type'

export function getPeopleData(params: IQueryPeopleData) {
  return testRequest.get({
    url: "/people/searchUserList",
    params
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