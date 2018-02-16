const express = require("express")
const faker = require("faker")
const cors = require("cors")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const { authenticate, getLoggedInUser, protected } = require("./util")
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/random-user", protected, (req, res) => {
  const user = faker.helpers.userCard()
  user.avatar = faker.image.avatar()
  console.log(req.user)
  res.json(user)
})

app.post("/login", authenticate, (req, res) => {
  const { data } = req
  res.json({
    message: "you have successfully authenticated",
    ...data,
  })
})

app.get("/me", protected, (req, res) => {
  res.json({
    message: "you have successfully authenticated",
    username: req.username,
  })
})

app.all("*", (req, res) => {
  res.status(404).json({
    message: "404 Not found",
  })
})

app.listen(4000, () => console.log("up and running"))
