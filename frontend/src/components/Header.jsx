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
                <li><Link to='/compareall'>풀세트 비교</Link></li>
                <li><Link to='/compareone'>제품 상세 비교</Link></li>
                <li><Link to='/apple'>APPLE 전용관</Link></li>
                <li><Link to='/samsung'>SAMSUNG 전용관</Link></li>
                <li><Link to='/donation'>후원하기</Link></li>
                <li><Link to='/whosdev'>개발자새끼누구임?</Link></li>
            </ul>
        </div>
    )
}

export default Header ;