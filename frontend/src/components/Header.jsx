import { useDispatch, useSelector } from "react-redux"
import { changeName, changeNameByObject } from "./../store.js"
 
const Header = ()=>{
    let dispatch = useDispatch(); //store.js에 요청을 보내줌
    
    const storeReduxChangeTest = ()=>{
        dispatch(changeName('이걸루')) //이렇게 사용하면 changeName 함수 호출 가능
    }

    const storeReduxChangeTestByObject = () =>{
        dispatch(changeNameByObject('요걸루'))
    }

    const result = useSelector(state => state)
    
    return(
        <div>
            result.user : {result.user} <br/>
            result.objectExample.obj : {result.objectExample.obj} <br/>
            <button onClick={storeReduxChangeTest}>누르면 전역state 바꿀수 있음</button> <br/>
            <button onClick={storeReduxChangeTestByObject}>누르면 오브젝트형태 바꾸는거처럼 바꿈</button>
        </div>
    )
}

export default Header ;