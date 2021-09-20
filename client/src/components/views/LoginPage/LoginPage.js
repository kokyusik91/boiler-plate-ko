
import React, {useState} from 'react'
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom';

function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    let style = {
        display : "flex",
        justifyContent : 'center',
        alignItems: 'center',
        width : '100%',
        height : '100vh',
        fontSize : '30px'
    }

    let style2 ={
        display : 'flex',
        flexDirection : 'column'
    }

    const onEmailHandler =(e)=>{
        setEmail(e.target.value)
    }

    const onPassWordHandler =(e)=>{
        setPassword(e.target.value)
    }

    const onSubmitHandler = (e)=>{
        e.preventDefault();
        // 페이지가 리프레쉬가 되서 다음할일들을 막아줘서 써줌

        
        let body ={
            email : Email,
            password : Password
        }
        
         // 원래는 Axios를 써서 Post 방식으로 body에 실어서 서버에게 보낸다.
         // Axios.post('/api/users/login', body)
         //      .then(response => {console.log(response)})

         // loginUser는 user_action.js에서 만든 액션함수.
        dispatch(loginUser(body))
            .then(response => {
                console.log(response)
                if(response.payload.loginSuccess){
                    props.history.push('/')
                    // 로그인 페이지 했을때, 메인 페이지로 이동한다.
                }else{
                    alert('비밀번호가 틀렸습니다.')
                }
            })

    }
    return (
        <div style={style}>
            {/* Submit 했을때의 이벤트 함수 */}
            <form style={style2} onSubmit={onSubmitHandler} >
                <label>Email</label>
                {/* 각각의 input에 대한 이벤트 핸들러 함수를 만들어준다. e-mail */}
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                {/* 각각의 input에 대한 이벤트 핸들러 함수를 만들어준다. Password */}
                <input type="password" value={Password} onChange={onPassWordHandler} />
                <br />
                <button style={{backgroundColor : '#1a73e8', textAlign : 'center', color :'white' }}type='submit'>Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
