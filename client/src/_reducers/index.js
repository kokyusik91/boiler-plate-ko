import {combineReducers} from 'redux';
import user from './user_reducer'


// 각자 다른 상태를 관리하는 reducer들을 combineReducers안에서 오브젝트로 묶어서 변수에 넣어준다. 그리고 이거를 전달 할 거임!!!!
const rootReducer = combineReducers({
    user,
    //subscribe,
    //like,
    //buy,
})

export default rootReducer;