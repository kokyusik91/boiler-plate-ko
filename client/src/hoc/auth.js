import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action';
import {withRouter} from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null){
    // specificComponent = LandingPage,LoginPage,RegisterPage 등 auth를 주고자하는 특정 컴포넌트
    // option = null : 아무나 출입이 가능한 페이지, 
    //          true : 로그인한 유저만 출입이 가능한 페이지 ,
    //          false : 로그인한 유저는 출입이 불가능한 페이지 ,
    // adminRoute = 기본값은 null 안쓰면 null ES6

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {
            // 백엔드에서 처리한 응답데이터가 response안에 담겨져있다.
            dispatch(auth()).then(response => {
                console.log(response) 
                // 로그인된 유저들은 못들가게하는 페이지 분기처리를 여기서 해준다.

                // 1. 로그인 하지 않은 상태
                if(!response.payload.data.isAuth){
                    // 로그인 하지 않은 사람이 option이 true인 페이지(로그인 해야만 들어갈수 있는 페이지)에 들어가려고 한다?
                    // => 로그인 페이지로 보내버렷!
                    if(option === true){
                        props.history.push('/login')
                    }
                }else{
                    //2. 로그인 한 상태
                    console.log("로그인한 상태")
                    // 2-1 admin이 false인데 aminRoute페이지에 들어가려고 할 경우 (관리자아닌데 관리자 페이지에 들어가려고할떄)
                    if(adminRoute && !response.payload.data.isAdmin){
                        props.history.push('/')
                    }
                    else{
                        // 2-2 로그인된 유저가 로그인 유저는 출입 불가능한 페이지(option == false)에 접근했을때 다시 루트페이지('/')로 가버렷!
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }
            })
            
                

        }, [])

        return (
            <SpecificComponent />
        )
        

    }




    return withRouter(AuthenticationCheck)
}