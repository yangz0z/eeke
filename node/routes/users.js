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

router.post('/login', (req, res) => {
    User.findOne(
        { loginId: req.body.id }
    ).then((user) => {
        if(!user) {
            return res.json({
                success: false,
                message: '등록된 아이디가 없습니다.'
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    success: false,
                    message: '비밀번호를 확인해주세요.'
                })
            }
            // 비밀번호 일치 -> 토큰 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)
                res
                    .cookie('accessToken', user.token)
                    .status(200)
                    .json({ success: true, id: user._id })
            })
        })
    })
})

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id }, 
        { token: '' }
    )
    .then((err, user) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({ success: true })
    })
})

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        loginId: req.user.loginId,
        name: req.user.name
      });
})
  
module.exports = router