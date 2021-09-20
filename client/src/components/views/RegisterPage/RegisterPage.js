import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import {useHistory} from 'react-router-dom'
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {

    let history = useHistory()
    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');


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

    const onNameHandler =(e)=>{
        setName(e.target.value)
    }

    const onPassWordHandler =(e)=>{
        setPassword(e.target.value)
    }

    const onConfirmPassWordHandler =(e)=>{
        setConfirmPassword(e.target.value)
    }


    const onSubmitHandler = (e)=>{
        e.preventDefault();

        if(Password.length < 5){
            return alert ("비밀번호가 5자리 이상이여야되요!")
        }
        else if(Password !== ConfirmPassword){
            return alert('비밀번호이 불일치 합니다.')
        }

    
//         
            let body ={
            email : Email,
            name : Name,
            password : Password
        }
        
        dispatch(registerUser(body))
            .then(response => {
                console.log(response)
                if(response.payload.success){
                    props.history.push('/login')
                    // 로그인 페이지 했을때, 메인 페이지로 이동한다.
                }else{
                    alert('Error:')
                }
            })
        }


    return (
        <div style={style}>
        <form style={style2} onSubmit={onSubmitHandler} >
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler} />
            <label>Password</label>
            <input type="password" value={Password} onChange={onPassWordHandler} />
            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPassWordHandler} />
            <br />
            <button style={{backgroundColor : '#1a73e8', textAlign : 'center', color :'white' }}type='submit'>회원가입</button>
        </form>
    </div>
    )


}

export default withRouter(RegisterPage)
