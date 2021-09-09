import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'



const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            password : password
        }
        
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/')
                    // 로그인 페이지 했을때, 메인 페이지로 이동한다.
                }else{
                    alert('Error:')
                }
            })


function RegisterPage() {
    return (
        <div style={style}>
        <form style={style2} onSubmit={onSubmitHandler} >
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <label>Password</label>
            <input type="password" value={password} onChange={onPassWordHandler} />
            <br />
            <button style={{backgroundColor : '#1a73e8', textAlign : 'center', color :'white' }}type='submit'>Login</button>
        </form>
    </div>
    )
}


export default RegisterPage