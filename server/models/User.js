// 몽구스를 가져온다.
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;
let jwt = require('jsonwebtoken');

// user스키마 생성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        // trim은 유저가 스페이스친 데이터를 스페이스를 제거해준다.
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },

    // role 주는 이유 : 어떤 유저가 관리자가 될수 있고 (ex 관리자는  Number가 1 , 일반유저는 Number가 2) , 일반 유저가 될수있다.
    role: {
        type: Number,
        default: 0
    },
    image: String,

    // 토큰을 이용해서 유효성 검사를 할 수 있다.
    token: {
        type: String
    },
    
    // 토큰이 얼마나 유지시킬지 사용할수 있는 시간.
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function (next) {
    let user = this;
    // 비밀번호를 암호화 시킨다.
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            // Store hash in your password DB.

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        });
    } else {
        next()
    }

});

userSchema.methods.comparePassword =function(plainPassword, cb){

    //plainPassword  1234567     암호화된 비밀번호 $2b$10$6sQB9wKmEROzod8eIPf/8ubK.YbPatb7qXC/jzuNnoCUnUrlDh/Fm 깉은지 체크
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){

    let user = this;
    //jsonwbtoken을 이용해서 token을 생성하기
    let token = jwt.sign(user._id.toHexString(), 'secretToken')
    
    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user)
    })
}



// 스키마를 모델로 감싸줌.

const User = mongoose.model('User', userSchema)

// 이모델을 다른파일에도 쓰고 싶기때문에 export를 해준다.

module.exports = {User}