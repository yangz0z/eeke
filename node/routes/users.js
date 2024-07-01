var express = require('express')
var router = express.Router()

const { User } = require("../models/User.js")

router.post('/register', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        return res.status(200).json({ success: true })
    }).catch((err) => {
        return res.json({ success: false, err })
    })
})
  
module.exports = router
