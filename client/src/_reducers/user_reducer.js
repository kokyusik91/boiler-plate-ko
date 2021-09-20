

import {LOGIN_USER, REGISTER_USER, AUTH_USER} from '../_actions/types'

// state 초기값은 {} ??
export default function user(state={}, action) {
    switch(action.type){
        // action.type이 LOGIN_USER 일때!!!! return Soemthing
        case LOGIN_USER:
            return {...state, loginSuccess : action.payload}
            // action.payload 안에는 백엔드에서 보낸 응답 데이터가 담겨있다!!!!
            break;

        case REGISTER_USER:
            return {...state, register : action.payload}
            break;

        case AUTH_USER:
            return {...state, userData : action.payload}
            // 백엔드 쪽에 요청햇을때, 응답오는 데이터가 유저의 정보들 (ex email, role, isAuth인지 )이 넘어오기때문에, userData라고 이름지음
            break;    

        default:
            return state;
    }



}