import { useDispatch, useSelector } from "react-redux"
import { changeName, changeNameByObject } from "./../store.js"
import { Link } from "react-router-dom";

const Header = ()=>{
    let dispatch = useDispatch(); //store.js에 요청을 보내줌
    
    const storeReduxChangeTest = ()=>{
        dispatch(changeName('이걸루')) //이렇게 사용하면 changeName 함수 호출 가능
    }

    const result = useSelector(state => state) // redux의 state 모두 불러오기
    
    return(
        <div className="headerWrap">
            <ul className="header">
                <li><Link to='/'>홈</Link></li>
                <li><Link to='/about'>홈</Link></li>
                <li><Link to='/detail'>홈</Link></li>
            </ul>
        </div>
    )
}

export default Header ;