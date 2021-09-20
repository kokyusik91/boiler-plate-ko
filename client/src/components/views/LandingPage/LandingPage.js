import React, {useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';


function LandingPage(props) {

    let style = {
        display : "flex",
        justifyContent : 'center',
        alignItems: 'center',
        width : '100%',
        height : '100vh',
        fontSize : '150px'
    }

    useEffect(() =>{
        axios.get('/api/hello')
        // axios.get('http://localhost:5000/api/hello')
        // get request를 서버에게 보낸다.
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler =()=> {
        axios.get('/api/users/logout')
        .then(response => {
            console.log(response.data)
            if(response.data.success){
                props.history.push("/login")
            }else{
                alert("로그아웃하는데 실패했습니다.")
            }
        })
    }

    //렌딩페이지

    return (
        <div style={style}>
            시작페이지

            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default withRouter(LandingPage)
