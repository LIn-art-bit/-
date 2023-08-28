import Request from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"


const testRequest = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default testRequest