// 백엔드의 시작점

const express = require('express')
// pacakage.json에 설치된 express 모듈을 가져온다.
const app = express()
// express로 app을 반든다.
const port = 5000
// 어디에??? 5000번 포트에


const {User} = require("./models/User")
// userSchema를 가져온다.

const bodyParser = require("body-parser")
// bodyParser를 가져온다.

const cookieParser = require("cookie-parser")

const config = require('./config/key')
// config key에 있는 MongoURI

const {auth} =require('../middleware/auth')

app.use(bodyParser.urlencoded({extended: true}));
//  application/ x-www-form-urlencoded 를 분석해서 가져오게 해주는 코드
app.use(bodyParser.json());
//  application/json 타입으로 된 것을 분석해서 가져오게 해주는 코드
app.use(cookieParser());
// cookieParser를 사용하겠다.

// Mongooose를 이용해서 우리 app과 mongo db 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
        // 이렇게 use 4가지를 써줘야 error 가 안뜬다.. 강사남왈...
    }).then(() => console.log('MongoDB Connected..... 몽고 db가 연결되었어요!!! 축하드려요!! 😘'))
    .catch(err => console.log(err))
// Mongooose를 이용해서 우리 app과 mongo db 연결



app.get('/', (req, res) => {
    res.send('5000번 포트에 연결되었을때 나오는 메세지 안녕!!')
})
// node js 서버가 5000번 포트에서 켜졌을때, localhost:5000에 들어가면 메세지가 나온다.

app.get('/api/hello', (req,res) => {
    res.send('안녀앟세요~~')
})


// 회원가입을 위한 Register Route를 만들어 준다.
app.post('/api/users/register', (req, res) => {

    //회원 가입 할때 필요한 정보들을 client에서 받아오면, 그것들을 데이터 베이스에 넣어준다.    
    const user = new User(req.body)
    user.save(((err, userInfo) => {
        if (err) return res.json({success: false, err})
        // 1. req.body 안에는 클라이언트에서 보낸 id,password이런 정보들이 json 형식으로 담겨져있다. 암튼 유저 정보
        // 2. save는 몽고db 메서드
        // 3. 저장을 할때 에러가 있다면 클라이언트에게 json 형식으로 error가 있다, err 메세지도 함께 전달.

        return res.status(200).json({success: true})
        // 성공했을때 success true, status(200)은 성공했다라는 말!
    }))
})

// !!!!!로그인 api !!!!!!!!!!!!!!!
app.post('/api/users/login', (req, res) => {

    // 요청한 이메일이 데이테베이스에 있는지 찾는다.
    // User 유저 스키마를 가져온다 . findOne 몽고db에서 제공하는 method
    User.findOne({email: req.body.email}, (err, user) => {
        // 유저가 없다면, 
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        // 유저가 있다면, 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인!   
        // comparePassword는 user.js 에서 만들어야한다. mongodb에서 제공하는 method가 아님
        user.comparePassword(req.body.password, (err, isMatch) => {
            // user는 클라에서 입력한 아이디, 비번이 들어가있음.
            // req.body.password는 클라에서 입력한 raw password임.
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                })

            //비밀번호 까지 맞다면 토큰을 생성하기.

            user.generateToken((err, user) => {
                // user에는 token이 들어있다.
                if(err) return res.status(400).send(err);
                // 에러가 있다면 에러메세지 전달

                // 토큰을 저장한다. 어디에 ? 쿠키 or 로컬스토리지
                res.cookie("x_auth", user.token)
                // cookie에 저장하는 과정
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id})
            })
        })
    })  
})

// !!!!!!!!!!!!!!!!!!!!!! 인증 authentication 부분 !!!!!!!!!!!!!!!!!!!!!!!!!!

app.get('/api/users/auth', auth, (req, res) => {

    // 여기 까지 미들웨어를 통과해 왔다는 얘기는 auth 이 True 라는 말.

    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        // role이 1이면 admin(관리자). role이 2면 특정부서 admin(관리자).
        // role이 0이면 일반유저 role이 0이 아니면 관리자.
        isAuth : true,
        email : req.user.email,
        name: req.user.name,
        lastname : req.user.lastname,
        role: req.user.role,
        image : req.user.image

    })
})

app.get('/api/users/logout', auth, (req,res)=>{

    // 로그아웃 하려는 유저를 db에서 찾는다.
    User.findOneAndUpdate({_id : req.user._id}, {token: ""}, (err,user)=>{
        if(err) return res.json({usccess:false, err});
        // 성공하면
        return res.status(200).send({
            success : true
        })
    })
})




app.listen(port, () => {
    console.log(`--------------------hi---------------------------`)
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(`-------- 서버가 실행되었습니다. 축하드려요!!! 😄 ---------`)
})
// 얘는 서버가 실행될때 나오는 메세지를 설정