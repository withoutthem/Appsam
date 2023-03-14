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
      updateUserInfoTrue(state, action){ 
        return {...action.payload , nowLogInState:true}
      },
      updateUserInfoFalse(){
        return {id:'', email:'', name:'', aors:'', nowLogInState:false}
      }
    }
  })

  //글로벌 알람 팝업 상태
  const globalPop = createSlice({
    name : 'globalPop',
    initialState : {
      nowPopState: false,
      nowMessage : '알림입니다.',
    },
    reducers :{
      openPop(state, action){
        state.nowPopState = true;
        state.nowMessage = action.payload;
      },
      closePop(state, action){
        state.nowPopState = false
      }

    }
  })

  //글로벌 알람 팝업 상태
  const globalSnackBar = createSlice({
    name : 'globalSnackBar',
    initialState : {
      nowSnackBarState: false,
      nowMessage : '알림입니다.',
    },
    reducers :{
      openSnackBar(state, action){
        state.nowSnackBarState = true;
        state.nowMessage = action.payload;
      },
      closeSnackBar(state, action){
        state.nowSnackBarState = false;
      }
    }
  })

//reducers actions export
export const { updateUserInfoTrue, updateUserInfoFalse } = user.actions 
export const { openPop, closePop } = globalPop.actions
export const { openSnackBar, closeSnackBar } = globalSnackBar.actions

//state 등록하기
export default configureStore({ 
  reducer: {
    user : user.reducer, //작명 : createSlice만든거.reducer
    globalPop : globalPop.reducer,
    globalSnackBar : globalSnackBar.reducer
  }
})
