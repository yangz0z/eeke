
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 10

const userSchema = mongoose.Schema({
    loginId: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String
    },
    name: {
        type: String,
        maxlength: 20
    },
    phone: {
        type: String
    },
    birthDate: {
        type: Date
    },
    gender: {
        type: Number
    },
    regDate: {
        type: Date
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

const User = mongoose.model('User', userSchema)

module.exports = { User }