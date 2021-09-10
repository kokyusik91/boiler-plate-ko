import React, {useEffect} from 'react'
import axios from 'axios'


function LandingPage() {

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

    //렌딩페이지

    return (
        <div style={style}>
            시작페이지
        </div>
    )
}

export default LandingPage
