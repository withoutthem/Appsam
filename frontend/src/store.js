import { configureStore, createAction, createSlice } from '@reduxjs/toolkit'

// user 상태 
const user = createSlice({
    name : 'user', //state 이름
    initialState : {
      id : '',
      nickName : '',
      nowSignInState : false,
    }, //state 값
    reducers : { 
      changeName(state, action){ //파라미터 하나 넣으면 그 값은 기존 state가 됨
        return 'state바꾸기 ' + state + action.payload //return 오른쪽 걸로 갈아치워줌
              //action.payload : changeName(action) 파라미터 문법으로 전달된 data
              //action.type : state변경함수 이름이 출력
      },
      signInTest(state, action){
        state.nowSignInState = !state.nowSignInState;
      }
    }
  })



//export 해줘야됨 
export const { changeName, signInTest } = user.actions 
//Slice이름.actions 하면 state 변경함수가 전부 그 자리에 출력 
//그 중에 changeName을 변수에 담아 export하겠다는 뜻이다.


//state 등록하기
export default configureStore({ 
  reducer: {
    user : user.reducer, //작명 : createSlice만든거.reducer
  }
})
