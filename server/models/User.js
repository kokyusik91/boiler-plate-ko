// 몽구스를 가져온다.
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
// bcrypt를 가져온다.
const saltRounds = 10;
// Salt를 이용해서 비밀번호를 암호화 해야하는데 그전에 salt를 생성; saltRounds는 salt가 몇자리 수인지 먼저 생성;
let jwt = require('jsonwebtoken');
// jsonwebtoken을 가져온다.

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


// !!!!!!!!!!!!!!!!!!!!!!!!! 비밀번호 암호화 하는곳!!!!!!!!!!!!!!!!!!!!!!!!!
// pre : 몽구스 메소드 : 유저 정보를 저장하기(save) 전에 명령을 실행하고, 완료후에 user.save((err,userInfo)) 라인으로 간다.
userSchema.pre('save', function (next) {
    let user = this;
    // 여기서 user 는 위의 userSchema임.
    // 비밀번호를 암호화 시킨다.
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            // Store hash in your password DB.

            bcrypt.hash(user.password, salt, function (err, hash) {
                //user.password는 유저가 입력한 패스워드 원본
                if (err) return next(err)
                user.password = hash
                // 원본 password를 hash password로 초기화
                next()
            })
        });
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainPassword  1234567  ===?체크  데이터베이스에 있는 암호화된 비밀번호 $2b$10$6sQB9wKmEROzod8eIPf/8ubK.YbPatb7qXC/jzuNnoCUnUrlDh/Fm 깉은지 체크
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

//토큰을 발행하는 method를 만든다.
userSchema.methods.generateToken = function(cb){

    let user = this;

    //jsonwbtoken을 이용해서 token을 생성하기
    let token = jwt.sign(user._id.toHexString(), 'secretToken')
    
    user.token = token
    // userSchema에 있는 token을 바로위에서 만들었던 token으로 초기화
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token,cb){
    let user = this;

    // 토큰을 decode 한다.
    jwt.verify(token, "secretToken", function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" : decoded, "token": token}, function(err, user){

            if(err) return cb(err)
            cb(null, user)
        })
    })




}



// 스키마를 모델로 감싸줌.

const User = mongoose.model('User', userSchema)

// 이모델을 다른파일에도 쓰고 싶기때문에 export를 해준다.

module.exports = {User}