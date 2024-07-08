const { User } = require("../models/User")

// 인증 처리
let auth = (req, res, next) => {
  let token = req.cookies.accessToken
  User.findByToken(token, (err, user) => {
    if (err) throw err
    if (!user) return res.json({ isAuth: false, success: false })

    req.token = token
    req.user = user
    next()
  })
}

module.exports = { auth }