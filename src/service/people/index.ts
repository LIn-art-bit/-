import testRequest from '@/service'
import { IQueryPeopleData } from './type'

export function getPeopleData(params: IQueryPeopleData) {
  return testRequest.get({
    url: "/people/searchUserList",
    params
  })
}

export function editPeopleData(params: IQueryPeopleData) {
  return testRequest.post({
    url: "/people/editUser",
    params
  })
}

export function deletePeopleData(params: {id: string}) {
  return testRequest.post({
    url: "/people/deleteUser",
    params
  })
}