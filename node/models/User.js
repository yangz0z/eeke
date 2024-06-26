
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    loginId: {
        type: String,
        trim: true,
        unique: 1
    },
    loginPw: {
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

const User = mongoose.model('User', userSchema)

module.exports = { User }