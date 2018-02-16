import React, { Component } from "react"
import logo from "./logo.svg"
import { getRandomUser, login, logout } from "./helpers/api"
import { setToken } from "./helpers/persistance"
import "./App.css"

class App extends Component {
  state = {
    name: this.props.name || null,
    username: "",
    password: "",
    randomUser: null,
    error: null,
    message: null,
  }

  getRandomUser = () => {
    getRandomUser().then(res => {
      this.setState({
        randomUser: JSON.stringify(res.data, null, 2),
      })
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
      message: null,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    login(this.state.username, this.state.password)
      .then(({ data: { token, message, username: name } }) => {
        setToken(token)
        this.setState({
          message,
          name,
        })
      })
      .catch(({ response: { data: { message: error } } }) => {
        this.setState({
          error,
        })
      })
  }

  logout = e => {
    e.preventDefault() // just in case 🐳
    logout()
    this.setState({
      name: null,
      username: "",
      password: "",
      error: null,
      message: "logged out successfull", // have no effect
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {(!this.state.name && (
          <div className="App-intro">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username">username: </label>
              <input
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
                type="text"
              />
              <br />
              <label htmlFor="password">password: </label>
              <input
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
              <br />
              <button type="submit">login</button>
            </form>
            {this.state.error && <p>{this.state.error}</p>}
            {this.state.message && <p>{this.state.message}</p>}
          </div>
        )) || (
          <div>
            <p>welcome: {this.state.name}</p>
            <button type="button" onClick={this.logout}>
              logout
            </button>
            <button onClick={this.getRandomUser}> load random user </button>
            <pre>{this.state.randomUser}</pre>
          </div>
        )}
      </div>
    )
  }
}

export default App
