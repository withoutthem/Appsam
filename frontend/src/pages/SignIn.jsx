import { useState, useEffect } from "react";
import axios from "axios";
import { setCookieJWT } from "../utils/cookie";
import { useDispatch } from "react-redux";
import { updateUserInfoTrue, openPop } from "../store";
import { useNavigate } from 'react-router-dom';
import IMG_mainLogin from '../assets/images/image14.png';




const SignIn = ()=>{
    //리덕스 세팅
    const dispatch = useDispatch();
    //navigate 세팅
    const navigate = useNavigate();

    // temp state 
    const [userInput, setUserInput] = useState({
        id : '',
        ps : ''
    })
    // button disabled state 
    const [buttonState, setButtonState] = useState(true)

    // onChange function state에 업데이트
    const onChange = (type, e)=>{
        let tempInput = {...userInput};
        tempInput[`${type}`] = e;
        setUserInput(tempInput);
    }

    //button State 버튼 상태
    useEffect(()=>{
       if(userInput.id.length === 0 || userInput.ps.length ===0){
         setButtonState(true);
       } 
       else{
        setButtonState(false)
       }
    },[userInput.id, userInput.ps])

    // submit logic 로그인
    const submitBtn = (event, value)=>{
        event.preventDefault();
        if(buttonState){
            dispatch(openPop('알 수 없는 에러입니다.'))
        }
        else{
            axios.post('/api/auth/signin', value)
            .then((result)=>{
                //받은 jwt를 쿠키에 저장
                setCookieJWT(result.data.jwt)
                //redux 글로벌에 userInfo 저장
                dispatch(updateUserInfoTrue(result.data.userInfo));
                console.log('로그인 성공');
            })
            .then(()=>{
                //navigateHook으로 이동
                navigate('/');
            })
            .catch(e=>{
                dispatch(openPop(e.response.data.message ? e.response.data.message : e))
            })
        }
    }

    return(
        <div className="signInWrapBack">
            <div className="signImgWrap">
                <form className="signBox" onSubmit={(e)=>{submitBtn(e, userInput)}}>
                    <p className="mainTitle">Sign In</p>
                    <div className="idWrap formWrap">
                        <p className="idPs">ID :</p>
                        <input className="fillInput" type="id" value={userInput.id} onChange={ e => onChange('id', e.target.value)} />
                        <a href="#" className="assistanceTex">아이디를 잊으셨나요? 안알랴줌</a>
                    </div>
                    <div className="psWrap formWrap">
                        <p className="idPs">PASSWORD :</p>
                        <input className="fillInput" type="password" value={userInput.ps} onChange={ e => onChange('ps', e.target.value) } />
                        <a href="#" className="assistanceTex">비밀번호를 잊으셨나요? 안알랴줌2</a>
                    </div>
                    <div className="formWrap login">
                        <button className="logIn" type='submit' disabled={buttonState} >로그인</button>
                    </div>
                    <div className="orLine">
                        <div className="line"></div>
                    </div>
                    <div className="SubWrap">
                        <button className="loginBtn git">Login with Github</button>
                        <button className="loginBtn kakao">Login with Kakao</button>
                        <button className="loginBtn google">Login with Google</button>
                        <button className="loginBtn naver">Login with Naver</button>
                    </div>
                    <div className="orLine">
                        <div className="line"></div>
                    </div>
                    <div className="SubWrap joinWrap">
                        <button className="join">회원가입</button>
                    </div>
                </form>
            
                <div className="imgBox"></div>
            </div>

        </div>
    )
}

export default SignIn;