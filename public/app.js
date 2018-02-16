;(function() {
  const app = angular.module("app", [], function config($httpProvider) {
    $httpProvider.interceptors.push("AuthInterCeptor")
  })
  app.constant("API_URL", "http://localhost:4000")
  app.controller("MainController", function MainController(RandomUserFactory, UserFactory, TokenFactory) {
    const Mc = this
    Mc.getRandomUser = getRandomUser
    Mc.login = login
    Mc.logout = UserFactory.logout

    function getRandomUser() {
      RandomUserFactory.getUser().then(response => {
        Mc.randomUser = JSON.stringify(response.data, null, 2)
      }, handleError)
    }


    function login(username, password) {
      UserFactory.login(username, password).then(response => {
        Mc.user = response.data.user
        TokenFactory.setToken(response.data.token)
        console.log("token has been set")
      }, handleError)
    }
    function handleError(response) {
      console.log(response.data)
      alert("Error: " + JSON.stringify(response.data))
    }
  })
  app.factory("RandomUserFactory", function RandomUserFactory($http, API_URL) {
    return {
      getUser,
    }
    function getUser() {
      return $http.get("http://localhost:4000/random-user")
    }
  })
  app.factory("UserFactory", function UserFactory($http, TokenFactory) {
    return {
      login,
      logout,
    }

    // 🕵️‍♂️
    function logout(){
      TokenFactory.setToken()
    }

    function login(username, password) {
      return $http.post("http://localhost:4000/login", {
        username,
        password,
      })
    }
  })
  app.factory("TokenFactory", function TokenFactory($window) {
    const store = $window.localStorage
    const key = "auth-token"
    return {
      getToken,
      setToken,
    }
    function getToken() {
      return store.getItem(key)
    }
    function setToken(token) {
      if (!token) {
        // if no token provided remove the stored token. (logout)
        store.removeItem(key)
        return
      }
      store.setItem(key, token)
    }
  })

  app.factory("AuthInterCeptor", function AuthInterCeptor(TokenFactory) {
    // 😮
    return {
      request: addToken,
    }
    function addToken(config) {
      token = TokenFactory.getToken()
      if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = "Bearer " + token
      }
      return config
    }
  })
})()
