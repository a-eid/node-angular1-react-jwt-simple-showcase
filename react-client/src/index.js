import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import { getMe } from "./helpers/api"

// here you need to do stuff.
// check if user is already determines what to render
getMe()
  .then(res => {
    console.log(res)
    ReactDOM.render(<App name={res.data.username} />, document.getElementById("root"))
    registerServiceWorker()
  })
  .catch(err => {
    ReactDOM.render(<App name={null} />, document.getElementById("root"))
  })
