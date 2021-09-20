// disPatch() 안에 들어갈 Action을 작성하는 공간!!!!!!!!!!!!!!!!!!!!!!!!!
import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, AUTH_USER} from './types';



// function loginUser를 바로 밖에서 쓸 수 있게 export
export function loginUser(dataTosubmit) {

    const request = axios.post('/api/users/login', dataTosubmit).then(response => response.data)
    // 서버에다가 request를 body에 실어서 보낸후, 백엔드에서 보낸 response 받은것을 변수 request에 저장
    // reducer에 전달할 Payload에 데이터를 담아서보낸다.

    return {
        type : LOGIN_USER,
        payload : request
    }
    // reducer에 전달할 type과 payload를 object 형식으로 퉤! 뱃는다.
    // Action은 reducer에 넘길 데이터와 type을 전달한다!!!!!!!!!!!!!!!!
}

export function registerUser(dataTosubmit) {

    const request = axios.post('/api/users/register', dataTosubmit).then(response => response.data)
    // 서버에다가 request를 body(registerPage의) 에 실어서 보낸후, 백엔드에서 보낸 response 받은것을 변수 request에 저장
    // reducer에 전달할 Payload에 데이터를 담아서보낸다.

    return {
        type : REGISTER_USER,
        payload : request
    }
    // reducer에 전달할 type과 payload를 object 형식으로 퉤! 뱃는다.
    // Action은 reducer에 넘길 데이터와 type을 전달한다!!!!!!!!!!!!!!!!
}


export function auth() {

    const request = axios.get('/api/users/auth')
    // get 요청으로 auth인지 아닌지 상태를 받기위해 서버에 보냄

    return {
        type : AUTH_USER,
        payload : request
    }
    // reducer에 전달할 type과 payload를 object 형식으로 퉤! 뱃는다.
    // Action은 reducer에 넘길 데이터와 type을 전달한다!!!!!!!!!!!!!!!!
}


