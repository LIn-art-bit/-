import { IAccount, ILoginResult } from './type'
import testRequest from '@/service'

export function accountLoginRequest(account: IAccount) {
  return testRequest.post<ILoginResult>({
    url: '/login',
    data: account
  })
}