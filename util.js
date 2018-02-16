const jwt = require("jsonwebtoken")
const secret = "asdfasdfsadfklasjdflguehkjdlajflaksdf" // .env

const user = {
  id: "1234",
  username: "aeid",
  password: "password",
}

const verifyLogin = (username, password) => {
  return username === user.username && password === user.password
}

function authenticate(req, res, next) {
  const { username, password } = req.body
  console.log(username, password)
  // check user credintials
  if (!verifyLogin(username, password))
    return res.status(401).json({
      message: "invalid username or password",
    })

  const u = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(u, secret)
  req.data = {
    username: u.username,
    token,
  }
  // sign the user and send
  next()
}

function protected(req, res, next) {
  try {
    const [_, token] = req.get("Authorization").split(" ")
    const decoded = jwt.verify(token, secret)
    console.log(decoded)
    req.username = decoded.username
    next()
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized",
    })
  }
}

function getLoggedInUser(req, res, next) {}

module.exports.authenticate = authenticate
module.exports.protected = protected
module.exports.secret = secret
module.exports.getLoggedInUser = getLoggedInUser
