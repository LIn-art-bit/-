export interface IAccount {
  username: string
  password: string
}
export interface ILoginResult {
  code: number,
  token: string,
  isOk: boolean,
  msg: string,
  statusCode: number
}