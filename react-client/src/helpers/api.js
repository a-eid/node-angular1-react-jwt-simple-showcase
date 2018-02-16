import axios from "axios"
import { getToken, setToken } from "./persistance"
let baseURL = "http://localhost:4000"

axios.defaults.baseURL = baseURL

export const setAxiosToken = token => {
  token && (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`)
}

setAxiosToken(getToken())

export const removeAxiosToken = () => {
  delete axios.defaults.headers.common.Authorization
}

export const getRandomUser = () => {
  return axios.get("/random-user")
}

export const getMe = () => {
  console.log(getToken())
  return axios.get("/me")
}

export const login = (username, password) => {
  return axios.post("/login", {
    username,
    password,
  })
}

export const logout = () => {
  setToken()
}
