import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { removeCookieJWT } from '../utils/cookie';
import { updateUserInfoFalse } from '../store';


const Header = ()=>{
    const dispatch = useDispatch(); //store.js에 요청을 보내줌
    const navigate = useNavigate(); //navigation router

    const storeState = useSelector(state => state) // redux의 state 모두 불러오기
    
    const signOut = ()=>{
        //jwt 삭제
        removeCookieJWT();
        //redux store 삭제
        dispatch(updateUserInfoFalse());
    }


    return(
        <div className="headerWrap">
            <div className="logoWrap" onClick={()=>{navigate('/')}}>
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
                <button onClick={()=>{console.log(storeState.user)}} style={{background:'red', color: '#fff'}}>state 확인</button>
                {
                    !storeState.user.nowLogInState ? 
                    <div className="signWrap">
                        <button onClick={() => (navigate('/signin'))}>Sign In</button>
                        <button onClick={() => (navigate('/sign'))} >Sign Up</button>
                    </div> : 
                    <div className="signWrap">
                        <button><img className="headerIcon" src={process.env.PUBLIC_URL + 'images/icons/settingIcon.png'} alt="" /></button>
                        <button><img className="headerIcon" src={process.env.PUBLIC_URL + 'images/icons/userIcon.png'} alt="" /></button>
                        <p>{storeState.user.name}</p>
                        <button onClick={()=>{signOut()}}>Log Out</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header ;