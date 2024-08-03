const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const saltRounds = 10

const userSchema = mongoose.Schema({
    loginId: {
        type: String,
        trim: true,
        unique: 1,
        minlength: 4,
        lowercase: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    name: {
        type: String,
        trim: true,
        maxlength: 20,
        minlength: 2,
        required: true
    },
    phone: {
        type: String
    },
    birthDate: {
        type: Date
    },
    gender: { // 1: 남자, 2: 여자, 0: 미입력
        type: Number
    },
    regDate: {
        type: String
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    const user = this
    // 비밀번호를 바꿀 때만 암호화 시킨다.
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, next) {
    const user = this
    // plainPassword를 암호화해서 DB에 있는 비밀번호와 비교
    bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
        if (err) return next(err)
        next(null, isMatch)
    })
}

userSchema.methods.generateToken = function (next) {
    const user = this
    // jsonWebToken을 이용해서 token 생성
    const token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save()
        .then((user) => {
            console.log('generate token success!')
            next(null, user)
        })
        .catch((err) => {
            console.log('generate token fail...', err)
            next(err, null)
        })
}

userSchema.statics.findByToken = function (token, next) {
    const user = this
    console.log('User.findByToken')
    jwt.verify(token, 'secretToken', function (err, decoded) {
        if (err) return next(err)
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({ _id: decoded, token: token })
        .then(user => {
            console.log('find user success!')
            next(null, user)
        })
        .catch(err => {
            console.log('find user failed!', err)
            next(err, null)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }