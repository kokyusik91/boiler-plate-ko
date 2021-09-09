import axios from 'axios';
import {
    LOGIN_USER
} from './types';
export function loginUser(dataTosubmit) {

    const request = axios.post('/api/users/login', dataTosubmit).then(response => response.data)
    // 서버에다가 request를 body 보낸후, response 받은것을 변수에 저장

    return {
        type : 'LOGIN_USER',
        payload : request

    }
}