import { setAxiosToken, removeAxiosToken } from "./api"
const key = "auth-token"

export const setToken = token => {
  if (token) {
    localStorage.setItem(key, token)
    setAxiosToken(token)
  } else {
    localStorage.removeItem(key)
    removeAxiosToken()
  }
}

export const getToken = () => {
  return localStorage.getItem(key)
}
