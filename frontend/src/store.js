import { configureStore, createSlice } from '@reduxjs/toolkit'

// user 상태 
const user = createSlice({
    name : 'user', //state 이름
    initialState : {
      id:'',
      email:'',
      name:'',
      aors: '',
      nowLogInState : false,
    }, //state 값
    reducers : { 
      updateUserInfo(state, action){ 
        return action.payload
      }
    }
  })

  //글로벌 알람 팝업 상태
  const globalPop = createSlice({
    name : 'globalPop',
    initialState : {
      nowPopState: false
    },
    reducers :{
      openPop(state, action){
        state.nowPopState = true;
      },
      closePop(state, action){
        state.nowPopState = false
      }

    }
  })


//reducers actions export
export const { updateUserInfo } = user.actions 
export const { openPop, closePop } = globalPop.actions
//Slice이름.actions 하면 state 변경함수가 전부 그 자리에 출력 
//그 중에 changeName을 변수에 담아 export하겠다는 뜻이다.


//state 등록하기
export default configureStore({ 
  reducer: {
    user : user.reducer, //작명 : createSlice만든거.reducer
    globalPop : globalPop.reducer
  }
})
