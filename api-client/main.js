import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const isAxios = (obj) => {
  return !!obj
    && 'defaults' in obj
    && 'interceptors' in obj
}
const instance = axios.create({
  /* intentionally empty */
})

export default instance

export function request (config) {
  if (this instanceof MockAdapter) {
    return this.axiosInstance(config)
  }
  if (isAxios(this)) {
    return this(config)
  }
  return instance(config)
}
