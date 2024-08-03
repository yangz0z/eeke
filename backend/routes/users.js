var express = require('express')
var router = express.Router()
const moment = require('moment')

const { User } = require('../models/User.js')
const { auth } = require('../middleware/auth.js')

// 회원가입
router.post('/register', async (req, res) => {
    const user = new User(req.body)
    user.regDate = moment().format('YYYY-MM-DD HH:mm:ss')

    user.save().then(() => {
        return res.status(200).json({ success: true })
    }).catch((err) => {
        console.log(err)
        return res.json({ success: false, err })
    })
})

// 아이디 중복체크
router.post('/check-id', async (req, res) => {
    const existUser = await User.findOne({ loginId: req.body.loginId })
    if (existUser) {
        return res.json({ success: false, message: '이미 가입된 아이디입니다.'})
    }
    return res.status(200).json({ success: true, message: '사용 가능한 아이디입니다.' })
})

// 로그인
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
                    .json({ success: true, id: user._id, loginId: user.loginId, name: user.name, email: user.email, token: user.token })
            })
        })
    })
    .catch((err) => {
        console.log(err)
        res.json({ success:false, err })
    })
})

// 소셜 로그인
router.post('/login/oauth', (req, res) => {
    User.findOne(
        { email: req.body.email }
    ).then((user) => {
        if(!user) {
            // 기존에 없는 유저면 바로 회원가입 처리
            user = new User(req.body)
            user.regDate = moment().format('YYYY-MM-DD HH:mm:ss')
            
            user.save().then(() => {
                return res.status(200).json({ success: true })
            }).catch((err) => {
                console.log(err)
                return res.json({ success: false, err })
            })
        } 
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err)
            res
                .cookie('accessToken', user.token)
                .status(200)
                .json({ success: true, id: user._id, loginId: user.loginId, name: user.name, email: user.email, token: user.token })
        })
        
    })
})

// 로그아웃
router.get('/logout', auth, (req, res) => {
    console.log('Logout request received')
    User.findOneAndUpdate(
        { _id: req.user._id }, 
        { token: '' }
    )
    .then(user => {
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        return res.status(200).json({ success: true })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ success: false, err })
    })
})

// 인가
router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        loginId: req.user.loginId,
        name: req.user.name
      });
})
  
module.exports = router