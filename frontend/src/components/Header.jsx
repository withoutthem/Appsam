import { useDispatch, useSelector } from "react-redux"
import { signInTest } from "./../store.js"
import { Link } from "react-router-dom";

const Header = ()=>{
    let dispatch = useDispatch(); //store.js에 요청을 보내줌

    const signInTestClick = () =>{
        dispatch(signInTest());
    }

    const result = useSelector(state => state) // redux의 state 모두 불러오기
    

    return(
        <div className="headerWrap">
            <div className="logoWrap">
                <img src={process.env.PUBLIC_URL + 'images/AS.png'} alt="" />
                <img src={process.env.PUBLIC_URL + 'images/AppSam.png'} alt="" />
            </div>
            <ul className="header">
                <li><Link to='/'>홈</Link></li>
                <li><Link to='/compareall'>풀세트 비교</Link></li>
                <li><Link to='/compareone'>제품 상세 비교</Link></li>
                <li><Link to='/apple'>APPLE 전용관</Link></li>
                <li><Link to='/samsung'>SAMSUNG 전용관</Link></li>
                <li><Link to='/donation'>후원하기</Link></li>
                <li><Link to='/whosdev'>개발자새끼누구임?</Link></li>
            </ul>
            <div className="loginWrap">
                {
                    !result.user.nowSignInState ? 
                    <div className="signWrap">
                        <button onClick={signInTestClick}>Sign In</button>
                        <button>Sign Up</button>
                    </div> : 
                    <div className="signWrap">
                        <button><img className="headerIcon" src={process.env.PUBLIC_URL + 'images/icons/settingIcon.png'} alt="" /></button>
                        <button><img className="headerIcon" src={process.env.PUBLIC_URL + 'images/icons/userIcon.png'} alt="" /></button>
                        <p>NickName</p>
                        <button onClick={signInTestClick}>Log Out</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header ;